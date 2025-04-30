
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Mention {
  id: string;
  platform: string;
  username: string;
  timeAgo: string;
  content: string;
}

interface ReplyMentionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mention: Mention | null;
  replyContent: string;
  onReplyContentChange: (content: string) => void;
  onSubmitReply: () => void;
}

const ReplyMentionDialog = ({ 
  open, 
  onOpenChange, 
  mention, 
  replyContent, 
  onReplyContentChange, 
  onSubmitReply 
}: ReplyMentionDialogProps) => {
  if (!mention) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reply to Mention</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex items-center mb-2">
              <span className="font-medium">{mention.username}</span>
              <span className="text-sm text-gray-500 ml-2">{mention.timeAgo}</span>
            </div>
            <p className="text-sm">{mention.content}</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reply">Your Reply</Label>
            <textarea 
              id="reply" 
              placeholder="Write your reply..." 
              value={replyContent}
              onChange={(e) => onReplyContentChange(e.target.value)}
              rows={3}
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmitReply}>
            Send Reply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyMentionDialog;
