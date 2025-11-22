import { type ActionFunctionArgs } from '@remix-run/cloudflare';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getSystemPrompt } from '~/lib/common/prompts/prompts';

// Simple in-memory cache for responses (in production, use Redis or similar)
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCacheKey(messages: Array<{ role: string; content: string; id: string }>): string {
  // Create a cache key based on the last few messages
  const recentMessages = messages.slice(-3);
  return recentMessages.map(msg => `${msg.role}:${msg.content.slice(0, 100)}`).join('|');
}

function getCachedResponse(cacheKey: string): string | null {
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.response;
  }
  if (cached) {
    responseCache.delete(cacheKey); // Remove expired cache
  }
  return null;
}

function setCachedResponse(cacheKey: string, response: string): void {
  responseCache.set(cacheKey, { response, timestamp: Date.now() });
  // Limit cache size to prevent memory leaks
  if (responseCache.size > 100) {
    const firstKey = responseCache.keys().next().value;
    if (firstKey) {
      responseCache.delete(firstKey);
    }
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    console.log('🔥 /api/chat called');

    const { messages } = (await request.json()) as { messages: Array<{ role: string; content: string; id: string }> };
    console.log('📨 Received messages:', messages.length, 'messages');

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const lastMessage = messages.filter((msg) => msg.role === 'user').slice(-1)[0];

    if (!lastMessage) {
      return new Response(JSON.stringify({ error: 'No user message found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check cache for similar requests
    const cacheKey = getCacheKey(messages);
    const cachedResponse = getCachedResponse(cacheKey);
    if (cachedResponse) {
      console.log('✅ Returning cached response');
      return new Response(JSON.stringify({ response: cachedResponse }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
        topP: 0.8,
        topK: 40,
      },
    });

    // Get the system prompt for Bolt.diy
    const systemPrompt = getSystemPrompt();

    // Convert messages to Gemini format, including system prompt as first message
    const history = [
      // Add system prompt as the first message
      {
        role: 'user' as const,
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'model' as const,
        parts: [{ text: 'Understood. I will follow these instructions for all responses.' }],
      },

      // Add conversation history (limit to last 10 messages for performance)
      ...messages
        .filter((msg) => msg.role !== 'system')
        .slice(-10, -1)
        .map((msg) => ({
          role: msg.role === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: msg.content }],
        })),
    ];

    const userPrompt = lastMessage.content;

    // Create a chat with the prepared history
    const chat = model.startChat({ history });

    console.log('🤖 Sending prompt to Gemini with optimized settings');

    const result = await chat.sendMessage(userPrompt);
    const response = result.response.text();
    console.log('✅ Received response from Gemini');

    // Cache the response
    setCachedResponse(cacheKey, response);

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('❌ Gemini API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
