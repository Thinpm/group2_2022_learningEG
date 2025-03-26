
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Clock, Medal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Define proper types for our quiz questions
type MultipleChoiceQuestion = {
  id: string;
  question: string;
  choices: {
    id: string;
    text: string;
  }[];
  correctChoiceId: string;
};

type FillInBlankQuestion = {
  id: string;
  question: string;
  answer: string;
  hint?: string;
};

type Question = MultipleChoiceQuestion | FillInBlankQuestion;

type QuizData = {
  title: string;
  questions: Question[];
};

// Helper function to determine question type
const isFillInBlankQuestion = (question: Question): question is FillInBlankQuestion => {
  return 'answer' in question;
};

// Mock quiz data
const getQuizData = (topicId: string, quizType: string): QuizData => {
  // This would be fetched from an API in a real app
  const quizzes = {
    "business": {
      "multiple-choice": {
        title: "Trắc nghiệm kiến thức Business English",
        questions: [
          {
            id: "1",
            question: "What does 'Ambitious' mean?",
            choices: [
              { id: "a", text: "Tham vọng" },
              { id: "b", text: "Thất vọng" },
              { id: "c", text: "Nỗ lực" },
              { id: "d", text: "Đáng tin cậy" }
            ],
            correctChoiceId: "a"
          },
          {
            id: "2",
            question: "What does 'Collaborate' mean?",
            choices: [
              { id: "a", text: "Cạnh tranh" },
              { id: "b", text: "Cộng tác" },
              { id: "c", text: "Chỉ trích" },
              { id: "d", text: "Tư vấn" }
            ],
            correctChoiceId: "b"
          },
          {
            id: "3",
            question: "What does 'Innovate' mean?",
            choices: [
              { id: "a", text: "Bảo tồn" },
              { id: "b", text: "Duy trì" },
              { id: "c", text: "Đổi mới" },
              { id: "d", text: "Cải tiến" }
            ],
            correctChoiceId: "c"
          },
          {
            id: "4",
            question: "What does 'Revenue' mean?",
            choices: [
              { id: "a", text: "Chi phí" },
              { id: "b", text: "Lợi nhuận" },
              { id: "c", text: "Thuế" },
              { id: "d", text: "Doanh thu" }
            ],
            correctChoiceId: "d"
          },
          {
            id: "5",
            question: "What does 'Negotiate' mean?",
            choices: [
              { id: "a", text: "Đàm phán" },
              { id: "b", text: "Từ chối" },
              { id: "c", text: "Chấp nhận" },
              { id: "d", text: "Thảo luận" }
            ],
            correctChoiceId: "a"
          }
        ]
      },
      "fill-in-blanks": {
        title: "Điền từ vựng Business English",
        questions: [
          {
            id: "1",
            question: "The company is looking for _____ employees who want to advance their careers.",
            answer: "ambitious",
            hint: "Meaning: Having a strong desire to succeed"
          },
          {
            id: "2",
            question: "Our team needs to _____ with the marketing department on this project.",
            answer: "collaborate",
            hint: "Meaning: Work together"
          },
          {
            id: "3",
            question: "The CEO wants to _____ our product line to stay competitive in the market.",
            answer: "diversify",
            hint: "Meaning: To make more varied"
          },
          {
            id: "4",
            question: "We need to _____ our sales strategy to reach more customers.",
            answer: "enhance",
            hint: "Meaning: To improve or increase in quality"
          },
          {
            id: "5",
            question: "The new project is expected to _____ significant revenue for the company.",
            answer: "generate",
            hint: "Meaning: To produce or create"
          }
        ]
      }
    },
    "technology": {
      "multiple-choice": {
        title: "Trắc nghiệm kiến thức Technology & IT",
        questions: [
          {
            id: "1",
            question: "What does 'Algorithm' mean?",
            choices: [
              { id: "a", text: "Thuật toán" },
              { id: "b", text: "Công thức" },
              { id: "c", text: "Phương pháp" },
              { id: "d", text: "Quy trình" }
            ],
            correctChoiceId: "a"
          },
          {
            id: "2",
            question: "What does 'Database' mean?",
            choices: [
              { id: "a", text: "Máy chủ" },
              { id: "b", text: "Cơ sở dữ liệu" },
              { id: "c", text: "Hệ thống" },
              { id: "d", text: "Ổ cứng" }
            ],
            correctChoiceId: "b"
          },
          {
            id: "3",
            question: "What does 'Interface' mean?",
            choices: [
              { id: "a", text: "Thiết kế" },
              { id: "b", text: "Hiệu suất" },
              { id: "c", text: "Giao diện" },
              { id: "d", text: "Liên kết" }
            ],
            correctChoiceId: "c"
          }
        ]
      }
    },
    "travel": {
      "multiple-choice": {
        title: "Trắc nghiệm kiến thức Travel & Tourism",
        questions: [
          {
            id: "1",
            question: "What does 'Accommodation' mean?",
            choices: [
              { id: "a", text: "Chỗ ở" },
              { id: "b", text: "Phương tiện" },
              { id: "c", text: "Lịch trình" },
              { id: "d", text: "Hành lý" }
            ],
            correctChoiceId: "a"
          },
          {
            id: "2",
            question: "What does 'Itinerary' mean?",
            choices: [
              { id: "a", text: "Hộ chiếu" },
              { id: "b", text: "Lịch trình" },
              { id: "c", text: "Điểm đến" },
              { id: "d", text: "Vé máy bay" }
            ],
            correctChoiceId: "b"
          },
          {
            id: "3",
            question: "What does 'Landmark' mean?",
            choices: [
              { id: "a", text: "Bản đồ" },
              { id: "b", text: "Biển báo" },
              { id: "c", text: "Địa danh" },
              { id: "d", text: "Biên giới" }
            ],
            correctChoiceId: "c"
          }
        ]
      }
    }
  };

  const topicQuizzes = quizzes[topicId as keyof typeof quizzes] || quizzes.business;
  return topicQuizzes[quizType as keyof typeof topicQuizzes] || topicQuizzes["multiple-choice"];
};

