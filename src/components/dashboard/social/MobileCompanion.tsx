
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Bell, ChartBar, Settings } from 'lucide-react';
import MobileMentionsMonitor from './MobileMentionsMonitor';
import MobileAnalyticsDashboard from './MobileAnalyticsDashboard';
import MobileNotificationSettings from './MobileNotificationSettings';
import { SocialPageHook } from '@/hooks/useSocialPage';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileCompanionProps {
  socialHook: SocialPageHook;
}

const MobileCompanion: React.FC<MobileCompanionProps> = ({ socialHook }) => {
  const isMobile = useIsMobile();
  
  if (!isMobile) {
    return null;
  }
  
  return (
    <div className="w-full">
      <Tabs defaultValue="mentions" className="w-full">
        <TabsList className="grid grid-cols-4 h-16 fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
          <TabsTrigger value="mentions" className="flex flex-col items-center justify-center py-1 h-full">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Mentions</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-col items-center justify-center py-1 h-full">
            <Bell className="h-5 w-5" />
            <span className="text-xs mt-1">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex flex-col items-center justify-center py-1 h-full">
            <ChartBar className="h-5 w-5" />
            <span className="text-xs mt-1">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex flex-col items-center justify-center py-1 h-full">
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="pb-16">
          <TabsContent value="mentions" className="pt-2">
            <MobileMentionsMonitor socialHook={socialHook} />
          </TabsContent>
          
          <TabsContent value="notifications" className="pt-2">
            <MobileNotificationSettings />
          </TabsContent>
          
          <TabsContent value="analytics" className="pt-2">
            <MobileAnalyticsDashboard />
          </TabsContent>
          
          <TabsContent value="settings" className="pt-2">
            <div className="space-y-4 p-4">
              <h2 className="text-xl font-bold">Mobile Settings</h2>
              <p className="text-gray-500">
                Configure your mobile app settings and preferences here.
              </p>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MobileCompanion;
