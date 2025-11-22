import type { IProviderSetting } from '~/types/model';
import { PROVIDER_LIST } from '~/utils/constants';

export function getProviderApiKeys(): Record<string, string> {
  const apiKeys: Record<string, string> = {};

  // Only handle Gemini API key
  const geminiKey = process.env.GEMINI_API_KEY;

  if (geminiKey && geminiKey.trim().length > 0) {
    apiKeys.Google = geminiKey.trim();
  }

  return apiKeys;
}

export function getProviderSettings(): Record<string, IProviderSetting> {
  const settings: Record<string, IProviderSetting> = {};

  // Only handle Gemini provider
  const hasApiKey = Boolean(process.env.GEMINI_API_KEY);

  settings.Google = {
    enabled: hasApiKey,
  };

  return settings;
}
