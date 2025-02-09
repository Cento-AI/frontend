export interface StrategyAction {
  asset: string;
  currentAmount: string;
  targetAmount: string;
  action: 'deposit' | 'withdraw';
  protocol: 'aave' | 'compound';
}
