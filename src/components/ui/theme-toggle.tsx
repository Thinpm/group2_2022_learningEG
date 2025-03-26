
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 glassmorphism bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 transition-all duration-300"
    >
      <Sun className={`h-5 w-5 rotate-0 scale-100 transition-all duration-300 ${theme === "dark" ? "rotate-90 scale-0" : ""}`} />
      <Moon className={`absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 ${theme === "dark" ? "rotate-0 scale-100" : ""}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
