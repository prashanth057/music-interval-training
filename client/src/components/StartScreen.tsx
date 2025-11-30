import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Zap, Brain } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-lg" data-testid="start-screen">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Music className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Scale Master</CardTitle>
          <CardDescription className="text-base mt-2">
            Master jazz intervals across all 12 keys
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Zap className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">All 12 root notes</p>
                <p className="text-xs text-muted-foreground">
                  Practice intervals from any starting note
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Brain className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Jazz interval notation</p>
                <p className="text-xs text-muted-foreground">
                  b3, #11, b9, 13 and more
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full h-12 text-lg"
            onClick={onStart}
            data-testid="button-start-quiz"
          >
            Start Training
          </Button>
          
          <p className="text-center text-xs text-muted-foreground">
            Use keyboard shortcuts 1-4 for quick answers
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
