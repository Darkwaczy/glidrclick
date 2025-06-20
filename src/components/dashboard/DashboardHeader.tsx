
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
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

interface DashboardHeaderProps {
  onWatchDemo?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onWatchDemo }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b bg-white sticky top-0 z-10">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            onClick={() => navigate("/dashboard")}
          >
            <h1 className="text-xl font-bold">
              <span className="text-[#9b87f5]">Glidr</span>
              <span className="text-gray-800">click</span>
            </h1>
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
            <DropdownMenuContent align="end" className="w-80 bg-white">
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
            <DropdownMenuContent align="end" className="bg-white">
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
      
      {/* Mobile Menu for Dashboard */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white">
          <div className="flex flex-col p-4 space-y-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => {
                navigate("/dashboard");
                setIsMobileMenuOpen(false);
              }}
            >
              <LayoutDashboard size={16} className="mr-2" /> Dashboard
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => {
                navigate("/dashboard/schedule");
                setIsMobileMenuOpen(false);
              }}
            >
              <Calendar size={16} className="mr-2" /> Schedule
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => {
                navigate("/dashboard/settings");
                setIsMobileMenuOpen(false);
              }}
            >
              <Settings size={16} className="mr-2" /> Settings
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={() => {
                if (onWatchDemo) onWatchDemo();
                setIsMobileMenuOpen(false);
              }}
            >
              <HelpCircle size={16} className="mr-2" /> How It Works
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
