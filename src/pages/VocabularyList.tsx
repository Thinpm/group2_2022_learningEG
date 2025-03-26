
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, BookmarkCheck, Filter, Search, Volume2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for vocabulary
const getVocabularyData = (topicId: string) => {
  // This would be fetched from an API in a real app
  const vocabulary = {
    "business": [
      {
        id: "1",
        english: "Ambitious",
        vietnamese: "Tham vọng",
        pronunciation: "/æmˈbɪʃəs/",
        example: "She is very ambitious and wants to become a CEO.",
        exampleTranslation: "Cô ấy rất tham vọng và muốn trở thành CEO.",
        category: "Personal Qualities",
        isFavorite: false
      },
      {
        id: "2",
        english: "Collaborate",
        vietnamese: "Cộng tác",
        pronunciation: "/kəˈlæbəreɪt/",
        example: "Our team will collaborate with the marketing department.",
        exampleTranslation: "Đội của chúng tôi sẽ cộng tác với phòng marketing.",
        category: "Teamwork",
        isFavorite: true
      },
      {
        id: "3",
        english: "Diverse",
        vietnamese: "Đa dạng",
        pronunciation: "/daɪˈvɜːrs/",
        example: "The company has a diverse workforce from many countries.",
        exampleTranslation: "Công ty có lực lượng lao động đa dạng từ nhiều quốc gia.",
        category: "Workplace Culture",
        isFavorite: false
      },
      {
        id: "4",
        english: "Enhance",
        vietnamese: "Nâng cao",
        pronunciation: "/ɪnˈhæns/",
        example: "The new features will enhance the user experience.",
        exampleTranslation: "Các tính năng mới sẽ nâng cao trải nghiệm người dùng.",
        category: "Improvement",
        isFavorite: false
      },
      {
        id: "5",
        english: "Generate",
        vietnamese: "Tạo ra",
        pronunciation: "/ˈdʒenəreɪt/",
        example: "This project will generate significant revenue.",
        exampleTranslation: "Dự án này sẽ tạo ra doanh thu đáng kể.",
        category: "Finance",
        isFavorite: true
      },
      {
        id: "6",
        english: "Innovation",
        vietnamese: "Đổi mới",
        pronunciation: "/ˌɪnəˈveɪʃən/",
        example: "Innovation is key to staying competitive.",
        exampleTranslation: "Đổi mới là chìa khóa để duy trì tính cạnh tranh.",
        category: "Strategy",
        isFavorite: false
      },
      {
        id: "7",
        english: "Leadership",
        vietnamese: "Lãnh đạo",
        pronunciation: "/ˈliːdəʃɪp/",
        example: "She demonstrates excellent leadership skills.",
        exampleTranslation: "Cô ấy thể hiện kỹ năng lãnh đạo xuất sắc.",
        category: "Management",
        isFavorite: false
      },
      {
        id: "8",
        english: "Negotiate",
        vietnamese: "Đàm phán",
        pronunciation: "/nɪˈɡoʊʃieɪt/",
        example: "We need to negotiate better terms with our suppliers.",
        exampleTranslation: "Chúng ta cần đàm phán các điều khoản tốt hơn với nhà cung cấp.",
        category: "Business Relations",
        isFavorite: true
      }
    ],
    "technology": [
      {
        id: "1",
        english: "Algorithm",
        vietnamese: "Thuật toán",
        pronunciation: "/ˈælɡərɪðəm/",
        example: "The search algorithm returns relevant results quickly.",
        exampleTranslation: "Thuật toán tìm kiếm trả về kết quả liên quan một cách nhanh chóng.",
        category: "Programming",
        isFavorite: false
      },
      {
        id: "2",
        english: "Database",
        vietnamese: "Cơ sở dữ liệu",
        pronunciation: "/ˈdeɪtəbeɪs/",
        example: "All customer information is stored in the database.",
        exampleTranslation: "Tất cả thông tin khách hàng được lưu trữ trong cơ sở dữ liệu.",
        category: "Data Management",
        isFavorite: true
      },
      {
        id: "3",
        english: "Interface",
        vietnamese: "Giao diện",
        pronunciation: "/ˈɪntərfeɪs/",
        example: "The user interface is intuitive and easy to navigate.",
        exampleTranslation: "Giao diện người dùng trực quan và dễ điều hướng.",
        category: "User Experience",
        isFavorite: false
      },
      {
        id: "4",
        english: "Network",
        vietnamese: "Mạng",
        pronunciation: "/ˈnetwɜːrk/",
        example: "The company is upgrading its network infrastructure.",
        exampleTranslation: "Công ty đang nâng cấp cơ sở hạ tầng mạng của mình.",
        category: "Infrastructure",
        isFavorite: false
      },
      {
        id: "5",
        english: "Software",
        vietnamese: "Phần mềm",
        pronunciation: "/ˈsɒftweər/",
        example: "We need to update the software to the latest version.",
        exampleTranslation: "Chúng ta cần cập nhật phần mềm lên phiên bản mới nhất.",
        category: "Applications",
        isFavorite: true
      }
    ],
    "travel": [
      {
        id: "1",
        english: "Accommodation",
        vietnamese: "Chỗ ở",
        pronunciation: "/əˌkɒməˈdeɪʃən/",
        example: "The hotel offers luxury accommodation at reasonable prices.",
        exampleTranslation: "Khách sạn cung cấp chỗ ở sang trọng với giá cả hợp lý.",
        category: "Lodging",
        isFavorite: false
      },
      {
        id: "2",
        english: "Destination",
        vietnamese: "Điểm đến",
        pronunciation: "/ˌdestɪˈneɪʃən/",
        example: "Paris is a popular tourist destination.",
        exampleTranslation: "Paris là một điểm đến du lịch phổ biến.",
        category: "Planning",
        isFavorite: true
      },
      {
        id: "3",
        english: "Itinerary",
        vietnamese: "Lịch trình",
        pronunciation: "/aɪˈtɪnərəri/",
        example: "Our travel agent prepared a detailed itinerary for our trip.",
        exampleTranslation: "Đại lý du lịch đã chuẩn bị một lịch trình chi tiết cho chuyến đi của chúng tôi.",
        category: "Planning",
        isFavorite: false
      },
      {
        id: "4",
        english: "Landmark",
        vietnamese: "Địa danh",
        pronunciation: "/ˈlændmɑːrk/",
        example: "The Eiffel Tower is a famous landmark in Paris.",
        exampleTranslation: "Tháp Eiffel là một địa danh nổi tiếng ở Paris.",
        category: "Sightseeing",
        isFavorite: false
      },
      {
        id: "5",
        english: "Souvenir",
        vietnamese: "Quà lưu niệm",
        pronunciation: "/ˌsuːvəˈnɪr/",
        example: "I bought some souvenirs for my family.",
        exampleTranslation: "Tôi đã mua một số quà lưu niệm cho gia đình.",
        category: "Shopping",
        isFavorite: true
      }
    ]
  };

  return vocabulary[topicId as keyof typeof vocabulary] || vocabulary.business;
};

