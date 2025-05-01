
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  ChevronDown, 
  LayoutDashboard,
  Settings,
  LogOut,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [notificationsCount, setNotificationsCount] = useState(3);

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
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/558779ac-cf8b-4763-986c-b8e82bc29c03.png" 
              alt="Glidrclick Logo" 
              className="h-[150px] w-[250px] object-contain mr-2"
            />
            <span className="text-lg font-semibold">Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {notificationsCount > 0 && (
                  <Badge className="absolute top-0 right-0 h-4 w-4 p-0 bg-red-500">{notificationsCount}</Badge>
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
                    <p className="font-medium">New user registered</p>
                    <p className="text-sm text-gray-500">Michael Brown has signed up for a Free Trial.</p>
                    <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div>
                    <p className="font-medium">System Alert</p>
                    <p className="text-sm text-gray-500">Twitter API rate limiting causing delays.</p>
                    <p className="text-xs text-gray-400 mt-1">20 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div>
                    <p className="font-medium">Backup Completed</p>
                    <p className="text-sm text-gray-500">Daily database backup completed successfully.</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
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
                <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <span className="hidden sm:inline">Admin</span>
                <ChevronDown size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/admin-profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/admin-dashboard?tab=settings")}>
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

export default AdminHeader;
