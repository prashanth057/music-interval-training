import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScoreDisplay } from './ScoreDisplay';
import { QuestionCard } from './QuestionCard';
import { AnswerGrid } from './AnswerGrid';
import { KeyboardHints } from './KeyboardHints';
import { FeedbackOverlay } from './FeedbackOverlay';
import { ThemeToggle } from './ThemeToggle';
import { Timer } from './Timer';
import { PointsPopup } from './PointsPopup';
import { generateQuestion, type QuizQuestion } from '@/lib/musicTheory';
import { RotateCcw } from 'lucide-react';

interface QuizScreenProps {
  onReset: () => void;
}

function calculatePoints(timeInSeconds: number, isCorrect: boolean): number {
  if (!isCorrect) return 0;
  if (timeInSeconds < 2) return 10;
  if (timeInSeconds < 4) return 8;
  if (timeInSeconds < 5) return 6;
  return 0;
}

export function QuizScreen({ onReset }: QuizScreenProps) {
  const [question, setQuestion] = useState<QuizQuestion>(generateQuestion);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [points, setPoints] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [showPointsPopup, setShowPointsPopup] = useState(false);
  const currentTimeRef = useRef(0);

  const handleTimeUpdate = useCallback((time: number) => {
    currentTimeRef.current = time;
  }, []);

  const handleAnswer = useCallback((answer: string) => {
    if (showResult) return;
    
    setTimerRunning(false);
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === question.correctAnswer;
    const earned = calculatePoints(currentTimeRef.current, isCorrect);
    
    setEarnedPoints(earned);
    setShowPointsPopup(true);
    setShowFeedback(true);
    setQuestionsAnswered(q => q + 1);
    
    if (isCorrect && earned > 0) {
      setPoints(p => p + earned);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    
    const feedbackDuration = isCorrect && earned > 0 ? 600 : 1400;
    
    setTimeout(() => {
      setShowFeedback(false);
      setShowPointsPopup(false);
      setTimeout(() => {
        setQuestion(generateQuestion());
        setSelectedAnswer(null);
        setShowResult(false);
        setTimerRunning(true);
        currentTimeRef.current = 0;
      }, 100);
    }, feedbackDuration);
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
    setPoints(0);
    setQuestionsAnswered(0);
    setStreak(0);
    setQuestion(generateQuestion());
    setSelectedAnswer(null);
    setShowResult(false);
    setTimerRunning(true);
    currentTimeRef.current = 0;
    onReset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" data-testid="quiz-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <ScoreDisplay points={points} streak={streak} questionsAnswered={questionsAnswered} />
        <div className="flex items-center gap-4">
          <Timer isRunning={timerRunning} onTimeUpdate={handleTimeUpdate} />
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

      <PointsPopup points={earnedPoints} visible={showPointsPopup} />

      <FeedbackOverlay
        isCorrect={selectedAnswer === question.correctAnswer && earnedPoints > 0}
        correctAnswer={question.correctAnswer}
        visible={showFeedback}
      />
    </div>
  );
}
