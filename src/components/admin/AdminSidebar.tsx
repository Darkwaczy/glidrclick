
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart,
  Shield,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useAuthContext } from '@/context/AuthContext';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AdminSidebarProps {
  activePage: string;
}

const AdminSidebar = ({ activePage }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuthContext();

  const handleNavigation = (path: string, tab?: string) => {
    if (tab) {
      navigate(`${path}?tab=${tab}`);
      toast.info(`Navigating to ${tab} tab`);
    } else {
      navigate(path);
      toast.info(`Navigating to ${path}`);
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
  };

  // Get user initials for avatar
  const getInitials = () => {
    if (!user?.email) return "A";
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="hidden md:flex w-64 flex-col bg-white border-r">
      <div className="p-4 flex items-center gap-2 border-b">
        <h1 className="text-xl font-bold">
          <span className="text-[#9b87f5]">Glidr</span>
          <span className="text-gray-800">click</span>
        </h1>
        <Badge variant="outline" className="ml-auto bg-gray-100">Admin</Badge>
      </div>
      
      {user && (
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-purple-100 text-purple-700">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="font-medium truncate">{user.email}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col flex-grow p-4 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Admin</h3>
          <Button 
            variant={activePage === "admin-dashboard" ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => handleNavigation("/admin-dashboard")}
          >
            <LayoutDashboard size={18} className={activePage === "admin-dashboard" ? "text-white" : "text-glidr-purple"} /> Dashboard
          </Button>
          <Button 
            variant={location.search.includes("tab=users") ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => handleNavigation("/admin-dashboard", "users")}
          >
            <Users size={18} /> User Management
          </Button>
          <Button 
            variant={location.search.includes("tab=analytics") ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => handleNavigation("/admin-dashboard", "analytics")}
          >
            <BarChart size={18} /> System Analytics
          </Button>
          <Button 
            variant={location.search.includes("tab=security") ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => handleNavigation("/admin-dashboard", "security")}
          >
            <Shield size={18} /> Security
          </Button>
        </div>

        <div className="space-y-1">
          <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Settings</h3>
          <Button 
            variant={location.search.includes("tab=settings") ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => handleNavigation("/admin-dashboard", "settings")}
          >
            <Settings size={18} /> System Settings
          </Button>
        </div>
        
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-glidr-purple border border-dashed border-glidr-purple/50 hover:bg-glidr-purple/10"
          onClick={() => handleNavigation("/dashboard")}
        >
          <ChevronRight size={18} /> Back to User Dashboard
        </Button>

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

export default AdminSidebar;
