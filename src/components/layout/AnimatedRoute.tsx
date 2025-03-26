
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedRouteProps {
  children: ReactNode;
}

export function AnimatedRoute({ children }: AnimatedRouteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
