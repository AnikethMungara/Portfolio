export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatbotRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatbotResponse {
  message: string;
  conversationId: string;
}

export interface ChatbotError {
  error: string;
}
