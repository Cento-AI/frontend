import type { SuggestedAnswer } from './suggested-answer';

export type MessageRole = 'user' | 'agent' | 'system' | 'error';

export type MessageComponentType =
  | 'default'
  | 'opportunity'
  | 'analysis'
  | 'get-strategy'
  | 'error';

export interface Message<T> {
  role: MessageRole;
  content: string;
  type?: MessageComponentType;
  data?: T;
  suggestedAnswers?: SuggestedAnswer[];
}
