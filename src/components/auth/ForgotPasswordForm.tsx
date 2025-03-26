
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // In a real app, you would send a reset email here
      console.log("Password reset requested for:", email);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-8 glassmorphism rounded-2xl"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Quên mật khẩu</h1>
        <p className="text-muted-foreground">
          Vui lòng nhập email của bạn và chúng tôi sẽ gửi hướng dẫn để đặt lại mật khẩu.
        </p>
      </div>
      
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="mb-6">
            <AlertDescription>
              Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư đến (và thư rác) của bạn.
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col space-y-4">
            <Link to="/login">
              <Button variant="outline" className="w-full rounded-lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại trang đăng nhập
              </Button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full rounded-lg hover-lift"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Đang gửi...
                </>
              ) : (
                "Gửi hướng dẫn đặt lại mật khẩu"
              )}
            </Button>
            
            <Link to="/login">
              <Button variant="ghost" className="w-full rounded-lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại trang đăng nhập
              </Button>
            </Link>
          </div>
        </form>
      )}
    </motion.div>
  );
}
