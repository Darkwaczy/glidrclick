import React, { useState } from "react";
import { SocialPageHook } from "@/hooks/useSocialPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { DialogTitle, Dialog, DialogContent, DialogHeader, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Import dialogs
import ConnectPlatformDialog from "./dialogs/ConnectPlatformDialog";
import PlatformSettingsDialog from "./dialogs/PlatformSettingsDialog";
import ReplyMentionDialog from "./dialogs/ReplyMentionDialog";
import CreatePostDialog from "./dialogs/CreatePostDialog";
import EditPostDialog from "./dialogs/EditPostDialog";
import ConnectWordPressDialog from "./dialogs/ConnectWordPressDialog";

interface SocialPageDialogsProps {
  // Add the socialHook prop
  socialHook: SocialPageHook;
  // Keep other props for backwards compatibility
  platforms: any[];
  showSettingsDialog: boolean;
  showConnectDialog: boolean;
  showWordPressDialog: boolean;
  showCreatePostDialog: boolean;
  currentPlatform: any;
  onSettingsDialogChange: (open: boolean) => void;
  onConnectDialogChange: (open: boolean) => void;
  onWordPressDialogChange: (open: boolean) => void;
  onCreatePostDialogChange: (open: boolean) => void;
  onConnectPlatform: (platformId: string) => void;
  onSaveSettings: (platformId: string, settings: any) => void;
  onSubmitPost: (e: React.FormEvent) => void;
}

const SocialPageDialogs: React.FC<SocialPageDialogsProps> = ({ 
  socialHook,
  platforms,
  showSettingsDialog,
  showConnectDialog,
  showWordPressDialog,
  showCreatePostDialog,
  currentPlatform,
  onSettingsDialogChange,
  onConnectDialogChange,
  onWordPressDialogChange,
  onCreatePostDialogChange,
  onConnectPlatform,
  onSaveSettings,
  onSubmitPost
}) => {
  const [postType, setPostType] = useState<"standard" | "image" | "link" | "video">("standard");
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);

  // Handle creating a new post submission
  const handleSubmitNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedPlatforms.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }
    
    if (!postContent.trim()) {
      toast.error("Please enter content for your post");
      return;
    }
    
    // For scheduled posts, validate date and time
    if (isScheduled) {
      if (!scheduleDate || !scheduleTime) {
        toast.error("Please select both date and time for scheduled posts");
        return;
      }
      
      const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      
      if (scheduledDateTime.getTime() <= Date.now()) {
        toast.error("Please select a future date and time");
        return;
      }
    }
    
    // Show success message
    toast.success(isScheduled ? "Post scheduled successfully!" : "Post published successfully!");
    
    // Reset form and close dialog
    setPostContent("");
    setPostTitle("");
    setSelectedPlatforms([]);
    setScheduleDate("");
    setScheduleTime("");
    setIsScheduled(false);
    setPostType("standard");
    onCreatePostDialogChange(false);
  };

  // Toggle platform selection
  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  return (
    <>
      <PlatformSettingsDialog
        open={showSettingsDialog}
        onOpenChange={onSettingsDialogChange}
        platformId={socialHook.currentPlatform}
        platforms={socialHook.platforms}
      />
      
      <ConnectPlatformDialog
        open={showConnectDialog}
        onOpenChange={onConnectDialogChange}
        onConnect={onConnectPlatform}
      />
      
      <ReplyMentionDialog
        open={socialHook.replyingToMention !== null}
        onOpenChange={(open) => !open && socialHook.setReplyingToMention(null)}
        mention={socialHook.mentionsList.find(m => m.id === socialHook.replyingToMention) || null}
        replyContent={socialHook.replyContent}
        onReplyContentChange={socialHook.setReplyContent}
        onSubmitReply={socialHook.handleSubmitReply}
      />
      
      <Dialog open={showCreatePostDialog} onOpenChange={onCreatePostDialogChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Publish content across multiple social media platforms
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={onSubmitPost} className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="post-type">Post Type</Label>
              <Tabs defaultValue="standard" value={postType} onValueChange={(v) => setPostType(v as any)}>
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="standard">Text</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                  <TabsTrigger value="link">Link</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
                
                <TabsContent value="standard" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="post-title">Post Title (optional)</Label>
                    <Input
                      id="post-title"
                      placeholder="Enter title"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="post-content">Post Content</Label>
                    <Textarea
                      id="post-content"
                      placeholder="What do you want to share?"
                      className="min-h-[120px]"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      required
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="image" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="post-title">Post Title (optional)</Label>
                    <Input
                      id="post-title"
                      placeholder="Enter title"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="post-content">Caption</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Add a caption..."
                      className="min-h-[80px]"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image-upload">Upload Image</Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="mt-1"
                      required
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Recommended size: 1200 x 630 pixels (aspect ratio 1.91:1)
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="link" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="post-title">Link Title</Label>
                    <Input
                      id="post-title"
                      placeholder="Enter title"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="post-url">Link URL</Label>
                    <Input
                      id="post-url"
                      placeholder="https://"
                      type="url"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="post-content">Description</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Add a description..."
                      className="min-h-[80px]"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      required
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="video" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="post-title">Video Title</Label>
                    <Input
                      id="post-title"
                      placeholder="Enter title"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="post-content">Description</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Add a description..."
                      className="min-h-[80px]"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="video-upload">Upload Video</Label>
                    <Input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="mt-1"
                      required
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Maximum size: 100MB. Supported formats: MP4, MOV, AVI
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Label className="block mb-2">Select Platforms</Label>
              <div className="grid grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`platform-${platform.id}`}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    <label
                      htmlFor={`platform-${platform.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {platform.name}
                    </label>
                  </div>
                ))}
              </div>
              {platforms.length === 0 && (
                <div className="text-center py-2 border rounded-md bg-gray-50">
                  <p className="text-sm text-gray-500">No platforms connected</p>
                  <Button 
                    variant="link" 
                    type="button" 
                    onClick={() => {
                      onCreatePostDialogChange(false);
                      onConnectDialogChange(true);
                    }}
                  >
                    Connect a platform
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="schedule-post"
                checked={isScheduled}
                onCheckedChange={(checked) => setIsScheduled(!!checked)}
              />
              <div className="grid gap-1.5">
                <label
                  htmlFor="schedule-post"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Schedule for later
                </label>
                <p className="text-xs text-muted-foreground">
                  Post will be published at the specified time
                </p>
              </div>
            </div>
            
            {isScheduled && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="schedule-date">Date</Label>
                  <Input
                    id="schedule-date"
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="schedule-time">Time</Label>
                  <Input
                    id="schedule-time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {isScheduled ? 'Schedule Post' : 'Publish Now'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <EditPostDialog
        open={socialHook.editingPostId !== null}
        onOpenChange={() => socialHook.setEditingPostId(null)}
        post={socialHook.scheduledPostsList.find(p => p.id === socialHook.editingPostId) || null}
        onSubmit={socialHook.handleUpdatePost}
      />
      
      <ConnectWordPressDialog
        open={showWordPressDialog}
        onOpenChange={onWordPressDialogChange}
      />
    </>
  );
};

export default SocialPageDialogs;
