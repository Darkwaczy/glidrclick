
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
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            {getPlatformIcon(platform.id, 24)}
          </div>
          <div>
            <h3 className="font-medium text-lg">{platform.name}</h3>
            <div className="flex items-center text-sm text-green-600">
              <span>Connected</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Account</span>
            <span className="font-medium">{platform.accountName}</span>
          </div>
          {platform.lastSync && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Last Synced</span>
              <span>{new Date(platform.lastSync).toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Sync Frequency</span>
            <span>{platform.syncFrequency || "Daily"}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-between">
          <Button variant="outline" size="sm" onClick={onSettings}>
            Settings
          </Button>
          <Button variant="outline" size="sm" className="text-red-600" onClick={onDisconnect}>
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedPlatform;
