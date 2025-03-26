
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AnimatedRoute } from "@/components/layout/AnimatedRoute";

const Register = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AnimatedRoute>
        <div className="pt-24 pb-12 px-6 min-h-screen flex items-center justify-center hero-gradient">
          <RegisterForm />
        </div>
      </AnimatedRoute>
      <Footer />
    </div>
  );
};

export default Register;
