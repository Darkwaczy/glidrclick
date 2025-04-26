
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, Plus, Eye, Edit, Trash2 } from "lucide-react";

const ContentPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const handleAction = (action: string, id: number) => {
    toast.success(`${action} content ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p className="text-gray-600">Manage all your content in one place</p>
        </div>
        
        <Button onClick={() => toast.success("Creating new content...")}>
          <Plus size={16} className="mr-2" /> Create Content
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <ContentList 
            items={[
              { id: 1, title: "10 Social Media Tips for 2025", type: "blog", status: "published", date: "Apr 25, 2025" },
              { id: 2, title: "Email Marketing Strategies", type: "newsletter", status: "draft", date: "Apr 24, 2025" },
              { id: 3, title: "Instagram Growth Tactics", type: "social", status: "scheduled", date: "Apr 28, 2025" },
              { id: 4, title: "SEO Best Practices", type: "blog", status: "published", date: "Apr 22, 2025" },
              { id: 5, title: "Content Calendar Template", type: "resource", status: "archived", date: "Apr 10, 2025" }
            ]}
            onView={(id) => handleAction("Viewing", id)}
            onEdit={(id) => handleAction("Editing", id)}
            onDelete={(id) => handleAction("Deleting", id)}
          />
        </TabsContent>
        
        <TabsContent value="published" className="mt-6">
          <ContentList 
            items={[
              { id: 1, title: "10 Social Media Tips for 2025", type: "blog", status: "published", date: "Apr 25, 2025" },
              { id: 4, title: "SEO Best Practices", type: "blog", status: "published", date: "Apr 22, 2025" },
            ]}
            onView={(id) => handleAction("Viewing", id)}
            onEdit={(id) => handleAction("Editing", id)}
            onDelete={(id) => handleAction("Deleting", id)}
          />
        </TabsContent>
        
        <TabsContent value="drafts" className="mt-6">
          <ContentList 
            items={[
              { id: 2, title: "Email Marketing Strategies", type: "newsletter", status: "draft", date: "Apr 24, 2025" },
            ]}
            onView={(id) => handleAction("Viewing", id)}
            onEdit={(id) => handleAction("Editing", id)}
            onDelete={(id) => handleAction("Deleting", id)}
          />
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <ContentList 
            items={[
              { id: 3, title: "Instagram Growth Tactics", type: "social", status: "scheduled", date: "Apr 28, 2025" },
            ]}
            onView={(id) => handleAction("Viewing", id)}
            onEdit={(id) => handleAction("Editing", id)}
            onDelete={(id) => handleAction("Deleting", id)}
          />
        </TabsContent>
        
        <TabsContent value="archived" className="mt-6">
          <ContentList 
            items={[
              { id: 5, title: "Content Calendar Template", type: "resource", status: "archived", date: "Apr 10, 2025" },
            ]}
            onView={(id) => handleAction("Viewing", id)}
            onEdit={(id) => handleAction("Editing", id)}
            onDelete={(id) => handleAction("Deleting", id)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ContentItem {
  id: number;
  title: string;
  type: string;
  status: string;
  date: string;
}

interface ContentListProps {
  items: ContentItem[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ContentList = ({ items, onView, onEdit, onDelete }: ContentListProps) => {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No content found</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-gray-500" />
                      <span>{item.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="capitalize">{item.type}</span>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-4">{item.date}</td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => onView(item.id)}>
                        <Eye size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => onEdit(item.id)}>
                        <Edit size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => onDelete(item.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-gray-100 text-gray-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "archived": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default ContentPage;
