
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ArrowDown, ArrowUp, Download } from "lucide-react";

const AnalyticsPage = () => {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Content Analytics</h1>
          <p className="text-gray-600">Track your content performance</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPeriod("7d")} 
            className={period === "7d" ? "bg-blue-50" : ""}>
            Last 7 Days
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPeriod("30d")}
            className={period === "30d" ? "bg-blue-50" : ""}>
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPeriod("90d")}
            className={period === "90d" ? "bg-blue-50" : ""}>
            Last 90 Days
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" /> Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Views" 
          value="24,521" 
          change={12} 
          period={period} 
        />
        <StatCard 
          title="Engagement Rate" 
          value="8.3%" 
          change={2.1} 
          period={period} 
        />
        <StatCard 
          title="Conversions" 
          value="512" 
          change={8} 
          period={period} 
        />
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Content views across all platforms</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Performance by content type</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contentTypeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#8884d8" />
                  <Bar dataKey="shares" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="platforms" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Views by platform</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Engagement by Platform</CardTitle>
                <CardDescription>Comparing platform performance</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={platformEngagementData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="engagement" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="audience" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>Breakdown of your audience</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={audienceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="male" stackId="a" fill="#8884d8" />
                  <Bar dataKey="female" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="other" stackId="a" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  period: "7d" | "30d" | "90d";
}

const StatCard = ({ title, value, change, period }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline justify-between mt-2">
            <h3 className="text-2xl font-bold">{value}</h3>
            <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? (
                <ArrowUp size={16} className="mr-1" />
              ) : (
                <ArrowDown size={16} className="mr-1" />
              )}
              <span className="text-sm font-medium">{change}%</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">vs. previous {getPeriodText(period)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function for period text
const getPeriodText = (period: "7d" | "30d" | "90d") => {
  switch (period) {
    case "7d": return "7 days";
    case "30d": return "30 days";
    case "90d": return "90 days";
    default: return "period";
  }
};

// Mock data
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const performanceData = [
  { date: 'Apr 20', views: 4000, engagement: 2400 },
  { date: 'Apr 21', views: 3000, engagement: 1398 },
  { date: 'Apr 22', views: 2000, engagement: 9800 },
  { date: 'Apr 23', views: 2780, engagement: 3908 },
  { date: 'Apr 24', views: 1890, engagement: 4800 },
  { date: 'Apr 25', views: 2390, engagement: 3800 },
  { date: 'Apr 26', views: 3490, engagement: 4300 },
];

const contentTypeData = [
  { type: 'Blog Posts', views: 4000, shares: 2400 },
  { type: 'Social Updates', views: 3000, shares: 1398 },
  { type: 'Videos', views: 2000, shares: 9800 },
  { type: 'Newsletters', views: 2780, shares: 3908 },
  { type: 'Infographics', views: 1890, shares: 4800 },
];

const platformData = [
  { name: 'Facebook', value: 400 },
  { name: 'Twitter', value: 300 },
  { name: 'Instagram', value: 300 },
  { name: 'LinkedIn', value: 200 },
  { name: 'Blog', value: 100 },
];

const platformEngagementData = [
  { name: 'Facebook', engagement: 4000 },
  { name: 'Twitter', engagement: 3000 },
  { name: 'Instagram', engagement: 5000 },
  { name: 'LinkedIn', engagement: 2000 },
  { name: 'Blog', engagement: 1000 },
];

const audienceData = [
  { age: '18-24', male: 24, female: 28, other: 2 },
  { age: '25-34', male: 42, female: 48, other: 4 },
  { age: '35-44', male: 28, female: 30, other: 2 },
  { age: '45-54', male: 15, female: 20, other: 1 },
  { age: '55+', male: 12, female: 14, other: 1 },
];

export default AnalyticsPage;
