
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Calendar, Filter, BarChart3, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// This would be in a separate component file in a real app
const AnalyticsChart = () => (
  <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
    <p className="text-gray-500">Analytics chart would render here</p>
  </div>
);

// This would be in a separate component file in a real app
const PostPerformanceTable = () => {
  const posts = [
    { id: 1, title: "SEO Strategies for 2025", views: 1546, engagement: 214, ctr: 3.2 },
    { id: 2, title: "Understanding Social Media Algorithms", views: 1203, engagement: 157, ctr: 2.8 },
    { id: 3, title: "Content Marketing Best Practices", views: 978, engagement: 132, ctr: 2.6 },
    { id: 4, title: "Email Marketing Automation", views: 854, engagement: 96, ctr: 2.1 },
    { id: 5, title: "Using AI for Content Creation", views: 752, engagement: 87, ctr: 2.0 },
  ];
  
  return (
    <div className="w-full overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 font-medium text-sm">Post Title</th>
            <th className="text-right p-3 font-medium text-sm">Views</th>
            <th className="text-right p-3 font-medium text-sm">Engagement</th>
            <th className="text-right p-3 font-medium text-sm">CTR (%)</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{post.title}</td>
              <td className="p-3 text-right">{post.views.toLocaleString()}</td>
              <td className="p-3 text-right">{post.engagement}</td>
              <td className="p-3 text-right">{post.ctr}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState("last30days");
  const [platform, setPlatform] = useState("all");
  const [viewType, setViewType] = useState("overview");
  
  const handleExport = (format: string) => {
    toast.success(`Exporting analytics data as ${format.toUpperCase()}`);
    
    // In a real application, this would trigger an API call to generate and download the file
    setTimeout(() => {
      // Create a fake download link
      const link = document.createElement('a');
      link.href = 'data:text/plain;charset=utf-8,This is your exported analytics data';
      link.download = `analytics_export_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Content Analytics</h1>
          <p className="text-gray-600">Track your content performance across platforms</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ArrowDownToLine size={16} className="mr-2" /> Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Choose Format</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleExport('pdf')}>Export as PDF</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('csv')}>Export as CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('xlsx')}>Export as Excel</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('html')}>Export as HTML</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-auto">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Calendar size={16} className="mr-2" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Period</SelectLabel>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="last3months">Last 3 Months</SelectItem>
                <SelectItem value="lastYear">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto">
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Platform</SelectLabel>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto ml-auto">
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <BarChart3 size={16} className="mr-2" />
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>View Type</SelectLabel>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
                <SelectItem value="engagement">Engagement</SelectItem>
                <SelectItem value="conversion">Conversion</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0">
              <h3 className="text-sm font-medium tracking-tight">Total Views</h3>
              <BarChart3 className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold mt-2">12,483</div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <ArrowRight className="h-4 w-4 mr-1 rotate-45" />
              18% increase
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0">
              <h3 className="text-sm font-medium tracking-tight">Engagement Rate</h3>
              <Filter className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold mt-2">2.4%</div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <ArrowRight className="h-4 w-4 mr-1 rotate-45" />
              0.3% increase
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0">
              <h3 className="text-sm font-medium tracking-tight">Avg. Time on Page</h3>
              <Calendar className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold mt-2">2:34</div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <ArrowRight className="h-4 w-4 mr-1 rotate-45" />
              12% increase
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-row items-center justify-between space-y-0">
              <h3 className="text-sm font-medium tracking-tight">Conversions</h3>
              <BarChart3 className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold mt-2">347</div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <ArrowRight className="h-4 w-4 mr-1 rotate-45" />
              24% increase
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Analytics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>
            Visualize your content performance trends over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnalyticsChart />
        </CardContent>
      </Card>
      
      {/* Post Performance Table */}
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>
              See which content is getting the most engagement
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                <ArrowDownToLine size={16} className="mr-2" /> Export Table
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Choose Format</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('csv')}>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('xlsx')}>Export as Excel</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('html')}>Export as HTML</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <PostPerformanceTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
