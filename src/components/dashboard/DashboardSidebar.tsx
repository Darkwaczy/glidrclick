
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileEdit,
  Share2,
  Calendar,
  BarChartBig,
  Settings,
  CreditCard
} from "lucide-react";
import { useAuthContext } from '@/context/AuthContext';

interface DashboardSidebarProps {
  activePage: string;
}

const DashboardSidebar = ({ activePage }: DashboardSidebarProps) => {
  const location = useLocation();
  const { user, signOut } = useAuthContext();
  const [isSigningOut, setIsSigningOut] = useState(false);
  
  const sidebarLinks = [
    { name: 'overview', icon: <LayoutDashboard size={18} />, text: 'Overview', path: '/dashboard/overview' },
    { name: 'content', icon: <FileEdit size={18} />, text: 'Content', path: '/dashboard/content' },
    { name: 'social', icon: <Share2 size={18} />, text: 'Social', path: '/dashboard/social' },
    { name: 'schedule', icon: <Calendar size={18} />, text: 'Schedule', path: '/dashboard/schedule' },
    { name: 'analytics', icon: <BarChartBig size={18} />, text: 'Analytics', path: '/dashboard/analytics' },
    { name: 'billing', icon: <CreditCard size={18} />, text: 'Billing', path: '/dashboard/billing' },
    { name: 'settings', icon: <Settings size={18} />, text: 'Settings', path: '/dashboard/settings' },
  ];
  
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="flex flex-col w-64 glass-card border-white/20 border-r-0 rounded-none">
      <div className="flex items-center gap-4 p-4 border-b border-white/10">
        <Avatar className="ring-2 ring-neon-electric/50">
          <AvatarImage src={user?.user_metadata?.avatar_url as string} />
          <AvatarFallback className="bg-gradient-to-r from-neon-electric to-neon-pink text-white">
            {user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-white">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</span>
        </div>
      </div>
      <div className="flex-1 p-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  activePage === link.name
                    ? "bg-gradient-to-r from-neon-electric/20 to-neon-pink/20 text-white border border-neon-electric/30"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <span className={cn(
                  "transition-colors",
                  activePage === link.name ? "text-neon-electric" : ""
                )}>
                  {link.icon}
                </span>
                <span className="ml-2">{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-white/10">
        <Button 
          variant="outline" 
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-neon-electric/50"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? "Signing Out..." : "Sign Out"}
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
