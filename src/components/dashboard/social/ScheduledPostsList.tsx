
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Edit, X, Plus } from "lucide-react";
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
          <CardDescription>Your upcoming social media posts</CardDescription>
        </div>
        <Button onClick={onCreatePost}>
          <Plus size={16} className="mr-2" /> Create Post
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No scheduled posts</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{post.title}</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEditPost(post.id)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600" onClick={() => onCancelPost(post.id)}>
                      Cancel
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-2">{post.content}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.platforms?.map((platform: string) => (
                    <div key={platform} className="flex items-center bg-gray-100 rounded px-2 py-1 text-xs">
                      {getPlatformIcon(platform, 12)}
                      <span className="ml-1">{platform}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 text-sm text-gray-500">
                  Scheduled for: {post.scheduledFor || new Date(post.scheduled_for).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledPostsList;
