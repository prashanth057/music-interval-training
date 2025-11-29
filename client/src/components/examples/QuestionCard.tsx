import { QuestionCard } from '../QuestionCard';
import type { QuizQuestion } from '@/lib/musicTheory';

export default function QuestionCardExample() {
  const mockQuestion: QuizQuestion = {
    id: '1',
    rootNote: 'D',
    scaleType: 'major',
    degree: 3,
    questionType: 'chord_type',
    correctAnswer: 'minor',
    options: ['Major', 'minor', 'diminished', 'augmented']
  };

  return <QuestionCard question={mockQuestion} />;
}
