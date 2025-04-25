
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  LayoutDashboard, Settings, File, CalendarDays, BarChart, 
  Share, User, LogOut
} from "lucide-react";

interface DashboardSidebarProps {
  activePage: string;
}

const DashboardSidebar = ({ activePage }: DashboardSidebarProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    toast.info(`Navigating to ${path}`);
  };

  const handleLogout = () => {
    toast.success("Logging out...");
    navigate("/");
  };

  return (
    <div className="hidden md:flex w-64 flex-col bg-white border-r">
      <div className="p-4 flex items-center gap-2 border-b">
        <h1 className="text-xl font-bold gradient-text">Glidrclick</h1>
      </div>
      <div className="flex flex-col flex-grow p-4 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Dashboard</h3>
          <Button 
            variant={activePage === "dashboard" ? "default" : "ghost"} 
            className={`w-full justify-start gap-2`}
            onClick={() => handleNavigation("/dashboard")}
          >
            <LayoutDashboard size={18} className="text-glidr-purple" /> Overview
          </Button>
          <Button 
            variant={activePage === "content" ? "default" : "ghost"} 
            className={`w-full justify-start gap-2`}
            onClick={() => handleNavigation("/dashboard/content")}
          >
            <File size={18} /> Content
          </Button>
          <Button 
            variant={activePage === "schedule" ? "default" : "ghost"} 
            className={`w-full justify-start gap-2`}
            onClick={() => handleNavigation("/dashboard/schedule")}
          >
            <CalendarDays size={18} /> Schedule
          </Button>
          <Button 
            variant={activePage === "analytics" ? "default" : "ghost"} 
            className={`w-full justify-start gap-2`}
            onClick={() => handleNavigation("/dashboard/analytics")}
          >
            <BarChart size={18} /> Analytics
          </Button>
          <Button 
            variant={activePage === "social" ? "default" : "ghost"} 
            className={`w-full justify-start gap-2`}
            onClick={() => handleNavigation("/dashboard/social")}
          >
            <Share size={18} /> Social
          </Button>
        </div>

        <div className="space-y-1">
          <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Settings</h3>
          <Button 
            variant={activePage === "profile" ? "default" : "ghost"} 
            className={`w-full justify-start gap-2`}
            onClick={() => handleNavigation("/dashboard/profile")}
          >
            <User size={18} /> Profile
          </Button>
          <Button 
            variant={activePage === "settings" ? "default" : "ghost"} 
            className={`w-full justify-start gap-2`}
            onClick={() => handleNavigation("/dashboard/settings")}
          >
            <Settings size={18} /> Settings
          </Button>
        </div>

        <div className="mt-auto space-y-1">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2" 
            onClick={handleLogout}
          >
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