const Quiz = () => {
  const { topicId, quizType = "multiple-choice" } = useParams<{ topicId: string; quizType: string }>();
  const navigate = useNavigate();
  const quiz = getQuizData(topicId || "business", quizType || "multiple-choice");
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(quiz.questions.length).fill(null));
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [userInput, setUserInput] = useState(""); // For fill-in-blanks
  const [isCompleted, setIsCompleted] = useState(false);
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isMultipleChoice = quizType === "multiple-choice";
  
  // Timer effect
  useEffect(() => {
    if (showAnswer || isCompleted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (isMultipleChoice) {
            handleAnswer(null);
          } else {
            checkFillInBlankAnswer();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestionIndex, showAnswer, isCompleted]);
  
  // Reset timer when moving to next question
  useEffect(() => {
    setTimeLeft(30);
    setShowAnswer(false);
    setSelectedChoiceId(null);
    setUserInput("");
  }, [currentQuestionIndex]);
  
  const handleAnswer = (choiceId: string | null) => {
    if (!isMultipleChoice) return;
    const mcQuestion = currentQuestion as MultipleChoiceQuestion;
    
    let isCorrect = false;
    
    if (choiceId === mcQuestion.correctChoiceId) {
      isCorrect = true;
      toast.success("Chính xác!");
    } else {
      toast.error("Không chính xác!");
    }
    
    setSelectedChoiceId(choiceId);
    setShowAnswer(true);
    
    // Update answers
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = isCorrect;
    setAnswers(newAnswers);
    
    // Move to next question after delay
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setIsCompleted(true);
      }, 2000);
    }
  };
  
  const checkFillInBlankAnswer = () => {
    if (isMultipleChoice) return;
    const fbQuestion = currentQuestion as FillInBlankQuestion;
    
    const isCorrect = userInput.toLowerCase().trim() === fbQuestion.answer.toLowerCase();
    
    if (isCorrect) {
      toast.success("Chính xác!");
    } else {
      toast.error(`Không chính xác! Đáp án đúng: ${fbQuestion.answer}`);
    }
    
    setShowAnswer(true);
    
    // Update answers
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = isCorrect;
    setAnswers(newAnswers);
    
    // Move to next question after delay
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setIsCompleted(true);
      }, 2000);
    }
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers(Array(quiz.questions.length).fill(null));
    setShowAnswer(false);
    setSelectedChoiceId(null);
    setUserInput("");
    setTimeLeft(30);
    setIsCompleted(false);
  };
  
  const correctCount = answers.filter((answer) => answer === true).length;
  const score = Math.round((correctCount / quiz.questions.length) * 100);
  
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20 px-6 md:px-12 min-h-screen hero-gradient">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-transparent hover:text-primary"
            onClick={() => navigate(`/topics/${topicId}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại {topicId}
          </Button>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
            <p className="text-muted-foreground">Kiểm tra kiến thức của bạn với {quiz.questions.length} câu hỏi</p>
          </div>
          
          {!isCompleted ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Câu hỏi {currentQuestionIndex + 1}/{quiz.questions.length}</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {timeLeft} giây
                    </div>
                  </div>
                  <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="glassmorphism rounded-xl p-8 mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
                    
                    {isMultipleChoice ? (
                      // Multiple choice question
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(currentQuestion as MultipleChoiceQuestion).choices.map((choice) => (
                          <Button
                            key={choice.id}
                            variant="outline"
                            className={`justify-start h-auto py-4 px-6 text-left ${
                              showAnswer && choice.id === (currentQuestion as MultipleChoiceQuestion).correctChoiceId
                                ? "border-green-500 bg-green-500/10"
                                : showAnswer && choice.id === selectedChoiceId
                                ? "border-red-500 bg-red-500/10"
                                : selectedChoiceId === choice.id
                                ? "border-primary bg-primary/10"
                                : ""
                            }`}
                            disabled={showAnswer}
                            onClick={() => {
                              setSelectedChoiceId(choice.id);
                              handleAnswer(choice.id);
                            }}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                              showAnswer && choice.id === (currentQuestion as MultipleChoiceQuestion).correctChoiceId
                                ? "bg-green-500 text-white"
                                : showAnswer && choice.id === selectedChoiceId
                                ? "bg-red-500 text-white"
                                : "bg-primary/10 text-primary"
                            }`}>
                              {showAnswer && choice.id === (currentQuestion as MultipleChoiceQuestion).correctChoiceId ? (
                                <Check className="h-4 w-4" />
                              ) : showAnswer && choice.id === selectedChoiceId ? (
                                <X className="h-4 w-4" />
                              ) : (
                                choice.id.toUpperCase()
                              )}
                            </div>
                            <span>{choice.text}</span>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      // Fill in the blanks question
                      <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <input
                            type="text"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Nhập từ vựng vào đây..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            disabled={showAnswer}
                          />
                          {!showAnswer && (
                            <Button onClick={checkFillInBlankAnswer} disabled={userInput.trim() === ""}>
                              Kiểm tra
                            </Button>
                          )}
                        </div>
                        
                        {showAnswer && (
                          <div className={`p-4 rounded-md ${
                            answers[currentQuestionIndex] ? "bg-green-500/10 border border-green-500" : "bg-red-500/10 border border-red-500"
                          }`}>
                            <p className="flex items-center">
                              {answers[currentQuestionIndex] ? (
                                <Check className="h-5 w-5 mr-2 text-green-500" />
                              ) : (
                                <X className="h-5 w-5 mr-2 text-red-500" />
                              )}
                              Đáp án đúng: <span className="font-bold ml-2">{isFillInBlankQuestion(currentQuestion) && currentQuestion.answer}</span>
                            </p>
                          </div>
                        )}
                        
                        {isFillInBlankQuestion(currentQuestion) && currentQuestion.hint && !answers[currentQuestionIndex] && showAnswer && (
                          <div className="p-4 bg-blue-500/10 border border-blue-500 rounded-md">
                            <p className="text-sm">{currentQuestion.hint}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/topics/${topicId}`)}
                >
                  Thoát
                </Button>
                
                {showAnswer && (
                  <Button onClick={handleNext}>
                    {isLastQuestion ? "Xem kết quả" : "Câu tiếp theo"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </>
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
                Bạn đã trả lời đúng {correctCount}/{quiz.questions.length} câu hỏi
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
                  onClick={() => navigate(`/topics/${topicId}`)}
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

export default Quiz;
