
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updatePlatformSettings } from "@/utils/social/platforms";

interface PlatformSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platformId: string | null;
  platforms: any[];
}

const PlatformSettingsDialog = ({ 
  open, 
  onOpenChange, 
  platformId, 
  platforms 
}: PlatformSettingsDialogProps) => {
  const platform = platforms.find(p => p.id === platformId);
  
  const [settings, setSettings] = useState({
    notifyMentions: true,
    notifyMessages: true,
    syncFrequency: 'daily'
  });
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!platformId) return;
    
    try {
      const result = await updatePlatformSettings(platformId, {
        notifications: {
          mentions: settings.notifyMentions,
          messages: settings.notifyMessages
        },
        syncFrequency: settings.syncFrequency
      });
      
      if (result) {
        toast.success("Settings updated successfully");
        onOpenChange(false);
      } else {
        toast.error("Failed to update settings");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("An error occurred while updating settings");
    }
  };
  
  if (!platform) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{platform.name} Settings</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-mentions" className="flex-1">
                    Notify about mentions
                  </Label>
                  <Switch 
                    id="notify-mentions" 
                    checked={settings.notifyMentions}
                    onCheckedChange={(checked) => setSettings({...settings, notifyMentions: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="notify-messages" className="flex-1">
                    Notify about messages
                  </Label>
                  <Switch 
                    id="notify-messages" 
                    checked={settings.notifyMessages}
                    onCheckedChange={(checked) => setSettings({...settings, notifyMessages: checked})}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Data Synchronization</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="sync-frequency">Sync Frequency</Label>
                  <Select 
                    value={settings.syncFrequency}
                    onValueChange={(value) => setSettings({...settings, syncFrequency: value})}
                  >
                    <SelectTrigger id="sync-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Account Information</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="account-name">Account Name</Label>
                  <Input 
                    id="account-name" 
                    value={platform.accountName || 'Not available'} 
                    disabled 
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="last-sync">Last Synchronized</Label>
                  <Input 
                    id="last-sync" 
                    value={platform.lastSync ? new Date(platform.lastSync).toLocaleString() : 'Never'} 
                    disabled 
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlatformSettingsDialog;
