
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkPlus, Play, ArrowRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VocabularyWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
  topic?: {
    id: string;
    name: string;
    color: string;
  };
}

interface VocabularyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: VocabularyWord | null;
}

export function VocabularyDetailModal({
  isOpen,
  onClose,
  word
}: VocabularyDetailModalProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  if (!word) return null;

  const handlePlayPronunciation = () => {
    setIsPlaying(true);
    // In a real implementation, this would play the audio
    const audio = new SpeechSynthesisUtterance(word.word);
    audio.lang = "en-US";
    speechSynthesis.speak(audio);
    
    // Reset playing state after audio finishes
    audio.onend = () => setIsPlaying(false);
    
    toast({
      title: "Phát âm",
      description: `Đang phát âm từ "${word.word}"`,
    });
  };

  const handleSaveWord = () => {
    setIsSaved(!isSaved);
    
    toast({
      title: isSaved ? "Đã xóa khỏi danh sách yêu thích" : "Đã lưu vào danh sách yêu thích",
      description: isSaved 
        ? `Từ "${word.word}" đã được xóa khỏi danh sách yêu thích` 
        : `Từ "${word.word}" đã được lưu vào danh sách yêu thích`,
    });
  };

  const handlePracticeWord = () => {
    toast({
      title: "Bắt đầu học tập",
      description: `Bắt đầu học từ "${word.word}"`,
    });
    onClose();
    // In a real implementation, this would navigate to the practice page
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-background/80 backdrop-blur-xl border border-border/30 shadow-lg">
        <DialogHeader className="p-6 pb-0 relative">
          <div className="absolute right-4 top-4">
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-background/80 h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <DialogTitle className="text-3xl font-bold text-foreground">{word?.word}</DialogTitle>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-muted-foreground font-medium">/{word?.pronunciation}/</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 rounded-full"
                    onClick={handlePlayPronunciation}
                    disabled={isPlaying}
                  >
                    <Play className="h-4 w-4" />
                    <span className="sr-only">Phát âm</span>
                  </Button>
                </div>
              </div>
              {word?.topic && (
                <Badge 
                  className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {word.topic.name}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 backdrop-blur-md">
            <h3 className="text-lg font-semibold mb-2">Nghĩa</h3>
            <p className="text-xl text-foreground">{word?.meaning}</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ví dụ</h3>
            <div className="space-y-2">
              <p className="text-md italic text-foreground">"{word?.example}"</p>
              <p className="text-sm text-muted-foreground">"{word?.exampleTranslation}"</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="px-6 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleSaveWord}
            >
              {isSaved ? (
                <>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Đã lưu
                </>
              ) : (
                <>
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Lưu từ này
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handlePlayPronunciation}
              disabled={isPlaying}
            >
              <Play className="mr-2 h-4 w-4" />
              Nghe phát âm
            </Button>
          </div>
          <Button 
            className="rounded-full"
            onClick={handlePracticeWord}
          >
            Học ngay
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
