
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  ThumbsUp, 
  ThumbsDown,
  Bookmark,
  RotateCw
} from "lucide-react";

interface VocabularyWord {
  id: string;
  english: string;
  vietnamese: string;
  pronunciation: string;
  example: string;
  exampleTranslation: string;
  image?: string;
}

interface FlashCardProps {
  words: VocabularyWord[];
  onComplete: () => void;
}

export function FlashCard({ words, onComplete }: FlashCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [knownWords, setKnownWords] = useState<Set<string>>(new Set());
  const [bookmarkedWords, setBookmarkedWords] = useState<Set<string>>(new Set());

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 300);
    }
  };

  const goToNext = () => {
    if (currentIndex < words.length - 1) {
      setDirection(1);
      setFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    } else {
      onComplete();
    }
  };

  const flipCard = () => {
    setFlipped(!flipped);
  };

  const markAsKnown = () => {
    setKnownWords(prev => {
      const newSet = new Set(prev);
      newSet.add(currentWord.id);
      return newSet;
    });
    goToNext();
  };

  const markAsUnknown = () => {
    setKnownWords(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentWord.id);
      return newSet;
    });
    goToNext();
  };

  const toggleBookmark = () => {
    setBookmarkedWords(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentWord.id)) {
        newSet.delete(currentWord.id);
      } else {
        newSet.add(currentWord.id);
      }
      return newSet;
    });
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.english);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const cardVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: flipped ? 180 : 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      rotateY: flipped ? 180 : 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        rotateY: { duration: 0.5 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      rotateY: flipped ? 180 : 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        rotateY: { duration: 0.5 }
      }
    })
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === " ") {
        flipCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, flipped]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="rounded-full hover-lift"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {currentIndex + 1} / {words.length}
          </p>
          <div className="w-32 h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={goToNext}
          disabled={currentIndex === words.length - 1}
          className="rounded-full hover-lift"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="relative h-96 mb-8 perspective-1000">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute w-full h-full preserve-3d cursor-pointer"
            onClick={flipCard}
          >
            <div 
              className={`glassmorphism absolute w-full h-full rounded-xl p-8 flex flex-col justify-center items-center backface-hidden ${
                flipped ? "rotateY-180" : ""
              }`}
            >
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    speakWord();
                  }}
                  className="rounded-full"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark();
                  }}
                  className="rounded-full"
                >
                  <Bookmark 
                    className={`h-5 w-5 ${
                      bookmarkedWords.has(currentWord.id) 
                        ? "fill-primary text-primary" 
                        : ""
                    }`} 
                  />
                </Button>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-center">{currentWord.english}</h2>
              <p className="text-muted-foreground mb-6 text-center">{currentWord.pronunciation}</p>
              
              <div className="text-center max-w-md">
                <p className="italic text-lg mb-2">"{currentWord.example}"</p>
                <div className="flex justify-center">
                  <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">
                    Click để xem nghĩa
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              className={`glassmorphism absolute w-full h-full rounded-xl p-8 flex flex-col justify-center items-center backface-hidden rotateY-180 ${
                !flipped ? "rotateY-180" : ""
              }`}
            >
              <h2 className="text-3xl font-bold mb-4 text-center">{currentWord.vietnamese}</h2>
              <p className="italic text-lg mb-6 text-center">"{currentWord.exampleTranslation}"</p>
              
              <div className="flex justify-center">
                <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">
                  Click để xem từ tiếng Anh
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={flipCard}
            className="rounded-full"
          >
            <RotateCw className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button 
          variant="outline" 
          className="flex-1 hover-lift"
          onClick={markAsUnknown}
        >
          <ThumbsDown className="mr-2 h-5 w-5" />
          Chưa thuộc
        </Button>
        <Button 
          className="flex-1 hover-lift"
          onClick={markAsKnown}
        >
          <ThumbsUp className="mr-2 h-5 w-5" />
          Đã thuộc
        </Button>
      </div>
    </div>
  );
}
