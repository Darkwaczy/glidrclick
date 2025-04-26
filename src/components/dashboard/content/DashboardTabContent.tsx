
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowUpRight, LineChart, Users, Calendar } from "lucide-react";
import PostsList from "@/components/dashboard/PostsList";

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
  // Mock data for scheduled posts
  const scheduledPosts = [
    { id: 1, title: "10 Ways to Improve Your Social Media Strategy", date: "Tomorrow, 09:00 AM", platform: "Multiple" },
    { id: 2, title: "How to Increase Website Traffic in 2025", date: "Apr 28, 2025, 10:30 AM", platform: "Blog, LinkedIn" },
    { id: 3, title: "Email Marketing Best Practices", date: "May 1, 2025, 08:00 AM", platform: "Newsletter" }
  ];
  
  // Mock data for published posts
  const publishedPosts = [
    { id: 4, title: "Understanding Social Media Algorithms", date: "Apr 22, 2025", views: 1203, engagement: 157 },
    { id: 5, title: "Best Tools for Content Creation", date: "Apr 18, 2025", views: 853, engagement: 92 },
    { id: 6, title: "SEO Strategies for 2025", date: "Apr 15, 2025", views: 1546, engagement: 214 }
  ];
  
  // Mock data for draft posts
  const draftPosts = [
    { id: 7, title: "Content Calendar Template (Draft)", date: "Updated Apr 20, 2025" },
    { id: 8, title: "Website Redesign Announcement (Draft)", date: "Updated Apr 15, 2025" },
    { id: 9, title: "Customer Testimonials Collection (Draft)", date: "Updated Apr 10, 2025" }
  ];
  
  // Mock analytics data
  const totalViews = 12483;
  const viewsChange = "+18%";
  const engagement = 2145;
  const engagementChange = "+23%";
  const bestPerforming = "SEO Strategies for 2025";
  
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
                Next post: {scheduledPosts[0].date}
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
                Last 30 days
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
                Ready to be scheduled
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Scheduled Posts */}
          <PostsList 
            title="Upcoming Posts" 
            posts={scheduledPosts} 
            type="scheduled" 
            onEdit={onEdit}
            onCancel={onCancel}
            onViewAll={onViewAllScheduled}
          />
          
          {/* Published Posts */}
          <PostsList 
            title="Recently Published" 
            posts={publishedPosts} 
            type="published" 
            onViewStats={onViewStats}
            onRepublish={onRepublish}
            onViewAll={onViewAllPublished}
          />
        </div>
        
        {/* Draft Posts */}
        <PostsList 
          title="Draft Posts" 
          posts={draftPosts} 
          type="scheduled"
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
              <div className="font-medium text-sm line-clamp-1">{bestPerforming}</div>
              <p className="text-xs text-muted-foreground">
                1,546 views
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
            <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Analytics chart preview</p>
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
                  <p className="text-xs text-green-600">Connected</p>
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
