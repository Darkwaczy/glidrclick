
import React from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, BarChart3, Users, LineChart, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis 
} from "recharts";

interface AnalyticsTabContentProps {
  publishedPosts: any[];
  scheduledPosts: any[];
  analyticsData: any[];
  bestPerforming: { title: string, views?: number };
  isLoading: boolean;
}

const AnalyticsTabContent: React.FC<AnalyticsTabContentProps> = ({
  publishedPosts,
  scheduledPosts,
  analyticsData,
  bestPerforming,
  isLoading
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!publishedPosts?.length) {
    return (
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
    );
  }

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default AnalyticsTabContent;
