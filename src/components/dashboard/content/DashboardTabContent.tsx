
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import PostsList from "@/components/dashboard/PostsList";
import PostFilters from "./PostFilters";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Share2, CalendarDays, File, Settings, Plus } from "lucide-react";

interface DashboardTabContentProps {
  activeTab: string;
}

const DashboardTabContent = ({ activeTab }: DashboardTabContentProps) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    toast.info(`Filtered by status: ${value}`);
  };

  const handlePlatformFilterChange = (value: string) => {
    setPlatformFilter(value);
    toast.info(`Filtered by platform: ${value}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleAction = (action: string, id: number) => {
    toast.success(`${action} action triggered for post #${id}!`);
  };

  const handleViewAll = (type: string) => {
    toast.info(`Viewing all ${type} posts`);
  };

  const scheduledPosts = [
    { id: 1, title: "10 Ways to Improve Your Social Media Strategy", date: "Tomorrow, 09:00 AM", platform: "Blog, Facebook, Twitter", status: "scheduled" },
    { id: 2, title: "How to Increase Website Traffic in 2025", date: "Apr 28, 10:30 AM", platform: "Blog, LinkedIn", status: "scheduled" },
    { id: 3, title: "Email Marketing Best Practices", date: "May 1, 08:00 AM", platform: "Newsletter", status: "scheduled" },
  ];

  const recentPublishedPosts = [
    { id: 4, title: "Email Marketing Best Practices for 2025", date: "Apr 23", views: 432, engagement: 76 },
    { id: 5, title: "How to Create Engaging Blog Content", date: "Apr 20", views: 1253, engagement: 247 },
    { id: 6, title: "Social Media Trends to Watch", date: "Apr 18", views: 867, engagement: 152 },
  ];

  const draftPosts = [
    { id: 7, title: "The Future of Content Marketing", date: "Updated Apr 24", platform: "Draft", status: "draft" },
    { id: 8, title: "SEO Strategies for 2025", date: "Updated Apr 22", platform: "Draft", status: "draft" },
  ];

  return (
    <>
      <TabsContent value="posts">
        <div className="space-y-6">
          <PostFilters 
            onStatusChange={handleStatusFilterChange}
            onPlatformChange={handlePlatformFilterChange}
            onSearchChange={handleSearchChange}
            statusValue={statusFilter}
            platformValue={platformFilter}
            searchValue={searchQuery}
          />
          
          <PostsList 
            title="Scheduled Posts" 
            posts={scheduledPosts} 
            type="scheduled"
            onEdit={(id) => handleAction("Edit", id)}
            onCancel={(id) => handleAction("Cancel", id)}
            onViewAll={() => handleViewAll("scheduled")}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            platformFilter={platformFilter}
          />
          
          <PostsList 
            title="Recently Published" 
            posts={recentPublishedPosts} 
            type="published"
            onViewStats={(id) => handleAction("View Stats", id)}
            onRepublish={(id) => handleAction("Republish", id)}
            onViewAll={() => handleViewAll("published")}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            platformFilter={platformFilter}
          />

          {statusFilter === "draft" || statusFilter === "all" ? (
            <PostsList 
              title="Drafts" 
              posts={draftPosts} 
              type="scheduled"
              onEdit={(id) => handleAction("Edit Draft", id)}
              onCancel={(id) => handleAction("Delete Draft", id)}
              onViewAll={() => handleViewAll("drafts")}
              searchQuery={searchQuery}
              statusFilter={statusFilter === "all" ? "draft" : statusFilter}
              platformFilter={platformFilter}
            />
          ) : null}
        </div>
      </TabsContent>
      
      <TabsContent value="analytics">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Track the performance of your content across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex flex-col items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Performance analytics will be displayed here</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => toast.info("Generating analytics report...")}
                >
                  <BarChart3 size={16} className="mr-2" /> Generate Report
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="font-medium text-blue-700">Total Views</h3>
                  <p className="text-2xl font-bold mt-2">24,521</p>
                  <p className="text-sm text-blue-600 mt-1">↑ 12% from last month</p>
                </div>
                <div className="bg-green-50 p-4 rounded-md">
                  <h3 className="font-medium text-green-700">Engagement Rate</h3>
                  <p className="text-2xl font-bold mt-2">8.3%</p>
                  <p className="text-sm text-green-600 mt-1">↑ 2.1% from last month</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-md">
                  <h3 className="font-medium text-purple-700">Conversions</h3>
                  <p className="text-2xl font-bold mt-2">512</p>
                  <p className="text-sm text-purple-600 mt-1">↑ 8% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="platforms">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Platforms</CardTitle>
              <CardDescription>Manage your social media and publishing platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <Share2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Facebook</h3>
                      <p className="text-sm text-gray-500">Connected as Glidrclick</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info("Facebook settings opened")}>
                    Settings
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <Share2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Twitter</h3>
                      <p className="text-sm text-gray-500">Connected as @glidrclick</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info("Twitter settings opened")}>
                    Settings
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <Share2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Instagram</h3>
                      <p className="text-sm text-gray-500">Connected as @glidrclick</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info("Instagram settings opened")}>
                    Settings
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <Share2 size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">LinkedIn</h3>
                      <p className="text-sm text-gray-500">Connected as Glidrclick</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.info("LinkedIn settings opened")}>
                    Settings
                  </Button>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6" 
                variant="outline"
                onClick={() => toast.info("Adding new platform...")}
              >
                <Plus size={16} className="mr-2" /> Connect New Platform
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Content Settings</CardTitle>
            <CardDescription>Configure your content publishing preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Auto Publishing</h4>
                  <p className="text-sm text-gray-500">Automatically publish scheduled content</p>
                </div>
                <div className="flex items-center justify-end h-6 rounded-full bg-blue-500 w-12 px-1 cursor-pointer" onClick={() => toast.info("Auto Publishing toggled")}>
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Get notified when content is published</p>
                </div>
                <div className="flex items-center justify-end h-6 rounded-full bg-blue-500 w-12 px-1 cursor-pointer" onClick={() => toast.info("Email Notifications toggled")}>
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">AI Content Suggestions</h4>
                  <p className="text-sm text-gray-500">Get AI-powered content ideas</p>
                </div>
                <div className="flex items-center justify-end h-6 rounded-full bg-blue-500 w-12 px-1 cursor-pointer" onClick={() => toast.info("AI Content Suggestions toggled")}>
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={() => toast.success("Settings saved!")}
                className="w-full"
              >
                <Settings size={16} className="mr-2" /> Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};

export default DashboardTabContent;
