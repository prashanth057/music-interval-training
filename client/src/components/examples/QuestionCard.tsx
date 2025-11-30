import { QuestionCard } from '../QuestionCard';
import type { QuizQuestion } from '@/lib/musicTheory';

export default function QuestionCardExample() {
  const mockQuestion: QuizQuestion = {
    id: '1',
    rootNote: 'C',
    interval: { name: '♭III', semitones: 3, displayName: '♭III (minor 3rd)', isExtended: false },
    correctAnswer: 'Eb',
    options: ['Eb', 'E', 'D', 'F']
  };

  return <QuestionCard question={mockQuestion} />;
}
