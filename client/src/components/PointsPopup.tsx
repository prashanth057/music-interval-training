import { cn } from '@/lib/utils';

interface PointsPopupProps {
  points: number;
  visible: boolean;
}

export function PointsPopup({ points, visible }: PointsPopupProps) {
  if (!visible) return null;

  const getColor = () => {
    if (points === 10) return 'text-success';
    if (points === 8) return 'text-primary';
    if (points === 6) return 'text-orange-500';
    return 'text-error';
  };

  const getMessage = () => {
    if (points === 10) return 'Perfect!';
    if (points === 8) return 'Great!';
    if (points === 6) return 'Good';
    return 'Too slow';
  };

  return (
    <div 
      className={cn(
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40',
        'text-center animate-in fade-in zoom-in duration-200',
        getColor()
      )}
      data-testid="points-popup"
    >
      <div className="text-6xl font-bold mb-1">+{points}</div>
      <div className="text-xl font-medium opacity-80">{getMessage()}</div>
    </div>
  );
}
