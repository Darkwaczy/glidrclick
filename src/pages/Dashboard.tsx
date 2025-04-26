
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams, Routes, Route, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabContent from "@/components/dashboard/content/DashboardTabContent";
import ContentPage from "@/components/dashboard/pages/ContentPage";
import SchedulePage from "@/components/dashboard/pages/SchedulePage";
import AnalyticsPage from "@/components/dashboard/pages/AnalyticsPage";
import SocialPage from "@/components/dashboard/pages/SocialPage";
import ProfilePage from "@/components/dashboard/pages/ProfilePage";
import SettingsPage from "@/components/dashboard/pages/SettingsPage";
import NewPostPage from "@/components/dashboard/pages/NewPostPage";
import WatchDemoModal from "@/components/dashboard/WatchDemoModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [activePage, setActivePage] = useState("dashboard");
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Update active page based on current route
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path && path !== 'dashboard') {
      setActivePage(path);
    } else {
      setActivePage("dashboard");
    }
  }, [location.pathname]);

  // Get tab from URL if available
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && ["posts", "analytics", "platforms", "settings"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const createPost = () => {
    navigate("/dashboard/new-post");
  };

  const watchDemo = () => {
    setDemoModalOpen(true);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
    toast.info(`Switched to ${value} tab`);
  };

  // Get the current path to determine what to render
  const path = location.pathname;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar activePage={activePage} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader onWatchDemo={watchDemo} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {path === "/dashboard" && (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, User!</h1>
                  <p className="text-gray-600">Here's what's happening with your content</p>
                </div>
                <Button className="gradient-button text-white" onClick={createPost}>
                  <Plus size={18} className="mr-2" /> Create New Post
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="platforms">Platforms</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <DashboardTabContent activeTab={activeTab} />
              </Tabs>
            </>
          )}
          
          {path === "/dashboard/content" && <ContentPage />}
          {path === "/dashboard/schedule" && <SchedulePage />}
          {path === "/dashboard/analytics" && <AnalyticsPage />}
          {path === "/dashboard/social" && <SocialPage />}
          {path === "/dashboard/profile" && <ProfilePage />}
          {path === "/dashboard/settings" && <SettingsPage />}
          {path === "/dashboard/new-post" && <NewPostPage />}
        </main>
      </div>
      
      <WatchDemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </div>
  );
};

export default Dashboard;
