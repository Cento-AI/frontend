import { TypeWriter } from '@/components/ui/type-writer';
import type { Message } from '@/lib/types/message';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';

interface ErrorMessageProps {
  message: Message<unknown>;
  onComplete?: (suggestedAnswers?: SuggestedAnswer[]) => void;
}

export function ErrorMessage({ message, onComplete }: ErrorMessageProps) {
  return (
    <div className="text-red-500">
      <TypeWriter message={message} onComplete={onComplete} />
    </div>
  );
}
