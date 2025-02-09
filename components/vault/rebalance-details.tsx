import { SUPPORTED_TOKENS } from '@/lib/constants/tokens';
import type { PortfolioRebalance } from '@/lib/types/portfolio-rebalance';
import { formatToken } from '@/lib/utils/format-token';

interface RebalanceDetailsProps {
  rebalance: PortfolioRebalance;
  className?: string;
}

function getTokenDecimals(symbol: string): number {
  const token = SUPPORTED_TOKENS.find((t) => t.symbol === symbol);
  return token?.decimals ?? 18; // default to 18 if not found
}

function formatActionType(action: string): string {
  const actionMap: Record<string, string> = {
    lend_tokens: 'Lend',
    withdraw_lent: 'Withdraw from Lending',
    add_liquidity: 'Add Liquidity',
    remove_liquidity: 'Remove Liquidity',
    swap_tokens: 'Swap',
  };
  return actionMap[action] || action;
}

export function RebalanceDetails({
  rebalance,
  className,
}: RebalanceDetailsProps) {
  return (
    <div className={className}>
      <div className="rounded-lg bg-primary/10 p-4 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Total Value:</span>
            <span className="font-medium">
              ${rebalance.currentPortfolio.totalValue}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-muted-foreground text-sm">
              Current Portfolio:
            </span>
            <div className="space-y-1">
              {rebalance.currentPortfolio.assets.map((asset) => (
                <div
                  key={asset.symbol}
                  className="flex items-center justify-between pl-4"
                >
                  <span className="font-mono text-sm">{asset.symbol}</span>
                  <span className="text-sm">
                    {formatToken(
                      BigInt(asset.balance),
                      getTokenDecimals(asset.symbol),
                    )}{' '}
                    {asset.symbol} (${asset.value})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-muted-foreground text-sm">
              Suggested Actions:
            </span>
            <div className="space-y-2">
              {rebalance.suggestedActions.map((action, i) => (
                <div
                  key={`${action.asset}-${i}`}
                  className="rounded-md bg-background/50 p-3 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{action.asset}</span>
                    <span className="rounded-full bg-primary/20 capitalize px-2 py-0.5 text-xs">
                      {formatActionType(action.action)}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {action.protocol} - with{' '}
                    {formatToken(
                      BigInt(action.targetAmount),
                      getTokenDecimals(action.asset),
                    )}{' '}
                    {action.asset}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
