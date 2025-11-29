import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScoreDisplay } from './ScoreDisplay';
import { QuestionCard } from './QuestionCard';
import { AnswerGrid } from './AnswerGrid';
import { KeyboardHints } from './KeyboardHints';
import { FeedbackOverlay } from './FeedbackOverlay';
import { ThemeToggle } from './ThemeToggle';
import { generateQuestion, type QuizQuestion } from '@/lib/musicTheory';
import { RotateCcw } from 'lucide-react';

interface QuizScreenProps {
  onReset: () => void;
}

export function QuizScreen({ onReset }: QuizScreenProps) {
  const [question, setQuestion] = useState<QuizQuestion>(generateQuestion);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleAnswer = useCallback((answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === question.correctAnswer;
    setShowFeedback(true);
    
    if (isCorrect) {
      setCorrect(c => c + 1);
      setStreak(s => s + 1);
    } else {
      setIncorrect(i => i + 1);
      setStreak(0);
    }
    
    setTimeout(() => {
      setShowFeedback(false);
      setTimeout(() => {
        setQuestion(generateQuestion());
        setSelectedAnswer(null);
        setShowResult(false);
      }, 100);
    }, isCorrect ? 400 : 1200);
  }, [showResult, question.correctAnswer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResult) return;
      
      const keyIndex = ['1', '2', '3', '4'].indexOf(e.key);
      if (keyIndex !== -1 && keyIndex < question.options.length) {
        handleAnswer(question.options[keyIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAnswer, question.options, showResult]);

  const handleReset = () => {
    setCorrect(0);
    setIncorrect(0);
    setStreak(0);
    setQuestion(generateQuestion());
    setSelectedAnswer(null);
    setShowResult(false);
    onReset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" data-testid="quiz-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <ScoreDisplay correct={correct} incorrect={incorrect} streak={streak} />
        <div className="flex items-center gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleReset}
            data-testid="button-reset"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-none bg-transparent shadow-none">
          <CardContent className="p-6 sm:p-8 space-y-8">
            <QuestionCard question={question} />
            
            <AnswerGrid
              options={question.options}
              selectedAnswer={selectedAnswer}
              correctAnswer={question.correctAnswer}
              showResult={showResult}
              disabled={showResult}
              onSelect={handleAnswer}
            />
            
            <KeyboardHints />
          </CardContent>
        </Card>
      </main>

      <FeedbackOverlay
        isCorrect={selectedAnswer === question.correctAnswer}
        correctAnswer={question.correctAnswer}
        visible={showFeedback}
      />
    </div>
  );
}
