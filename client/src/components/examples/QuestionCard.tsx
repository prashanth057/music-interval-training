import { QuestionCard } from '../QuestionCard';
import type { QuizQuestion } from '@/lib/musicTheory';

export default function QuestionCardExample() {
  const mockQuestion: QuizQuestion = {
    id: '1',
    rootNote: 'C',
    interval: { name: '♭3', semitones: 3, displayName: '♭3 (minor 3rd)' },
    correctAnswer: 'Eb',
    options: ['Eb', 'E', 'D', 'F']
  };

  return <QuestionCard question={mockQuestion} />;
}
