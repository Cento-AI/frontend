import { TypeWriter } from '@/components/ui/type-writer';
import type { Message } from '@/lib/types/message';
import type { PortfolioStrategy } from '@/lib/types/portfolio-strategy';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import { useState } from 'react';
import { ErrorMessage } from './error-message';
interface StrategyMessageProps {
  message: Message<PortfolioStrategy>;
  onComplete?: (suggestedAnswers?: SuggestedAnswer[]) => void;
}

export function StrategyMessage({ message, onComplete }: StrategyMessageProps) {
  const [showStrategy, setShowStrategy] = useState(false);
  const { data: strategy, suggestedAnswers } = message;
  if (!strategy) {
    return (
      <ErrorMessage
        message={{
          role: 'agent',
          content:
            'I apologize, but I encountered an error while creating your strategy. Please try again.',
          type: 'error',
        }}
        onComplete={onComplete}
      />
    );
  }
  return (
    <div className="space-y-6">
      <TypeWriter
        message={message}
        onComplete={() => {
          setShowStrategy(true);
          onComplete?.(suggestedAnswers);
        }}
      />
      {showStrategy && (
        <div className="space-y-4">
          <div className="rounded-lg bg-primary/10 p-4">
            <h3 className="mb-4 font-medium">Your Investment Strategy</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Risk Level:
                </span>
                <span className="font-medium capitalize">
                  {strategy.riskLevel}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Allocations:
                </span>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lending</span>
                    <span className="font-medium">
                      {strategy.allocations.lending}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Liquidity</span>
                    <span className="font-medium">
                      {strategy.allocations.liquidity}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Preferences:
                </span>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Stablecoins Only:</span>
                    <span className="font-medium">
                      {strategy.preferences.stablecoinsOnly ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {strategy.preferences.minimumAPY && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Minimum APY:</span>
                      <span className="font-medium">
                        {strategy.preferences.minimumAPY}%
                      </span>
                    </div>
                  )}
                  {strategy.preferences.preferredAssets.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Preferred Assets:</span>
                      <span className="font-medium">
                        {strategy.preferences.preferredAssets.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
