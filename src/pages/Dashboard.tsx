
import React, { useState, useEffect, Suspense } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ContentPage from "@/components/dashboard/pages/ContentPage";
import SchedulePage from "@/components/dashboard/pages/SchedulePage";
import AnalyticsPage from "@/components/dashboard/pages/AnalyticsPage";
import SocialPage from "@/components/dashboard/pages/SocialPage";
import ProfilePage from "@/components/dashboard/pages/ProfilePage";
import SettingsPage from "@/components/dashboard/pages/SettingsPage";
import NewPostPage from "@/components/dashboard/pages/NewPostPage";
import WatchDemoModal from "@/components/dashboard/WatchDemoModal";
import EditPostPage from "@/components/dashboard/pages/EditPostPage";
import { usePosts } from "@/hooks/usePosts";
import { checkAndUpdatePostStatus } from "@/utils/social";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

// Lazy loaded components for better performance
const LazyDashboardTabContent = React.lazy(() => import("@/components/dashboard/content/DashboardTabContent"));
const LazySocialPage = React.lazy(() => import("@/components/dashboard/pages/SocialPage"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full p-8">
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Skeleton className="h-32 rounded-md" />
        <Skeleton className="h-32 rounded-md" />
        <Skeleton className="h-32 rounded-md" />
      </div>
      <Skeleton className="h-64 mt-4" />
    </div>
  </div>
);

const Dashboard = () => {
  console.log("Dashboard page rendering - URL:", window.location.pathname);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [activePage, setActivePage] = useState("dashboard");
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { posts, isLoading: postsLoading, deletePost, updatePost } = usePosts();

  // Debug user authentication status
  useEffect(() => {
    console.log("Dashboard - Authentication status:", {
      hasUser: !!user,
      userId: user?.id,
      email: user?.email,
      timestamp: new Date().toISOString()
    });
  }, [user]);

  // Update active page based on current route
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path && path !== 'dashboard') {
      setActivePage(path);
    } else {
      setActivePage("dashboard");
    }
    
    console.log("Dashboard - Route updated:", location.pathname);
  }, [location.pathname]);

  // Check for scheduled posts that should be published on dashboard load
  useEffect(() => {
    const checkScheduledPosts = async () => {
      try {
        console.log("Dashboard - Checking scheduled posts...");
        await checkAndUpdatePostStatus();
        console.log("Dashboard - Scheduled posts check completed");
      } catch (error) {
        console.error("Error checking scheduled posts:", error);
        setError("Failed to check scheduled posts. Please try refreshing the page.");
      }
    };
    
    checkScheduledPosts();
  }, []);

  // Get tab from URL if available
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && ["posts", "analytics", "platforms", "settings"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
      console.log("Dashboard - Tab set from URL:", tabFromUrl);
    }
    
    // Set loading state with a shorter timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("Dashboard - Loading state complete");
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Debug the current path to help troubleshoot
  useEffect(() => {
    console.log(`Dashboard - Current path: ${location.pathname}`);
    console.log(`Dashboard - Posts loading: ${postsLoading}`);
  }, [location.pathname, postsLoading]);

  const createPost = () => {
    navigate("/dashboard/new-post");
  };
  
  const editPost = (id: string | number) => {
    const stringId = String(id);
    setEditingPostId(stringId);
    navigate(`/dashboard/edit-post/${stringId}`);
    toast.info(`Editing post ${stringId}`);
  };
  
  const cancelPost = (id: string | number) => {
    const stringId = String(id);
    if (window.confirm(`Are you sure you want to cancel post ${stringId}?`)) {
      deletePost(stringId);
      toast.success(`Post ${stringId} has been canceled`);
    }
  };
  
  const viewAllScheduled = () => {
    navigate("/dashboard/schedule");
  };
  
  const viewStats = (id: string | number) => {
    const stringId = String(id);
    navigate(`/dashboard/analytics?postId=${stringId}`);
  };
  
  const republishPost = (id: string | number) => {
    const stringId = String(id);
    updatePost({ 
      id: stringId, 
      data: { 
        status: 'scheduled',
        scheduled_for: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      } 
    });
  };
  
  const viewAllPublished = () => {
    navigate("/dashboard/content?filter=published");
  };
  
  const viewAllDrafts = () => {
    navigate("/dashboard/content?filter=drafts");
  };

  const watchDemo = () => {
    setDemoModalOpen(true);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  // Get the current path to determine what to render
  const path = location.pathname;
  const isEditingPost = path.includes('/edit-post/');
  const isSocialPage = path === "/dashboard/social";

  // Handle errors
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-md w-full">
          <h2 className="text-red-800 font-semibold text-lg mb-2">Error Loading Dashboard</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </div>
      </div>
    );
  }

  // Show the loading fallback only initially
  if (isLoading && path === "/dashboard") {
    console.log("Dashboard - Showing initial loading state");
    return <LoadingFallback />;
  }

  // Show which component is being rendered (helpful for debugging)
  console.log("Rendering dashboard component for path:", path);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader onWatchDemo={watchDemo} />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar activePage={activePage} />
        <main className="flex-1 flex flex-col overflow-auto">
          <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            {path === "/dashboard" && (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">Welcome back!</h1>
                    <p className="text-gray-600">Here's what's happening with your content</p>
                  </div>
                  <Button className="gradient-button text-white" onClick={createPost}>
                    <Plus size={18} className="mr-2" /> Create New Post
                  </Button>
                </div>

                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="mb-6 overflow-x-auto flex w-full md:w-auto">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="platforms">Platforms</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <Suspense fallback={<LoadingFallback />}>
                    <LazyDashboardTabContent 
                      activeTab={activeTab} 
                      onEdit={editPost}
                      onCancel={cancelPost}
                      onViewAllScheduled={viewAllScheduled}
                      onViewStats={viewStats}
                      onRepublish={republishPost}
                      onViewAllPublished={viewAllPublished}
                      onViewAllDrafts={viewAllDrafts}
                    />
                  </Suspense>
                </Tabs>
              </>
            )}
            
            {path === "/dashboard/content" && <ContentPage />}
            {path === "/dashboard/schedule" && <SchedulePage />}
            {path === "/dashboard/analytics" && <AnalyticsPage />}
            {isSocialPage && (
              <Suspense fallback={<LoadingFallback />}>
                <LazySocialPage />
              </Suspense>
            )}
            {path === "/dashboard/profile" && <ProfilePage />}
            {path === "/dashboard/settings" && <SettingsPage />}
            {path === "/dashboard/new-post" && <NewPostPage />}
            {isEditingPost && <EditPostPage postId={editingPostId} />}
          </div>
        </main>
      </div>
      
      <WatchDemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </div>
  );
};

export default Dashboard;
