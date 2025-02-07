import type { WalletAnalysis } from '@/lib/types/analysis';
import type { Message } from '@/lib/types/message';
import { AnalysisMessage } from '../agent-new/messages/analysis-message';
import { OpportunityMessage } from '../agent-new/messages/opportunity-message';
import { TypeWriter } from '../ui/type-writer';

interface MessageContentProps {
  message: Message;
}

export function MessageContent({ message }: MessageContentProps) {
  switch (message.type) {
    case 'opportunity':
      return (
        <OpportunityMessage opportunities={message.data as Opportunity[]} />
      );

    case 'analysis':
      return (
        <div className="space-y-3">
          <TypeWriter content={message.content} />
          <AnalysisMessage analysis={message.data as WalletAnalysis} />
        </div>
      );

    case 'error':
    case 'default':
    default:
      return message.role === 'agent' ? (
        <TypeWriter content={message.content} />
      ) : (
        <>{message.content}</>
      );
  }
}
