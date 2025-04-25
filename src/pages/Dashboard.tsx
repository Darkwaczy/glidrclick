import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PostsList from "@/components/dashboard/PostsList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("posts");

  const createPost = () => {
    toast.success("New post created! Redirecting to editor...");
    // In a real app, this would navigate to the editor
    // navigate("/dashboard/new-post");
  };

  const scheduledPosts = [
    { id: 1, title: "10 Ways to Improve Your Social Media Strategy", date: "Tomorrow, 09:00 AM", platform: "Blog, Facebook, Twitter", status: "scheduled" },
    { id: 2, title: "How to Increase Website Traffic in 2025", date: "Apr 28, 10:30 AM", platform: "Blog, LinkedIn", status: "scheduled" },
    { id: 3, title: "The Future of AI in Marketing", date: "Apr 30, 12:00 PM", platform: "Blog, Instagram", status: "draft" },
  ];

  const recentPublishedPosts = [
    { id: 4, title: "Email Marketing Best Practices for 2025", date: "Apr 23", views: 432, engagement: 76 },
    { id: 5, title: "How to Create Engaging Blog Content", date: "Apr 20", views: 1253, engagement: 247 },
    { id: 6, title: "SEO Tips for Blog Growth", date: "Apr 17", views: 867, engagement: 132 },
  ];

  const platformStats = [
    { name: "Blog", posts: 12, growth: 24 },
    { name: "Facebook", posts: 8, growth: 15 },
    { name: "Twitter", posts: 10, growth: 32 },
    { name: "Instagram", posts: 6, growth: -5 },
    { name: "LinkedIn", posts: 4, growth: 18 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar activePage="overview" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        {/* Main dashboard content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, User!</h1>
              <p className="text-gray-600">Here's what's happening with your content</p>
            </div>
            <Button className="gradient-button text-white" onClick={createPost}>
              <Plus size={18} className="mr-2" /> Create New Post
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="flex h-2 w-2 mr-1">↑</span>12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,281</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="flex h-2 w-2 mr-1">↑</span>23% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6%</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="flex h-2 w-2 mr-1">↑</span>5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Words Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48,952</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <span className="flex h-2 w-2 mr-1">↑</span>18% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Posts Tab Content */}
            <TabsContent value="posts">
              <div className="space-y-6">
                <PostsList 
                  title="Scheduled Posts" 
                  posts={scheduledPosts} 
                  type="scheduled" 
                />

                <PostsList 
                  title="Recently Published" 
                  posts={recentPublishedPosts} 
                  type="published" 
                />
              </div>
            </TabsContent>
            
            {/* Analytics Tab Content */}
            <TabsContent value="analytics">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Content Performance</CardTitle>
                      <CardDescription>Your post views over the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                        <p className="text-gray-500">Analytics Chart Would Show Here</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement by Platform</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {platformStats.map((platform) => (
                          <div key={platform.name} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{platform.name}</span>
                              <span className={platform.growth >= 0 ? "text-green-600" : "text-red-500"}>
                                {platform.growth > 0 ? "+" : ""}{platform.growth}%
                              </span>
                            </div>
                            <Progress value={platform.posts * 10} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Platforms Tab Content */}
            <TabsContent value="platforms">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white">W</div>
                      WordPress
                    </CardTitle>
                    <CardDescription>Connected · Primary Blog Platform</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <Badge variant="outline" className="text-green-600 bg-green-50">Connected</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Domain</span>
                      <span>yourblog.com</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Posts</span>
                      <span>24 posts</span>
                    </div>
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => toast.info("Opening WordPress configuration...")}
                      >
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">f</div>
                      Facebook
                    </CardTitle>
                    <CardDescription>Connected · Auto-sharing enabled</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <Badge variant="outline" className="text-green-600 bg-green-50">Connected</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Page</span>
                      <span>Your Business Page</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Posts</span>
                      <span>18 posts</span>
                    </div>
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => toast.info("Opening Facebook configuration...")}
                      >
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-sky-500 flex items-center justify-center text-white">X</div>
                      Twitter / X
                    </CardTitle>
                    <CardDescription>Connected · Auto-sharing enabled</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <Badge variant="outline" className="text-green-600 bg-green-50">Connected</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Account</span>
                      <span>@yourbusiness</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Posts</span>
                      <span>22 posts</span>
                    </div>
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => toast.info("Opening Twitter/X configuration...")}
                      >
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-white">
                        I
                      </div>
                      Instagram
                    </CardTitle>
                    <CardDescription>Connect your Instagram account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex flex-col items-center justify-center py-8">
                    <Button onClick={() => toast.info("Redirecting to Instagram authorization...")}>
                      Connect Instagram
                    </Button>
                    <p className="text-sm text-gray-500 max-w-xs text-center">
                      Share your blog posts as Instagram posts with auto-generated images
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Settings Tab Content */}
            <TabsContent value="settings">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Settings</CardTitle>
                    <CardDescription>Configure your content generation preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Blog Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Marketing</Badge>
                        <Badge>Social Media</Badge>
                        <Badge>SEO</Badge>
                        <Badge>Content Strategy</Badge>
                        <Badge 
                          variant="outline" 
                          className="cursor-pointer"
                          onClick={() => toast.info("Opening category manager...")}
                        >
                          + Add Category
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Content Tone</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Button variant="outline" className="bg-gray-100">Professional</Button>
                        <Button variant="outline" onClick={() => toast.info("Tone set to Conversational")}>Conversational</Button>
                        <Button variant="outline" onClick={() => toast.info("Tone set to Educational")}>Educational</Button>
                        <Button variant="outline" onClick={() => toast.info("Tone set to Humorous")}>Humorous</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Posting Schedule</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Mon, 9 AM</Badge>
                        <Badge>Wed, 10 AM</Badge>
                        <Badge>Fri, 11 AM</Badge>
                        <Badge 
                          variant="outline" 
                          className="cursor-pointer"
                          onClick={() => toast.info("Opening schedule manager...")}
                        >
                          + Add Time
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full"
                        onClick={() => toast.success("Settings saved successfully!")}
                      >
                        Save Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
