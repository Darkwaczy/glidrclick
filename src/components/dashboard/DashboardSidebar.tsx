
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  LayoutDashboard, Settings, File, CalendarDays, BarChart, 
  Share, User, LogOut, ShieldAlert
} from "lucide-react";
import { useAuthContext } from '@/context/AuthContext';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface DashboardSidebarProps {
  activePage: string;
}

const DashboardSidebar = ({ activePage }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuthContext();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="hidden md:flex w-64 flex-col bg-white border-r">
      <div className="p-4 flex items-center gap-2 border-b">
        <h1 className="text-xl font-bold">
          <span className="text-[#9b87f5]">Glidr</span>
          <span className="text-gray-800">click</span>
        </h1>
      </div>
      
      {user && (
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-glidr-purple/10 text-glidr-purple">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user.email}</p>
              <p className="text-xs text-gray-500">{isAdmin ? 'Administrator' : 'User'}</p>
            </div>
          </div>
        </div>
      )}
      
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
          
          {isAdmin && (
            <Button 
              variant={activePage === "admin-dashboard" ? "default" : "ghost"}
              className="w-full justify-start gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              onClick={() => handleNavigation("/admin-dashboard")}
            >
              <ShieldAlert size={18} /> Admin Dashboard
            </Button>
          )}
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
