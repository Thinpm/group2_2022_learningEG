
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { TopicProgress } from "@/components/dashboard/TopicProgress";
import { WeakWordsCard } from "@/components/dashboard/WeakWordsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const progressData = [
  { date: "01/05", wordLearned: 10, wordReviewed: 0 },
  { date: "02/05", wordLearned: 15, wordReviewed: 5 },
  { date: "03/05", wordLearned: 8, wordReviewed: 12 },
  { date: "04/05", wordLearned: 12, wordReviewed: 15 },
  { date: "05/05", wordLearned: 20, wordReviewed: 10 },
  { date: "06/05", wordLearned: 15, wordReviewed: 25 },
  { date: "07/05", wordLearned: 5, wordReviewed: 30 }
];

const topicsProgressData = [
  {
    id: "business",
    title: "Business English",
    progress: 75,
    totalWords: 150,
    learnedWords: 112
  },
  {
    id: "travel",
    title: "Travel & Tourism",
    progress: 40,
    totalWords: 120,
    learnedWords: 48
  },
  {
    id: "technology",
    title: "Technology & IT",
    progress: 20,
    totalWords: 180,
    learnedWords: 36
  },
  {
    id: "science",
    title: "Science & Nature",
    progress: 10,
    totalWords: 160,
    learnedWords: 16
  }
];

const weakWordsData = [
  {
    id: "1",
    english: "Ambitious",
    vietnamese: "Tham vọng",
    count: 3
  },
  {
    id: "2",
    english: "Collaborate",
    vietnamese: "Cộng tác",
    count: 2
  },
  {
    id: "3",
    english: "Generate",
    vietnamese: "Tạo ra",
    count: 4
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20 px-6 md:px-12 min-h-screen bg-secondary/50 dark:bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Xin chào, <span className="text-gradient">Người học</span>
            </h1>
            <p className="text-muted-foreground">
              Đây là tổng quan về tiến trình học tập của bạn.
            </p>
          </div>
          
          <StatsCards 
            streakDays={7} 
            totalWords={212} 
            studyHours={15} 
            masteredWords={145} 
          />
          
          <div className="mt-12">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="topics">Chủ đề</TabsTrigger>
                <TabsTrigger value="weakWords">Từ yếu</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                <ProgressChart data={progressData} />
              </TabsContent>
              
              <TabsContent value="topics">
                <TopicProgress topics={topicsProgressData} />
              </TabsContent>
              
              <TabsContent value="weakWords">
                <WeakWordsCard words={weakWordsData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
