'use client';
import { TypeWriter } from '@/components/ui/type-writer';
import { RebalanceDetails } from '@/components/vault/rebalance-details';
import type { Message } from '@/lib/types/message';
import type { PortfolioRebalance } from '@/lib/types/portfolio-rebalance';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import { useState } from 'react';
import { ErrorMessage } from './error-message';

interface ImplementStrategyMessageProps {
  message: Message<PortfolioRebalance>;
  onComplete?: (suggestedAnswers?: SuggestedAnswer[]) => void;
}

export function ImplementStrategyMessage({
  message,
  onComplete,
}: ImplementStrategyMessageProps) {
  const [showRebalance, setShowRebalance] = useState(false);
  const { data: rebalance } = message;

  if (!rebalance) {
    return (
      <ErrorMessage
        message={{
          role: 'agent',
          content:
            'Failed to calculate rebalancing strategy. Please try again.',
          type: 'error',
        }}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="space-y-6">
      <TypeWriter message={message} />
      {showRebalance && <RebalanceDetails rebalance={rebalance} />}
      <TypeWriter
        message={{
          ...message,
          content: rebalance.explanation,
        }}
        onComplete={() => {
          setShowRebalance(true);
          onComplete?.([
            { text: 'Apply this strategy', action: 'apply' },
            { text: "I'll do it later", action: 'later' },
          ]);
        }}
      />
    </div>
  );
}
