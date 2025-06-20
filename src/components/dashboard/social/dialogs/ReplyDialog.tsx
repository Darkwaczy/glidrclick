
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";

interface ReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentionId: string | null;
  mentions: any[];
}

const ReplyDialog = ({ 
  open, 
  onOpenChange, 
  mentionId,
  mentions
}: ReplyDialogProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const mention = mentions.find(m => m.id === mentionId);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!mentionId || !replyContent) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API to post the reply
      // For now, just simulate a successful reply
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Reply posted successfully");
      setReplyContent("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Failed to post reply. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!mention) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reply to Mention</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md border">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p className="font-medium">{mention.username}</p>
                  <p className="text-sm text-gray-500">{new Date(mention.createdAt).toLocaleString()}</p>
                  <p className="mt-2">{mention.content}</p>
                </div>
              </div>
            </div>
            
            <div>
              <textarea
                className="w-full p-3 border rounded-md min-h-[120px] resize-none"
                placeholder="Write your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !replyContent}>
              {isSubmitting ? "Posting..." : "Post Reply"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialog;
