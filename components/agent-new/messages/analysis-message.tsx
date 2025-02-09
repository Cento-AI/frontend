import { TypeWriter } from '@/components/ui/type-writer';
import type { WalletAnalysis } from '@/lib/types/analysis';
import type { Message } from '@/lib/types/message';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import { useState } from 'react';
import { ErrorMessage } from './error-message';
import { OpportunityContainer } from './opportunity-container';

interface AnalysisMessageProps {
  message: Message<WalletAnalysis>;
  onComplete?: (suggestedAnswers?: SuggestedAnswer[]) => void;
}

export function AnalysisMessage({ message, onComplete }: AnalysisMessageProps) {
  const { data: analysis, suggestedAnswers } = message;
  const [showOpportunities, setShowOpportunities] = useState(false);

  if (!analysis) {
    return (
      <ErrorMessage
        message={{
          role: 'agent',
          content:
            'There was an error finding your opportunities, try again later',
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
          setShowOpportunities(true);
          onComplete?.(suggestedAnswers);
        }}
      />

      {showOpportunities && (
        <>
          {/* Yield Opportunities Section */}
          {analysis.yieldOpportunities.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Yield Opportunities</h3>
              <div className="space-y-3">
                {analysis.yieldOpportunities.map((opportunity, i) => (
                  <OpportunityContainer
                    key={`yield-${i}-${opportunity.providerName}`}
                    providerName={opportunity.providerName}
                    title={opportunity.tokenName}
                    apy={opportunity.apy}
                  />
                ))}
              </div>
            </div>
          )}

          {/* LP Opportunities Section */}
          {analysis.lpOpportunities.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">
                Liquidity Pool Opportunities
              </h3>
              <div className="space-y-3">
                {analysis.lpOpportunities.map((opportunity, i) => (
                  <OpportunityContainer
                    key={`lp-${i}-${opportunity.providerName}`}
                    providerName={opportunity.providerName}
                    title={`${opportunity.token0Name}-${opportunity.token1Name}`}
                    apy={opportunity.apy}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Opportunities Message */}
          {analysis.yieldOpportunities.length === 0 &&
            analysis.lpOpportunities.length === 0 && (
              <div className="text-muted-foreground text-center py-4">
                No opportunities found at this time.
              </div>
            )}
        </>
      )}
    </div>
  );
}
