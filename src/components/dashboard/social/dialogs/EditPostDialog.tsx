
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EditPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: any | null;
  onSubmit: (e: React.FormEvent) => void;
}

const EditPostDialog = ({ open, onOpenChange, post, onSubmit }: EditPostDialogProps) => {
  if (!post) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Scheduled Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-post-title">Post Title</Label>
              <Input 
                id="edit-post-title"
                name="edit-post-title"
                defaultValue={post.title} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-post-content">Content</Label>
              <textarea 
                id="edit-post-content" 
                name="edit-post-content"
                defaultValue={post.content}
                rows={4}
                required
                className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Update Post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
