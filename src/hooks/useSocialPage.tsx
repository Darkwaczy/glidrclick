
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  getSocialPlatforms,
  connectPlatform,
  disconnectPlatform,
  updatePlatformSettings,
  publishToSocialMedia,
  schedulePost,
  getScheduledPosts,
  handleOAuthCallback,
  getPlatformName
} from "@/utils/social";

interface Mention {
  id: string;
  platform: string;
  username: string;
  timeAgo: string;
  content: string;
}

export const useSocialPage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [showWordPressDialog, setShowWordPressDialog] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null);
  const [replyingToMention, setReplyingToMention] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [mentionsList, setMentionsList] = useState<Mention[]>([]);
  const [scheduledPostsList, setScheduledPostsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingOAuth, setProcessingOAuth] = useState(false);

  useEffect(() => {
    // Add event listener for showing WordPress dialog
    window.addEventListener('show-wordpress-dialog', () => {
      setShowWordPressDialog(true);
    });

    return () => {
      window.removeEventListener('show-wordpress-dialog', () => {
        setShowWordPressDialog(true);
      });
    };
  }, []);

  useEffect(() => {
    loadPlatforms();
    loadScheduledPosts();
    loadMentions();

    // Process OAuth callback if present in URL
    const processOAuthCallback = async () => {
      const url = new URL(window.location.href);
      const urlParams = new URLSearchParams(url.search);
      const connectedPlatform = urlParams.get('connected');
      const code = urlParams.get('code');
      const error = urlParams.get('error');
      const errorReason = urlParams.get('error_reason');
      const errorDescription = urlParams.get('error_description');
      
      if (error || errorReason || errorDescription) {
        console.error("OAuth error:", { error, errorReason, errorDescription });
        toast.error(`Connection failed: ${errorDescription || errorReason || error || "Unknown error"}`);
        // Clean up URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }
      
      if (connectedPlatform && code) {
        setProcessingOAuth(true);
        try {
          console.log(`Processing OAuth callback for ${connectedPlatform} with code: ${code.substring(0, 10)}...`);
          const success = await handleOAuthCallback(connectedPlatform, code);
          if (success) {
            toast.success(`Connected to ${getPlatformName(connectedPlatform)} successfully!`);
            await loadPlatforms();
          }
        } catch (err) {
          console.error("OAuth callback error:", err);
          toast.error(`Failed to complete ${getPlatformName(connectedPlatform)} connection`);
        } finally {
          setProcessingOAuth(false);
          // Clean up URL parameters
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } else if (error) {
        toast.error(`Connection failed: ${error}`);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };
    
    processOAuthCallback();
  }, []);

  const loadMentions = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (!user?.user?.id) {
        return;
      }
      
      // Get all connected platforms
      const { data: platforms } = await supabase
        .from('social_platforms')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('is_connected', true);
        
      if (!platforms || platforms.length === 0) {
        return;
      }
      
      // Get platform IDs
      const platformIds = platforms.map(p => p.id);
      
      // Get mentions for those platforms
      const { data: mentions, error } = await supabase
        .from('mentions')
        .select('*')
        .in('platform_id', platformIds)
        .eq('is_read', false)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching mentions:", error);
        return;
      }
      
      if (mentions && mentions.length > 0) {
        // Format mentions data
        const formattedMentions = mentions.map(mention => {
          const platform = platforms.find(p => p.id === mention.platform_id);
          const createdAt = new Date(mention.created_at);
          const now = new Date();
          const diffInMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60));
          
          let timeAgo;
          if (diffInMinutes < 60) {
            timeAgo = `${diffInMinutes} minutes ago`;
          } else if (diffInMinutes < 1440) {
            timeAgo = `${Math.floor(diffInMinutes / 60)} hours ago`;
          } else {
            timeAgo = `${Math.floor(diffInMinutes / 1440)} days ago`;
          }
          
          return {
            id: mention.id,
            platform: platform ? platform.name.toLowerCase() : 'unknown',
            username: mention.username,
            timeAgo: timeAgo,
            content: mention.content
          };
        });
        
        setMentionsList(formattedMentions);
      } else {
        setMentionsList([]);
      }
    } catch (error) {
      console.error("Error loading mentions:", error);
    }
  };

  const savePlatformConnection = async (platformId: string) => {
    try {
      const user = await supabase.auth.getUser();
      
      if (!user.data?.user?.id) {
        toast.error('You must be logged in to connect platforms');
        return;
      }
      
      const { error } = await supabase
        .from('social_platforms')
        .insert({
          user_id: user.data.user.id,
          platform_id: platformId,
          name: getPlatformName(platformId),
          icon: platformId,
          is_connected: true,
          account_name: `@user_${platformId}`,
          last_sync: new Date().toISOString(),
          sync_frequency: 'daily',
          notifications: { mentions: true, messages: true }
        });
      
      if (error) throw error;
      
      loadPlatforms();
    } catch (error) {
      console.error('Error saving platform connection:', error);
      toast.error('Failed to save platform connection');
    }
  };

  const loadPlatforms = async () => {
    setIsLoading(true);
    try {
      const loadedPlatforms = await getSocialPlatforms();
      setPlatforms(loadedPlatforms);
    } catch (error) {
      console.error("Failed to load platforms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadScheduledPosts = async () => {
    try {
      const posts = await getScheduledPosts();
      setScheduledPostsList(posts || []);
    } catch (error) {
      console.error("Failed to load scheduled posts:", error);
    }
  };

  const handleRefreshConnections = async () => {
    setIsRefreshing(true);
    await loadPlatforms();
    await loadMentions();
    setIsRefreshing(false);
    toast.success("Connections refreshed successfully!");
    const posts = await getScheduledPosts();
    setScheduledPostsList(posts || []);
  };

  const handleConnectPlatform = (platformId: string) => {
    setShowConnectDialog(false);
    connectPlatform(platformId);
  };

  const handleDisconnectPlatform = async (platformId: string) => {
    const success = await disconnectPlatform(platformId);
    if (success) {
      loadPlatforms();
    }
  };

  const handleOpenPlatformSettings = (platformId: string) => {
    setCurrentPlatform(platformId);
    setShowSettingsDialog(true);
  };

  const handleSavePlatformSettings = async (platformId: string, settings: any) => {
    const success = await updatePlatformSettings(platformId, settings);
    if (success) {
      loadPlatforms();
      setShowSettingsDialog(false);
      toast.success("Settings updated successfully!");
    } else {
      toast.error("Failed to update settings.");
    }
  };

  const handleOpenConnectDialog = () => {
    setShowConnectDialog(true);
  };

  const handleOpenReplyDialog = (mentionId: string) => {
    setReplyingToMention(mentionId);
    setReplyContent("");
  };
  
  const handleSubmitReply = async () => {
    if (!replyingToMention || !replyContent.trim()) {
      toast.error("Please enter a reply message");
      return;
    }
    
    try {
      // In a real application, you would send the reply to the social platform API
      // Here we'll just mark the mention as read
      await supabase
        .from('mentions')
        .update({ is_read: true })
        .eq('id', replyingToMention);
        
      toast.success("Reply sent successfully!");
      
      setMentionsList(mentionsList.filter(mention => mention.id !== replyingToMention));
      
      setReplyingToMention(null);
      setReplyContent("");
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
    }
  };
  
  const handleMarkAsRead = async (mentionId: string) => {
    try {
      await supabase
        .from('mentions')
        .update({ is_read: true })
        .eq('id', mentionId);
        
      toast.success("Mention marked as read");
      setMentionsList(mentionsList.filter(mention => mention.id !== mentionId));
    } catch (error) {
      console.error("Error marking mention as read:", error);
      toast.error("Failed to mark as read");
    }
  };
  
  const handleCreatePost = () => {
    setShowCreatePostDialog(true);
  };
  
  const handleSubmitNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("post-title") as HTMLInputElement).value;
    const content = (form.elements.namedItem("post-content") as HTMLTextAreaElement).value;
    const date = (form.elements.namedItem("schedule-date") as HTMLInputElement).value;
    
    const selectedPlatforms: string[] = [];
    platforms.forEach(platform => {
      const checkbox = form.elements.namedItem(`platform-${platform.id}`) as HTMLInputElement;
      if (checkbox && checkbox.checked) {
        selectedPlatforms.push(platform.id);
      }
    });
    
    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }
    
    if (new Date(date) < new Date()) {
      toast.error("Please select a future date for scheduling");
      return;
    }
    
    const isImmediate = form.elements.namedItem("post-immediate") as HTMLInputElement;
    
    try {
      if (isImmediate && isImmediate.checked) {
        for (const platformId of selectedPlatforms) {
          await publishToSocialMedia(platformId, content, title);
        }
        
        toast.success("Content posted successfully!");
      } else {
        const success = await schedulePost(title, content, selectedPlatforms, new Date(date));
        if (success) {
          loadScheduledPosts();
          toast.success("Post scheduled successfully!");
        }
      }
      
      setShowCreatePostDialog(false);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("edit-post-title") as HTMLInputElement).value;
    const content = (form.elements.namedItem("edit-post-content") as HTMLTextAreaElement).value;
    const date = (form.elements.namedItem("edit-schedule-date") as HTMLInputElement).value;
    
    setScheduledPostsList(scheduledPostsList.map(post => {
      if (post.id === editingPostId) {
        return {
          ...post,
          title,
          content,
          scheduledFor: new Date(date).toLocaleString()
        };
      }
      return post;
    }));
    
    setEditingPostId(null);
    toast.success("Post updated successfully!");
  };

  const handleCancelPost = (postId: string) => {
    setScheduledPostsList(scheduledPostsList.filter(p => p.id !== postId));
    toast.success("Post has been cancelled");
  };

  return {
    // State
    isRefreshing,
    platforms,
    showSettingsDialog,
    showConnectDialog,
    showWordPressDialog,
    currentPlatform,
    replyingToMention,
    replyContent,
    showCreatePostDialog,
    editingPostId,
    mentionsList,
    scheduledPostsList,
    isLoading,
    processingOAuth,
    
    // Current objects
    currentPlatformObj: currentPlatform ? platforms.find(p => p.id === currentPlatform) : null,
    currentReplyMention: replyingToMention ? mentionsList.find(mention => mention.id === replyingToMention) : null,
    currentEditingPost: editingPostId ? scheduledPostsList.find(post => post.id === editingPostId) : null,
    
    // Actions
    setShowSettingsDialog,
    setShowConnectDialog,
    setShowWordPressDialog,
    setReplyingToMention,
    setReplyContent,
    setEditingPostId,
    handleRefreshConnections,
    handleConnectPlatform,
    handleDisconnectPlatform,
    handleOpenPlatformSettings,
    handleSavePlatformSettings,
    handleOpenConnectDialog,
    handleOpenReplyDialog,
    handleSubmitReply,
    handleMarkAsRead,
    handleCreatePost,
    handleSubmitNewPost,
    handleUpdatePost,
    handleCancelPost
  };
};

export type SocialPageHook = ReturnType<typeof useSocialPage>;
