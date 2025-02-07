import { TypeWriter } from '@/components/ui/type-writer';
import type { WalletAnalysis } from '@/lib/types/analysis';
import type { Message } from '@/lib/types/message';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import { AnalysisMessage } from './analysis-message';

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
          <AnalysisMessage message={message as Message<WalletAnalysis>} />
        </div>
      );

    case 'error':
    case 'default':
    default:
      return message.role === 'agent' ? (
        <TypeWriter message={message} onComplete={onComplete} />
      ) : (
        <>{message.content}</>
      );
  }
}
