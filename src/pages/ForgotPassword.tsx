
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12 px-6 min-h-screen flex items-center justify-center hero-gradient">
        <ForgotPasswordForm />
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
