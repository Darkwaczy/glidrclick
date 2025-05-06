
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  HelpCircle,
  Bell,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface DashboardHeaderProps {
  onWatchDemo?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onWatchDemo }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/dashboard/schedule")}
            >
              <Calendar size={16} className="mr-2" /> Schedule
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/dashboard/settings")}
            >
              <Settings size={16} className="mr-2" /> Settings
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex"
            onClick={onWatchDemo}
          >
            <HelpCircle size={16} className="mr-2" /> How It Works
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                {/* Only show notification badge if user is logged in - no dummy notifications */}
                {user && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 text-center">
                {user ? (
                  <>
                    <h3 className="font-semibold mb-2">No new notifications</h3>
                    <p className="text-sm text-gray-500">
                      We'll notify you when something important happens.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold mb-2">Sign in to view notifications</h3>
                    <Button 
                      size="sm" 
                      className="mt-2"
                      onClick={() => navigate("/auth")}
                    >
                      Sign In
                    </Button>
                  </>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={14} />
                </div>
                <span className="hidden md:inline">
                  {user ? user.email?.split('@')[0] : 'Account'}
                </span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                    <User size={16} className="mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                    <Settings size={16} className="mr-2" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut size={16} className="mr-2" /> Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => navigate("/auth")}>
                  <User size={16} className="mr-2" /> Sign In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
