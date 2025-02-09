import type { UserVaultData } from '@/lib/types/vault';
import { formatToken } from '@/lib/utils/format-token';

interface VaultDetailsProps {
  vault: UserVaultData;
  className?: string;
}

export function VaultDetails({ vault, className }: VaultDetailsProps) {
  return (
    <div className="rounded-lg border bg-card/80 shadow-sm p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Vault Details</h3>
        <span className="bg-primary/20 capitalize px-2 py-1 rounded-full text-xs">
          {vault.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Address:</span>
          <span className="font-mono text-sm">{vault.vaultAddress}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Created:</span>
          <span className="text-sm">
            {new Date(vault.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Last Updated:</span>
          <span className="text-sm">
            {new Date(vault.lastUpdated).toLocaleDateString()}
          </span>
        </div>

        {vault.balances.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-muted-foreground text-sm">Balances:</span>
            <div className="space-y-1">
              {vault.balances.map((balance) => (
                <div
                  key={balance.address}
                  className="flex items-center justify-between pl-4"
                >
                  <span className="font-mono text-sm">{balance.symbol}</span>
                  <span className="text-sm">
                    {formatToken(balance.balance, balance.decimals)}{' '}
                    {balance.symbol}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {vault.strategy && (
          <div className="pt-2 space-y-2">
            <span className="text-muted-foreground text-sm">Strategy:</span>
            <div className="pl-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">Risk Level:</span>
                <span className="text-sm capitalize">
                  {vault.strategy.riskLevel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Lending Allocation:</span>
                <span className="text-sm">
                  {vault.strategy.allocations.lending}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Liquidity Allocation:</span>
                <span className="text-sm">
                  {vault.strategy.allocations.liquidity}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
