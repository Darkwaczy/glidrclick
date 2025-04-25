
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, ChevronDown, LayoutDashboard, 
  Settings, LogOut, User
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardHeader = ({ title = "Dashboard" }: { title?: string }) => {
  const navigate = useNavigate();
  const [notificationsCount, setNotificationsCount] = useState(2);
  
  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  const handleNotificationClick = () => {
    toast.info("Viewing notifications");
    setNotificationsCount(0);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-2 items-center">
          <Button variant="ghost" className="md:hidden">
            <LayoutDashboard size={20} />
          </Button>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {notificationsCount > 0 && (
                  <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    {notificationsCount}
                  </div>
                )}
                <Bell size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-medium">Notifications</div>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-auto">
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div>
                    <p className="font-medium">Post Scheduled</p>
                    <p className="text-sm text-gray-500">Your post "10 Ways to Improve Your Social Media Strategy" has been scheduled for tomorrow.</p>
                    <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div>
                    <p className="font-medium">Post Published</p>
                    <p className="text-sm text-gray-500">Your post "Email Marketing Best Practices for 2025" has been published.</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 text-center cursor-pointer">
                <Button variant="ghost" className="w-full" onClick={handleNotificationClick}>
                  Mark all as read
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Separator orientation="vertical" className="h-6" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-glidr-purple flex items-center justify-center text-white font-semibold">
                  U
                </div>
                <span className="hidden sm:inline">User</span>
                <ChevronDown size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
