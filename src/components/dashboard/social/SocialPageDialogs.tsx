
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
        open={social.showSettingsDialog}
        onOpenChange={social.setShowSettingsDialog}
        platform={social.currentPlatformObj}
        onSaveSettings={social.handleSavePlatformSettings}
      />
      
      <ConnectPlatformDialog
        open={social.showConnectDialog}
        onOpenChange={social.setShowConnectDialog}
        onConnect={social.handleConnectPlatform}
      />
      
      <ReplyMentionDialog
        open={social.replyingToMention !== null}
        onOpenChange={(open) => !open && social.setReplyingToMention(null)}
        mention={social.currentReplyMention}
        replyContent={social.replyContent}
        onReplyContentChange={social.setReplyContent}
        onSubmitReply={social.handleSubmitReply}
      />
      
      <CreatePostDialog
        open={social.showCreatePostDialog}
        onOpenChange={(open) => {
          if (typeof social.handleCreatePost === 'function' && open) {
            social.handleCreatePost();
          } else {
            // Close the dialog when open is false
            social.handleSubmitNewPost(new Event('close') as unknown as React.FormEvent);
          }
        }}
        platforms={social.platforms}
        onSubmit={social.handleSubmitNewPost}
      />
      
      <EditPostDialog
        open={social.editingPostId !== null}
        onOpenChange={() => social.setEditingPostId(null)}
        post={social.currentEditingPost}
        onSubmit={social.handleUpdatePost}
      />
      
      <ConnectWordPressDialog
        open={social.showWordPressDialog}
        onOpenChange={social.setShowWordPressDialog}
      />
    </>
  );
};

export default SocialPageDialogs;
