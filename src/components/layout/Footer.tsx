
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { requireAuth } from "@/utils/auth";

export function Footer() {
  return (
    <footer className="bg-secondary/50 dark:bg-secondary/10 px-6 md:px-12 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4">LearnEnglish</h3>
            <p className="text-muted-foreground mb-4">
              Nâng cao kỹ năng tiếng Anh của bạn với phương pháp học tập thông minh và cá nhân hóa.
            </p>
            <div className="flex space-x-4 items-center">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Github className="h-5 w-5" />
              </a>
              <ThemeToggle />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to={requireAuth("/topics")} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Chủ đề
                </Link>
              </li>
              <li>
                <Link to={requireAuth("/dashboard")} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Tiến trình
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
            <address className="not-italic text-muted-foreground">
              <p className="mb-2">123 Đường ABC, Quận XYZ</p>
              <p className="mb-2">Thành phố Hồ Chí Minh, Việt Nam</p>
              <p className="mb-2">Email: info@learnenglish.vn</p>
              <p>Điện thoại: +84 123 456 789</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LearnEnglish. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
