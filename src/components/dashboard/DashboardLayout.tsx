
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ChartBar, Users, Settings, Calendar, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const sidebarItems = [
  { icon: ChartBar, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: PlusCircle, label: 'Create', path: '/dashboard/create' },
  { icon: Users, label: 'Users', path: '/dashboard/users' },
  { icon: Calendar, label: 'Calendar', path: '/dashboard/calendar' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export function DashboardLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
          collapsed ? "w-[60px]" : "w-[240px]",
          isMobile && collapsed && "w-0"
        )}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold">Dashboard</h1>}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100",
                    location.pathname === item.path && "bg-gray-100 font-medium"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
