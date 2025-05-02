
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, User, Search, Play } from "lucide-react";

interface DashboardHeaderProps {
  onWatchDemo: () => void;
}

const DashboardHeader = ({ onWatchDemo }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white p-4 border-b flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center md:hidden">
        <h1 className="text-xl font-bold gradient-text">Glidrclick</h1>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={onWatchDemo}
        >
          <Play size={16} /> Watch Demo
        </Button>
        
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-8 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </Button>
        
        <Button variant="ghost" size="icon">
          <User size={20} />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
