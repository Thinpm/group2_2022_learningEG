
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Book, BookOpen, Check, Clock, Play, Users, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface TopicDetailProps {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  wordCount: number;
  imageBg: string;
  progress?: number;
  sections: {
    id: string;
    title: string;
    description: string;
    wordCount: number;
    isCompleted: boolean;
  }[];
}

export function TopicDetail({
  id,
  title,
  description,
  level,
  wordCount,
  imageBg,
  progress = 0,
  sections
}: TopicDetailProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "vocabulary" | "practice">("overview");

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Button
        variant="ghost"
        className="mb-6 hover:bg-transparent hover:text-primary"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại
      </Button>

      <div 
        className={`rounded-2xl overflow-hidden relative mb-8 bg-gradient-to-br ${imageBg}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/70 dark:to-background/90" />
        
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                <BookOpen className="h-4 w-4 mr-2" />
                <span>{level}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <Button 
                size="lg" 
                className="rounded-full hover-lift"
                onClick={() => {
                  // Navigate to the first section that's not completed
                  const firstIncompleteSection = sections.find(section => !section.isCompleted);
                  if (firstIncompleteSection) {
                    navigate(`/topics/${id}/sections/${firstIncompleteSection.id}`);
                  } else {
                    // If all sections are completed, start with the first one
                    navigate(`/topics/${id}/sections/${sections[0].id}`);
                  }
                }}
              >
                <Play className="mr-2 h-5 w-5" />
                Bắt đầu học
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glassmorphism rounded-xl p-4 flex items-center">
              <div className="rounded-full bg-primary/10 p-2 mr-4">
                <Book className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số từ vựng</p>
                <p className="text-lg font-semibold">{wordCount} từ</p>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-4 flex items-center">
              <div className="rounded-full bg-primary/10 p-2 mr-4">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Thời gian hoàn thành</p>
                <p className="text-lg font-semibold">~2 giờ</p>
              </div>
            </div>
            
            <div className="glassmorphism rounded-xl p-4 flex items-center">
              <div className="rounded-full bg-primary/10 p-2 mr-4">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Người học</p>
                <p className="text-lg font-semibold">1,240+</p>
              </div>
            </div>
          </div>
          
          {progress > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Tiến trình của bạn</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex space-x-1 border-b">
          <Button
            variant="ghost"
            className={`rounded-none border-b-2 ${
              activeTab === "overview"
                ? "border-primary"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Tổng quan
          </Button>
          <Button
            variant="ghost"
            className={`rounded-none border-b-2 ${
              activeTab === "vocabulary"
                ? "border-primary"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("vocabulary")}
          >
            Từ vựng
          </Button>
          <Button
            variant="ghost"
            className={`rounded-none border-b-2 ${
              activeTab === "practice"
                ? "border-primary"
                : "border-transparent"
            }`}
            onClick={() => setActiveTab("practice")}
          >
            Bài tập
          </Button>
        </div>
      </div>
      
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Các phần học</h2>
          
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`p-6 rounded-xl transition-all duration-300 ${
                  section.isCompleted
                    ? "neumorphism bg-green-50/10"
                    : "neumorphism"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                        section.isCompleted
                          ? "bg-green-500/20 text-green-600"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {section.isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-4">{section.wordCount} từ</span>
                    <Button 
                      size="sm" 
                      variant={section.isCompleted ? "outline" : "default"}
                      onClick={() => navigate(`/topics/${id}/sections/${section.id}`)}
                    >
                      {section.isCompleted ? "Ôn lại" : "Bắt đầu"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
      {activeTab === "vocabulary" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="p-4 glassmorphism rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-1">vocabulary #{index + 1}</h3>
                  <p className="text-sm text-muted-foreground mb-2">nghĩa tiếng Việt</p>
                  <p className="italic text-sm text-muted-foreground">"Example sentence in English."</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Volume2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="col-span-1 md:col-span-2 mt-6 text-center">
            <Button
              onClick={() => navigate(`/topics/${id}/vocabulary`)}
              className="px-8"
            >
              Xem tất cả từ vựng
            </Button>
          </div>
        </motion.div>
      )}
      
      {activeTab === "practice" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Bài tập trắc nghiệm</h3>
              <p className="text-muted-foreground mb-6">Kiểm tra vốn từ vựng của bạn thông qua các câu hỏi trắc nghiệm.</p>
              <Button 
                className="w-full"
                onClick={() => navigate(`/topics/${id}/quiz/multiple-choice`)}
              >
                Bắt đầu
              </Button>
            </div>
            
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Bài tập điền từ</h3>
              <p className="text-muted-foreground mb-6">Điền từ vựng phù hợp để hoàn thành câu và đoạn văn.</p>
              <Button 
                className="w-full"
                onClick={() => navigate(`/topics/${id}/quiz/fill-in-blanks`)}
              >
                Bắt đầu
              </Button>
            </div>
            
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Bài tập ghép từ</h3>
              <p className="text-muted-foreground mb-6">Ghép từ tiếng Anh với nghĩa tiếng Việt tương ứng.</p>
              <Button 
                className="w-full"
                onClick={() => navigate(`/topics/${id}/quiz/matching`)}
              >
                Bắt đầu
              </Button>
            </div>
            
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Bài tập nghe</h3>
              <p className="text-muted-foreground mb-6">Luyện nghe và nhận biết từ vựng thông qua đoạn âm thanh.</p>
              <Button 
                className="w-full"
                onClick={() => navigate(`/topics/${id}/quiz/listening`)}
              >
                Bắt đầu
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
