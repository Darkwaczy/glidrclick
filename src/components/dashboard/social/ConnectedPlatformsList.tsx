
import React from "react";
import { RefreshCw } from "lucide-react";
import ConnectedPlatform from "./ConnectedPlatform";
import ConnectPlatformCard from "./ConnectPlatformCard";

interface ConnectedPlatformsListProps {
  platforms: any[];
  isLoading: boolean;
  onOpenPlatformSettings: (platformId: string) => void;
  onDisconnectPlatform: (platformId: string) => void;
  onOpenConnectDialog: () => void;
}

const ConnectedPlatformsList = ({
  platforms,
  isLoading,
  onOpenPlatformSettings,
  onDisconnectPlatform,
  onOpenConnectDialog
}: ConnectedPlatformsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <RefreshCw size={24} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {platforms.filter(platform => platform.isConnected).map(platform => (
        <ConnectedPlatform
          key={platform.id}
          platform={platform}
          onSettings={() => onOpenPlatformSettings(platform.id)}
          onDisconnect={() => onDisconnectPlatform(platform.id)}
        />
      ))}
      
      <ConnectPlatformCard onClick={onOpenConnectDialog} />
    </div>
  );
};

export default ConnectedPlatformsList;
