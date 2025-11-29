import { Keyboard } from 'lucide-react';

export function KeyboardHints() {
  return (
    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground" data-testid="keyboard-hints">
      <div className="flex items-center gap-1.5">
        <Keyboard className="h-3.5 w-3.5" />
        <span>Press</span>
      </div>
      <div className="flex gap-2">
        {['1', '2', '3', '4'].map((key) => (
          <kbd
            key={key}
            className="px-2 py-1 bg-muted rounded text-muted-foreground font-mono text-xs"
          >
            {key}
          </kbd>
        ))}
      </div>
      <span>to answer</span>
    </div>
  );
}
