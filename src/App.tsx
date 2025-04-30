
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { initFacebookSdk, checkFacebookLoginStatus } from "@/utils/social/facebook-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import features pages
import AIWriting from "./pages/features/AIWriting";
import AutoPosting from "./pages/features/AutoPosting";
import SocialSharing from "./pages/features/SocialSharing";

// Import admin pages
import AdminDashboard from "./pages/AdminDashboard";

// Import legal pages
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FacebookDataDeletion from "./pages/FacebookDataDeletion";

// Create a client
const queryClient = new QueryClient();

function App() {
  // Initialize Facebook SDK when the app loads
  useEffect(() => {
    const initFacebook = async () => {
      try {
        // Initialize Facebook SDK
        await initFacebookSdk();
        
        // Check if user is already logged in to Facebook
        try {
          const loginStatus = await checkFacebookLoginStatus();
          console.log("Initial Facebook login status:", loginStatus);
        } catch (statusError) {
          console.warn("Error checking initial Facebook login status:", statusError);
        }
      } catch (error) {
        console.error("Error initializing Facebook SDK:", error);
      }
    };

    initFacebook();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            
            {/* Feature pages */}
            <Route path="/features/ai-writing" element={<AIWriting />} />
            <Route path="/features/auto-posting" element={<AutoPosting />} />
            <Route path="/features/social-sharing" element={<SocialSharing />} />
            
            {/* Legal pages */}
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/facebook-data-deletion" element={<FacebookDataDeletion />} />
            
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
