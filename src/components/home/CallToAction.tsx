
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="glassmorphism rounded-2xl p-12 md:p-16 text-center animated-border overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Bắt đầu <span className="text-gradient">hành trình</span> của bạn ngay hôm nay
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Tham gia cùng hàng nghìn người học khác và trải nghiệm phương pháp học tiếng Anh hiệu quả nhất.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="rounded-full text-lg px-8 hover-lift">
                  Đăng ký miễn phí
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="rounded-full text-lg px-8 hover-lift">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
