
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Share2, 
  RefreshCw, 
  Plus, 
  X, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2,
  CheckCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LucideIcon } from "lucide-react";

const SocialPage = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [replyingToMention, setReplyingToMention] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [mentionsList, setMentionsList] = useState(mentions);
  const [scheduledPostsList, setScheduledPostsList] = useState(scheduledPosts);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState("");
  const [confirmDisconnect, setConfirmDisconnect] = useState<string | null>(null);

  const handleRefreshConnections = () => {
    setIsRefreshing(true);
    toast.info("Refreshing connection status...");
    
    // Simulate refresh with timeout
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Connections refreshed successfully!");
    }, 1000);
  };
  
  const handleOpenReplyDialog = (mentionId: number) => {
    setReplyingToMention(mentionId);
    setReplyContent("");
  };
  
  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      toast.error("Please enter a reply message");
      return;
    }
    
    toast.success("Reply sent successfully!");
    
    // Remove the mention from the list to simulate "read" status
    setMentionsList(mentionsList.filter(mention => mention.id !== replyingToMention));
    
    setReplyingToMention(null);
    setReplyContent("");
  };
  
  const handleMarkAsRead = (mentionId: number) => {
    // Mark the mention as read in a real app by updating its status
    toast.success("Mention marked as read");
    // For demo purposes, just remove it from the list
    setMentionsList(mentionsList.filter(mention => mention.id !== mentionId));
  };
  
  const handleEditScheduledPost = (postId: number) => {
    setEditingPostId(postId);
  };
  
  const handleCancelScheduledPost = (postId: number) => {
    toast.info("Cancelling scheduled post...");
    
    // Remove the post from the list
    setScheduledPostsList(scheduledPostsList.filter(post => post.id !== postId));
    toast.success("Post has been cancelled");
  };
  
  const handleCreatePost = () => {
    setShowCreatePostDialog(true);
  };
  
  const handleSubmitNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("post-title") as HTMLInputElement).value;
    const content = (form.elements.namedItem("post-content") as HTMLTextAreaElement).value;
    const date = (form.elements.namedItem("schedule-date") as HTMLInputElement).value;
    
    // Add to scheduled posts
    const newPost = {
      id: scheduledPostsList.length + 1,
      title,
      content,
      platforms: ["Facebook", "Twitter"],  // Example platforms
      scheduledFor: new Date(date).toLocaleString()
    };
    
    setScheduledPostsList([...scheduledPostsList, newPost]);
    setShowCreatePostDialog(false);
    toast.success("Post scheduled successfully!");
  };
  
  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("edit-post-title") as HTMLInputElement).value;
    const content = (form.elements.namedItem("edit-post-content") as HTMLTextAreaElement).value;
    const date = (form.elements.namedItem("edit-schedule-date") as HTMLInputElement).value;
    
    setScheduledPostsList(posts => 
      posts.map(post => 
        post.id === editingPostId 
          ? { 
              ...post, 
              title, 
              content, 
              scheduledFor: new Date(date).toLocaleString()
            } 
          : post
      )
    );
    
    setEditingPostId(null);
    toast.success("Post updated successfully!");
  };
  
  const handleOpenPlatformSettings = (platformName: string) => {
    setCurrentPlatform(platformName);
    setShowSettingsDialog(true);
  };

  const handleDisconnectPlatform = (platformName: string) => {
    setConfirmDisconnect(platformName);
  };

  const confirmPlatformDisconnect = () => {
    if (confirmDisconnect) {
      toast.success(`${confirmDisconnect} disconnected successfully`);
      setConfirmDisconnect(null);
    }
  };
  
  const handleSavePlatformSettings = () => {
    toast.success(`${currentPlatform} settings updated!`);
    setShowSettingsDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Social Media Management</h1>
          <p className="text-gray-600">Connect and manage your social media accounts</p>
        </div>
        
        <Button onClick={handleRefreshConnections} disabled={isRefreshing}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
              <ConnectedPlatform 
                key={platform}
                name={platform}
                icon={getPlatformIconComponent(platform)}
                status="connected"
                accountName={platform === "LinkedIn" ? "Glidrclick" : (platform === "Facebook" ? "Glidrclick" : "@glidrclick")}
                lastSync={platform === "Instagram" ? "1 day ago" : (platform === "Twitter" ? "4 hours ago" : "2 hours ago")}
                onSettings={() => handleOpenPlatformSettings(platform)}
                onDisconnect={() => handleDisconnectPlatform(platform)}
              />
            ))}
            
            <Card className="border-dashed border-2">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                  <Plus size={24} className="text-gray-500" />
                </div>
                <h3 className="font-medium text-lg mb-2">Connect New Platform</h3>
                <p className="text-sm text-gray-500 text-center mb-4">Add more social media accounts to manage</p>
                <Button onClick={() => toast.success("Opening connection wizard...")}>
                  Connect Account
                </Button>
              </CardContent>
            </Card>
          </div>
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
                  <p className="text-center text-gray-500 py-4">No new mentions to display</p>
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
                          <Button size="sm" variant="outline" onClick={() => handleEditScheduledPost(post.id)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleCancelScheduledPost(post.id)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-2">{post.content}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.platforms.map((platform) => (
                          <div key={platform} className="flex items-center bg-gray-100 rounded px-2 py-1 text-xs">
                            {getPlatformIcon(platform, 12)}
                            <span className="ml-1">{platform}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-500">
                        Scheduled for: {post.scheduledFor}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Reply Dialog */}
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
              <Textarea 
                id="reply" 
                placeholder="Write your reply..." 
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={3}
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
      
      {/* Create Post Dialog */}
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
                <Textarea 
                  id="post-content" 
                  name="post-content"
                  placeholder="Write your post content here..." 
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Select Platforms</Label>
                <div className="flex flex-wrap gap-4 py-2">
                  {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(platform => (
                    <div key={platform} className="flex items-center space-x-2">
                      <input type="checkbox" id={`platform-${platform}`} className="rounded" defaultChecked={platform === "Facebook" || platform === "Twitter"} />
                      <Label htmlFor={`platform-${platform}`}>{platform}</Label>
                    </div>
                  ))}
                </div>
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
              <Button type="submit">
                Schedule Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Post Dialog */}
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
                  <Textarea 
                    id="edit-post-content" 
                    name="edit-post-content"
                    defaultValue={scheduledPostsList.find(p => p.id === editingPostId)?.content}
                    rows={4}
                    required
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
      
      {/* Platform Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentPlatform} Settings</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>Sync Frequency</Label>
              <select className="w-full p-2 border rounded-md">
                <option value="realtime">Real-time</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Notification Preferences</Label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="notify-mentions" className="mr-2" defaultChecked />
                  <Label htmlFor="notify-mentions">Mentions & Comments</Label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="notify-messages" className="mr-2" defaultChecked />
                  <Label htmlFor="notify-messages">Direct Messages</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePlatformSettings}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Disconnect Confirmation Dialog */}
      <Dialog open={confirmDisconnect !== null} onOpenChange={() => setConfirmDisconnect(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disconnect {confirmDisconnect}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to disconnect your {confirmDisconnect} account?</p>
            <p className="text-sm text-gray-500 mt-1">
              Your scheduled posts for this platform will not be published.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDisconnect(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmPlatformDisconnect}>
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ConnectedPlatformProps {
  name: string;
  icon: React.ElementType;
  status: "connected" | "disconnected" | "error";
  accountName: string;
  lastSync?: string;
  onSettings: () => void;
  onDisconnect: () => void;
}

const ConnectedPlatform = ({ 
  name, 
  icon: Icon, 
  status, 
  accountName, 
  lastSync, 
  onSettings, 
  onDisconnect 
}: ConnectedPlatformProps) => {
  const getStatusClass = () => {
    switch (status) {
      case "connected": return "text-green-600";
      case "disconnected": return "text-gray-600";
      case "error": return "text-red-600";
      default: return "text-gray-600";
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case "connected": return <CheckCircle size={14} className="text-green-600 mr-1" />;
      case "disconnected": return <X size={14} className="text-gray-600 mr-1" />;
      case "error": return <X size={14} className="text-red-600 mr-1" />;
      default: return null;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Icon size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <div className={`flex items-center text-sm ${getStatusClass()}`}>
              {getStatusIcon()}
              <span className="capitalize">{status}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Account</span>
            <span className="font-medium">{accountName}</span>
          </div>
          {lastSync && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Last synced</span>
              <span>{lastSync}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" size="sm" onClick={onSettings}>
            Settings
          </Button>
          <Button variant="outline" size="sm" className="text-red-600" onClick={onDisconnect}>
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const getPlatformIconComponent = (platform: string): React.ElementType => {
  switch (platform.toLowerCase()) {
    case 'facebook': return Facebook;
    case 'twitter': return Twitter;
    case 'instagram': return Instagram;
    case 'linkedin': return Linkedin;
    default: return Link2;
  }
};

const getPlatformIcon = (platform: string, size: number = 16) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return <Facebook size={size} className="text-blue-600" />;
    case 'twitter':
      return <Twitter size={size} className="text-blue-400" />;
    case 'instagram':
      return <Instagram size={size} className="text-pink-600" />;
    case 'linkedin':
      return <Linkedin size={size} className="text-blue-700" />;
    default:
      return <Link2 size={size} />;
  }
};

// Mock data
const mentions = [
  {
    id: 1,
    platform: 'twitter',
    username: '@customer123',
    timeAgo: '30 minutes ago',
    content: "Just tried @glidrclick for the first time and I'm impressed! #contentmarketing"
  },
  {
    id: 2,
    platform: 'instagram',
    username: '@socialmediaguru',
    timeAgo: '2 hours ago',
    content: 'Check out this amazing content scheduling tool @glidrclick'
  },
  {
    id: 3,
    platform: 'facebook',
    username: 'Marketing Group',
    timeAgo: '1 day ago',
    content: 'Has anyone used Glidrclick for managing their social media? Looking for reviews.'
  }
];

const scheduledPosts = [
  {
    id: 1,
    title: '10 Ways to Improve Your Social Media Strategy',
    content: 'Check out our latest blog post on improving your social media presence in 2025!',
    platforms: ['Facebook', 'Twitter', 'LinkedIn'],
    scheduledFor: '04/27/2025, 09:00 AM'
  },
  {
    id: 2,
    title: 'New Product Announcement',
    content: "We're excited to announce our latest feature: AI-powered content suggestions!",
    platforms: ['Facebook', 'Instagram', 'LinkedIn'],
    scheduledFor: '04/28/2025, 10:30 AM'
  },
  {
    id: 3,
    title: 'Monthly Newsletter',
    content: 'Our April newsletter is ready! Discover the latest trends in digital marketing.',
    platforms: ['Twitter', 'LinkedIn'],
    scheduledFor: '05/01/2025, 08:00 AM'
  }
];

export default SocialPage;
