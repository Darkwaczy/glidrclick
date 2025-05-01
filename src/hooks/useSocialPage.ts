
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getSocialPlatforms, disconnectPlatform } from '@/utils/social/platforms';

export type SocialPageHook = ReturnType<typeof useSocialPage>;

export const useSocialPage = () => {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [processingOAuth, setProcessingOAuth] = useState(false);
  const [mentionsList, setMentionsList] = useState<any[]>([]);
  const [scheduledPostsList, setScheduledPostsList] = useState<any[]>([]);
  
  // Property names updated to match what's used in SocialPageDialogs
  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
  const [replyingToMention, setReplyingToMention] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [showWordPressDialog, setShowWordPressDialog] = useState(false);

  // Load platforms on component mount
  useEffect(() => {
    const loadPlatforms = async () => {
      setIsLoading(true);
      try {
        const platformsData = await getSocialPlatforms();
        setPlatforms(platformsData);
        
        // Also load mentions and scheduled posts data here if needed
        // For demo purposes, we'll use mock data
        setMentionsList([
          { 
            id: '1', 
            username: '@user1', 
            content: 'Great content!', 
            platform: 'twitter', 
            createdAt: new Date().toISOString(),
            isRead: false
          },
          { 
            id: '2', 
            username: '@user2', 
            content: 'Love the post about social media strategies!', 
            platform: 'facebook',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            isRead: true
          }
        ]);
        
        setScheduledPostsList([
          {
            id: '1',
            title: 'Weekly Social Media Tips',
            platforms: ['facebook', 'twitter'],
            scheduledFor: new Date(Date.now() + 86400000).toISOString(),
            status: 'scheduled'
          },
          {
            id: '2',
            title: 'Engagement Strategies for 2025',
            platforms: ['linkedin', 'facebook'],
            scheduledFor: new Date(Date.now() + 172800000).toISOString(),
            status: 'scheduled'
          }
        ]);
        
      } catch (error) {
        console.error("Error loading social data:", error);
        toast.error("Failed to load social platform data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPlatforms();
    
    // Check for OAuth process params in URL
    const urlParams = new URLSearchParams(window.location.search);
    const platform = urlParams.get('platform');
    const code = urlParams.get('code');
    
    if (platform && code) {
      setProcessingOAuth(true);
      // Here we would handle OAuth callback
      // For now we'll simulate the process
      setTimeout(() => {
        toast.success(`Successfully connected to ${platform}!`);
        setProcessingOAuth(false);
        
        // Clear URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Refresh platforms
        loadPlatforms();
      }, 2000);
    }
  }, []);

  const handleRefreshConnections = async () => {
    setIsRefreshing(true);
    try {
      const platformsData = await getSocialPlatforms();
      setPlatforms(platformsData);
      toast.success("Social connections refreshed");
    } catch (error) {
      console.error("Error refreshing connections:", error);
      toast.error("Failed to refresh social connections");
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const handleOpenPlatformSettings = (platformId: string) => {
    setCurrentPlatform(platformId);
    setShowSettingsDialog(true);
  };
  
  const handleOpenConnectDialog = () => {
    setShowConnectDialog(true);
  };
  
  const handleDisconnectPlatform = async (platformId: string) => {
    if (confirm("Are you sure you want to disconnect this platform?")) {
      try {
        await disconnectPlatform(platformId);
        setPlatforms(platforms.map(p => 
          p.id === platformId ? {...p, isConnected: false} : p
        ));
        toast.success("Platform disconnected successfully");
      } catch (error) {
        console.error("Error disconnecting platform:", error);
        toast.error("Failed to disconnect platform");
      }
    }
  };
  
  // Add this function to match what's being used in SocialPageDialogs
  const handleConnectPlatform = async (platformId: string) => {
    try {
      // This would be implemented to connect to a platform
      toast.success(`Connecting to ${platformId}...`);
      
      // Update platform connection status after successful connection
      setPlatforms(platforms.map(p => 
        p.id === platformId ? {...p, isConnected: true} : p
      ));
      
      return true;
    } catch (error) {
      console.error("Error connecting to platform:", error);
      toast.error("Failed to connect to platform");
      return false;
    }
  };
  
  const handleCreatePost = () => {
    setShowCreatePostDialog(true);
  };
  
  const handleOpenReplyDialog = (mentionId: string) => {
    setReplyingToMention(mentionId);
  };
  
  const handleSubmitReply = async () => {
    if (!replyContent.trim()) {
      toast.error("Please enter a reply");
      return;
    }
    
    try {
      // Submit reply logic would go here
      toast.success("Reply sent successfully");
      setReplyingToMention(null);
      setReplyContent("");
      
      // Update mentions list to mark as read
      setMentionsList(mentionsList.map(mention => 
        mention.id === replyingToMention ? {...mention, isRead: true} : mention
      ));
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
    }
  };
  
  const handleMarkAsRead = async (mentionId: string) => {
    try {
      // In a real app, we'd update the database
      setMentionsList(mentionsList.map(mention => 
        mention.id === mentionId ? {...mention, isRead: true} : mention
      ));
      toast.success("Marked as read");
    } catch (error) {
      console.error("Error marking mention as read:", error);
      toast.error("Failed to update mention");
    }
  };
  
  const handleCancelPost = async (postId: string) => {
    if (confirm("Are you sure you want to cancel this post?")) {
      try {
        // In a real app, we'd update the database
        setScheduledPostsList(scheduledPostsList.filter(post => post.id !== postId));
        toast.success("Post cancelled");
      } catch (error) {
        console.error("Error cancelling post:", error);
        toast.error("Failed to cancel post");
      }
    }
  };
  
  // Add this function to match what's being used in SocialPageDialogs
  const handleUpdatePost = async (formData: any) => {
    try {
      // Update post logic would go here
      const { id, title, content, scheduledFor } = formData;
      
      setScheduledPostsList(scheduledPostsList.map(post => 
        post.id === id ? {...post, title, content, scheduledFor} : post
      ));
      
      setEditingPostId(null);
      toast.success("Post updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
      return false;
    }
  };

  return {
    platforms,
    isLoading,
    isRefreshing,
    processingOAuth,
    mentionsList,
    scheduledPostsList,
    currentPlatform,
    showSettingsDialog,
    showConnectDialog,
    showCreatePostDialog,
    replyingToMention,
    replyContent,
    editingPostId,
    showWordPressDialog,
    setCurrentPlatform,
    setShowSettingsDialog,
    setShowConnectDialog,
    setShowCreatePostDialog,
    setReplyingToMention,
    setReplyContent,
    setEditingPostId,
    setShowWordPressDialog,
    handleRefreshConnections,
    handleOpenPlatformSettings,
    handleOpenConnectDialog,
    handleDisconnectPlatform,
    handleConnectPlatform,
    handleCreatePost,
    handleOpenReplyDialog,
    handleMarkAsRead,
    handleCancelPost,
    handleSubmitReply,
    handleUpdatePost
  };
};

export default useSocialPage;
