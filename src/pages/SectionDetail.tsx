
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Book, Check, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the section
const getSectionData = (topicId: string, sectionId: string) => {
  // This would be fetched from an API in a real app
  const sections = {
    "office": {
      title: "Office Environment",
      description: "Từ vựng về văn phòng và môi trường làm việc",
      vocabulary: [
        {
          id: "1",
          english: "Workspace",
          vietnamese: "Không gian làm việc",
          pronunciation: "/ˈwɜːkspeɪs/", 
          example: "The company has a modern workspace design.",
          exampleTranslation: "Công ty có thiết kế không gian làm việc hiện đại."
        },
        {
          id: "2",
          english: "Schedule",
          vietnamese: "Lịch trình",
          pronunciation: "/ˈʃɛdjuːl/", 
          example: "He has a busy schedule this week.",
          exampleTranslation: "Anh ấy có lịch trình bận rộn tuần này."
        },
        {
          id: "3",
          english: "Deadline",
          vietnamese: "Thời hạn",
          pronunciation: "/ˈdɛdlaɪn/", 
          example: "The project deadline is next Friday.",
          exampleTranslation: "Thời hạn dự án là thứ Sáu tuần sau."
        },
        {
          id: "4",
          english: "Meeting",
          vietnamese: "Cuộc họp",
          pronunciation: "/ˈmiːtɪŋ/", 
          example: "We have a team meeting at 2 PM.",
          exampleTranslation: "Chúng tôi có cuộc họp nhóm lúc 2 giờ chiều."
        },
        {
          id: "5",
          english: "Colleague",
          vietnamese: "Đồng nghiệp",
          pronunciation: "/ˈkɒliːɡ/", 
          example: "My colleagues are very supportive.",
          exampleTranslation: "Đồng nghiệp của tôi rất hỗ trợ."
        }
      ],
      exercises: [
        {
          type: "multiple-choice",
          question: "What does 'Workspace' mean?",
          choices: [
            { id: "a", text: "Không gian làm việc" },
            { id: "b", text: "Thời gian làm việc" },
            { id: "c", text: "Đồng nghiệp" },
            { id: "d", text: "Cuộc họp" }
          ],
          correctChoiceId: "a"
        },
        {
          type: "multiple-choice",
          question: "What is the meaning of 'Deadline'?",
          choices: [
            { id: "a", text: "Khởi đầu" },
            { id: "b", text: "Thời hạn" },
            { id: "c", text: "Kết thúc" },
            { id: "d", text: "Cơ hội" }
          ],
          correctChoiceId: "b"
        }
      ]
    },
    "hardware": {
      title: "Computer Hardware",
      description: "Từ vựng về phần cứng máy tính",
      vocabulary: [
        {
          id: "1",
          english: "Monitor",
          vietnamese: "Màn hình",
          pronunciation: "/ˈmɒnɪtə/", 
          example: "I bought a new 27-inch monitor.",
          exampleTranslation: "Tôi đã mua một màn hình 27 inch mới."
        },
        {
          id: "2",
          english: "Keyboard",
          vietnamese: "Bàn phím",
          pronunciation: "/ˈkiːbɔːd/", 
          example: "This mechanical keyboard has great feedback.",
          exampleTranslation: "Bàn phím cơ này có phản hồi tuyệt vời."
        },
        {
          id: "3",
          english: "Processor",
          vietnamese: "Bộ xử lý",
          pronunciation: "/ˈprəʊsɛsə/", 
          example: "The new processor is twice as fast.",
          exampleTranslation: "Bộ xử lý mới nhanh gấp đôi."
        },
        {
          id: "4",
          english: "Hard drive",
          vietnamese: "Ổ cứng",
          pronunciation: "/hɑːd draɪv/", 
          example: "I need to upgrade my hard drive.",
          exampleTranslation: "Tôi cần nâng cấp ổ cứng của mình."
        },
        {
          id: "5",
          english: "Graphics card",
          vietnamese: "Card đồ họa",
          pronunciation: "/ˈɡræfɪks kɑːd/", 
          example: "A powerful graphics card is essential for gaming.",
          exampleTranslation: "Card đồ họa mạnh mẽ là điều cần thiết cho việc chơi game."
        }
      ],
      exercises: [
        {
          type: "multiple-choice",
          question: "What does 'Monitor' mean?",
          choices: [
            { id: "a", text: "Bàn phím" },
            { id: "b", text: "Màn hình" },
            { id: "c", text: "Ổ cứng" },
            { id: "d", text: "Chuột" }
          ],
          correctChoiceId: "b"
        },
        {
          type: "multiple-choice",
          question: "What is the meaning of 'Processor'?",
          choices: [
            { id: "a", text: "Bộ nhớ" },
            { id: "b", text: "Bộ xử lý" },
            { id: "c", text: "Màn hình" },
            { id: "d", text: "Thiết bị ngoại vi" }
          ],
          correctChoiceId: "b"
        }
      ]
    },
    "transportation": {
      title: "Transportation",
      description: "Từ vựng về phương tiện di chuyển",
      vocabulary: [
        {
          id: "1",
          english: "Airport",
          vietnamese: "Sân bay",
          pronunciation: "/ˈɛəpɔːt/", 
          example: "We arrived at the airport two hours early.",
          exampleTranslation: "Chúng tôi đến sân bay sớm hai tiếng."
        },
        {
          id: "2",
          english: "Passport",
          vietnamese: "Hộ chiếu",
          pronunciation: "/ˈpɑːspɔːt/", 
          example: "Don't forget to bring your passport.",
          exampleTranslation: "Đừng quên mang theo hộ chiếu của bạn."
        },
        {
          id: "3",
          english: "Subway",
          vietnamese: "Tàu điện ngầm",
          pronunciation: "/ˈsʌbweɪ/", 
          example: "The subway is the fastest way to get around the city.",
          exampleTranslation: "Tàu điện ngầm là cách nhanh nhất để di chuyển khắp thành phố."
        },
        {
          id: "4",
          english: "Ticket",
          vietnamese: "Vé",
          pronunciation: "/ˈtɪkɪt/", 
          example: "I booked a one-way ticket to Paris.",
          exampleTranslation: "Tôi đã đặt vé một chiều đi Paris."
        },
        {
          id: "5",
          english: "Luggage",
          vietnamese: "Hành lý",
          pronunciation: "/ˈlʌɡɪdʒ/", 
          example: "There is a fee for excess luggage.",
          exampleTranslation: "Có phí cho hành lý quá cân."
        }
      ],
      exercises: [
        {
          type: "multiple-choice",
          question: "What does 'Airport' mean?",
          choices: [
            { id: "a", text: "Sân bay" },
            { id: "b", text: "Bến xe buýt" },
            { id: "c", text: "Nhà ga" },
            { id: "d", text: "Bến cảng" }
          ],
          correctChoiceId: "a"
        },
        {
          type: "multiple-choice",
          question: "What is the meaning of 'Luggage'?",
          choices: [
            { id: "a", text: "Vé" },
            { id: "b", text: "Hộ chiếu" },
            { id: "c", text: "Hành lý" },
            { id: "d", text: "Lịch trình" }
          ],
          correctChoiceId: "c"
        }
      ]
    }
  };

  // Default to office section if not found
  return sections[sectionId as keyof typeof sections] || sections.office;
};

