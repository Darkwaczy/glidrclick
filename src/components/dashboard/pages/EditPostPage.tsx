
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import ContentEditor from "@/components/dashboard/content/ContentEditor";
import PlatformSelector from "@/components/dashboard/content/PlatformSelector";
import { schedulePost } from "@/utils/social";

interface EditPostPageProps {
  postId: string | null;
}

const EditPostPage: React.FC<EditPostPageProps> = ({ postId }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch post data based on postId
    if (postId) {
      setIsLoading(true);
      
      // Simulate API call to get post data
      setTimeout(() => {
        // Mock data based on postId
        setTitle(`Post Title #${postId}`);
        setContent(`This is the content for post #${postId}. This would be loaded from your database in a real application.`);
        setSelectedPlatforms(["facebook", "twitter"]);
        setScheduledDate("2025-05-01T10:00");
        setIsLoading(false);
      }, 500);
    }
  }, [postId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Post updated successfully!");
    navigate("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading post data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit Post</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input 
                id="title" 
                placeholder="Enter title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <ContentEditor
                content={content}
                onChange={setContent}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Publishing Platforms</Label>
              <PlatformSelector 
                selectedPlatforms={selectedPlatforms}
                onSelectPlatforms={setSelectedPlatforms}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Schedule Date</Label>
                <Input 
                  id="scheduledDate" 
                  type="datetime-local" 
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Post Status</Label>
                <Select defaultValue="scheduled">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit">
                Update Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPostPage;
