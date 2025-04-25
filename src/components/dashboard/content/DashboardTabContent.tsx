
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import PostsList from "@/components/dashboard/PostsList";
import PostFilters from "./PostFilters";
import { toast } from "sonner";

interface DashboardTabContentProps {
  activeTab: string;
}

const DashboardTabContent = ({ activeTab }: DashboardTabContentProps) => {
  const handleAction = (action: string) => {
    toast.success(`${action} action triggered!`);
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
          <PostFilters />
          <PostsList 
            title="Scheduled Posts" 
            posts={scheduledPosts} 
            type="scheduled"
            onEdit={(id) => handleAction("Edit")}
            onCancel={(id) => handleAction("Cancel")}
          />
          <PostsList 
            title="Recently Published" 
            posts={recentPublishedPosts} 
            type="published"
            onViewStats={(id) => handleAction("View Stats")}
            onRepublish={(id) => handleAction("Republish")}
          />
        </div>
      </TabsContent>
    </>
  );
};

export default DashboardTabContent;
