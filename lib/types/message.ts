export type MessageRole = 'user' | 'agent' | 'system' | 'error';

export type MessageComponentType =
  | 'default'
  | 'opportunity'
  | 'analysis'
  | 'error';

export interface Message {
  role: MessageRole;
  content: string;
  type?: MessageComponentType;
  data?: unknown; // For passing structured data to special components
}
