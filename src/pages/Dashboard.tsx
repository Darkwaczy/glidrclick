
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  LayoutDashboard, Settings, File, CalendarDays, BarChart, 
  Share, Bell, ChevronDown, Plus, Filter, 
  LogOut, Search, Archive, User
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1500);
  };

  const createPost = () => {
    toast.success("New post created! Redirecting to editor...");
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
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-4 flex items-center gap-2 border-b">
          <h1 className="text-xl font-bold gradient-text">Glidrclick</h1>
        </div>
        <div className="flex flex-col flex-grow p-4 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Dashboard</h3>
            <Button variant="ghost" className="w-full justify-start gap-2 bg-gray-100">
              <LayoutDashboard size={18} className="text-glidr-purple" /> Overview
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <File size={18} /> Content
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <CalendarDays size={18} /> Schedule
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BarChart size={18} /> Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Share size={18} /> Social
            </Button>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Settings</h3>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <User size={18} /> Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings size={18} /> Settings
            </Button>
          </div>

          <div className="mt-auto space-y-1">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex justify-between items-center p-4">
            <div className="flex gap-2 items-center">
              <Button variant="ghost" className="md:hidden">
                <LayoutDashboard size={20} />
              </Button>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-glidr-purple flex items-center justify-center text-white font-semibold">
                  U
                </div>
                <span className="hidden sm:inline">User</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </header>

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
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Posts Tab Content */}
            <TabsContent value="posts">
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-lg border">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search posts..." className="pl-10 w-full sm:w-[300px]" />
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Select>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter size={16} />
                    </Button>
                  </div>
                </div>

                {/* Scheduled Posts */}
                <div className="bg-white rounded-lg border">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Scheduled Posts</h3>
                  </div>
                  <div className="divide-y">
                    {scheduledPosts.map((post) => (
                      <div key={post.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{post.title}</h4>
                            <Badge variant={post.status === "scheduled" ? "secondary" : "outline"} className="text-xs">
                              {post.status === "scheduled" ? "Scheduled" : "Draft"}
                            </Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <CalendarDays size={14} />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Share size={14} />
                              {post.platform}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 self-end sm:self-center">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Cancel</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {scheduledPosts.length > 0 && (
                    <div className="p-4 border-t flex justify-center">
                      <Button variant="link">View All Scheduled Posts</Button>
                    </div>
                  )}
                </div>

                {/* Recent Published Posts */}
                <div className="bg-white rounded-lg border">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Recently Published</h3>
                  </div>
                  <div className="divide-y">
                    {recentPublishedPosts.map((post) => (
                      <div key={post.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <h4 className="font-medium">{post.title}</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <CalendarDays size={14} />
                              Published: {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart size={14} />
                              {post.views.toLocaleString()} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Share size={14} />
                              {post.engagement} engagements
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 self-end sm:self-center">
                          <Button variant="outline" size="sm">View Stats</Button>
                          <Button variant="ghost" size="sm">Republish</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {recentPublishedPosts.length > 0 && (
                    <div className="p-4 border-t flex justify-center">
                      <Button variant="link">View All Published Posts</Button>
                    </div>
                  )}
                </div>
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
                      <Button variant="outline" className="w-full">Configure</Button>
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
                      <Button variant="outline" className="w-full">Configure</Button>
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
                      <Button variant="outline" className="w-full">Configure</Button>
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
                    <Button>Connect Instagram</Button>
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
                        <Badge variant="outline">+ Add Category</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Content Tone</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Button variant="outline" className="bg-gray-100">Professional</Button>
                        <Button variant="outline">Conversational</Button>
                        <Button variant="outline">Educational</Button>
                        <Button variant="outline">Humorous</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Posting Schedule</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Mon, 9 AM</Badge>
                        <Badge>Wed, 10 AM</Badge>
                        <Badge>Fri, 11 AM</Badge>
                        <Badge variant="outline">+ Add Time</Badge>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button className="w-full">Save Settings</Button>
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
