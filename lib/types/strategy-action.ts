export interface StrategyAction {
  asset: string;
  currentAmount: string;
  targetAmount: string;
  action: 'lend_tokens' | 'withdraw_lent';
  protocol: 'aave' | 'compound';
}
