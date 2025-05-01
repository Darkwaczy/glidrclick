
import React from "react";
import { SocialPageHook } from "@/hooks/useSocialPage";

// Import dialogs
import ConnectPlatformDialog from "./dialogs/ConnectPlatformDialog";
import PlatformSettingsDialog from "./dialogs/PlatformSettingsDialog";
import ReplyMentionDialog from "./dialogs/ReplyMentionDialog";
import CreatePostDialog from "./dialogs/CreatePostDialog";
import EditPostDialog from "./dialogs/EditPostDialog";
import ConnectWordPressDialog from "./dialogs/ConnectWordPressDialog";

interface SocialPageDialogsProps {
  social: SocialPageHook;
}

const SocialPageDialogs: React.FC<SocialPageDialogsProps> = ({ social }) => {
  return (
    <>
      <PlatformSettingsDialog
        open={social.showPlatformSettings}
        onOpenChange={social.setShowPlatformSettings}
        platformId={social.selectedPlatformId}
        platforms={social.platforms}
      />
      
      <ConnectPlatformDialog
        open={social.showConnectDialog}
        onOpenChange={social.setShowConnectDialog}
        onConnect={social.handleOpenConnectDialog}
      />
      
      <ReplyMentionDialog
        open={social.selectedMentionId !== null}
        onOpenChange={(open) => !open && social.setSelectedMentionId(null)}
        mention={social.mentionsList.find(m => m.id === social.selectedMentionId) || null}
        replyContent=""
        onReplyContentChange={() => {}}
        onSubmitReply={() => {}}
      />
      
      <CreatePostDialog
        open={social.showCreatePostDialog}
        onOpenChange={social.setShowCreatePostDialog}
        platforms={social.platforms}
        onSubmit={social.handleCreatePost}
      />
      
      <EditPostDialog
        open={social.editingPostId !== null}
        onOpenChange={() => social.setEditingPostId(null)}
        post={social.scheduledPostsList.find(p => p.id === social.editingPostId) || null}
        onSubmit={() => {}}
      />
      
      <ConnectWordPressDialog
        open={false}
        onOpenChange={() => {}}
      />
    </>
  );
};

export default SocialPageDialogs;
