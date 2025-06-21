
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
    <Tabs defaultValue="connected">
      <TabsList className="glass-card border-white/20">
        <TabsTrigger value="connected" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">Connected Accounts</TabsTrigger>
        <TabsTrigger value="mentions" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">Mentions</TabsTrigger>
        <TabsTrigger value="schedule" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">Post Schedule</TabsTrigger>
      </TabsList>
      
      <TabsContent value="connected" className="mt-6">
        <ConnectedPlatformsList
          platforms={social.platforms}
          isLoading={social.isLoading}
          onOpenPlatformSettings={social.handleOpenPlatformSettings}
          onDisconnectPlatform={social.handleDisconnectPlatform}
          onOpenConnectDialog={social.handleOpenConnectDialog}
        />
      </TabsContent>
      
      <TabsContent value="mentions" className="mt-6">
        <MentionsList
          mentions={social.mentionsList}
          onReply={social.handleOpenReplyDialog}
          onMarkAsRead={social.handleMarkAsRead}
        />
      </TabsContent>
      
      <TabsContent value="schedule" className="mt-6">
        <ScheduledPostsList
          posts={social.scheduledPostsList}
          onCreatePost={social.handleCreatePost}
          onEditPost={social.setEditingPostId}
          onCancelPost={social.handleCancelPost}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SocialPageTabs;
