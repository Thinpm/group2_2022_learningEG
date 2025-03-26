
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { requireAuth } from "@/utils/auth";

interface TopicCardProps {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  wordCount: number;
  imageBg: string;
  progress?: number;
}

export function TopicCard({ id, title, description, level, wordCount, imageBg, progress = 0 }: TopicCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    const redirectPath = requireAuth(path);
    navigate(redirectPath);
  };

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
      className="rounded-xl overflow-hidden neumorphism transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`h-48 w-full bg-gradient-to-br ${imageBg} relative overflow-hidden transition-all duration-500`}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-transparent to-background/50 dark:to-background/80"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        <div className="absolute bottom-4 left-4 bg-primary/10 dark:bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
          {level}
        </div>
        
        <div className="absolute bottom-4 right-4 bg-primary/10 dark:bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
          {wordCount} từ
        </div>
        
        {progress > 0 && (
          <div className="absolute top-4 left-4 right-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
            <div className="text-xs text-white mt-1 font-medium">
              {progress}% hoàn thành
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <Button 
          variant="outline" 
          className="w-full rounded-lg group transition-all duration-300 hover:border-primary"
          onClick={() => handleNavigation(`/topics/${id}`)}
        >
          <span className="mr-2 group-hover:mr-3 transition-all duration-300">Khám phá</span>
          <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
