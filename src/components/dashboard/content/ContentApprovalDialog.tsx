
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ContentApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentTitle: string;
  contentType: string;
}

const ContentApprovalDialog: React.FC<ContentApprovalDialogProps> = ({
  open,
  onOpenChange,
  contentTitle,
  contentType,
}) => {
  const [selectedReviewers, setSelectedReviewers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");

  // Mock team members data
  const teamMembers = [
    { id: "1", name: "Sarah Johnson", role: "admin" },
    { id: "2", name: "Michael Chen", role: "editor" },
    { id: "3", name: "Emily Rodriguez", role: "viewer" },
  ];

  const handleSubmitForApproval = () => {
    if (selectedReviewers.length === 0) {
      toast.error("Please select at least one reviewer");
      return;
    }

    // In a real implementation, this would send the content for approval
    toast.success("Content submitted for approval");
    onOpenChange(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit for Review</DialogTitle>
          <DialogDescription>
            Send this {contentType} for team review before publishing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Content</h4>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium">{contentTitle}</p>
              <Badge variant="outline" className="mt-1">
                {contentType}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Select Reviewers</label>
            <Select
              value={selectedReviewers[0] || ""}
              onValueChange={(value) => setSelectedReviewers([value])}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a reviewer" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-purple-100 text-purple-800">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Additional Comments</label>
            <Textarea
              className="mt-1"
              placeholder="Add any notes or instructions for reviewers"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmitForApproval}>Submit for Approval</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentApprovalDialog;
