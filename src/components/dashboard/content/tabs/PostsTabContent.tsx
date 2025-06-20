
import React from "react";
import { Loader2, Calendar, BarChart3, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PostsList from "@/components/dashboard/PostsList";
import { useIsMobile } from "@/hooks/use-mobile";

interface PostsTabContentProps {
  scheduledPosts: any[];
  publishedPosts: any[];
  draftPosts: any[];
  isLoading: boolean;
  onEdit?: (id: string | number) => void;
  onCancel?: (id: string | number) => void;
  onViewAllScheduled?: () => void;
  onViewStats?: (id: string | number) => void;
  onRepublish?: (id: string | number) => void;
  onViewAllPublished?: () => void;
  onViewAllDrafts?: () => void;
}

const PostsTabContent: React.FC<PostsTabContentProps> = ({
  scheduledPosts,
  publishedPosts,
  draftPosts,
  isLoading,
  onEdit,
  onCancel,
  onViewAllScheduled,
  onViewStats,
  onRepublish,
  onViewAllPublished,
  onViewAllDrafts
}) => {
  const isMobile = useIsMobile();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`grid grid-cols-1 gap-6 ${isMobile ? "" : "md:grid-cols-2 lg:grid-cols-3"}`}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Posts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              {scheduledPosts.length > 0 ? 
                `Next post: ${scheduledPosts[0].date}` : 
                "No scheduled posts"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              {publishedPosts.length > 0 ? 
                "Last 30 days" : "No published posts"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Posts</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftPosts.length}</div>
            <p className="text-xs text-muted-foreground">
              {draftPosts.length > 0 ? "Ready to be scheduled" : "No drafts yet"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className={`grid grid-cols-1 gap-6 ${isMobile ? "" : "md:grid-cols-2"}`}>
        <PostsList 
          title="Upcoming Posts" 
          posts={scheduledPosts} 
          type="scheduled" 
          onEdit={onEdit}
          onCancel={onCancel}
          onViewAll={onViewAllScheduled}
        />
        
        <PostsList 
          title="Recently Published" 
          posts={publishedPosts} 
          type="published" 
          onViewStats={onViewStats}
          onRepublish={onRepublish}
          onViewAll={onViewAllPublished}
        />
      </div>
      
      <PostsList 
        title="Draft Posts" 
        posts={draftPosts} 
        type="draft"
        onEdit={onEdit}
        onCancel={onCancel} 
        onViewAll={onViewAllDrafts}
      />
    </div>
  );
};

export default PostsTabContent;
