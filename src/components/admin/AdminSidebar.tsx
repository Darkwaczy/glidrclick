
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart,
  Shield,
  LogOut
} from "lucide-react";

interface AdminSidebarProps {
  activePage: string;
}

const AdminSidebar = ({ activePage }: AdminSidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="hidden md:flex w-64 flex-col bg-white border-r">
      <div className="p-4 flex items-center gap-2 border-b">
        <h1 className="text-xl font-bold gradient-text">Glidrclick</h1>
        <Badge variant="outline" className="ml-auto bg-gray-100">Admin</Badge>
      </div>
      <div className="flex flex-col flex-grow p-4 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Admin</h3>
          <Button 
            variant={activePage === "admin-dashboard" ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => navigate("/admin-dashboard")}
          >
            <LayoutDashboard size={18} className={activePage === "admin-dashboard" ? "text-white" : "text-glidr-purple"} /> Dashboard
          </Button>
          <Button 
            variant={activePage === "users" ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => navigate("/admin-dashboard?tab=users")}
          >
            <Users size={18} /> User Management
          </Button>
          <Button 
            variant={activePage === "analytics" ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => navigate("/admin-dashboard?tab=analytics")}
          >
            <BarChart size={18} /> System Analytics
          </Button>
          <Button 
            variant={activePage === "security" ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => navigate("/admin-dashboard?tab=security")}
          >
            <Shield size={18} /> Security
          </Button>
        </div>

        <div className="space-y-1">
          <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Settings</h3>
          <Button 
            variant={activePage === "settings" ? "default" : "ghost"}
            className="w-full justify-start gap-2"
            onClick={() => navigate("/admin-dashboard?tab=settings")}
          >
            <Settings size={18} /> System Settings
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

export default AdminSidebar;