const VocabularyList = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [vocabularyList, setVocabularyList] = useState(getVocabularyData(topicId || "business"));
  
  // Toggle favorite status
  const toggleFavorite = (wordId: string) => {
    setVocabularyList(
      vocabularyList.map(word => 
        word.id === wordId ? { ...word, isFavorite: !word.isFavorite } : word
      )
    );
  };
  
  // Filter vocabulary based on active tab and search term
  const filteredVocabulary = vocabularyList.filter(word => {
    const matchesSearch = 
      word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.vietnamese.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "favorites") return word.isFavorite && matchesSearch;
    
    // Filter by category
    return word.category.toLowerCase() === activeTab.toLowerCase() && matchesSearch;
  });
  
  // Get unique categories for tabs
  const categories = Array.from(new Set(vocabularyList.map(word => word.category)));

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
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Từ vựng: {topicId}</h1>
              <p className="text-muted-foreground">Danh sách từ vựng và nghĩa của chúng</p>
            </div>
            
            <div className="w-full md:w-auto flex gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Tìm kiếm từ vựng..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-6 overflow-x-auto">
              <TabsList className="bg-background/50 backdrop-blur-sm">
                <TabsTrigger value="all">
                  Tất cả
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  Yêu thích
                </TabsTrigger>
                {categories.map((category, index) => (
                  <TabsTrigger key={index} value={category.toLowerCase()}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredVocabulary.length > 0 ? (
                filteredVocabulary.map((word) => (
                  <motion.div 
                    key={word.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 glassmorphism rounded-xl"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{word.english}</h3>
                          <Badge variant="outline" className="text-xs">
                            {word.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{word.vietnamese}</p>
                        <p className="text-xs text-muted-foreground mb-2">{word.pronunciation}</p>
                        <p className="italic text-sm text-muted-foreground">"{word.example}"</p>
                        <p className="text-xs text-muted-foreground mt-1">{word.exampleTranslation}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full"
                          onClick={() => toggleFavorite(word.id)}
                        >
                          {word.isFavorite ? (
                            <BookmarkCheck className="h-5 w-5 text-primary" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center p-12">
                  <p className="text-lg text-muted-foreground">Không tìm thấy từ vựng phù hợp.</p>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VocabularyList;
