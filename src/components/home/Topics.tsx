
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { requireAuth } from "@/utils/auth";

type Topic = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  wordCount: number;
  imageBg: string;
};

const sampleTopics: Topic[] = [
  {
    id: "business",
    title: "Business English",
    description: "Từ vựng và cụm từ liên quan đến môi trường kinh doanh, thương mại",
    level: "Intermediate",
    wordCount: 150,
    imageBg: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: "travel",
    title: "Travel & Tourism",
    description: "Từ vựng du lịch, khách sạn và trải nghiệm văn hóa toàn cầu",
    level: "Beginner",
    wordCount: 120,
    imageBg: "from-green-500/20 to-yellow-500/20"
  },
  {
    id: "technology",
    title: "Technology & IT",
    description: "Từ vựng công nghệ, máy tính và lĩnh vực công nghệ thông tin",
    level: "Advanced",
    wordCount: 180,
    imageBg: "from-purple-500/20 to-pink-500/20"
  }
];

export function Topics() {
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    const redirectPath = requireAuth(path);
    navigate(redirectPath);
  };

  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Chủ đề <span className="text-gradient">học tập</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Khám phá các chủ đề phong phú, được thiết kế để nâng cao vốn từ vựng của bạn trong nhiều lĩnh vực khác nhau
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sampleTopics.map((topic) => (
            <div
              key={topic.id}
              className="rounded-xl overflow-hidden neumorphism transition-all duration-500 hover:shadow-xl"
              onMouseEnter={() => setHoveredTopic(topic.id)}
              onMouseLeave={() => setHoveredTopic(null)}
            >
              <div 
                className={`h-48 w-full bg-gradient-to-br ${topic.imageBg} relative overflow-hidden transition-all duration-500`}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-background/50 dark:to-background/80"
                  style={{
                    transformOrigin: 'center',
                    transform: hoveredTopic === topic.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.5s ease-out'
                  }}
                />
                <div className="absolute bottom-4 left-4 bg-primary/10 dark:bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                  {topic.level}
                </div>
                <div className="absolute bottom-4 right-4 bg-primary/10 dark:bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
                  {topic.wordCount} từ
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{topic.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full rounded-lg group transition-all duration-300 hover:border-primary"
                  onClick={() => handleNavigation(`/topics/${topic.id}`)}
                >
                  <span className="mr-2 group-hover:mr-3 transition-all duration-300">Khám phá</span>
                  <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full hover-lift"
            onClick={() => handleNavigation("/topics")}
          >
            Xem tất cả chủ đề
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
