
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

// Create a client with more aggressive stale time settings for production
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      retryDelay: (attempt) => Math.min(attempt > 1 ? 2000 : 1000, 30000),
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  }
});

// Protected route component with better loading states and error handling
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { user, loading, isAdmin } = useAuth();
  
  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { 
      isLoading: loading, 
      hasUser: !!user, 
      isAdmin, 
      url: window.location.href,
      timestamp: new Date().toISOString()
    });
  }, [user, loading, isAdmin]);
  
  // Show loading state while checking authentication
  if (loading) {
    console.log("ProtectedRoute - Still loading auth state");
    return <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Authenticating...</p>
      </div>
    </div>;
  }
  
  // Redirect to auth if not authenticated
  if (!user) {
    console.log("ProtectedRoute - No user, redirecting to auth page");
    return <Navigate to="/auth" replace />;
  }
  
  // Redirect non-admin users from admin routes
  if (requireAdmin && !isAdmin) {
    console.log("ProtectedRoute - User is not admin, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }
  
  // Render children if authenticated
  console.log("ProtectedRoute - Auth successful, rendering protected content");
  return <>{children}</>;
};

function AppContent() {
  console.log("AppContent rendering - URL:", window.location.href);
  
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
    
    // Log if we're in production or preview
    const isProduction = !window.location.hostname.includes('preview');
    console.log(`Environment: ${isProduction ? 'Production' : 'Preview'}`);
    console.log("Current hostname:", window.location.hostname);
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} /> {/* Redirect /login to /auth */}
        <Route path="/register" element={<Register />} />
        
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
  console.log("App rendering - Initial load:", new Date().toISOString());
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
