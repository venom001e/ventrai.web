import { json } from '@remix-run/cloudflare';

interface ModelsResponse {
  modelList: Array<{
    name: string;
    label: string;
    provider: string;
    maxTokenAllowed: number;
    maxCompletionTokens: number;
  }>;
  providers: Array<{
    name: string;
    staticModels?: any[];
    getApiKeyLink?: string;
    labelForGetApiKey?: string;
    icon?: string;
  }>;
  defaultProvider: {
    name: string;
    staticModels?: any[];
    getApiKeyLink?: string;
    labelForGetApiKey?: string;
    icon?: string;
  };
}

export async function loader(): Promise<Response> {
  // Gemini-only implementation
  const modelList = [
    {
      name: 'gemini-2.5-flash',
      label: 'Gemini 2.5 Flash',
      provider: 'Google',
      maxTokenAllowed: 1048576,
      maxCompletionTokens: 65536,
    },
  ];

  const providers = [
    {
      name: 'Google',
      staticModels: modelList,
      getApiKeyLink: 'https://aistudio.google.com/app/apikey',
      labelForGetApiKey: 'Get Gemini API Key',
      icon: 'Google',
    },
  ];

  const defaultProvider = providers[0];

  return json<ModelsResponse>({
    modelList,
    providers,
    defaultProvider,
  });
}
