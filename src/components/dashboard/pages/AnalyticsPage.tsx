
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  BarChart3,
  LineChart,
  PieChart,
  ArrowUpRight,
  Users,
  Calendar,
  Download
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("30days");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  
  // Generate some mock data for charts based on the selected time range
  const getChartData = () => {
    let data = [];
    
    if (timeRange === "7days") {
      data = [
        { name: "Mon", views: 320, engagement: 65 },
        { name: "Tue", views: 432, engagement: 78 },
        { name: "Wed", views: 542, engagement: 90 },
        { name: "Thu", views: 403, engagement: 65 },
        { name: "Fri", views: 554, engagement: 95 },
        { name: "Sat", views: 405, engagement: 75 },
        { name: "Sun", views: 376, engagement: 68 }
      ];
    } else if (timeRange === "30days") {
      data = [
        { name: "Week 1", views: 2200, engagement: 420 },
        { name: "Week 2", views: 2800, engagement: 490 },
        { name: "Week 3", views: 3200, engagement: 580 },
        { name: "Week 4", views: 3800, engagement: 650 }
      ];
    } else {
      data = [
        { name: "Jan", views: 8400, engagement: 1523 },
        { name: "Feb", views: 9200, engagement: 1652 },
        { name: "Mar", views: 10500, engagement: 1824 },
        { name: "Apr", views: 12483, engagement: 2145 },
        { name: "May", views: 14200, engagement: 2450 },
        { name: "Jun", views: 13100, engagement: 2280 }
      ];
    }
    
    // Adjust data based on selected platform
    if (selectedPlatform !== "all") {
      const multiplier = {
        "blog": 0.5,
        "facebook": 0.7,
        "twitter": 0.4,
        "instagram": 0.6,
        "linkedin": 0.3
      };
      
      return data.map(item => ({
        ...item,
        views: Math.floor(item.views * multiplier[selectedPlatform as keyof typeof multiplier]),
        engagement: Math.floor(item.engagement * multiplier[selectedPlatform as keyof typeof multiplier])
      }));
    }
    
    return data;
  };
  
  const getPlatformData = () => {
    return [
      { name: "Blog", value: 35 },
      { name: "Facebook", value: 25 },
      { name: "Twitter", value: 15 },
      { name: "Instagram", value: 15 },
      { name: "LinkedIn", value: 10 }
    ];
  };
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF'];
  
  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    toast.success(`Analytics data exported as ${format.toUpperCase()}`);
  };
  
  const getTotalViews = () => {
    const multiplier = timeRange === "7days" ? 1 : timeRange === "30days" ? 4 : 15;
    return 12483 * multiplier;
  };
  
  const getEngagement = () => {
    const multiplier = timeRange === "7days" ? 1 : timeRange === "30days" ? 4 : 15;
    return 2145 * multiplier;
  };
  
  const topPerformingPosts = [
    { id: 1, title: "SEO Strategies for 2025", views: 1546, engagement: 214 },
    { id: 2, title: "Understanding Social Media Algorithms", views: 1203, engagement: 157 },
    { id: 3, title: "Best Tools for Content Creation", views: 853, engagement: 92 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Content Analytics</h1>
          <p className="text-gray-600">Analyze your content performance</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Button variant="outline" onClick={() => document.getElementById("exportMenu")?.classList.toggle("hidden")}>
              <Download size={16} className="mr-2" />
              Export
            </Button>
            <div id="exportMenu" className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10 hidden">
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleExport('csv')}
                >
                  CSV
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleExport('pdf')}
                >
                  PDF
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleExport('excel')}
                >
                  Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[150px]">
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
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getTotalViews().toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+18%</span> from previous period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getEngagement().toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+23%</span> from previous period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Performing</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="font-medium text-sm line-clamp-1">{topPerformingPosts[0].title}</div>
                <p className="text-xs text-muted-foreground">
                  {topPerformingPosts[0].views.toLocaleString()} views
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Posts Published</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  Across all platforms
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Engagement By Platform</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={getPlatformData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getPlatformData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Title</th>
                      <th className="text-right p-3">Views</th>
                      <th className="text-right p-3">Engagement</th>
                      <th className="text-right p-3">Engagement Rate</th>
                      <th className="text-right p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPerformingPosts.map(post => (
                      <tr key={post.id} className="border-b">
                        <td className="text-left p-3">{post.title}</td>
                        <td className="text-right p-3">{post.views.toLocaleString()}</td>
                        <td className="text-right p-3">{post.engagement.toLocaleString()}</td>
                        <td className="text-right p-3">
                          {((post.engagement / post.views) * 100).toFixed(1)}%
                        </td>
                        <td className="text-right p-3">
                          <Button variant="ghost" size="sm" onClick={() => toast.success(`Viewing details for "${post.title}"`)}>
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { source: "Search", traffic: 5420 },
                    { source: "Social", traffic: 3250 },
                    { source: "Direct", traffic: 2200 },
                    { source: "Referral", traffic: 1613 },
                    { source: "Email", traffic: 840 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="traffic" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographical Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "United States", value: 45 },
                        { name: "United Kingdom", value: 15 },
                        { name: "Canada", value: 12 },
                        { name: "Australia", value: 8 },
                        { name: "Germany", value: 6 },
                        { name: "Others", value: 14 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getPlatformData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Mobile", value: 60 },
                        { name: "Desktop", value: 32 },
                        { name: "Tablet", value: 8 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#10b981" />
                      <Cell fill="#f59e0b" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={getChartData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#82ca9d" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Rate by Content Type</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { type: "How-to", rate: 6.2 },
                      { type: "Listicle", rate: 5.1 },
                      { type: "News", rate: 3.8 },
                      { type: "Case Study", rate: 7.5 },
                      { type: "Interview", rate: 4.2 }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="rate" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Audience Growth</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={[
                      { month: "Jan", followers: 5400 },
                      { month: "Feb", followers: 6200 },
                      { month: "Mar", followers: 7100 },
                      { month: "Apr", followers: 8600 },
                      { month: "May", followers: 10200 },
                      { month: "Jun", followers: 12000 }
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="followers" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
