import type { WalletAnalysis } from '../types/analysis';
import { isDev } from '../utils/env';

const MOCK_ANALYSIS: WalletAnalysis = {
  yieldOpportunities: [
    {
      tokenAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC address
      tokenName: 'USDC',
      providerName: 'Compound',
      apy: 3.4,
    },
  ],
  lpOpportunities: [
    {
      token0Address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC address
      token0Name: 'USDC',
      token1Address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH address
      token1Name: 'ETH',
      providerName: 'Aerodrome',
      apy: 6.0,
    },
  ],
};

export async function getOpportunities(
  address: string,
): Promise<WalletAnalysis> {
  if (isDev) {
    // Simulate API delay in development
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return MOCK_ANALYSIS;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error('API URL not configured');
  }

  const response = await fetch(`${apiUrl}/opportunities?address=${address}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch opportunities');
  }

  return response.json();
}
