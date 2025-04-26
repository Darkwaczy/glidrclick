
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, Share, BarChart, Search, Filter, Eye, Edit2, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Post {
  id: number;
  title: string;
  date: string;
  platform?: string;
  status?: string;
  views?: number;
  engagement?: number;
}

interface PostsListProps {
  title: string;
  posts: Post[];
  type: "scheduled" | "published";
  onEdit?: (id: number) => void;
  onCancel?: (id: number) => void;
  onViewStats?: (id: number) => void;
  onRepublish?: (id: number) => void;
  onViewAll?: () => void;
  searchQuery?: string;
  statusFilter?: string;
  platformFilter?: string;
}

const PostsList = ({ 
  title, 
  posts, 
  type,
  onEdit,
  onCancel,
  onViewStats,
  onRepublish,
  onViewAll,
  searchQuery = "",
  statusFilter = "all",
  platformFilter = "all"
}: PostsListProps) => {
  // Filter posts based on search, status, and platform
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || !post.status || post.status === statusFilter;
    const matchesPlatform = platformFilter === "all" || !post.platform || post.platform.toLowerCase().includes(platformFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const handleEdit = (postId: number) => {
    if (onEdit) {
      onEdit(postId);
    } else {
      toast.info(`Editing post ${postId}`);
    }
  };

  const handleCancel = (postId: number) => {
    if (onCancel) {
      onCancel(postId);
    } else {
      toast.success(`Post ${postId} has been cancelled`);
    }
  };

  const handleViewStats = (postId: number) => {
    if (onViewStats) {
      onViewStats(postId);
    } else {
      toast.info(`Viewing stats for post ${postId}`);
    }
  };

  const handleRepublish = (postId: number) => {
    if (onRepublish) {
      onRepublish(postId);
    } else {
      toast.success(`Post ${postId} has been scheduled for republishing`);
    }
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      toast.info(`Viewing all ${type} posts`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Posts List */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="divide-y">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => (
            <div key={post.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{post.title}</h4>
                  {post.status && (
                    <Badge variant={post.status === "scheduled" ? "secondary" : "outline"} className="text-xs">
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    {type === 'published' ? `Published: ${post.date}` : post.date}
                  </span>
                  {post.platform && (
                    <span className="flex items-center gap-1">
                      <Share size={14} />
                      {post.platform}
                    </span>
                  )}
                  {post.views !== undefined && (
                    <span className="flex items-center gap-1">
                      <BarChart size={14} />
                      {post.views.toLocaleString()} views
                    </span>
                  )}
                  {post.engagement !== undefined && (
                    <span className="flex items-center gap-1">
                      <Share size={14} />
                      {post.engagement} engagements
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 self-end sm:self-center">
                {type === 'scheduled' ? (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post.id)}>
                      <Edit2 size={14} className="mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleCancel(post.id)}>
                      <Trash size={14} className="mr-1" /> Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleViewStats(post.id)}>
                      <BarChart size={14} className="mr-1" /> View Stats
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleRepublish(post.id)}>
                      <Share size={14} className="mr-1" /> Republish
                    </Button>
                  </>
                )}
              </div>
            </div>
          )) : (
            <div className="p-8 text-center text-gray-500">
              No posts found matching your criteria
            </div>
          )}
        </div>
        {filteredPosts.length > 0 && (
          <div className="p-4 border-t flex justify-center">
            <Button variant="link" onClick={handleViewAll}>
              View All {type === 'scheduled' ? 'Scheduled' : 'Published'} Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
