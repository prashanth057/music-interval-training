import { AnswerButton } from '../AnswerButton';

export default function AnswerButtonExample() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <AnswerButton 
        answer="Major" 
        shortcut="1" 
        onClick={() => console.log('Major clicked')} 
      />
      <AnswerButton 
        answer="minor" 
        shortcut="2" 
        isSelected={true}
        isCorrect={true}
        showResult={true}
        onClick={() => console.log('minor clicked')} 
      />
      <AnswerButton 
        answer="diminished" 
        shortcut="3" 
        isSelected={true}
        isCorrect={false}
        showResult={true}
        onClick={() => console.log('diminished clicked')} 
      />
    </div>
  );
}
