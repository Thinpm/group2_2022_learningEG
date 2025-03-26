
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TopicDetail as TopicDetailComponent } from "@/components/topics/TopicDetail";

type TopicData = {
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
};

const topicsData: Record<string, TopicData> = {
  "business": {
    id: "business",
    title: "Business English",
    description: "Từ vựng và cụm từ liên quan đến môi trường kinh doanh, thương mại",
    level: "Intermediate",
    wordCount: 150,
    imageBg: "from-blue-500/20 to-purple-500/20",
    progress: 75,
    sections: [
      {
        id: "office",
        title: "Office Environment",
        description: "Từ vựng về văn phòng và môi trường làm việc",
        wordCount: 30,
        isCompleted: true
      },
      {
        id: "marketing",
        title: "Marketing & Sales",
        description: "Từ vựng về marketing và bán hàng",
        wordCount: 40,
        isCompleted: true
      },
      {
        id: "finance",
        title: "Finance & Accounting",
        description: "Từ vựng về tài chính và kế toán",
        wordCount: 35,
        isCompleted: true
      },
      {
        id: "meetings",
        title: "Meetings & Negotiations",
        description: "Từ vựng về cuộc họp và đàm phán",
        wordCount: 25,
        isCompleted: false
      },
      {
        id: "business-communication",
        title: "Business Communication",
        description: "Từ vựng về giao tiếp trong kinh doanh",
        wordCount: 20,
        isCompleted: false
      }
    ]
  },
  "travel": {
    id: "travel",
    title: "Travel & Tourism",
    description: "Từ vựng du lịch, khách sạn và trải nghiệm văn hóa toàn cầu",
    level: "Beginner",
    wordCount: 120,
    imageBg: "from-green-500/20 to-yellow-500/20",
    progress: 40,
    sections: [
      {
        id: "transportation",
        title: "Transportation",
        description: "Từ vựng về phương tiện di chuyển",
        wordCount: 25,
        isCompleted: true
      },
      {
        id: "accommodation",
        title: "Accommodation",
        description: "Từ vựng về chỗ ở và khách sạn",
        wordCount: 30,
        isCompleted: true
      },
      {
        id: "sightseeing",
        title: "Sightseeing",
        description: "Từ vựng về tham quan và du lịch",
        wordCount: 35,
        isCompleted: false
      },
      {
        id: "food-travel",
        title: "Food & Dining",
        description: "Từ vựng về ẩm thực khi đi du lịch",
        wordCount: 30,
        isCompleted: false
      }
    ]
  },
  "technology": {
    id: "technology",
    title: "Technology & IT",
    description: "Từ vựng công nghệ, máy tính và lĩnh vực công nghệ thông tin",
    level: "Advanced",
    wordCount: 180,
    imageBg: "from-purple-500/20 to-pink-500/20",
    progress: 20,
    sections: [
      {
        id: "hardware",
        title: "Computer Hardware",
        description: "Từ vựng về phần cứng máy tính",
        wordCount: 40,
        isCompleted: true
      },
      {
        id: "software",
        title: "Software & Applications",
        description: "Từ vựng về phần mềm và ứng dụng",
        wordCount: 45,
        isCompleted: false
      },
      {
        id: "programming",
        title: "Programming & Development",
        description: "Từ vựng về lập trình và phát triển",
        wordCount: 50,
        isCompleted: false
      },
      {
        id: "network",
        title: "Networks & Security",
        description: "Từ vựng về mạng và bảo mật",
        wordCount: 45,
        isCompleted: false
      }
    ]
  }
};

const TopicDetailPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  
  // Default to business if topicId is not found in data
  const topic = topicId && topicsData[topicId] ? topicsData[topicId] : topicsData["business"];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-20 min-h-screen">
        <TopicDetailComponent
          id={topic.id}
          title={topic.title}
          description={topic.description}
          level={topic.level}
          wordCount={topic.wordCount}
          imageBg={topic.imageBg}
          progress={topic.progress}
          sections={topic.sections}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default TopicDetailPage;
