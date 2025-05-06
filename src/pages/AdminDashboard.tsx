
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams, Routes, Route } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminTabContent from "@/components/admin/dashboard/AdminTabContent";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("users");
  const [activePage, setActivePage] = useState("admin-dashboard");

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
    } else if (!tabFromUrl) {
      setSearchParams({ tab: "users" });
    }
  }, [searchParams, setSearchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
    toast.info(`Switched to ${value} tab`);
  };

  // Determine if we need to show the dashboard content or a specific page
  const showDashboardContent = location.pathname === "/admin-dashboard" || location.pathname === "/admin-dashboard/";

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
              {/* Add routes for admin-specific pages here if needed */}
              <Route path="users" element={<div>User Management Page</div>} />
              <Route path="system" element={<div>System Management Page</div>} />
              <Route path="security" element={<div>Security Management Page</div>} />
              {/* Add more routes as needed */}
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
