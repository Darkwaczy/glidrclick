
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ConnectedPlatformsList from "./ConnectedPlatformsList";
import MentionsList from "./MentionsList";
import ScheduledPostsList from "./ScheduledPostsList";
import { SocialPageHook } from "@/hooks/useSocialPage";

interface SocialPageTabsProps {
  social: SocialPageHook;
}

const SocialPageTabs: React.FC<SocialPageTabsProps> = ({ social }) => {
  return (
    <div className="bg-transparent">
      <Tabs defaultValue="connected">
        <TabsList className="glass-card border-white/20 bg-dark-secondary/50">
          <TabsTrigger value="connected" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">Connected Accounts</TabsTrigger>
          <TabsTrigger value="mentions" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">Mentions</TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">Post Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connected" className="mt-6 bg-transparent">
          <ConnectedPlatformsList
            platforms={social.platforms}
            isLoading={social.isLoading}
            onOpenPlatformSettings={social.handleOpenPlatformSettings}
            onDisconnectPlatform={social.handleDisconnectPlatform}
            onOpenConnectDialog={social.handleOpenConnectDialog}
          />
        </TabsContent>
        
        <TabsContent value="mentions" className="mt-6 bg-transparent">
          <MentionsList
            mentions={social.mentionsList}
            onReply={social.handleOpenReplyDialog}
            onMarkAsRead={social.handleMarkAsRead}
          />
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-6 bg-transparent">
          <ScheduledPostsList
            posts={social.scheduledPostsList}
            onCreatePost={social.handleCreatePost}
            onEditPost={social.setEditingPostId}
            onCancelPost={social.handleCancelPost}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialPageTabs;
