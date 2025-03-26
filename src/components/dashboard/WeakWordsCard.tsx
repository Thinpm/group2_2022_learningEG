
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

interface WeakWord {
  id: string;
  english: string;
  vietnamese: string;
  count: number;
}

interface WeakWordsCardProps {
  words: WeakWord[];
}

export function WeakWordsCard({ words }: WeakWordsCardProps) {
  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>Từ cần ôn tập</CardTitle>
      </CardHeader>
      <CardContent>
        {words.length > 0 ? (
          <div className="space-y-4">
            {words.map((word) => (
              <div key={word.id} className="flex items-center justify-between p-3 rounded-lg neumorphism">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{word.english}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-1 h-8 w-8"
                      onClick={() => speakWord(word.english)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{word.vietnamese}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 py-1 px-2 rounded-full">
                    {word.count}x sai
                  </div>
                </div>
              </div>
            ))}
            
            <Button className="w-full">Ôn tập ngay</Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Bạn chưa có từ nào cần ôn tập.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
