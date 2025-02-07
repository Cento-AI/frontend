import type { Opportunity } from '../../lib/types/analysis';
import type { Message } from '../../lib/types/message';
import { OpportunityMessage } from '../agent-new/messages/opportunity-message';

interface MessageContentProps {
  message: Message;
}

export function MessageContent({ message }: MessageContentProps) {
  // Handle different message types
  switch (message.type) {
    case 'opportunity':
      return (
        <OpportunityMessage opportunities={message.data as Opportunity[]} />
      );

    case 'error':
      return (
        <div className="p-4 text-red-500 bg-red-50 rounded-lg">
          {message.content}
        </div>
      );

    case 'analysis':
      // You can create and return an analysis component here
      return null;

    case 'default':
    default:
      return (
        <div className="prose dark:prose-invert max-w-none">
          {message.content}
        </div>
      );
  }
}
