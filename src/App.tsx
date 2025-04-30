
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { initFacebookSdk, checkFacebookLoginStatus } from "@/utils/social/facebook-sdk";

// Import pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

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

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Render children if authenticated
  return <>{children}</>;
};

function AppContent() {
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
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* Public feature pages */}
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
      <Toaster position="top-right" />
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
