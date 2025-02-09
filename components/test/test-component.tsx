'use client';
import { Button } from '@/components/ui/button';
import { FundVault } from '@/components/vault/fund-vault';
import { RebalanceDetails } from '@/components/vault/rebalance-details';
import { VaultDetails } from '@/components/vault/vault-details';
import { useToast } from '@/hooks/use-toast';
import { applyStrategy } from '@/lib/services/apply-strategy';
import { confirmStrategy } from '@/lib/services/confirm-strategy';
import { createVault } from '@/lib/services/create-vault';
import type { PortfolioRebalance } from '@/lib/types/portfolio-rebalance';
import type { UserVaultData } from '@/lib/types/vault';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

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


export function TestComponent() {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const { toast } = useToast();
  const [rebalance, setRebalance] = useState<PortfolioRebalance | null>(null);

  const handleConfirm = async () => {
    if (!address || !rebalance) return;

    try {
      setLoading(true);
      const result = await confirmStrategy(address, rebalance.suggestedActions);
      toast({
        title: 'Success',
        description: result.result[0] || 'Strategy applied successfully',
      });
    } catch (error) {
      console.error('Failed to confirm strategy:', error);
      toast({
        title: 'Error',
        description: 'Failed to apply strategy. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRebalance = async () => {
      if (!rebalance && address) {
        await createVault(address, mockVault.strategy!);
        const rebalanceData = await applyStrategy(address);
        setRebalance(rebalanceData);
      }
    };
    fetchRebalance();
  }, [address, rebalance]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Vault Details Test</h2>
        <VaultDetails vault={mockVault} />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Fund Vault Test</h2>
        {mockVault.balances.map((token) => (
          <FundVault
            key={token.address}
            token={token}
            vaultAddress={mockVault.vaultAddress}
            onSuccess={() => console.log('Funded successfully')}
          />
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Rebalance Details Test</h2>
        {rebalance && (
          <div className="space-y-4">
            <RebalanceDetails rebalance={rebalance} />
            <div className="text-sm text-muted-foreground">
              {rebalance.explanation}
            </div>
            <div className="flex justify-end">
              <Button onClick={handleConfirm} disabled={loading}>
                {loading ? 'Confirming...' : 'Confirm Strategy'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
