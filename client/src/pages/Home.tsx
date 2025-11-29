import { useState } from 'react';
import { StartScreen } from '@/components/StartScreen';
import { QuizScreen } from '@/components/QuizScreen';

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false);

  if (!quizStarted) {
    return <StartScreen onStart={() => setQuizStarted(true)} />;
  }

  return <QuizScreen onReset={() => setQuizStarted(false)} />;
}
