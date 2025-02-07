import { Button } from '@/components/ui/button';
import type { SuggestedAnswer } from '@/lib/types/suggested-answer';

interface SuggestedAnswersProps {
  answers: SuggestedAnswer[];
  onSelect: (answer: SuggestedAnswer) => void;
}

export function SuggestedAnswers({ answers, onSelect }: SuggestedAnswersProps) {
  return (
    <div className="absolute bottom-full left-0 w-full p-4 space-y-2 bg-gradient-to-t from-background to-transparent">
      <div className="text-sm text-muted-foreground mb-2">
        Suggested responses:
      </div>
      <div className="flex flex-wrap gap-2">
        {answers.map((answer) => (
          <Button
            key={answer.text}
            variant="secondary"
            className="text-sm"
            onClick={() => onSelect(answer)}
          >
            {answer.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
