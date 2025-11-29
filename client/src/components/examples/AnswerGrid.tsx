import { AnswerGrid } from '../AnswerGrid';

export default function AnswerGridExample() {
  return (
    <AnswerGrid
      options={['Major', 'minor', 'diminished', 'augmented']}
      selectedAnswer={null}
      correctAnswer="minor"
      showResult={false}
      disabled={false}
      onSelect={(answer) => console.log('Selected:', answer)}
    />
  );
}
