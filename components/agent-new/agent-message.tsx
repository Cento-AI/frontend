import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Message } from '@/lib/types/message';
import { cn } from '@/lib/utils';
import { MessageContent } from '../messages/message-content';

interface AgentMessageProps {
  message: Message;
}

export function AgentMessage({ message }: AgentMessageProps) {
  return (
    <div
      className={cn(
        'flex gap-3 text-sm',
        message.role === 'agent' ? 'flex-row' : 'flex-row-reverse',
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={message.role === 'agent' ? '/agent-avatar.png' : undefined}
          alt={message.role}
        />
        <AvatarFallback>
          {message.role === 'agent' ? 'AI' : 'You'}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%]',
          message.role === 'agent'
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-primary text-primary-foreground',
          message.type === 'error' ? 'bg-red-50 text-red-500' : undefined,
        )}
      >
        <MessageContent message={message} />
      </div>
    </div>
  );
}
