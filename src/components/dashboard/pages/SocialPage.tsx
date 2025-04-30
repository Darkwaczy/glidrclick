
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Import utilities and functions
import { 
  getSocialPlatforms, 
  connectPlatform, 
  disconnectPlatform, 
  updatePlatformSettings,
  publishToSocialMedia,
  schedulePost,
  getScheduledPosts,
  getPublishedPosts,
  getPlatformName
} from "@/utils/social";

// Import refactored components
import ConnectedPlatformsList from "../social/ConnectedPlatformsList";
import MentionsList from "../social/MentionsList";
import ScheduledPostsList from "../social/ScheduledPostsList";

// Import dialogs
import ConnectPlatformDialog from "../social/dialogs/ConnectPlatformDialog";
import PlatformSettingsDialog from "../social/dialogs/PlatformSettingsDialog";
import ReplyMentionDialog from "../social/dialogs/ReplyMentionDialog";
import CreatePostDialog from "../social/dialogs/CreatePostDialog";
import EditPostDialog from "../social/dialogs/EditPostDialog";

interface Mention {
  id: string;
  platform: string;
  username: string;
  timeAgo: string;
  content: string;
}

const SocialPage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<string | null>(null);
  const [replyingToMention, setReplyingToMention] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [mentionsList, setMentionsList] = useState<Mention[]>([]);
  const [scheduledPostsList, setScheduledPostsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPlatforms();
    loadScheduledPosts();
    loadMentions();

    const urlParams = new URLSearchParams(window.location.search);
    const connectedPlatform = urlParams.get('connected');
    const error = urlParams.get('error');
    
    if (connectedPlatform) {
      savePlatformConnection(connectedPlatform);
      toast.success(`Connected to ${getPlatformName(connectedPlatform)} successfully!`);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      toast.error(`Connection failed: ${error}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
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

  // Get the currently edited post
  const currentEditingPost = editingPostId 
    ? scheduledPostsList.find(post => post.id === editingPostId) 
    : null;

  // Get the mention being replied to
  const currentReplyMention = replyingToMention 
    ? mentionsList.find(mention => mention.id === replyingToMention) 
    : null;

  // Get the platform being configured
  const currentPlatformObj = currentPlatform 
    ? platforms.find(p => p.id === currentPlatform) 
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Social Media Management</h1>
          <p className="text-gray-600">Connect and manage your social media accounts</p>
        </div>
        
        <Button onClick={handleRefreshConnections} disabled={isRefreshing || isLoading}>
          <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> 
          {isRefreshing ? 'Refreshing...' : 'Refresh Connections'}
        </Button>
      </div>
      
      <Tabs defaultValue="connected">
        <TabsList>
          <TabsTrigger value="connected">Connected Accounts</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
          <TabsTrigger value="schedule">Post Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connected" className="mt-6">
          <ConnectedPlatformsList
            platforms={platforms}
            isLoading={isLoading}
            onOpenPlatformSettings={handleOpenPlatformSettings}
            onDisconnectPlatform={handleDisconnectPlatform}
            onOpenConnectDialog={handleOpenConnectDialog}
          />
        </TabsContent>
        
        <TabsContent value="mentions" className="mt-6">
          <MentionsList
            mentions={mentionsList}
            onReply={handleOpenReplyDialog}
            onMarkAsRead={handleMarkAsRead}
          />
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-6">
          <ScheduledPostsList
            posts={scheduledPostsList}
            onCreatePost={handleCreatePost}
            onEditPost={setEditingPostId}
            onCancelPost={handleCancelPost}
          />
        </TabsContent>
      </Tabs>
      
      {/* Dialogs */}
      <PlatformSettingsDialog
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
        platform={currentPlatformObj}
        onSaveSettings={handleSavePlatformSettings}
      />
      
      <ConnectPlatformDialog
        open={showConnectDialog}
        onOpenChange={setShowConnectDialog}
        onConnect={handleConnectPlatform}
      />
      
      <ReplyMentionDialog
        open={replyingToMention !== null}
        onOpenChange={(open) => !open && setReplyingToMention(null)}
        mention={currentReplyMention}
        replyContent={replyContent}
        onReplyContentChange={setReplyContent}
        onSubmitReply={handleSubmitReply}
      />
      
      <CreatePostDialog
        open={showCreatePostDialog}
        onOpenChange={setShowCreatePostDialog}
        platforms={platforms}
        onSubmit={handleSubmitNewPost}
      />
      
      <EditPostDialog
        open={editingPostId !== null}
        onOpenChange={() => setEditingPostId(null)}
        post={currentEditingPost}
        onSubmit={handleUpdatePost}
      />
    </div>
  );
};

export default SocialPage;
