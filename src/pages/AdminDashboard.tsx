
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams, Routes, Route } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTabContent from "@/components/admin/dashboard/AdminTabContent";
import { useAuthContext } from "@/context/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("users");
  const [activePage, setActivePage] = useState("admin-dashboard");
  const { user, isAdmin, loading } = useAuthContext();

  console.log("AdminDashboard rendering, path:", location.pathname);

  // Redirect if not admin
  useEffect(() => {
    if (loading) {
      console.log("Auth still loading, waiting...");
      return;
    }
    
    if (user && !isAdmin) {
      console.log("Not admin, redirecting to dashboard");
      navigate("/dashboard");
    } else if (!user) {
      console.log("Not logged in, redirecting to auth");
      navigate("/auth");
    } else {
      console.log("Admin access confirmed");
    }
  }, [user, isAdmin, navigate, loading]);

  // Update activePage based on route
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path && path !== 'admin-dashboard') {
      setActivePage(path);
    } else {
      setActivePage("admin-dashboard");
    }
  }, [location.pathname]);

  // Set active tab from URL params or default to "users"
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && ["users", "analytics", "system", "security", "settings"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else if (!tabFromUrl && location.pathname === "/admin-dashboard") {
      // Only set default tab if we're on the main admin dashboard page
      setSearchParams({ tab: "users" });
    }
  }, [searchParams, setSearchParams, location.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
    toast.info(`Switched to ${value} tab`);
  };

  // Determine if we need to show the dashboard content or a specific page
  const showDashboardContent = location.pathname === "/admin-dashboard" || location.pathname === "/admin-dashboard/";

  console.log("Admin Dashboard Render:", { 
    path: location.pathname, 
    showDashboardContent, 
    activeTab,
    searchParams: searchParams.toString()
  });

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Verifying admin access...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activePage={activePage} />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {showDashboardContent ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                  <p className="text-gray-600">System overview and user management</p>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <AdminTabContent activeTab={activeTab} />
              </Tabs>
            </>
          ) : (
            <Routes>
              <Route path="users/*" element={
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">User Management</h1>
                  <AdminTabContent activeTab="users" />
                </div>
              } />
              <Route path="system/*" element={
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">System Management</h1>
                  <AdminTabContent activeTab="system" />
                </div>
              } />
              <Route path="security/*" element={
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">Security Management</h1>
                  <AdminTabContent activeTab="security" />
                </div>
              } />
              <Route path="settings/*" element={
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">Admin Settings</h1>
                  <AdminTabContent activeTab="settings" />
                </div>
              } />
              <Route path="analytics/*" element={
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                  <AdminTabContent activeTab="analytics" />
                </div>
              } />
              <Route path="*" element={
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-xl font-medium mb-2">Page Not Found</h2>
                  <p className="text-gray-600 mb-4">
                    The admin page you're looking for doesn't exist.
                  </p>
                  <button 
                    onClick={() => navigate("/admin-dashboard")}
                    className="text-blue-600 hover:underline"
                  >
                    Return to Admin Dashboard
                  </button>
                </div>
              } />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
