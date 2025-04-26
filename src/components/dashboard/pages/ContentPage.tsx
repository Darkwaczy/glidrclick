
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ContentPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [viewContent, setViewContent] = useState<{ id: number; title: string; content?: string } | null>(null);
  const [editContent, setEditContent] = useState<{ id: number; title: string; content?: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [items, setItems] = useState([
    { id: 1, title: "10 Social Media Tips for 2025", type: "blog", status: "published", date: "Apr 25, 2025", content: "This is the content for the social media tips article..." },
    { id: 2, title: "Email Marketing Strategies", type: "newsletter", status: "draft", date: "Apr 24, 2025", content: "Draft content for email marketing strategies..." },
    { id: 3, title: "Instagram Growth Tactics", type: "social", status: "scheduled", date: "Apr 28, 2025", content: "Content about Instagram growth tactics..." },
    { id: 4, title: "SEO Best Practices", type: "blog", status: "published", date: "Apr 22, 2025", content: "SEO best practices content..." },
    { id: 5, title: "Content Calendar Template", type: "resource", status: "archived", date: "Apr 10, 2025", content: "Content calendar template details..." }
  ]);
  
  const handleCreateContent = () => {
    navigate("/dashboard/new-post");
  };

  const handleAction = (action: string, id: number) => {
    const contentItem = items.find(item => item.id === id);
    if (!contentItem) return;
    
    switch (action) {
      case "view":
        setViewContent(contentItem);
        break;
      case "edit":
        setEditContent(contentItem);
        break;
      case "delete":
        setDeleteConfirm(id);
        break;
      default:
        break;
    }
  };
  
  const handleSaveEdit = () => {
    if (!editContent) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === editContent.id ? { ...item, ...editContent } : item
      )
    );
    
    toast.success(`Content "${editContent.title}" updated successfully`);
    setEditContent(null);
  };
  
  const handleDeleteConfirm = () => {
    if (deleteConfirm === null) return;
    
    setItems(prevItems => prevItems.filter(item => item.id !== deleteConfirm));
    toast.success("Content deleted successfully");
    setDeleteConfirm(null);
  };
  
  const getFilteredItems = (status: string) => {
    if (status === "all") return items;
    return items.filter(item => item.status === status);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p className="text-gray-600">Manage all your content in one place</p>
        </div>
        
        <Button onClick={handleCreateContent}>
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
            items={getFilteredItems("all")}
            onView={(id) => handleAction("view", id)}
            onEdit={(id) => handleAction("edit", id)}
            onDelete={(id) => handleAction("delete", id)}
          />
        </TabsContent>
        
        <TabsContent value="published" className="mt-6">
          <ContentList 
            items={getFilteredItems("published")}
            onView={(id) => handleAction("view", id)}
            onEdit={(id) => handleAction("edit", id)}
            onDelete={(id) => handleAction("delete", id)}
          />
        </TabsContent>
        
        <TabsContent value="drafts" className="mt-6">
          <ContentList 
            items={getFilteredItems("draft")}
            onView={(id) => handleAction("view", id)}
            onEdit={(id) => handleAction("edit", id)}
            onDelete={(id) => handleAction("delete", id)}
          />
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <ContentList 
            items={getFilteredItems("scheduled")}
            onView={(id) => handleAction("view", id)}
            onEdit={(id) => handleAction("edit", id)}
            onDelete={(id) => handleAction("delete", id)}
          />
        </TabsContent>
        
        <TabsContent value="archived" className="mt-6">
          <ContentList 
            items={getFilteredItems("archived")}
            onView={(id) => handleAction("view", id)}
            onEdit={(id) => handleAction("edit", id)}
            onDelete={(id) => handleAction("delete", id)}
          />
        </TabsContent>
      </Tabs>
      
      {/* View Content Dialog */}
      <Dialog open={viewContent !== null} onOpenChange={() => setViewContent(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{viewContent?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{viewContent?.content || "No content available."}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewContent(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Content Dialog */}
      <Dialog open={editContent !== null} onOpenChange={() => setEditContent(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input 
                id="edit-title" 
                value={editContent?.title || ""}
                onChange={(e) => setEditContent(prev => prev ? {...prev, title: e.target.value} : prev)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Content</Label>
              <textarea 
                id="edit-content"
                className="w-full min-h-[200px] p-2 border rounded-md"
                value={editContent?.content || ""}
                onChange={(e) => setEditContent(prev => prev ? {...prev, content: e.target.value} : prev)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditContent(null)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this content? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
