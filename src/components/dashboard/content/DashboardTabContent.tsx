
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import PostsList from "@/components/dashboard/PostsList";
import PostFilters from "./PostFilters";
import { toast } from "sonner";

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
  ];

  const recentPublishedPosts = [
    { id: 4, title: "Email Marketing Best Practices for 2025", date: "Apr 23", views: 432, engagement: 76 },
    { id: 5, title: "How to Create Engaging Blog Content", date: "Apr 20", views: 1253, engagement: 247 },
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
        </div>
      </TabsContent>
      
      <TabsContent value="analytics">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Analytics Dashboard</h3>
          <p className="text-gray-500">Content performance metrics and insights will appear here.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="platforms">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Connected Platforms</h3>
          <p className="text-gray-500">Connect and manage your social media accounts and publishing platforms.</p>
        </div>
      </TabsContent>
      
      <TabsContent value="settings">
        <div className="p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-medium mb-4">Content Settings</h3>
          <p className="text-gray-500">Configure your content publishing preferences and defaults.</p>
        </div>
      </TabsContent>
    </>
  );
};

export default DashboardTabContent;
