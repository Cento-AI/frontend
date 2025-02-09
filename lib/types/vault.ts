import type { Address } from 'viem';
import type { PortfolioStrategy } from './portfolio-strategy';
import type { TokenBalance } from './token';

export interface UserVaultData {
  vaultAddress: Address;
  strategy?: PortfolioStrategy;
  status: 'created' | 'funded' | 'active';
  createdAt: Date;
  lastUpdated: Date;
  balances: TokenBalance[];
}
