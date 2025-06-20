
import { useState, useEffect } from "react";
import { usePlatforms } from "./social/usePlatforms";
import { useMentions } from "./social/useMentions";
import { useScheduledPosts } from "./social/useScheduledPosts";
import { useOAuth } from "./social/useOAuth";

export type SocialPageHook = ReturnType<typeof useSocialPage>;

export const useSocialPage = () => {
  const platforms = usePlatforms();
  const mentions = useMentions();
  const posts = useScheduledPosts();
  const oauth = useOAuth();

  // Set up WordPress dialog event listener
  useEffect(() => {
    // Add event listener for showing WordPress dialog
    window.addEventListener('show-wordpress-dialog', () => {
      platforms.setShowWordPressDialog(true);
    });

    return () => {
      window.removeEventListener('show-wordpress-dialog', () => {
        platforms.setShowWordPressDialog(true);
      });
    };
  }, []);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      await platforms.loadPlatforms();
      await mentions.loadMentions();
      await posts.loadScheduledPosts();
    };

    loadInitialData();
    
    // Process OAuth callback if present in URL
    oauth.processOAuthCallback(platforms.loadPlatforms);
  }, []);

  // Refresh all data
  const handleRefreshConnections = async () => {
    platforms.setIsRefreshing(true);
    await platforms.loadPlatforms();
    await mentions.loadMentions();
    await posts.loadScheduledPosts();
    platforms.setIsRefreshing(false);
    return true;
  };

  // Return all hooks combined into a single API
  return {
    // Platform state and methods
    platforms: platforms.platforms,
    isLoading: platforms.isLoading,
    isRefreshing: platforms.isRefreshing,
    currentPlatform: platforms.currentPlatform,
    showSettingsDialog: platforms.showSettingsDialog,
    showConnectDialog: platforms.showConnectDialog,
    showWordPressDialog: platforms.showWordPressDialog,
    setCurrentPlatform: platforms.setCurrentPlatform,
    setShowSettingsDialog: platforms.setShowSettingsDialog,
    setShowConnectDialog: platforms.setShowConnectDialog,
    setShowWordPressDialog: platforms.setShowWordPressDialog,
    handleRefreshConnections,
    handleConnectPlatform: platforms.handleConnectPlatform,
    handleDisconnectPlatform: platforms.handleDisconnectPlatform,
    handleOpenPlatformSettings: platforms.handleOpenPlatformSettings,
    handleSavePlatformSettings: platforms.handleSavePlatformSettings,
    handleOpenConnectDialog: platforms.handleOpenConnectDialog,
    
    // Mentions state and methods
    mentionsList: mentions.mentionsList,
    replyingToMention: mentions.replyingToMention,
    replyContent: mentions.replyContent,
    setReplyingToMention: mentions.setReplyingToMention,
    setReplyContent: mentions.setReplyContent,
    handleOpenReplyDialog: mentions.handleOpenReplyDialog,
    handleSubmitReply: mentions.handleSubmitReply,
    handleMarkAsRead: mentions.handleMarkAsRead,
    
    // Scheduled posts state and methods
    scheduledPostsList: posts.scheduledPostsList,
    showCreatePostDialog: posts.showCreatePostDialog,
    editingPostId: posts.editingPostId,
    setShowCreatePostDialog: posts.setShowCreatePostDialog,
    setEditingPostId: posts.setEditingPostId,
    handleCreatePost: posts.handleCreatePost,
    handleSubmitNewPost: posts.handleSubmitNewPost,
    handleUpdatePost: posts.handleUpdatePost,
    handleCancelPost: posts.handleCancelPost,
    
    // OAuth state and methods
    processingOAuth: oauth.processingOAuth,
    
    // Computed properties
    currentPlatformObj: platforms.currentPlatform ? platforms.platforms.find(p => p.id === platforms.currentPlatform) : null,
    currentReplyMention: mentions.replyingToMention ? mentions.mentionsList.find(mention => mention.id === mentions.replyingToMention) : null,
    currentEditingPost: posts.editingPostId ? posts.scheduledPostsList.find(post => post.id === posts.editingPostId) : null,
  };
};

export default useSocialPage;
