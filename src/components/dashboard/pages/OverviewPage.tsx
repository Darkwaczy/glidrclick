
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Calendar, 
  FileText, 
  Share2, 
  TrendingUp, 
  Users, 
  Eye,
  Heart,
  MessageCircle,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const OverviewPage = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Posts",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-neon-electric"
    },
    {
      title: "Scheduled Posts",
      value: "8",
      change: "+25%",
      trend: "up", 
      icon: Calendar,
      color: "text-neon-pink"
    },
    {
      title: "Total Reach",
      value: "15.2K",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "text-neon-lime"
    },
    {
      title: "Engagement Rate",
      value: "4.8%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-neon-electric"
    }
  ];

  const recentPosts = [
    {
      title: "New Product Launch Announcement",
      platform: "All Platforms",
      status: "Published",
      engagement: { views: 1200, likes: 89, comments: 23 },
      publishedAt: "2 hours ago"
    },
    {
      title: "Behind the Scenes Content",
      platform: "Instagram, Facebook",
      status: "Scheduled",
      publishedAt: "Today at 6:00 PM"
    },
    {
      title: "Weekly Tips & Tricks",
      platform: "Twitter, LinkedIn",
      status: "Draft",
      publishedAt: "Draft saved"
    }
  ];

  const quickActions = [
    {
      title: "Create New Post",
      description: "Start creating content for your social media",
      icon: Plus,
      action: () => navigate("/dashboard/new-post"),
      color: "bg-gradient-to-r from-neon-electric/20 to-neon-pink/20 border-neon-electric/30"
    },
    {
      title: "Schedule Content",
      description: "Plan and schedule your upcoming posts",
      icon: Calendar,
      action: () => navigate("/dashboard/schedule"),
      color: "bg-gradient-to-r from-neon-pink/20 to-neon-lime/20 border-neon-pink/30"
    },
    {
      title: "View Analytics",
      description: "Check your content performance metrics",
      icon: BarChart3,
      action: () => navigate("/dashboard/analytics"),
      color: "bg-gradient-to-r from-neon-lime/20 to-neon-electric/20 border-neon-lime/30"
    }
  ];

  return (
    <div className="space-y-6 bg-transparent">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Overview</h1>
          <p className="text-gray-300 mt-1">Welcome back! Here's what's happening with your content.</p>
        </div>
        <Button 
          onClick={() => navigate("/dashboard/new-post")}
          className="bg-gradient-to-r from-neon-electric to-neon-pink hover:from-neon-electric/80 hover:to-neon-pink/80 text-white font-semibold"
        >
          <Plus size={16} className="mr-2" />
          Create Content
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card border-white/20 bg-dark-secondary/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-300">{stat.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      {stat.change}
                      <ArrowUpRight size={12} className="ml-1" />
                    </Badge>
                  </div>
                </div>
                <div className={`${stat.color} bg-white/10 p-3 rounded-lg`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <Card className="lg:col-span-2 glass-card border-white/20 bg-dark-secondary/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Recent Posts</CardTitle>
                <CardDescription className="text-gray-300">Your latest content activity</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/dashboard/content")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.map((post, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex-1">
                  <h3 className="font-medium text-white">{post.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                    <span>{post.platform}</span>
                    <Badge 
                      variant={post.status === 'Published' ? 'default' : post.status === 'Scheduled' ? 'secondary' : 'outline'}
                      className={
                        post.status === 'Published' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : post.status === 'Scheduled'
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }
                    >
                      {post.status}
                    </Badge>
                    <span>{post.publishedAt}</span>
                  </div>
                  {post.engagement && (
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye size={14} /> {post.engagement.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} /> {post.engagement.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle size={14} /> {post.engagement.comments}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-card border-white/20 bg-dark-secondary/50">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-300">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-start h-auto p-4 ${action.color} hover:bg-white/20 text-left border-white/20`}
                onClick={action.action}
              >
                <div className="flex items-start gap-3">
                  <action.icon size={20} className="text-neon-electric mt-0.5" />
                  <div>
                    <div className="font-medium text-white">{action.title}</div>
                    <div className="text-sm text-gray-300 mt-1">{action.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Content Performance */}
      <Card className="glass-card border-white/20 bg-dark-secondary/50">
        <CardHeader>
          <CardTitle className="text-white">Content Performance</CardTitle>
          <CardDescription className="text-gray-300">How your content is performing this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Reach Goal</span>
                <span className="text-white">15.2K / 20K</span>
              </div>
              <Progress value={76} className="h-2" />
              <p className="text-xs text-gray-400">76% of monthly goal</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Engagement Rate</span>
                <span className="text-white">4.8%</span>
              </div>
              <Progress value={96} className="h-2" />
              <p className="text-xs text-gray-400">Above industry average</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Content Published</span>
                <span className="text-white">24 / 30</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-xs text-gray-400">80% of planned content</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewPage;
