
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileEdit, 
  Share2, 
  Calendar, 
  BarChart, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Content', href: '/dashboard/content', icon: <FileEdit size={20} /> },
    { name: 'Social', href: '/dashboard/social', icon: <Share2 size={20} /> },
    { name: 'Calendar', href: '/dashboard/calendar', icon: <Calendar size={20} /> },
    { name: 'Analytics', href: '/dashboard/analytics', icon: <BarChart size={20} /> },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-full bg-white shadow-md"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-30 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden transition-transform duration-300 ease-in-out`}>
        <div className="relative w-64 h-full">
          <div className="h-full bg-white border-r border-gray-200 shadow-lg pt-16 pb-4 flex flex-col">
            <div className="px-4 mb-8 text-center">
              <Link to="/" className="inline-block">
                <h1 className="text-2xl font-bold gradient-text">Glidrclick</h1>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? 'bg-glidr-soft-purple text-glidr-purple'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="px-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={() => {}}
              >
                <LogOut size={18} className="mr-2" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
        <div 
          className="absolute inset-0 bg-gray-600 bg-opacity-50" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="px-4 mb-8 text-center">
                <Link to="/" className="inline-block">
                  <h1 className="text-2xl font-bold gradient-text">Glidrclick</h1>
                </Link>
              </div>
              <nav className="flex-1 space-y-1 px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? 'bg-glidr-soft-purple text-glidr-purple'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 p-4 border-t border-gray-200">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-glidr-purple text-white">JD</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">Jane Doe</p>
                  <p className="text-xs text-gray-500">Pro Plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none pt-12 md:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
