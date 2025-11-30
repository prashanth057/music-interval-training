import { Flame, Trophy, Zap } from 'lucide-react';

interface ScoreDisplayProps {
  points: number;
  streak: number;
  questionsAnswered: number;
}

export function ScoreDisplay({ points, streak, questionsAnswered }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-6" data-testid="score-display">
      <div className="flex items-center gap-2">
        <Trophy className="h-4 w-4 text-primary" />
        <span className="font-semibold" data-testid="text-points">{points} pts</span>
      </div>
      
      {questionsAnswered > 0 && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Zap className="h-4 w-4" />
          <span className="text-sm" data-testid="text-questions">{questionsAnswered} Q</span>
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
