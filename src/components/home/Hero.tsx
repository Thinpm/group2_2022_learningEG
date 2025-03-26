
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      heroRef.current.style.setProperty('--mouse-x', `${x}`);
      heroRef.current.style.setProperty('--mouse-y', `${y}`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-24 pb-12 hero-gradient overflow-hidden"
      style={{ '--mouse-x': '0.5', '--mouse-y': '0.5' } as React.CSSProperties}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl"
          style={{ 
            transform: 'translate(calc(var(--mouse-x) * -30px), calc(var(--mouse-y) * -30px))',
            transition: 'transform 0.2s ease-out'
          }}
        />
        <div 
          className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
          style={{ 
            transform: 'translate(calc(var(--mouse-x) * 30px), calc(var(--mouse-y) * 30px))',
            transition: 'transform 0.2s ease-out'
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 animate-fade-in">
          <BookOpen className="h-4 w-4 mr-2" />
          <span>Học tiếng Anh hiệu quả</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
          <span className="block">Nâng cao kỹ năng tiếng Anh</span>
          <span className="text-gradient">một cách thông minh</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mb-10 animate-fade-in">
          Cá nhân hóa lộ trình học tiếng Anh với AI, tạo trải nghiệm học tập hiệu quả và thú vị nhất dành riêng cho bạn.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <Link to="/register">
            <Button size="lg" className="rounded-full text-lg px-8 hover-lift">
              Bắt đầu miễn phí
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/topics">
            <Button variant="outline" size="lg" className="rounded-full text-lg px-8 hover-lift">
              Khám phá chủ đề
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="relative z-10 mt-16 w-full max-w-6xl mx-auto glassmorphism rounded-2xl p-1 animate-fade-in">
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center mb-4 animate-pulse-subtle">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm md:text-base text-muted-foreground">Preview ứng dụng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
