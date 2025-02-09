import { Agent } from '@/components/agent-new/agent';
import { Header } from '@/components/layout/header';
import { AnalysisSection } from '@/components/portfolio/analysis-section';
import { FundVault } from '@/components/vault/fund-vault';
import type { UserVaultData } from '@/lib/types/vault';

const mockVault: UserVaultData = {
  vaultAddress: '0x43c308e846354d69341771C49bF87e39fBD9eb9C',
  createdAt: new Date(),
  lastUpdated: new Date(),
  status: 'created',
  balances: [
    {
      address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      balance: BigInt(0),
      decimals: 6,
      logoURI:
        'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
      name: 'USD Coin',
      symbol: 'USDC',
    },
    {
      address: '0x4200000000000000000000000000000000000006',
      balance: BigInt(0),
      decimals: 18,
      logoURI: 'https://assets.coingecko.com/coins/images/2518/thumb/weth.png',
      name: 'Wrapped Ether',
      symbol: 'WETH',
    },
  ],
  strategy: {
    riskLevel: 'conservative',
    allocations: {
      lending: 70,
      liquidity: 30,
    },
    preferences: {
      stablecoinsOnly: false,
      preferredAssets: ['USDC', 'WETH'],
      minimumAPY: 3.5,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* <HeroSection />
        <FeaturesSection /> */}
        {mockVault.balances.map((token) => (
          <FundVault
            key={token.address}
            token={token}
            vaultAddress={mockVault.vaultAddress}
          />
        ))}
        <Agent />
        <AnalysisSection />
      </main>
    </div>
  );
}
