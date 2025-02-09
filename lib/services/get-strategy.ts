import type { Address } from 'viem';
import type { PortfolioStrategy } from '../types/portfolio-strategy';

interface GetStrategyResponse {
  strategy: PortfolioStrategy;
}

export async function getStrategy(
  userAddress: Address,
  description: string,
): Promise<GetStrategyResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/strategy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAddress,
        description,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to get strategy');
  }

  return response.json();
}
