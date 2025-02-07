import type { WalletAnalysis } from '@/lib/types/analysis';
import { OpportunityContainer } from './opportunity-container';

interface AnalysisMessageProps {
  analysis: WalletAnalysis;
}

export function AnalysisMessage({ analysis }: AnalysisMessageProps) {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
