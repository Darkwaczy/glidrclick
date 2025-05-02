
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Bell, MessageSquare, Check, ChartBar } from 'lucide-react';
import { toast } from 'sonner';
import { 
  getUserNotificationSettings, 
  saveUserNotificationSettings, 
  NotificationSettings 
} from '@/services/contentDiscoveryService';
import { supabase } from '@/integrations/supabase/client';

const MobileNotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    enableMentions: true,
    enableEngagement: true,
    enableContentApproval: false,
    enableAnalytics: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    loadSettings();
  }, []);
  
  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.id) {
        const userSettings = await getUserNotificationSettings(user.id);
        setSettings(userSettings);
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.id) {
        await saveUserNotificationSettings(user.id, settings);
        toast.success('Notification settings saved');
      } else {
        toast.error('You must be logged in to save settings');
      }
    } catch (error) {
      console.error('Error saving notification settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Bell className="mr-2 h-5 w-5" /> 
          Push Notifications
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                <div>
                  <h4 className="text-sm font-medium">Mentions & Messages</h4>
                  <p className="text-xs text-gray-500">Alerts when someone mentions or messages you</p>
                </div>
              </div>
              <Switch 
                checked={settings.enableMentions} 
                onCheckedChange={(checked) => setSettings({...settings, enableMentions: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-4 w-4 mr-2 text-purple-500" />
                <div>
                  <h4 className="text-sm font-medium">Engagement Alerts</h4>
                  <p className="text-xs text-gray-500">Comments, likes, and shares on your posts</p>
                </div>
              </div>
              <Switch 
                checked={settings.enableEngagement} 
                onCheckedChange={(checked) => setSettings({...settings, enableEngagement: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-green-500" />
                <div>
                  <h4 className="text-sm font-medium">Content Approval</h4>
                  <p className="text-xs text-gray-500">When content needs your approval</p>
                </div>
              </div>
              <Switch 
                checked={settings.enableContentApproval} 
                onCheckedChange={(checked) => setSettings({...settings, enableContentApproval: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ChartBar className="h-4 w-4 mr-2 text-amber-500" />
                <div>
                  <h4 className="text-sm font-medium">Analytics Updates</h4>
                  <p className="text-xs text-gray-500">Weekly performance digests and milestones</p>
                </div>
              </div>
              <Switch 
                checked={settings.enableAnalytics} 
                onCheckedChange={(checked) => setSettings({...settings, enableAnalytics: checked})}
              />
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSaveSettings} 
          disabled={isLoading || isSaving} 
          className="w-full"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MobileNotificationSettings;
