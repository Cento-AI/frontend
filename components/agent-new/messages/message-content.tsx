import { TypeWriter } from '@/components/ui/type-writer';
import type { WalletAnalysis } from '@/lib/types/analysis';
import type { Message } from '@/lib/types/message';
import type { PortfolioRebalance } from '@/lib/types/portfolio-rebalance';
import type { PortfolioStrategy } from '@/lib/types/portfolio-strategy';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import type { UserVaultData } from '@/lib/types/vault';
import { AnalysisMessage } from './analysis-message';
import { ErrorMessage } from './error-message';
import { ImplementStrategyMessage } from './implement-strategy-message';
import { StrategyMessage } from './strategy-message';
import { VaultMessage } from './vault-message';

interface MessageContentProps {
  message: Message<unknown>;
  onComplete?: (suggestedAnswers?: SuggestedAnswer[]) => void;
}

export function MessageContent({ message, onComplete }: MessageContentProps) {
  switch (message.type) {
    case 'opportunity':
      return null;

    case 'analysis':
      return (
        <div className="space-y-3">
          <AnalysisMessage
            message={message as Message<WalletAnalysis>}
            onComplete={onComplete}
          />
        </div>
      );
    case 'get-strategy':
      return (
        <div className="space-y-3">
          <StrategyMessage
            message={message as Message<PortfolioStrategy>}
            onComplete={onComplete}
          />
        </div>
      );

    case 'error':
      return <ErrorMessage message={message} onComplete={onComplete} />;

    case 'default':
      return (
        <div className="space-y-4">
          {message.role === 'agent' ? (
            <TypeWriter message={message} onComplete={onComplete} />
          ) : (
            <span className="whitespace-pre-wrap">{message.content}</span>
          )}
        </div>
      );

    case 'vault':
      return (
        <div className="space-y-3">
          <VaultMessage
            message={message as Message<UserVaultData>}
            onComplete={onComplete}
          />
        </div>
      );

    case 'implement-strategy':
      return (
        <ImplementStrategyMessage
          message={message as Message<PortfolioRebalance>}
          onComplete={onComplete}
        />
      );
  }
}
