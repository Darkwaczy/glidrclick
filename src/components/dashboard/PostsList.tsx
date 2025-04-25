
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarDays, Share, BarChart, Search, Filter } from "lucide-react";
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
}

const PostsList = ({ title, posts, type }: PostsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || !post.status || post.status === statusFilter;
    const matchesPlatform = platformFilter === "all" || !post.platform || post.platform.toLowerCase().includes(platformFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const handleEdit = (postId: number) => {
    toast.info(`Editing post ${postId}`);
  };

  const handleCancel = (postId: number) => {
    toast.success(`Post ${postId} has been cancelled`);
  };

  const handleViewStats = (postId: number) => {
    toast.info(`Viewing stats for post ${postId}`);
  };

  const handleRepublish = (postId: number) => {
    toast.success(`Post ${postId} has been scheduled for republishing`);
  };

  const handleViewAll = () => {
    toast.info(`Viewing all ${type} posts`);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg border">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search posts..." 
            className="pl-10 w-full sm:w-[300px]" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setPlatformFilter("all");
            }}
          >
            <Filter size={16} />
          </Button>
        </div>
      </div>

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
                    <Button variant="outline" size="sm" onClick={() => handleEdit(post.id)}>Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleCancel(post.id)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={() => handleViewStats(post.id)}>View Stats</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleRepublish(post.id)}>Republish</Button>
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
