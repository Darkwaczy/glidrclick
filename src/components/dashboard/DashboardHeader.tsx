
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
    <header className="glass-card border-white/20 sticky top-0 z-20">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden text-white hover:bg-white/10"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex text-white hover:bg-white/10"
            onClick={() => navigate("/dashboard")}
          >
            <h1 className="text-xl font-bold">
              <span className="gradient-text">Flow</span>
              <span className="text-white">Craft</span>
            </h1>
          </Button>

          <div className="hidden md:flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate("/dashboard/schedule")}
            >
              <Calendar size={16} className="mr-2" /> Schedule
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
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
            className="hidden sm:flex bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={onWatchDemo}
          >
            <HelpCircle size={16} className="mr-2" /> How It Works
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                <Bell size={20} />
                {user && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-neon-pink rounded-full animate-pulse-neon"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass-card border-white/20">
              <div className="p-4 text-center">
                {user ? (
                  <>
                    <h3 className="font-semibold mb-2 text-white">No new notifications</h3>
                    <p className="text-sm text-gray-300">
                      We'll notify you when something important happens.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold mb-2 text-white">Sign in to view notifications</h3>
                    <Button 
                      size="sm" 
                      className="mt-2 btn-neon"
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
              <Button variant="ghost" size="sm" className="gap-1 text-white hover:bg-white/10">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-neon-electric to-neon-pink flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <span className="hidden md:inline">
                  {user ? user.email?.split('@')[0] : 'Account'}
                </span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card border-white/20">
              {user ? (
                <>
                  <DropdownMenuItem 
                    onClick={() => navigate("/dashboard/profile")}
                    className="text-white hover:bg-white/10"
                  >
                    <User size={16} className="mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => navigate("/dashboard/settings")}
                    className="text-white hover:bg-white/10"
                  >
                    <Settings size={16} className="mr-2" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="text-white hover:bg-white/10"
                  >
                    <LogOut size={16} className="mr-2" /> Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem 
                  onClick={() => navigate("/auth")}
                  className="text-white hover:bg-white/10"
                >
                  <User size={16} className="mr-2" /> Sign In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile Menu for Dashboard */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-white/10">
          <div className="flex flex-col p-4 space-y-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start text-white hover:bg-white/10"
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
              className="justify-start text-white hover:bg-white/10"
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
              className="justify-start text-white hover:bg-white/10"
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
              className="justify-start text-white hover:bg-white/10"
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
