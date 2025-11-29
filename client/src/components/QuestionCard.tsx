import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { QuizQuestion } from '@/lib/musicTheory';
import { formatDegreeSuffix } from '@/lib/musicTheory';

interface QuestionCardProps {
  question: QuizQuestion;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { rootNote, scaleType, degree, questionType } = question;
  const degreeSuffix = formatDegreeSuffix(degree);

  return (
    <Card className="border-none bg-transparent shadow-none" data-testid="question-card">
      <CardContent className="p-0 text-center">
        <div className="flex justify-center gap-2 mb-6">
          <Badge variant="secondary" className="font-mono text-sm px-3 py-1" data-testid="badge-root-note">
            {rootNote}
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1" data-testid="badge-scale-type">
            {scaleType}
          </Badge>
        </div>
        
        <h2 className="text-2xl font-semibold mb-2" data-testid="text-question">
          {questionType === 'chord_type' ? (
            <>
              What type of chord is built on the{' '}
              <span className="text-primary font-mono">{degreeSuffix}</span>{' '}
              degree?
            </>
          ) : (
            <>
              What note is the{' '}
              <span className="text-primary font-mono">{degreeSuffix}</span>{' '}
              degree of the scale?
            </>
          )}
        </h2>
        
        <p className="text-muted-foreground text-sm">
          {rootNote} {scaleType} scale
        </p>
      </CardContent>
    </Card>
  );
}
