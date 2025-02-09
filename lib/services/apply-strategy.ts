import type { Address } from 'viem';
import type { PortfolioRebalance } from '../types/portfolio-rebalance';

export async function applyStrategy(
  userAddress: Address,
): Promise<PortfolioRebalance> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/agent/apply-strategy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAddress,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to apply strategy');
  }

  // return response.json();
  return {
    explanation:
      'The USDC in the vault is fully available for lending, and Aave offers favorable lending rates, maximizing returns based on the conservative strategy.',
    currentPortfolio: {
      totalValue: '5',
      assets: [
        {
          symbol: 'USDC',
          balance: '5000000',
          value: '5',
        },
      ],
    },
    suggestedActions: [
      {
        asset: 'USDC',
        currentAmount: '5000000',
        targetAmount: '5000000',
        action: 'lend_tokens',
        protocol: 'aave',
      },
    ],
  };
}
