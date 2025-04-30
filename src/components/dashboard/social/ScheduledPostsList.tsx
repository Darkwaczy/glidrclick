
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Edit, X, Plus, Calendar, Share } from "lucide-react";
import { getPlatformIcon } from "./utils/platformUtils";

interface ScheduledPostsListProps {
  posts: any[];
  onCreatePost: () => void;
  onEditPost: (postId: string) => void;
  onCancelPost: (postId: string) => void;
}

const ScheduledPostsList = ({ 
  posts, 
  onCreatePost, 
  onEditPost, 
  onCancelPost 
}: ScheduledPostsListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Scheduled Posts</CardTitle>
          <CardDescription>Create and schedule posts across multiple platforms</CardDescription>
        </div>
        <Button onClick={onCreatePost} className="flex items-center">
          <Plus size={16} className="mr-2" /> Create Post
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} className="text-gray-500" />
              </div>
              <p className="text-gray-500 mb-2">No scheduled posts</p>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                Create posts once and publish them to multiple social platforms simultaneously
              </p>
              <Button onClick={onCreatePost} className="mt-4 flex items-center">
                <Plus size={16} className="mr-2" /> Create Your First Post
              </Button>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{post.title}</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEditPost(post.id)} className="flex items-center">
                      <Edit size={14} className="mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 flex items-center" onClick={() => onCancelPost(post.id)}>
                      <X size={14} className="mr-1" /> Cancel
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-2">{post.content}</p>
                
                <div className="mt-3 flex items-center">
                  <Calendar size={12} className="mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {post.scheduledFor || new Date(post.scheduled_for).toLocaleString()}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <Share size={12} className="mr-1" /> Publishing to:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.platforms?.map((platform: string) => (
                      <div key={platform} className="flex items-center bg-gray-100 rounded px-2 py-1 text-xs">
                        {getPlatformIcon(platform, 12)}
                        <span className="ml-1">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-gray-500">
          Schedule posts to publish automatically across all your connected social media platforms.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ScheduledPostsList;
