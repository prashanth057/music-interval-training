import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { QuizQuestion } from '@/lib/musicTheory';

interface QuestionCardProps {
  question: QuizQuestion;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { rootNote, interval } = question;

  return (
    <Card className="border-none bg-transparent shadow-none" data-testid="question-card">
      <CardContent className="p-0 text-center">
        <div className="flex justify-center gap-2 mb-6">
          <Badge variant="secondary" className="font-mono text-sm px-3 py-1" data-testid="badge-root-note">
            {rootNote} Major
          </Badge>
        </div>
        
        <h2 className="text-2xl font-semibold mb-2" data-testid="text-question">
          What is the{' '}
          <span className="text-primary font-mono">{interval.name}</span>{' '}
          of {rootNote}?
        </h2>
        
        <p className="text-muted-foreground text-sm">
          {interval.displayName}
        </p>
      </CardContent>
    </Card>
  );
}
