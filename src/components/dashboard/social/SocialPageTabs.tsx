
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
      <TabsList>
        <TabsTrigger value="connected">Connected Accounts</TabsTrigger>
        <TabsTrigger value="mentions">Mentions</TabsTrigger>
        <TabsTrigger value="schedule">Post Schedule</TabsTrigger>
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
