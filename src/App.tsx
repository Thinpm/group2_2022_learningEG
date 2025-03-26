
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Topics from "./pages/Topics";
import TopicDetail from "./pages/TopicDetail";
import SectionDetail from "./pages/SectionDetail";
import VocabularyList from "./pages/VocabularyList";
import Quiz from "./pages/Quiz";
import Vocabulary from "./pages/Vocabulary";
import Practice from "./pages/Practice";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { isAuthenticated } from "./utils/auth";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Save the current path for redirect after login
    useEffect(() => {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
    }, []);
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route 
            path="/topics" 
            element={
              <ProtectedRoute>
                <Topics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/topics/:topicId" 
            element={
              <ProtectedRoute>
                <TopicDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/topics/:topicId/sections/:sectionId" 
            element={
              <ProtectedRoute>
                <SectionDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/topics/:topicId/vocabulary" 
            element={
              <ProtectedRoute>
                <VocabularyList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/topics/:topicId/quiz/:quizType" 
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vocabulary" 
            element={
              <ProtectedRoute>
                <Vocabulary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/practice" 
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
