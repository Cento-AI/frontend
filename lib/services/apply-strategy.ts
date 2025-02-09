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

  return response.json();
}
