
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TopicCard } from "@/components/topics/TopicCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatedRoute } from "@/components/layout/AnimatedRoute";

type TopicCardType = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  wordCount: number;
  imageBg: string;
  progress?: number;
};

const topicsData: TopicCardType[] = [
  {
    id: "business",
    title: "Business English",
    description: "Từ vựng và cụm từ liên quan đến môi trường kinh doanh, thương mại",
    level: "Intermediate",
    wordCount: 150,
    imageBg: "from-blue-500/20 to-purple-500/20",
    progress: 75
  },
  {
    id: "travel",
    title: "Travel & Tourism",
    description: "Từ vựng du lịch, khách sạn và trải nghiệm văn hóa toàn cầu",
    level: "Beginner",
    wordCount: 120,
    imageBg: "from-green-500/20 to-yellow-500/20",
    progress: 40
  },
  {
    id: "technology",
    title: "Technology & IT",
    description: "Từ vựng công nghệ, máy tính và lĩnh vực công nghệ thông tin",
    level: "Advanced",
    wordCount: 180,
    imageBg: "from-purple-500/20 to-pink-500/20",
    progress: 20
  },
  {
    id: "medicine",
    title: "Medical English",
    description: "Từ vựng y học, thuật ngữ chuyên ngành và cụm từ trong bệnh viện",
    level: "Advanced",
    wordCount: 200,
    imageBg: "from-red-500/20 to-orange-500/20"
  },
  {
    id: "food",
    title: "Food & Cuisine",
    description: "Từ vựng ẩm thực, nấu ăn và thưởng thức các món ăn quốc tế",
    level: "Beginner",
    wordCount: 100,
    imageBg: "from-yellow-500/20 to-red-500/20"
  },
  {
    id: "education",
    title: "Education",
    description: "Từ vựng về giáo dục, học tập và các hệ thống đào tạo",
    level: "Intermediate",
    wordCount: 130,
    imageBg: "from-blue-500/20 to-teal-500/20"
  },
  {
    id: "science",
    title: "Science & Nature",
    description: "Từ vựng khoa học, hiện tượng tự nhiên và các khám phá mới",
    level: "Advanced",
    wordCount: 160,
    imageBg: "from-emerald-500/20 to-blue-500/20",
    progress: 10
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Từ vựng giải trí, phim ảnh, âm nhạc và các hoạt động vui chơi",
    level: "Beginner",
    wordCount: 110,
    imageBg: "from-pink-500/20 to-purple-500/20"
  },
  {
    id: "sports",
    title: "Sports & Fitness",
    description: "Từ vựng thể thao, rèn luyện sức khỏe và các hoạt động thể chất",
    level: "Intermediate",
    wordCount: 140,
    imageBg: "from-blue-500/20 to-cyan-500/20"
  }
];

const Topics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  
  const filteredTopics = topicsData.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "all" || topic.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <AnimatedRoute>
        <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Khám phá <span className="text-gradient">chủ đề học tập</span>
            </h1>
            <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Chọn chủ đề bạn muốn học để nâng cao vốn từ vựng tiếng Anh một cách hiệu quả
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Tìm kiếm chủ đề..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Cấp độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả cấp độ</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredTopics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTopics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    id={topic.id}
                    title={topic.title}
                    description={topic.description}
                    level={topic.level}
                    wordCount={topic.wordCount}
                    imageBg={topic.imageBg}
                    progress={topic.progress}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">Không tìm thấy chủ đề phù hợp</h3>
                <p className="text-muted-foreground mb-6">Vui lòng thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc.</p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setSelectedLevel("all");
                }}>
                  Xem tất cả chủ đề
                </Button>
              </div>
            )}
          </div>
        </div>
      </AnimatedRoute>
      
      <Footer />
    </div>
  );
};

export default Topics;
