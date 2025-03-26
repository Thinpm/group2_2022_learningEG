
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { VocabularyDetailModal } from "@/components/vocabulary/VocabularyDetailModal";
import { isAuthenticated, requireAuth } from "@/utils/auth";

// Sample vocabulary data for demo - in a real app this would come from an API
const vocabularyItems = [
  { 
    id: "1", 
    word: "Hello", 
    pronunciation: "həˈləʊ", 
    meaning: "Xin chào", 
    example: "Hello, how are you?", 
    exampleTranslation: "Xin chào, bạn khỏe không?",
    topic: { id: "travel", name: "Travel & Tourism", color: "green" }
  },
  { 
    id: "2", 
    word: "Goodbye", 
    pronunciation: "ɡʊdˈbaɪ", 
    meaning: "Tạm biệt", 
    example: "Goodbye, see you tomorrow!", 
    exampleTranslation: "Tạm biệt, hẹn gặp lại vào ngày mai!",
    topic: { id: "travel", name: "Travel & Tourism", color: "green" }
  },
  { 
    id: "3", 
    word: "Thank you", 
    pronunciation: "θæŋk juː", 
    meaning: "Cảm ơn", 
    example: "Thank you for your help.", 
    exampleTranslation: "Cảm ơn vì sự giúp đỡ của bạn.",
    topic: { id: "business", name: "Business English", color: "blue" }
  },
  { 
    id: "4", 
    word: "Sorry", 
    pronunciation: "ˈsɒri", 
    meaning: "Xin lỗi", 
    example: "I'm sorry for being late.", 
    exampleTranslation: "Tôi xin lỗi vì đã đến muộn.",
    topic: { id: "business", name: "Business English", color: "blue" }
  },
  { 
    id: "5", 
    word: "Ambitious", 
    pronunciation: "æmˈbɪʃəs", 
    meaning: "Tham vọng", 
    example: "She is very ambitious and wants to become a CEO.", 
    exampleTranslation: "Cô ấy rất tham vọng và muốn trở thành CEO.",
    topic: { id: "business", name: "Business English", color: "blue" }
  },
  { 
    id: "6", 
    word: "Collaborate", 
    pronunciation: "kəˈlæbəreɪt", 
    meaning: "Cộng tác", 
    example: "Our team will collaborate with the marketing department.", 
    exampleTranslation: "Đội của chúng tôi sẽ cộng tác với phòng marketing.",
    topic: { id: "business", name: "Business English", color: "blue" }
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelectWord = (word) => {
    setSelectedWord(word);
    setDetailModalOpen(true);
    setCommandOpen(false);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
  };

  const handleNavigation = (path: string) => {
    const redirectPath = requireAuth(path);
    navigate(redirectPath);
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-300 ${
        scrolled 
          ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold text-primary transition-all duration-300 hover:opacity-80"
        >
          LearnEnglish
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => handleNavigation("/topics")}
            className="text-foreground/80 hover:text-foreground transition-colors duration-300"
          >
            Chủ đề
          </button>
          <button
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-1.5 text-foreground/80 hover:text-foreground transition-colors duration-300"
          >
            <span>Tìm kiếm từ vựng</span>
            <Search className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleNavigation("/dashboard")}
            className="text-foreground/80 hover:text-foreground transition-colors duration-300"
          >
            Tiến trình
          </button>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="outline" className="hover-lift rounded-full glassmorphism border-primary/20">
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register">
              <Button className="hover-lift rounded-full">
                Đăng ký
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)} 
            className="rounded-full"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background/95 dark:bg-background/95 backdrop-blur-lg md:hidden animate-fade-in">
          <div className="flex flex-col items-center justify-center space-y-8 h-full">
            <button 
              className="text-xl font-medium"
              onClick={() => handleNavigation("/topics")}
            >
              Chủ đề
            </button>
            <button
              onClick={() => {
                setCommandOpen(true);
                setIsOpen(false);
              }}
              className="flex items-center gap-1.5 text-xl font-medium"
            >
              <span>Tìm kiếm từ vựng</span>
              <Search className="h-4 w-4" />
            </button>
            <button 
              className="text-xl font-medium"
              onClick={() => handleNavigation("/dashboard")}
            >
              Tiến trình
            </button>
            <div className="flex flex-col space-y-4 w-full items-center">
              <Link to="/login" className="w-48" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full rounded-full">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register" className="w-48" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-full">
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Command Menu for Vocabulary Search */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Tìm kiếm từ vựng..." />
        <CommandList>
          <CommandEmpty>
            <div className="py-6 text-center flex flex-col items-center space-y-1">
              <p>Không tìm thấy kết quả</p>
              <p className="text-sm text-muted-foreground">
                Thử tìm kiếm với từ khóa khác hoặc xem các gợi ý
              </p>
            </div>
          </CommandEmpty>
          <CommandGroup heading="Kết quả tìm kiếm">
            {vocabularyItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelectWord(item)}
                className="py-3 cursor-pointer"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.word}</span>
                    <span className="text-xs text-muted-foreground">/{item.pronunciation}/</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.meaning}</span>
                  <span className="text-xs italic mt-1 text-foreground/70">{item.example}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Gợi ý từ AI">
            <CommandItem
              onSelect={() => {
                handleNavigation("/vocabulary");
                setCommandOpen(false);
              }}
              className="py-2"
            >
              <div className="flex items-center gap-2">
                <span>Xem toàn bộ từ vựng</span>
              </div>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                handleNavigation("/topics");
                setCommandOpen(false);
              }}
              className="py-2"
            >
              <div className="flex items-center gap-2">
                <span>Khám phá chủ đề liên quan</span>
              </div>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Vocabulary Detail Modal */}
      <VocabularyDetailModal 
        isOpen={detailModalOpen}
        onClose={handleCloseDetailModal}
        word={selectedWord}
      />
    </nav>
  );
}
