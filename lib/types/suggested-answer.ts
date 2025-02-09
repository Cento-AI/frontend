export interface SuggestedAnswer {
  text: string;
  action?:
    | 'auto'
    | 'manual'
    | 'custom'
    | 'proceed'
    | 'retry'
    | 'apply'
    | 'later';
  onClick?: () => void;
}
