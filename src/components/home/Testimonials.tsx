
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    content: "Phương pháp học từ vựng của ứng dụng rất hiệu quả. Tôi đã học được hơn 500 từ mới chỉ trong 2 tháng và nhớ được hầu hết!",
    author: "Nguyễn Văn A",
    role: "Sinh viên",
    stars: 5
  },
  {
    id: 2,
    content: "AI gợi ý chủ đề học tập rất phù hợp với nhu cầu của tôi. Tôi cảm thấy như có một gia sư riêng vậy!",
    author: "Trần Thị B",
    role: "Nhân viên văn phòng",
    stars: 5
  },
  {
    id: 3,
    content: "Giao diện đẹp, trải nghiệm người dùng tuyệt vời. Tôi thích cách ứng dụng hiển thị tiến trình học tập của tôi.",
    author: "Lê Văn C",
    role: "Giáo viên",
    stars: 4
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Người dùng <span className="text-gradient">nói gì</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Khám phá trải nghiệm của những người đã sử dụng ứng dụng và cải thiện kỹ năng tiếng Anh
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glassmorphism rounded-2xl p-10 text-center relative max-w-3xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                {Array.from({ length: testimonials[currentIndex].stars }).map((_, index) => (
                  <Star key={index} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <p className="text-xl mb-8 italic">"{testimonials[currentIndex].content}"</p>
              
              <div>
                <p className="font-medium text-lg">{testimonials[currentIndex].author}</p>
                <p className="text-muted-foreground">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full hover:bg-primary/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full hover:bg-primary/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
