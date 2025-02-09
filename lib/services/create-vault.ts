import type { Address } from 'viem';
import type { PortfolioStrategy } from '../types/portfolio-strategy';
import type { VaultResponse } from '../types/vault';
export async function createVault(
  userAddress: Address,
  strategy: PortfolioStrategy,
): Promise<VaultResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vault`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userAddress,
      strategy,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create vault');
  }

  return response.json();
}
