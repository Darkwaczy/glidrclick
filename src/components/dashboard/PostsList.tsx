
import React from "react";
import { MoreVertical, Eye, Edit, X, RefreshCw, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Post {
  id: number;
  title: string;
  date: string;
  platform?: string;
  views?: number;
  engagement?: number;
}

interface PostsListProps {
  title: string;
  posts: Post[];
  type: "scheduled" | "published" | "draft";
  onEdit?: (id: number) => void;
  onCancel?: (id: number) => void;
  onViewStats?: (id: number) => void;
  onRepublish?: (id: number) => void;
  onViewAll?: () => void;
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
}: PostsListProps) => {
  if (!posts.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-6">No posts found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {onViewAll && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View all
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[320px] overflow-y-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="overflow-hidden pr-2">
                <h3 className="font-medium text-sm truncate">{post.title}</h3>
                <div className="flex items-center mt-1">
                  <Calendar size={14} className="text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                {post.platform && (
                  <div className="mt-1">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {post.platform}
                    </span>
                  </div>
                )}
                {post.views !== undefined && (
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-gray-500">
                      {post.views.toLocaleString()} views
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.engagement?.toLocaleString()} engagements
                    </span>
                  </div>
                )}
              </div>
              <div>
                {type === "scheduled" || type === "draft" ? (
                  <div className="flex gap-1">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(post.id)}
                      >
                        <Edit size={14} />
                        <span className="sr-only">Edit</span>
                      </Button>
                    )}
                    {onCancel && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onCancel(post.id)}
                      >
                        <X size={14} />
                        <span className="sr-only">Cancel</span>
                      </Button>
                    )}
                  </div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={14} />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onViewStats && (
                        <DropdownMenuItem onClick={() => onViewStats(post.id)}>
                          <Eye size={14} className="mr-2" />
                          View Stats
                        </DropdownMenuItem>
                      )}
                      {onRepublish && (
                        <DropdownMenuItem onClick={() => onRepublish(post.id)}>
                          <RefreshCw size={14} className="mr-2" />
                          Republish
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsList;
