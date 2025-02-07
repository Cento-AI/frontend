export interface SuggestedAnswer {
  text: string;
  action?: 'auto' | 'manual' | 'custom';
  onClick?: () => void;
}
