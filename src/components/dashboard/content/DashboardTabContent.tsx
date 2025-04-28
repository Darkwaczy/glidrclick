import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowUpRight, LineChart, Users, Calendar } from "lucide-react";
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
import { getPublishedPosts, getScheduledPosts } from "@/utils/socialConnections";

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
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<any[]>([]);
  const [draftPosts, setDraftPosts] = useState<any[]>([]);
  
  useEffect(() => {
    const realScheduledPosts = getScheduledPosts();
    const realPublishedPosts = getPublishedPosts();
    
    if (realScheduledPosts.length > 0) {
      const formattedScheduledPosts = realScheduledPosts.map(post => ({
        id: post.id,
        title: post.title,
        date: post.scheduledFor,
        platform: post.platforms.join(', ')
      }));
      setScheduledPosts(formattedScheduledPosts);
    }
    
    if (realPublishedPosts.length > 0) {
      const formattedPublishedPosts = realPublishedPosts.map(post => ({
        id: post.id,
        title: post.title,
        date: post.date,
        views: post.views || 0,
        engagement: post.engagement || 0
      }));
      setPublishedPosts(formattedPublishedPosts);
    }
    
    if (realScheduledPosts.length === 0) {
      setScheduledPosts([
        { id: 1, title: "Connect a platform and create your first scheduled post", date: "N/A", platform: "N/A" }
      ]);
    }
    
    if (realPublishedPosts.length === 0) {
      setPublishedPosts([
        { id: 1, title: "Connect a platform and publish your first post", date: "N/A", views: 0, engagement: 0 }
      ]);
    }
    
    setDraftPosts([]);
  }, []);
  
  const totalViews = publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0);
  const viewsChange = "+18%";
  const engagement = publishedPosts.reduce((sum, post) => sum + (post.engagement || 0), 0);
  const engagementChange = "+23%";
  
  const bestPerforming = publishedPosts.length > 0 ? 
    publishedPosts.reduce((best, current) => (current.views > best.views ? current : best), publishedPosts[0]) : 
    { title: "No published posts yet" };
  
  const analyticsData = [
    { name: "Jan", views: 0, engagement: 0 },
    { name: "Feb", views: 0, engagement: 0 },
    { name: "Mar", views: 0, engagement: 0 },
    { name: "Apr", views: 0, engagement: 0 },
    { name: "May", views: 0, engagement: 0 },
    { name: "Jun", views: totalViews, engagement: engagement }
  ];
  
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
                {scheduledPosts.length > 0 && scheduledPosts[0].date !== "N/A" ? 
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
                {publishedPosts.length > 0 && publishedPosts[0].date !== "N/A" ? 
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
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-6">
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
