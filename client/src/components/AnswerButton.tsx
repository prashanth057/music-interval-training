import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnswerButtonProps {
  answer: string;
  shortcut: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function AnswerButton({
  answer,
  shortcut,
  isSelected = false,
  isCorrect = false,
  showResult = false,
  disabled = false,
  onClick
}: AnswerButtonProps) {
  const getVariant = () => {
    if (!showResult) return 'outline';
    if (isCorrect) return 'default';
    if (isSelected && !isCorrect) return 'destructive';
    return 'outline';
  };

  return (
    <Button
      variant={getVariant()}
      size="lg"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'h-auto min-h-16 w-full justify-between px-5 py-4 text-lg font-medium transition-all duration-200',
        showResult && isCorrect && 'bg-success text-success-foreground border-success',
        showResult && isSelected && !isCorrect && 'bg-error text-error-foreground border-error'
      )}
      data-testid={`button-answer-${shortcut}`}
    >
      <span className="font-mono text-sm opacity-50">{shortcut}</span>
      <span className="flex-1 text-center font-mono">{answer}</span>
      {showResult && isCorrect && <Check className="h-5 w-5" />}
      {showResult && isSelected && !isCorrect && <X className="h-5 w-5" />}
      {!showResult && <span className="w-5" />}
    </Button>
  );
}
