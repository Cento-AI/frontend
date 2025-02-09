import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Message } from '@/lib/types/message';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';
import { cn } from '@/lib/utils';
import { Avatar as OnchainAvatar } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import { MessageContent } from './messages/message-content';

interface AgentMessageProps<T> {
  message: Message<T>;
  onComplete?: (suggestedAnswers?: SuggestedAnswer[]) => void;
}

export function AgentMessage<T>({ message, onComplete }: AgentMessageProps<T>) {
  const { address } = useAccount();

  return (
    <div
      className={cn(
        'flex gap-3 text-sm',
        message.role === 'agent' ? 'flex-row' : 'flex-row-reverse',
      )}
    >
      {message.role === 'agent' ? (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/agent-avatar.png" alt="agent" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      ) : (
        <div className="h-8 w-8">
          <OnchainAvatar address={address} />
        </div>
      )}
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%]',
          message.role === 'agent'
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-primary text-primary-foreground',
          message.type === 'error' ? 'bg-red-50 text-red-500' : undefined,
        )}
      >
        <MessageContent message={message} onComplete={onComplete} />
      </div>
    </div>
  );
}
