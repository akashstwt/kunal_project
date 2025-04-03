export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    language?: string;
  }
  
  export interface ChatHistory {
    messages: Message[];
  }
  
  export type SupportedLanguage = {
    code: string;
    name: string;
    flag: string;
  };
  
  export interface OpenAIResponse {
    choices: {
      message: {
        content: string;
      };
    }[];
  }