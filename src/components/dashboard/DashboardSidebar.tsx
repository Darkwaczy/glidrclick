
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
    { name: 'dashboard', icon: <LayoutDashboard size={18} />, text: 'Dashboard', path: '/dashboard/content' },
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
    <div className="flex flex-col border-r w-64 bg-white">
      <div className="flex items-center gap-4 p-4 border-b">
        <Avatar>
          <AvatarImage src={user?.user_metadata?.avatar_url as string} />
          <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{user?.user_metadata?.full_name || user?.email}</span>
          <span className="text-sm text-gray-500">{user?.email}</span>
        </div>
      </div>
      <div className="flex-1 p-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 transition-colors",
                  activePage === link.name
                    ? "bg-gray-100 text-[#9b87f5]"
                    : "text-gray-700"
                )}
              >
                {link.icon}
                <span className="ml-2">{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full"
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
