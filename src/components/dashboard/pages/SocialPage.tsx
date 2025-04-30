import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Share2, RefreshCw, Plus, X, Instagram, Facebook, Twitter, Linkedin, Link2, FileText, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
          {isLoading ? (
            <div className="flex justify-center py-12">
              <RefreshCw size={24} className="animate-spin text-gray-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platforms.filter(platform => platform.isConnected).map(platform => (
                <ConnectedPlatform
                  key={platform.id}
                  platform={platform}
                  onSettings={() => handleOpenPlatformSettings(platform.id)}
                  onDisconnect={() => handleDisconnectPlatform(platform.id)}
                />
              ))}
              
              <Card className="border-dashed border-2">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="rounded-full bg-gray-100 p-4 mb-4">
                    <Plus size={24} className="text-gray-500" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Connect New Platform</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Add more social media accounts to manage
                  </p>
                  <Button variant="outline" onClick={handleOpenConnectDialog}>
                    Connect Platform
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
        
        
        <TabsContent value="mentions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Mentions</CardTitle>
              <CardDescription>Track mentions of your brand across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentionsList.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">No new mentions to display</p>
                    <p className="text-sm text-gray-400">
                      When people mention you on social media, they'll appear here
                    </p>
                  </div>
                ) : (
                  mentionsList.map((mention) => (
                    <div key={mention.id} className="flex border-b pb-4">
                      <div className="mr-4 flex-shrink-0">
                        {getPlatformIcon(mention.platform, 24)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{mention.username}</h4>
                          <span className="text-sm text-gray-500">{mention.timeAgo}</span>
                        </div>
                        <p className="text-sm my-1">{mention.content}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => handleOpenReplyDialog(mention.id)}>
                            Reply
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(mention.id)}>
                            Mark as Read
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Scheduled Posts</CardTitle>
                <CardDescription>Your upcoming social media posts</CardDescription>
              </div>
              <Button onClick={handleCreatePost}>
                <Plus size={16} className="mr-2" /> Create Post
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPostsList.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">No scheduled posts</p>
                ) : (
                  scheduledPostsList.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{post.title}</h3>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingPostId(post.id)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600" onClick={() => {
                            setScheduledPostsList(scheduledPostsList.filter(p => p.id !== post.id));
                            toast.success("Post has been cancelled");
                          }}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-2">{post.content}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.platforms?.map((platform: string) => (
                          <div key={platform} className="flex items-center bg-gray-100 rounded px-2 py-1 text-xs">
                            {getPlatformIcon(platform, 12)}
                            <span className="ml-1">{platform}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-500">
                        Scheduled for: {post.scheduledFor || new Date(post.scheduled_for).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {platforms.find(p => p.id === currentPlatform)?.name} Settings
            </DialogTitle>
          </DialogHeader>
          {currentPlatform && (
            <>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label>Sync Frequency</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={platforms.find(p => p.id === currentPlatform)?.syncFrequency || "daily"}
                    onChange={(e) => {
                      handleSavePlatformSettings(currentPlatform, {
                        syncFrequency: e.target.value as "realtime" | "hourly" | "daily"
                      });
                    }}
                  >
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Notification Preferences</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-mentions">Mentions & Comments</Label>
                      <input
                        id="notify-mentions"
                        type="checkbox"
                        className="h-4 w-4"
                        defaultChecked={platforms.find(p => p.id === currentPlatform)?.notifications?.mentions}
                        onChange={(e) => {
                          handleSavePlatformSettings(currentPlatform, {
                            notifications: {
                              ...platforms.find(p => p.id === currentPlatform)?.notifications,
                              mentions: e.target.checked
                            }
                          });
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-messages">Direct Messages</Label>
                      <input
                        id="notify-messages"
                        type="checkbox"
                        className="h-4 w-4"
                        defaultChecked={platforms.find(p => p.id === currentPlatform)?.notifications?.messages}
                        onChange={(e) => {
                          handleSavePlatformSettings(currentPlatform, {
                            notifications: {
                              ...platforms.find(p => p.id === currentPlatform)?.notifications,
                              messages: e.target.checked
                            }
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Connect Platform</DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-4">
            <p className="text-sm text-gray-600">
              Select a platform to connect to your social media dashboard:
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 space-y-2"
                onClick={() => handleConnectPlatform('facebook')}
              >
                <Facebook size={24} className="text-blue-600" />
                <span>Facebook</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 space-y-2"
                onClick={() => handleConnectPlatform('instagram')}
              >
                <Instagram size={24} className="text-pink-600" />
                <span>Instagram</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 space-y-2"
                onClick={() => handleConnectPlatform('wordpress')}
              >
                <FileText size={24} className="text-gray-700" />
                <span>WordPress Blog</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 space-y-2 opacity-60"
                disabled
              >
                <Twitter size={24} className="text-blue-400" />
                <span className="flex items-center gap-1">
                  Twitter <AlertCircle size={12} />
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">Coming Soon</span>
                </span>
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Connect your social media accounts to manage them directly from your dashboard.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConnectDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={replyingToMention !== null} onOpenChange={(open) => !open && setReplyingToMention(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reply to Mention</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-center mb-2">
                <span className="font-medium">
                  {mentionsList.find(m => m.id === replyingToMention)?.username}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  {mentionsList.find(m => m.id === replyingToMention)?.timeAgo}
                </span>
              </div>
              <p className="text-sm">
                {mentionsList.find(m => m.id === replyingToMention)?.content}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reply">Your Reply</Label>
              <textarea 
                id="reply" 
                placeholder="Write your reply..." 
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={3}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyingToMention(null)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReply}>
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showCreatePostDialog} onOpenChange={setShowCreatePostDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitNewPost}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Post Title</Label>
                <Input id="post-title" name="post-title" placeholder="Enter a title for your post" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="post-content">Content</Label>
                <textarea 
                  id="post-content" 
                  name="post-content"
                  placeholder="Write your post content here..." 
                  rows={4}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Select Platforms</Label>
                <div className="flex flex-wrap gap-4 py-2">
                  {platforms.filter(platform => platform.isConnected).map(platform => (
                    <div key={platform.id} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={`platform-${platform.id}`} 
                        name={`platform-${platform.id}`} 
                        className="rounded" 
                        defaultChecked
                      />
                      <Label htmlFor={`platform-${platform.id}`}>{platform.name}</Label>
                    </div>
                  ))}
                </div>
                {platforms.filter(platform => platform.isConnected).length === 0 && (
                  <p className="text-sm text-yellow-600">
                    No platforms connected. Please connect at least one platform to post content.
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-2 py-2">
                <input 
                  type="checkbox" 
                  id="post-immediate" 
                  name="post-immediate" 
                  className="rounded" 
                />
                <Label htmlFor="post-immediate">Post immediately</Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-date">Schedule Date</Label>
                <Input 
                  id="schedule-date" 
                  name="schedule-date" 
                  type="datetime-local" 
                  defaultValue={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowCreatePostDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={platforms.filter(platform => platform.isConnected).length === 0}>
                {platforms.filter(platform => platform.isConnected).length === 0 ? 
                  'No Platforms Connected' : 'Schedule Post'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {editingPostId !== null && (
        <Dialog open={true} onOpenChange={() => setEditingPostId(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Scheduled Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdatePost}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-post-title">Post Title</Label>
                  <Input 
                    id="edit-post-title"
                    name="edit-post-title"
                    defaultValue={scheduledPostsList.find(p => p.id === editingPostId)?.title} 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-post-content">Content</Label>
                  <textarea 
                    id="edit-post-content" 
                    name="edit-post-content"
                    defaultValue={scheduledPostsList.find(p => p.id === editingPostId)?.content}
                    rows={4}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-schedule-date">Schedule Date</Label>
                  <Input 
                    id="edit-schedule-date"
                    name="edit-schedule-date"
                    type="datetime-local"
                    defaultValue={new Date().toISOString().slice(0, 16)}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditingPostId(null)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Update Post
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

interface ConnectedPlatformProps {
  platform: any;
  onSettings: () => void;
  onDisconnect: () => void;
}

const ConnectedPlatform = ({ platform, onSettings, onDisconnect }: ConnectedPlatformProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            {getPlatformIcon(platform.id, 24)}
          </div>
          <div>
            <h3 className="font-medium text-lg">{platform.name}</h3>
            <div className="flex items-center text-sm text-green-600">
              <span>Connected</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Account</span>
            <span className="font-medium">{platform.accountName}</span>
          </div>
          {platform.lastSync && (
