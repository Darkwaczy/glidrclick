
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, FileText } from "lucide-react";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platforms: any[];
  onSubmit: (e: React.FormEvent) => void;
}

const CreatePostDialog = ({ open, onOpenChange, platforms, onSubmit }: CreatePostDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
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
                className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            
            <div>
              <Label className="mb-2 block">Publish to Platforms</Label>
              <div className="bg-gray-50 p-4 rounded-md border">
                <div className="text-sm font-medium mb-2">Select where to publish this content:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {platforms.filter(platform => platform.isConnected).length > 0 ? (
                    platforms.filter(platform => platform.isConnected).map(platform => (
                      <div key={platform.id} className="flex items-center space-x-2 bg-white p-2 rounded border">
                        <input 
                          type="checkbox" 
                          id={`platform-${platform.id}`} 
                          name={`platform-${platform.id}`} 
                          className="rounded" 
                          defaultChecked
                        />
                        <Label htmlFor={`platform-${platform.id}`} className="flex items-center cursor-pointer">
                          {platform.id === 'facebook' && <Facebook size={16} className="text-blue-600 mr-2" />}
                          {platform.id === 'instagram' && <Instagram size={16} className="text-pink-600 mr-2" />}
                          {platform.id === 'wordpress' && <FileText size={16} className="text-gray-700 mr-2" />}
                          {platform.name}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-4 text-amber-600">
                      <p>No platforms connected. Please connect at least one platform to post content.</p>
                    </div>
                  )}
                </div>
              </div>
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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
  );
};

export default CreatePostDialog;
