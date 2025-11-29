import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackOverlayProps {
  isCorrect: boolean;
  correctAnswer: string;
  visible: boolean;
}

export function FeedbackOverlay({ isCorrect, correctAnswer, visible }: FeedbackOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300',
        isCorrect ? 'bg-success/20' : 'bg-error/20'
      )}
      data-testid="feedback-overlay"
    >
      <div className="text-center">
        <div
          className={cn(
            'w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4',
            isCorrect ? 'bg-success' : 'bg-error'
          )}
        >
          {isCorrect ? (
            <Check className="h-12 w-12 text-success-foreground" />
          ) : (
            <X className="h-12 w-12 text-error-foreground" />
          )}
        </div>
        {!isCorrect && (
          <p className="text-lg font-medium text-foreground">
            Correct answer:{' '}
            <span className="font-mono text-primary">{correctAnswer}</span>
          </p>
        )}
      </div>
    </div>
  );
}
