
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FlashCard } from "@/components/vocabulary/FlashCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Medal, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const sampleVocabularyWords = [
  {
    id: "1",
    english: "Ambitious",
    vietnamese: "Tham vọng",
    pronunciation: "/æmˈbɪʃəs/",
    example: "She is very ambitious and wants to become a CEO.",
    exampleTranslation: "Cô ấy rất tham vọng và muốn trở thành CEO."
  },
  {
    id: "2",
    english: "Collaborate",
    vietnamese: "Cộng tác",
    pronunciation: "/kəˈlæbəreɪt/",
    example: "Our team will collaborate with the marketing department.",
    exampleTranslation: "Đội của chúng tôi sẽ cộng tác với phòng marketing."
  },
  {
    id: "3",
    english: "Diverse",
    vietnamese: "Đa dạng",
    pronunciation: "/daɪˈvɜːrs/",
    example: "The company has a diverse workforce from many countries.",
    exampleTranslation: "Công ty có lực lượng lao động đa dạng từ nhiều quốc gia."
  },
  {
    id: "4",
    english: "Enhance",
    vietnamese: "Nâng cao",
    pronunciation: "/ɪnˈhæns/",
    example: "The new features will enhance the user experience.",
    exampleTranslation: "Các tính năng mới sẽ nâng cao trải nghiệm người dùng."
  },
  {
    id: "5",
    english: "Generate",
    vietnamese: "Tạo ra",
    pronunciation: "/ˈdʒenəreɪt/",
    example: "This project will generate significant revenue.",
    exampleTranslation: "Dự án này sẽ tạo ra doanh thu đáng kể."
  }
];

const Vocabulary = () => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleComplete = () => {
    setIsCompleted(true);
  };
  
  const handleRestart = () => {
    setIsCompleted(false);
  };

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
            
            <h1 className="text-3xl font-bold">Business English</h1>
            
            <div className="w-10"></div> {/* For centering the title */}
          </div>
          
          {isCompleted ? (
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
              
              <h2 className="text-2xl font-bold mb-4">Chúc mừng!</h2>
              <p className="text-muted-foreground mb-8">
                Bạn đã hoàn thành phần học từ vựng này. Hãy tiếp tục với các phần khác để nâng cao vốn từ của bạn.
              </p>
              
              <div className="space-y-4">
                <Button className="w-full" onClick={handleRestart}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Học lại
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/topics/business")}
                >
                  Quay lại chủ đề
                </Button>
              </div>
            </motion.div>
          ) : (
            <FlashCard words={sampleVocabularyWords} onComplete={handleComplete} />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Vocabulary;
