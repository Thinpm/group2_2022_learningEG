
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X, Volume2 } from "lucide-react";

interface Choice {
  id: string;
  text: string;
}

interface MultipleChoiceQuestionProps {
  question: string;
  choices: Choice[];
  correctChoiceId: string;
  englishWord: string;
  onAnswer: (isCorrect: boolean) => void;
}

export function MultipleChoiceQuestion({
  question,
  choices,
  correctChoiceId,
  englishWord,
  onAnswer
}: MultipleChoiceQuestionProps) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleChoiceSelect = (choiceId: string) => {
    if (!hasSubmitted) {
      setSelectedChoiceId(choiceId);
    }
  };

  const handleSubmit = () => {
    if (selectedChoiceId && !hasSubmitted) {
      const correct = selectedChoiceId === correctChoiceId;
      setIsCorrect(correct);
      setHasSubmitted(true);
      onAnswer(correct);
    }
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(englishWord);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glassmorphism rounded-xl p-8">
      <div className="flex justify-between items-start mb-8">
        <h3 className="text-2xl font-bold">{question}</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={speakWord}
          className="rounded-full"
        >
          <Volume2 className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="space-y-4 mb-8">
        {choices.map((choice) => (
          <motion.div 
            key={choice.id}
            whileHover={!hasSubmitted ? { scale: 1.02 } : {}}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
              !hasSubmitted
                ? selectedChoiceId === choice.id
                  ? "neumorphism border-2 border-primary"
                  : "neumorphism"
                : selectedChoiceId === choice.id
                ? choice.id === correctChoiceId
                  ? "neumorphism border-2 border-green-500 bg-green-50/10"
                  : "neumorphism border-2 border-red-500 bg-red-50/10"
                : choice.id === correctChoiceId
                ? "neumorphism border-2 border-green-500 bg-green-50/10"
                : "neumorphism"
            }`}
            onClick={() => handleChoiceSelect(choice.id)}
          >
            <div className="flex justify-between items-center">
              <span>{choice.text}</span>
              {hasSubmitted && (
                <div>
                  {choice.id === correctChoiceId ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : selectedChoiceId === choice.id ? (
                    <X className="h-5 w-5 text-red-500" />
                  ) : null}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {hasSubmitted ? (
        <div className={`p-4 rounded-lg mb-6 ${
          isCorrect ? "bg-green-100/20 border border-green-500/20" : "bg-red-100/20 border border-red-500/20"
        }`}>
          <p className={`font-medium ${isCorrect ? "text-green-600" : "text-red-600"}`}>
            {isCorrect 
              ? "Chính xác! Tuyệt vời!" 
              : "Chưa chính xác. Hãy cố gắng lần sau!"}
          </p>
        </div>
      ) : null}
      
      <Button 
        className="w-full rounded-lg hover-lift"
        onClick={handleSubmit}
        disabled={!selectedChoiceId || hasSubmitted}
      >
        {hasSubmitted ? "Đã trả lời" : "Kiểm tra"}
      </Button>
    </div>
  );
}
