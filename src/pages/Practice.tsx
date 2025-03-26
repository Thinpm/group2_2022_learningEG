
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MultipleChoiceQuestion } from "@/components/vocabulary/MultipleChoiceQuestion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Medal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    id: "1",
    question: "What does 'ambitious' mean?",
    englishWord: "Ambitious",
    choices: [
      { id: "a", text: "Tham vọng" },
      { id: "b", text: "Thân thiện" },
      { id: "c", text: "Thông minh" },
      { id: "d", text: "Khiêm tốn" }
    ],
    correctChoiceId: "a"
  },
  {
    id: "2",
    question: "What does 'collaborate' mean?",
    englishWord: "Collaborate",
    choices: [
      { id: "a", text: "Xung đột" },
      { id: "b", text: "Cộng tác" },
      { id: "c", text: "Chỉ trích" },
      { id: "d", text: "Hoàn thành" }
    ],
    correctChoiceId: "b"
  },
  {
    id: "3",
    question: "What does 'diverse' mean?",
    englishWord: "Diverse",
    choices: [
      { id: "a", text: "Đơn giản" },
      { id: "b", text: "Khác biệt" },
      { id: "c", text: "Đa dạng" },
      { id: "d", text: "Khó khăn" }
    ],
    correctChoiceId: "c"
  }
];

const Practice = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    
    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsCompleted(true);
      }
    }, 1500);
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
  };
  
  const correctCount = answers.filter(answer => answer).length;
  const score = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20 px-6 md:px-12 min-h-screen hero-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <Button
              variant="ghost"
              className="hover:bg-transparent hover:text-primary"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            
            <h1 className="text-3xl font-bold">Trắc nghiệm</h1>
            
            <div className="w-10"></div> {/* For centering the title */}
          </div>
          
          {!isCompleted ? (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Câu hỏi {currentQuestionIndex + 1}/{questions.length}</span>
                  <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <MultipleChoiceQuestion
                key={questions[currentQuestionIndex].id}
                question={questions[currentQuestionIndex].question}
                choices={questions[currentQuestionIndex].choices}
                correctChoiceId={questions[currentQuestionIndex].correctChoiceId}
                englishWord={questions[currentQuestionIndex].englishWord}
                onAnswer={handleAnswer}
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto glassmorphism rounded-xl p-8 text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Medal className="h-10 w-10 text-primary" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-4">Kết quả</h2>
              <p className="text-3xl font-bold mb-2">{score}%</p>
              <p className="text-muted-foreground mb-4">
                Bạn đã trả lời đúng {correctCount}/{questions.length} câu hỏi
              </p>
              
              <div className="w-full bg-secondary/50 h-2 rounded-full mb-8">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${score}%` }}
                />
              </div>
              
              <div className="space-y-4">
                <Button className="w-full" onClick={handleRestart}>
                  Làm lại
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/topics/business")}
                >
                  Quay lại chủ đề
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Practice;
