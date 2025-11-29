import { QuizScreen } from '../QuizScreen';

export default function QuizScreenExample() {
  return <QuizScreen onReset={() => console.log('Quiz reset!')} />;
}
