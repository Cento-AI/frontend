import { AgentActions } from '@/components/dashboard/agent-actions';
import { ValueChart } from '@/components/dashboard/value-chart';
import { Header } from '@/components/layout/header';
import { VaultDetails } from '@/components/vault/vault-details';

const mockVault = {
  vaultAddress: '0x43c308e846354d69341771C49bF87e39fBD9eb9C',
  createdAt: new Date('2024-03-01'),
  lastUpdated: new Date(),
  status: 'active',
  balances: [
    {
      address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      balance: BigInt(5000000000),
      decimals: 6,
      logoURI:
        'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png',
      name: 'USD Coin',
      symbol: 'USDC',
    },
  ],
  strategy: {
    riskLevel: 'conservative',
    allocations: {
      lending: 70,
      liquidity: 30,
    },
    preferences: {
      stablecoinsOnly: true,
      preferredAssets: ['USDC'],
      minimumAPY: 3.5,
    },
  },
};

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="font-bold mb-6 text-2xl">Dashboard</h1>
        <div className="grid gap-6">
          <VaultDetails vault={mockVault} />
          <ValueChart />
          <AgentActions />
        </div>
      </main>
    </div>
  );
}
