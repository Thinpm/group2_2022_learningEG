
import { Book, BrainCircuit, BarChart3, Users, Clock, Award } from "lucide-react";

const features = [
  {
    icon: <Book className="h-6 w-6" />,
    title: "Học từ vựng thông minh",
    description: "Hệ thống học từ vựng thông minh, giúp bạn ghi nhớ từ mới hiệu quả hơn với phương pháp lặp lại ngắt quãng."
  },
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: "AI cá nhân hóa",
    description: "Công nghệ AI phân tích thói quen học tập và đề xuất lộ trình học phù hợp với từng người dùng."
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Theo dõi tiến trình",
    description: "Bảng điều khiển trực quan hiển thị chi tiết tiến trình học tập, giúp bạn dễ dàng theo dõi sự tiến bộ."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Cộng đồng học tập",
    description: "Kết nối với cộng đồng người học, chia sẻ kinh nghiệm và động viên nhau cùng tiến bộ."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Học mọi lúc, mọi nơi",
    description: "Ứng dụng được tối ưu hóa cho tất cả các thiết bị, giúp bạn có thể học bất cứ khi nào, bất cứ đâu."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Chứng chỉ hoàn thành",
    description: "Nhận chứng chỉ hoàn thành khóa học để ghi nhận nỗ lực và thành tích học tập của bạn."
  }
];

export function Features() {
  return (
    <section className="py-24 px-6 md:px-12 bg-secondary/50 dark:bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tính năng <span className="text-gradient">nổi bật</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Khám phá các tính năng độc đáo được thiết kế để tối ưu hóa trải nghiệm học tiếng Anh của bạn
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glassmorphism rounded-xl p-6 hover-lift transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg glassmorphism flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
