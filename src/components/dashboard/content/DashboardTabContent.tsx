
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowUpRight, LineChart, Users, Calendar, Loader } from "lucide-react";
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
  const { posts: allPosts, isLoading } = usePosts();
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<any[]>([]);
  const [draftPosts, setDraftPosts] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  
  useEffect(() => {
    if (!isLoading && allPosts) {
      const scheduled = allPosts
        .filter(post => post.status === 'scheduled')
        .map(post => ({
          id: post.id,
          title: post.title,
          date: new Date(post.scheduled_for || '').toLocaleString(),
          platform: 'All Platforms'
        }));
      
      const published = allPosts
        .filter(post => post.status === 'published')
        .map(post => ({
          id: post.id,
          title: post.title,
          date: new Date(post.published_at || '').toLocaleString(),
          views: Math.floor(Math.random() * 100), // Placeholder until we have real analytics
          engagement: Math.floor(Math.random() * 50) // Placeholder until we have real analytics
        }));
      
      const drafts = allPosts
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
      
      // Generate some basic analytics data based on real posts
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const newAnalyticsData = months.map((month, index) => {
        const postCount = allPosts.filter(post => {
          const postDate = new Date(post.created_at);
          return postDate.getMonth() === index;
        }).length;
        
        return {
          name: month,
          views: postCount * Math.floor(Math.random() * 20 + 10),
          engagement: postCount * Math.floor(Math.random() * 10 + 5)
        };
      });
      
      setAnalyticsData(newAnalyticsData);
    }
  }, [isLoading, allPosts]);
  
  const totalViews = publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0);
  const viewsChange = totalViews > 0 ? "+18%" : "0%";
  const engagement = publishedPosts.reduce((sum, post) => sum + (post.engagement || 0), 0);
  const engagementChange = engagement > 0 ? "+23%" : "0%";
  
  const bestPerforming = publishedPosts.length > 0 ? 
    publishedPosts.reduce((best, current) => (current.views > best.views ? current : best), publishedPosts[0]) : 
    { title: "No published posts yet", views: 0 };
  
  const handleEditPost = (id: any) => {
    if (onEdit) onEdit(id);
  };
  
  const handleCancelPost = (id: any) => {
    if (onCancel) onCancel(id);
  };
  
  return (
    <>
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
            onEdit={handleEditPost}
            onCancel={handleCancelPost}
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
          onEdit={handleEditPost}
          onCancel={handleCancelPost} 
          onViewAll={onViewAllDrafts}
        />
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : publishedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{viewsChange}</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{engagement.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{engagementChange}</span> from last month
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
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
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
        )}
      </TabsContent>
      
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
                  className="border rounded-lg p-4 text-center hover:bg-gray-50"
                >
                  <div className="font-medium">{platform}</div>
                  <p className="text-xs text-gray-500">Not Connected</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
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
    </>
  );
};

export default DashboardTabContent;
