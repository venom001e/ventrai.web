import { z } from 'zod';
import type { ToolCallAnnotation } from '~/types/context';
import {
  TOOL_EXECUTION_APPROVAL,
  TOOL_EXECUTION_DENIED,
  TOOL_EXECUTION_ERROR,
  TOOL_NO_EXECUTE_FUNCTION,
} from '~/utils/constants';
import { createScopedLogger } from '~/utils/logger';

const logger = createScopedLogger('mcp-service');

// Stub types for MCP functionality (disabled for Gemini-only implementation)
type ToolSet = Record<string, any>;
type Message = any;
type DataStreamWriter = any;

// Stub schemas and types for compatibility
export const mcpConfigSchema = z.object({
  mcpServers: z.record(z.string(), z.any()),
});
export type MCPConfig = z.infer<typeof mcpConfigSchema>;

export type ToolCall = {
  type: 'tool-call';
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
};

export type MCPServerTools = Record<string, any>;

// Simplified MCP Service stub - disabled for Gemini-only implementation
export class MCPService {
  private static _instance: MCPService;

  static getInstance(): MCPService {
    if (!MCPService._instance) {
      MCPService._instance = new MCPService();
    }

    return MCPService._instance;
  }

  async updateConfig(config: MCPConfig) {
    logger.debug('MCP disabled for Gemini-only implementation');
    return {};
  }

  async checkServersAvailabilities() {
    logger.debug('MCP disabled for Gemini-only implementation');
    return {};
  }

  isValidToolName(toolName: string): boolean {
    return false; // No tools available in Gemini-only mode
  }

  processToolCall(toolCall: ToolCall, dataStream: DataStreamWriter): void {
    // No-op for Gemini-only implementation
  }

  async processToolInvocations(messages: Message[], dataStream: DataStreamWriter): Promise<Message[]> {
    // Return messages unchanged for Gemini-only implementation
    return messages;
  }

  get tools() {
    return {};
  }

  get toolsWithoutExecute() {
    return {};
  }
}
