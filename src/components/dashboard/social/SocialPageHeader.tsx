
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface SocialPageHeaderProps {
  isRefreshing: boolean;
  isLoading: boolean;
  processingOAuth: boolean;
  onRefresh: () => void;
  onOpenConnectDialog?: () => void; // Added this prop
}

const SocialPageHeader: React.FC<SocialPageHeaderProps> = ({
  isRefreshing,
  isLoading,
  processingOAuth,
  onRefresh,
  onOpenConnectDialog
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Social Media Management</h1>
        <p className="text-gray-600">Connect and manage your social media accounts</p>
      </div>
      
      <div className="flex gap-2">
        {onOpenConnectDialog && (
          <Button variant="outline" onClick={onOpenConnectDialog}>
            Connect Platform
          </Button>
        )}
        <Button onClick={onRefresh} disabled={isRefreshing || isLoading || processingOAuth}>
          <RefreshCw size={16} className={`mr-2 ${isRefreshing || processingOAuth ? 'animate-spin' : ''}`} /> 
          {processingOAuth ? 'Processing...' : isRefreshing ? 'Refreshing...' : 'Refresh Connections'}
        </Button>
      </div>
    </div>
  );
};

export default SocialPageHeader;
