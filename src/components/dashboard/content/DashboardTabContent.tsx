
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowUpRight, LineChart, Users, Calendar, Loader2 } from "lucide-react";
import PostsList from "@/components/dashboard/PostsList";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line
} from "recharts";
import { usePosts } from "@/hooks/usePosts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getScheduledPosts, getPublishedPosts } from "@/utils/socialConnections";

interface DashboardTabContentProps {
  activeTab: string;
  onEdit?: (id: number) => void;
  onCancel?: (id: number) => void;
  onViewAllScheduled?: () => void;
  onViewStats?: (id: number) => void;
  onRepublish?: (id: number) => void;
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
  const navigate = useNavigate();
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
  
  const renderPostsTab = () => {
    if (isLoading) {
      return (
        <TabsContent value="posts" className="space-y-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        </TabsContent>
      );
    }
    
    return (
      <TabsContent value="posts" className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PostsList 
            title="Upcoming Posts" 
            posts={scheduledPosts} 
            type="scheduled" 
            onEdit={(id) => onEdit?.(Number(id))}
            onCancel={(id) => onCancel?.(Number(id))}
            onViewAll={onViewAllScheduled}
          />
          
          <PostsList 
            title="Recently Published" 
            posts={publishedPosts} 
            type="published" 
            onViewStats={(id) => onViewStats?.(Number(id))}
            onRepublish={(id) => onRepublish?.(Number(id))}
            onViewAll={onViewAllPublished}
          />
        </div>
        
        <PostsList 
          title="Draft Posts" 
          posts={draftPosts} 
          type="draft"
          onEdit={(id) => onEdit?.(Number(id))}
          onCancel={(id) => onCancel?.(Number(id))} 
          onViewAll={onViewAllDrafts}
        />
      </TabsContent>
    );
  };
  
  const renderAnalyticsTab = () => {
    if (isLoading) {
      return (
        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        </TabsContent>
      );
    }
    
    if (!allPosts?.length) {
      return (
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <div className="mb-4">
                  <LineChart className="mx-auto h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">No analytics data available</h3>
                <p className="mt-2 text-sm text-gray-500">
                  You need to publish some content to see analytics data here.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate("/dashboard/new-post")}
                >
                  Create Your First Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      );
    }
    
    return (
      <TabsContent value="analytics" className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{publishedPosts.length > 0 ? "+18%" : "0%"}</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedPosts.reduce((sum, post) => sum + (post.engagement || 0), 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{publishedPosts.length > 0 ? "+23%" : "0%"}</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Performing</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-medium text-sm line-clamp-1">{bestPerforming.title}</div>
              <p className="text-xs text-muted-foreground">
                {bestPerforming.views ? `${bestPerforming.views.toLocaleString()} views` : "No data"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedPosts.length + scheduledPosts.length}</div>
              <p className="text-xs text-muted-foreground">
                Across all platforms
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>View detailed performance metrics for all your content</CardDescription>
            <Button variant="outline" className="mt-2" onClick={() => navigate("/dashboard/analytics")}>
              View Full Analytics
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              {analyticsData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={analyticsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No data available yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    );
  };

  const renderPlatformsTab = () => {
    return (
      <TabsContent value="platforms" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Connected Platforms</CardTitle>
            <CardDescription>Manage your social media accounts</CardDescription>
            <Button variant="outline" className="mt-2" onClick={() => navigate("/dashboard/social")}>
              Manage Social Accounts
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
                <div 
                  key={platform} 
                  className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate("/dashboard/social")}
                >
                  <div className="font-medium">{platform}</div>
                  <p className="text-xs text-gray-500">Not Connected</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    );
  };

  const renderSettingsTab = () => {
    return (
      <TabsContent value="settings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Settings</CardTitle>
            <CardDescription>Common settings and preferences</CardDescription>
            <Button variant="outline" className="mt-2" onClick={() => navigate("/dashboard/settings")}>
              View All Settings
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Auto-Publishing</h3>
                  <p className="text-sm text-gray-500">Automatically publish scheduled posts</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/settings")}>
                  Configure
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-gray-500">Email and push notification settings</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/settings")}>
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    );
  };
  
  return (
    <>
      {renderPostsTab()}
      {renderAnalyticsTab()}
      {renderPlatformsTab()}
      {renderSettingsTab()}
    </>
  );
};

export default DashboardTabContent;
