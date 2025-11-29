import { AnswerButton } from './AnswerButton';

interface AnswerGridProps {
  options: string[];
  selectedAnswer: string | null;
  correctAnswer: string;
  showResult: boolean;
  disabled: boolean;
  onSelect: (answer: string) => void;
}

const SHORTCUTS = ['1', '2', '3', '4'];

export function AnswerGrid({
  options,
  selectedAnswer,
  correctAnswer,
  showResult,
  disabled,
  onSelect
}: AnswerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-testid="answer-grid">
      {options.map((option, index) => (
        <AnswerButton
          key={option}
          answer={option}
          shortcut={SHORTCUTS[index]}
          isSelected={selectedAnswer === option}
          isCorrect={option === correctAnswer}
          showResult={showResult}
          disabled={disabled}
          onClick={() => onSelect(option)}
        />
      ))}
    </div>
  );
}
