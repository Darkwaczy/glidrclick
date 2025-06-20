
import { useState } from "react";
import { toast } from "sonner";
import { getScheduledPosts, schedulePost, publishToSocialMedia } from "@/utils/social";

export const useScheduledPosts = () => {
  const [scheduledPostsList, setScheduledPostsList] = useState<any[]>([]);
  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const loadScheduledPosts = async () => {
    try {
      const posts = await getScheduledPosts();
      setScheduledPostsList(posts || []);
    } catch (error) {
      console.error("Failed to load scheduled posts:", error);
    }
  };

  const handleCreatePost = () => {
    setShowCreatePostDialog(true);
  };

  const handleSubmitNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If this is a close event, just close the dialog and return
    if ((e as any).type === 'close') {
      setShowCreatePostDialog(false);
      return;
    }
    
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("post-title") as HTMLInputElement).value;
    const content = (form.elements.namedItem("post-content") as HTMLTextAreaElement).value;
    const date = (form.elements.namedItem("schedule-date") as HTMLInputElement).value;
    
    const selectedPlatforms: string[] = [];
    // We need platforms from usePlatforms here
    const platformsElements = form.querySelectorAll('[id^="platform-"]');
    platformsElements.forEach((element) => {
      const checkbox = element as HTMLInputElement;
      if (checkbox && checkbox.checked) {
        const platformId = checkbox.id.replace('platform-', '');
        selectedPlatforms.push(platformId);
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

  const handleCancelPost = (postId: string) => {
    setScheduledPostsList(scheduledPostsList.filter(p => p.id !== postId));
    toast.success("Post has been cancelled");
  };

  return {
    scheduledPostsList,
    showCreatePostDialog,
    editingPostId,
    setShowCreatePostDialog,
    setEditingPostId,
    loadScheduledPosts,
    handleCreatePost,
    handleSubmitNewPost,
    handleUpdatePost,
    handleCancelPost
  };
};
