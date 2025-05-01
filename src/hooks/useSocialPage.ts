
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
  const [selectedPlatformId, setSelectedPlatformId] = useState<string | null>(null);
  const [showPlatformSettings, setShowPlatformSettings] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [selectedMentionId, setSelectedMentionId] = useState<string | null>(null);

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
    setSelectedPlatformId(platformId);
    setShowPlatformSettings(true);
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
  
  const handleCreatePost = () => {
    setShowCreatePostDialog(true);
  };
  
  const handleOpenReplyDialog = (mentionId: string) => {
    setSelectedMentionId(mentionId);
    setShowReplyDialog(true);
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

  return {
    platforms,
    isLoading,
    isRefreshing,
    processingOAuth,
    mentionsList,
    scheduledPostsList,
    selectedPlatformId,
    showPlatformSettings,
    showConnectDialog,
    showCreatePostDialog,
    showReplyDialog,
    editingPostId,
    selectedMentionId,
    setSelectedPlatformId,
    setShowPlatformSettings,
    setShowConnectDialog,
    setShowCreatePostDialog,
    setShowReplyDialog,
    setEditingPostId,
    setSelectedMentionId,
    handleRefreshConnections,
    handleOpenPlatformSettings,
    handleOpenConnectDialog,
    handleDisconnectPlatform,
    handleCreatePost,
    handleOpenReplyDialog,
    handleMarkAsRead,
    handleCancelPost
  };
};

export default useSocialPage;