const SectionDetail = () => {
  const { topicId, sectionId } = useParams<{ topicId: string; sectionId: string }>();
  const navigate = useNavigate();
  const section = getSectionData(topicId || "", sectionId || "");

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
          
          <div className="glassmorphism rounded-xl overflow-hidden mb-8">
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-2">{section.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{section.description}</p>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Tiến trình của bạn</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="vocabulary" className="w-full">
            <TabsList className="w-full mb-6 justify-start bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="vocabulary" className="flex-1 md:flex-none">
                <Book className="mr-2 h-4 w-4" />
                Từ vựng
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex-1 md:flex-none">
                <Check className="mr-2 h-4 w-4" />
                Bài tập
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="vocabulary" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.vocabulary.map((word) => (
                  <motion.div 
                    key={word.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Number(word.id) * 0.1 }}
                    className="p-4 glassmorphism rounded-xl"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{word.english}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{word.vietnamese}</p>
                        <p className="text-xs text-muted-foreground mb-2">{word.pronunciation}</p>
                        <p className="italic text-sm text-muted-foreground">"{word.example}"</p>
                        <p className="text-xs text-muted-foreground mt-1">{word.exampleTranslation}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Volume2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="exercises" className="mt-2">
              <div className="space-y-8">
                {section.exercises.map((exercise, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="glassmorphism rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold mb-4">Câu hỏi {index + 1}</h3>
                    <p className="text-lg mb-6">{exercise.question}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {exercise.choices.map((choice) => (
                        <Button
                          key={choice.id}
                          variant="outline"
                          className="justify-start h-auto py-4 px-6 text-left"
                          onClick={() => {
                            if (choice.id === exercise.correctChoiceId) {
                              alert("Chính xác!");
                            } else {
                              alert("Sai rồi! Hãy thử lại.");
                            }
                          }}
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary mr-4">
                            {choice.id.toUpperCase()}
                          </div>
                          <span>{choice.text}</span>
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                ))}
                
                <div className="flex justify-center mt-8">
                  <Button size="lg" className="w-full max-w-md">
                    Hoàn thành bài tập
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SectionDetail;
