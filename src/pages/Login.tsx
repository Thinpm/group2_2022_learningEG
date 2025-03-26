
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoginForm } from "@/components/auth/LoginForm";
import { AnimatedRoute } from "@/components/layout/AnimatedRoute";

const Login = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatedRoute>
        <div className="pt-24 pb-12 px-6 min-h-screen flex items-center justify-center hero-gradient">
          <LoginForm />
        </div>
      </AnimatedRoute>
      <Footer />
    </div>
  );
};

export default Login;
