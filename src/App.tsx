
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
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});

// Protected route component
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { user, loading, isAdmin } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  // Redirect to auth if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Redirect non-admin users from admin routes
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Render children if authenticated
  return <>{children}</>;
};

function AppContent() {
  console.log("AppContent rendering...");
  // Initialize Facebook SDK when the app loads
  useEffect(() => {
    const initFacebook = async () => {
      console.log("Initializing Facebook SDK...");
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
        <Route path="/register" element={<Register />} />
        {/* Explicitly redirect /login to /auth */}
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        
        {/* Protected routes */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard/*" element={
          <ProtectedRoute requireAdmin={true}>
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
  console.log("App rendering...");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
