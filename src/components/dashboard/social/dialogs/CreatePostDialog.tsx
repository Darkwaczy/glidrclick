
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, FileText, Twitter, Linkedin, Clock, Send } from "lucide-react";
import { useSocialPlatforms } from "@/hooks/useSocialPlatforms";
import { useEnhancedPosts } from "@/hooks/useEnhancedPosts";
import { socialMediaService } from "@/services/socialMediaService";
import { toast } from "sonner";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

const CreatePostDialog = ({ open, onOpenChange, onSubmit }: CreatePostDialogProps) => {
  const { platforms, isLoading: platformsLoading } = useSocialPlatforms();
  const { createPost, refetch } = useEnhancedPosts();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isImmediate, setIsImmediate] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
  );

  const availablePlatforms = [
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "text-blue-400" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-800" },
    { id: "blog", name: "Blog", icon: FileText, color: "text-gray-700" }
  ];

  const connectedPlatforms = availablePlatforms.filter(platform => 
    platform.id === 'blog' || 
    platforms.some(p => p.platform_id === platform.id && p.is_connected)
  );

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    if (!isImmediate && new Date(scheduledDate) <= new Date()) {
      toast.error('Please select a future date for scheduling');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the post first
      const post = await createPost({
        title: title.trim(),
        content: content.trim(),
        type: 'social',
        status: isImmediate ? 'published' : 'scheduled',
        scheduled_for: isImmediate ? undefined : new Date(scheduledDate).toISOString(),
        platforms: selectedPlatforms,
      });

      if (!post) {
        throw new Error('Failed to create post');
      }

      if (isImmediate) {
        // Publish immediately to selected platforms
        const results = await socialMediaService.publishToMultiplePlatforms(
          post.id,
          selectedPlatforms,
          content.trim(),
          title.trim()
        );

        const successful = Object.values(results).filter(r => r.success).length;
        const failed = Object.values(results).filter(r => !r.success).length;

        if (successful > 0) {
          toast.success(`Post published to ${successful} platform${successful > 1 ? 's' : ''}!`);
        }
        if (failed > 0) {
          toast.error(`Failed to publish to ${failed} platform${failed > 1 ? 's' : ''}`);
        }
      } else {
        // Schedule the post
        const scheduled = await socialMediaService.schedulePost(
          post.id,
          selectedPlatforms,
          new Date(scheduledDate)
        );

        if (scheduled) {
          toast.success('Post scheduled successfully!');
        }
      }

      // Reset form
      setTitle('');
      setContent('');
      setSelectedPlatforms([]);
      setIsImmediate(false);
      setScheduledDate(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16));
      
      // Refresh posts list
      await refetch();
      
      // Close dialog
      onOpenChange(false);
      
    } catch (error) {
      console.error('Error creating/publishing post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="post-title">Post Title *</Label>
            <Input 
              id="post-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your post" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="post-content">Content *</Label>
            <Textarea 
              id="post-content" 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..." 
              rows={6}
              required
            />
            <div className="text-sm text-gray-500 text-right">
              {content.length} characters
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="block font-medium">Publish to Platforms *</Label>
            
            {platformsLoading ? (
              <div className="text-sm text-gray-500">Loading platforms...</div>
            ) : connectedPlatforms.length > 0 ? (
              <div className="space-y-2">
                {connectedPlatforms.map(platform => {
                  const Icon = platform.icon;
                  const isConnected = platform.id === 'blog' || 
                    platforms.some(p => p.platform_id === platform.id && p.is_connected);
                  
                  return (
                    <div key={platform.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`platform-${platform.id}`}
                          checked={selectedPlatforms.includes(platform.id)}
                          onCheckedChange={() => handlePlatformToggle(platform.id)}
                          disabled={!isConnected}
                        />
                        <Icon size={20} className={platform.color} />
                        <Label htmlFor={`platform-${platform.id}`} className="cursor-pointer font-medium">
                          {platform.name}
                        </Label>
                      </div>
                      
                      <Badge variant={isConnected ? "default" : "secondary"} className="text-xs">
                        {isConnected ? "Connected" : "Not Connected"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4 text-amber-600 bg-amber-50 rounded-lg border">
                <p>No platforms connected. Please connect at least one platform to post content.</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 py-2 border-t">
            <Checkbox 
              id="post-immediate" 
              checked={isImmediate}
              onCheckedChange={(checked) => setIsImmediate(checked === true)}
            />
            <Label htmlFor="post-immediate" className="flex items-center cursor-pointer">
              <Send size={16} className="mr-2" />
              Post immediately
            </Label>
          </div>
          
          {!isImmediate && (
            <div className="space-y-2">
              <Label htmlFor="schedule-date" className="flex items-center">
                <Clock size={16} className="mr-2" />
                Schedule Date & Time
              </Label>
              <Input 
                id="schedule-date" 
                type="datetime-local" 
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                required={!isImmediate}
              />
            </div>
          )}
          
          <DialogFooter className="flex gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || connectedPlatforms.length === 0 || selectedPlatforms.length === 0}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                'Processing...'
              ) : isImmediate ? (
                'Publish Now'
              ) : (
                'Schedule Post'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
