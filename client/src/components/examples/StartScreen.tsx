import { StartScreen } from '../StartScreen';

export default function StartScreenExample() {
  return <StartScreen onStart={() => console.log('Quiz started!')} />;
}
