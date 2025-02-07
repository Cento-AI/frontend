export interface YieldOpportunity {
  tokenAddress: string;
  tokenName: string;
  providerName: string;
  apy: number;
}

export interface LPOpportunity {
  token0Address: string;
  token0Name: string;
  token1Address: string;
  token1Name: string;
  providerName: string;
  apy: number;
}

export interface WalletAnalysis {
  yieldOpportunities: YieldOpportunity[];
  lpOpportunities: LPOpportunity[];
}
