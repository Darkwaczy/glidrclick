
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface PlatformSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: any | null;
  onSaveSettings: (platformId: string, settings: any) => void;
}

const PlatformSettingsDialog = ({ 
  open, 
  onOpenChange, 
  platform, 
  onSaveSettings 
}: PlatformSettingsDialogProps) => {
  if (!platform) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {platform.name} Settings
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label>Sync Frequency</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={platform.syncFrequency || "daily"}
              onChange={(e) => {
                onSaveSettings(platform.id, {
                  syncFrequency: e.target.value as "realtime" | "hourly" | "daily"
                });
              }}
            >
              <option value="realtime">Real-time</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label>Notification Preferences</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-mentions">Mentions & Comments</Label>
                <input
                  id="notify-mentions"
                  type="checkbox"
                  className="h-4 w-4"
                  defaultChecked={platform.notifications?.mentions}
                  onChange={(e) => {
                    onSaveSettings(platform.id, {
                      notifications: {
                        ...platform.notifications,
                        mentions: e.target.checked
                      }
                    });
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-messages">Direct Messages</Label>
                <input
                  id="notify-messages"
                  type="checkbox"
                  className="h-4 w-4"
                  defaultChecked={platform.notifications?.messages}
                  onChange={(e) => {
                    onSaveSettings(platform.id, {
                      notifications: {
                        ...platform.notifications,
                        messages: e.target.checked
                      }
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlatformSettingsDialog;
