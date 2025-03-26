
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20 px-6 md:px-12 min-h-screen flex flex-col items-center justify-center hero-gradient">
        <div className="text-center max-w-lg">
          <h1 className="text-9xl font-bold mb-6">404</h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
          </p>
          <Link to="/">
            <Button size="lg" className="rounded-full hover-lift">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Quay về trang chủ
            </Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
