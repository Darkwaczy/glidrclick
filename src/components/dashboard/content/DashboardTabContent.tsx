
import React, { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { usePosts } from "@/hooks/usePosts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getScheduledPosts, getPublishedPosts } from "@/utils/social";
import PostsTabContent from "./tabs/PostsTabContent";
import AnalyticsTabContent from "./tabs/AnalyticsTabContent";
import PlatformsTabContent from "./tabs/PlatformsTabContent";
import SettingsTabContent from "./tabs/SettingsTabContent";

interface DashboardTabContentProps {
  activeTab: string;
  onEdit?: (id: string | number) => void;
  onCancel?: (id: string | number) => void;
  onViewAllScheduled?: () => void;
  onViewStats?: (id: string | number) => void;
  onRepublish?: (id: string | number) => void;
  onViewAllPublished?: () => void;
  onViewAllDrafts?: () => void;
}

const DashboardTabContent: React.FC<DashboardTabContentProps> = ({ 
  activeTab, 
  onEdit,
  onCancel,
  onViewAllScheduled,
  onViewStats,
  onRepublish,
  onViewAllPublished,
  onViewAllDrafts
}) => {
  const { user } = useAuth();
  const { posts: allPosts, isLoading: isPostsLoading } = usePosts();
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<any[]>([]);
  const [draftPosts, setDraftPosts] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [bestPerforming, setBestPerforming] = useState<{title: string, views?: number}>({title: "No content yet"});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Get scheduled posts directly from Supabase
        const scheduledData = await getScheduledPosts();
        const scheduled = scheduledData.map(post => ({
          id: post.id,
          title: post.title,
          date: new Date(post.scheduled_for || '').toLocaleString(),
          platform: post.post_platforms?.length > 0 ? 
            post.post_platforms.map((p: any) => p.platform_id).join(", ") : 
            'All Platforms'
        }));
        
        // Get published posts directly from Supabase
        const publishedData = await getPublishedPosts();
        const published = publishedData.map(post => ({
          id: post.id,
          title: post.title,
          date: new Date(post.published_at || '').toLocaleString(),
          // Add mock view and engagement data
          views: Math.floor(Math.random() * 100), 
          engagement: Math.floor(Math.random() * 50)
        }));
        
        // Filter drafts from all posts
        const drafts = (allPosts || [])
          .filter(post => post.status === 'draft')
          .map(post => ({
            id: post.id,
            title: post.title,
            date: new Date(post.created_at).toLocaleString(),
            platform: 'Draft'
          }));
        
        setScheduledPosts(scheduled);
        setPublishedPosts(published);
        setDraftPosts(drafts);
        
        console.log("Scheduled posts:", scheduled);
        console.log("Published posts:", published);
        console.log("Draft posts:", drafts);
        
        if (published.length > 0) {
          const best = published.reduce((prev, current) => 
            (prev.views || 0) > (current.views || 0) ? prev : current
          );
          setBestPerforming(best);
        } else {
          setBestPerforming({title: "No published content yet"});
        }
        
        // Generate analytics data
        const posts = [...scheduled, ...published, ...drafts];
        if (posts.length > 0) {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
          const newAnalyticsData = months.map((month, index) => {
            // Count posts per month (this is simplified, you'd need to extract month from post dates)
            const postCount = posts.length > 0 ? Math.floor(posts.length / months.length) + (index === 0 ? posts.length % months.length : 0) : 0;
            
            return {
              name: month,
              views: postCount * Math.floor(Math.random() * 20 + 10),
              engagement: postCount * Math.floor(Math.random() * 10 + 5)
            };
          });
          
          setAnalyticsData(newAnalyticsData);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [allPosts, isPostsLoading]);
  
  return (
    <>
      <TabsContent value="posts">
        <PostsTabContent
          scheduledPosts={scheduledPosts}
          publishedPosts={publishedPosts}
          draftPosts={draftPosts}
          isLoading={isLoading}
          onEdit={onEdit}
          onCancel={onCancel}
          onViewAllScheduled={onViewAllScheduled}
          onViewStats={onViewStats}
          onRepublish={onRepublish}
          onViewAllPublished={onViewAllPublished}
          onViewAllDrafts={onViewAllDrafts}
        />
      </TabsContent>
      
      <TabsContent value="analytics">
        <AnalyticsTabContent
          publishedPosts={publishedPosts}
          scheduledPosts={scheduledPosts}
          analyticsData={analyticsData}
          bestPerforming={bestPerforming}
          isLoading={isLoading}
        />
      </TabsContent>

      <TabsContent value="platforms">
        <PlatformsTabContent />
      </TabsContent>

      <TabsContent value="settings">
        <SettingsTabContent />
      </TabsContent>
    </>
  );
};

export default DashboardTabContent;
