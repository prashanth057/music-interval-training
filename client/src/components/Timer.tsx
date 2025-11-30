import { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate: (time: number) => void;
}

export function Timer({ isRunning, onTimeUpdate }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const frameRef = useRef<number>();

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      setElapsed(0);
      
      const updateTimer = () => {
        const now = Date.now();
        const newElapsed = (now - startTimeRef.current) / 1000;
        setElapsed(newElapsed);
        onTimeUpdate(newElapsed);
        frameRef.current = requestAnimationFrame(updateTimer);
      };
      
      frameRef.current = requestAnimationFrame(updateTimer);
      
      return () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    }
  }, [isRunning, onTimeUpdate]);

  const getTimerColor = () => {
    if (elapsed < 2) return 'text-success';
    if (elapsed < 4) return 'text-primary';
    if (elapsed < 5) return 'text-orange-500';
    return 'text-error';
  };

  const displayTime = Math.min(elapsed, 99.9).toFixed(1);

  return (
    <div 
      className={cn('flex items-center gap-2 font-mono text-lg tabular-nums', getTimerColor())}
      data-testid="timer"
    >
      <Clock className="h-4 w-4" />
      <span data-testid="text-timer">{displayTime}s</span>
    </div>
  );
}
