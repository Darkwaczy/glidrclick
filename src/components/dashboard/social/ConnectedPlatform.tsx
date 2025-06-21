
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPlatformIcon } from "./utils/platformUtils";

interface ConnectedPlatformProps {
  platform: any;
  onSettings: () => void;
  onDisconnect: () => void;
}

const ConnectedPlatform = ({ platform, onSettings, onDisconnect }: ConnectedPlatformProps) => {
  return (
    <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-electric/20 to-neon-pink/20 flex items-center justify-center mr-4">
            {getPlatformIcon(platform.id, 24)}
          </div>
          <div>
            <h3 className="font-medium text-lg text-white">{platform.name}</h3>
            <div className="flex items-center text-sm text-green-400">
              <span>Connected</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Account</span>
            <span className="font-medium text-white">{platform.accountName}</span>
          </div>
          {platform.lastSync && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Last Synced</span>
              <span className="text-gray-300">{new Date(platform.lastSync).toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Sync Frequency</span>
            <span className="text-gray-300">{platform.syncFrequency || "Daily"}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSettings}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Settings
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30" 
            onClick={onDisconnect}
          >
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedPlatform;
