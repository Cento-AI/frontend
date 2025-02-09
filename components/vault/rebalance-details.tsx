import type { PortfolioRebalance } from '@/lib/types/portfolio-rebalance';

interface RebalanceDetailsProps {
  rebalance: PortfolioRebalance;
  className?: string;
}

export function RebalanceDetails({
  rebalance,
  className,
}: RebalanceDetailsProps) {
  return (
    <div className={className}>
      <div className="bg-primary/10 p-4 rounded-lg space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Total Value:</span>
            <span className="font-medium">
              {rebalance.currentPortfolio.totalValue}
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
                    {asset.value} (Balance: {asset.balance})
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
              {rebalance.suggestedActions.map((action, index) => (
                <div
                  key={index}
                  className="bg-background/50 p-3 rounded-md space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{action.asset}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 capitalize">
                      {action.action}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {action.protocol} - From {action.currentAmount} to{' '}
                    {action.targetAmount}
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
