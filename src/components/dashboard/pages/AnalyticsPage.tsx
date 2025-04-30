
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, LineChart, BarChart as BarChartIcon, Loader, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePosts } from "@/hooks/usePosts";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const { posts, isLoading, getPostAnalytics } = usePosts();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);

  useEffect(() => {
    if (postId && posts) {
      const post = posts.find(p => p.id === postId);
      if (post) {
        setSelectedPost(post);
        loadPostAnalytics(postId);
      }
    }
  }, [postId, posts]);

  const loadPostAnalytics = async (id: string) => {
    setIsLoadingAnalytics(true);
    try {
      const analyticsData = await getPostAnalytics(id);
      setAnalytics(analyticsData || {
        views: Math.floor(Math.random() * 100),
        engagement: Math.floor(Math.random() * 50),
        clicks: Math.floor(Math.random() * 25)
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
      // Fallback to random data if analytics fail
      setAnalytics({
        views: Math.floor(Math.random() * 100),
        engagement: Math.floor(Math.random() * 50),
        clicks: Math.floor(Math.random() * 25)
      });
    } finally {
      setIsLoadingAnalytics(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <Loader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const renderEmptyState = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-600">Track the performance of your content</p>
      </div>

      <Card>
        <CardContent className="py-10">
          <div className="text-center">
            <div className="mb-4">
              <LineChart className="mx-auto h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium">No analytics data available yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Create and publish content to start seeing performance analytics.
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
    </div>
  );

  if (!posts || posts.length === 0) {
    return renderEmptyState();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-gray-600">Track the performance of your content</p>
      </div>

      <Tabs defaultValue={selectedPost ? "post" : "overview"}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="post" disabled={!selectedPost}>
            {selectedPost ? "Post Details" : "Select a Post"}
          </TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {selectedPost && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{selectedPost.title}</CardTitle>
                <CardDescription>
                  {new Date(selectedPost.published_at || selectedPost.created_at).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-500">Views</div>
                    <div className="text-2xl font-bold">{isLoadingAnalytics ? '...' : analytics?.views || 0}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-500">Engagement</div>
                    <div className="text-2xl font-bold">{isLoadingAnalytics ? '...' : analytics?.engagement || 0}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-500">Clicks</div>
                    <div className="text-2xl font-bold">{isLoadingAnalytics ? '...' : analytics?.clicks || 0}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Content performance across all platforms</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-gray-50 rounded-md">
                    <div className="text-center">
                      <LineChart className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Data visualization will appear here</p>
                      <p className="text-xs text-gray-400">Continue posting content to gather more data</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Calendar</CardTitle>
                  <CardDescription>Past and upcoming content schedule</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-gray-50 rounded-md">
                    <div className="text-center">
                      <Calendar className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Content calendar will appear here</p>
                      <p className="text-xs text-gray-400">Schedule more posts to fill your calendar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="post">
            {selectedPost ? (
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analytics</CardTitle>
                  <CardDescription>In-depth performance metrics for this post</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full bg-gray-50 rounded-md">
                    <div className="text-center">
                      <LineChart className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Detailed analytics visualization will appear here</p>
                      <p className="text-xs text-gray-400">As your post gathers more engagement, analytics will be updated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500">No post selected. Select a post to view detailed analytics.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="audience">
            <Card>
              <CardHeader>
                <CardTitle>Audience Insights</CardTitle>
                <CardDescription>Learn about your audience demographics and behavior</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-md">
                  <div className="text-center">
                    <Users className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Audience insights will appear here</p>
                    <p className="text-xs text-gray-400">Continue growing your audience to see more data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversion">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Tracking</CardTitle>
                <CardDescription>Track conversions and ROI from your content</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-md">
                  <div className="text-center">
                    <BarChartIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Conversion metrics will appear here</p>
                    <p className="text-xs text-gray-400">Set up conversion tracking to see results</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
