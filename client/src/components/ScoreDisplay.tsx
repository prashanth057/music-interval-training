import { Flame, Target, CheckCircle, XCircle } from 'lucide-react';

interface ScoreDisplayProps {
  correct: number;
  incorrect: number;
  streak: number;
}

export function ScoreDisplay({ correct, incorrect, streak }: ScoreDisplayProps) {
  const total = correct + incorrect;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="flex items-center gap-6" data-testid="score-display">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-success" />
        <span className="font-semibold text-success" data-testid="text-correct-count">{correct}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <XCircle className="h-4 w-4 text-error" />
        <span className="font-semibold text-error" data-testid="text-incorrect-count">{incorrect}</span>
      </div>
      
      {total > 0 && (
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold" data-testid="text-percentage">{percentage}%</span>
        </div>
      )}
      
      {streak > 1 && (
        <div className="flex items-center gap-1.5 text-orange-500">
          <Flame className="h-4 w-4" />
          <span className="font-semibold" data-testid="text-streak">{streak}</span>
        </div>
      )}
    </div>
  );
}
