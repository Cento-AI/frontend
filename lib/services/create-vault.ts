import type { Address } from 'viem';
import type { PortfolioStrategy } from '../types/portfolio-strategy';
import type { Token } from '../types/token';
import type { UserVaultData } from '../types/vault';
import { convertTokenNameToToken } from '../utils/convert-token-name-to-token';

export async function createVault(
  userAddress: Address,
  strategy: PortfolioStrategy,
): Promise<UserVaultData> {
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
  const data = await response.json();
  return {
    vaultAddress: data.vaultAddress,
    strategy,
    status: 'created',
    createdAt: new Date(),
    lastUpdated: new Date(),
    balances: strategy.preferences.preferredAssets
      .map(convertTokenNameToToken)
      .filter((token): token is Token => token !== undefined)
      .map((token) => ({
        ...token,
        balance: BigInt(0),
      })),
  };
}
