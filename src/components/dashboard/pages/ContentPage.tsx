
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, Plus, Eye, Edit, Trash2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { usePosts, type Post } from "@/hooks/usePosts";

const ContentPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [viewContent, setViewContent] = useState<Post | null>(null);
  const [editContent, setEditContent] = useState<Post | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const { posts, isLoading, deletePost, updatePost } = usePosts(activeTab === 'all' ? undefined : activeTab);
  
  const handleCreateContent = () => {
    navigate("/dashboard/new-post");
  };

  const handleAction = (action: string, post: Post) => {
    switch (action) {
      case "view":
        setViewContent(post);
        break;
      case "edit":
        setEditContent(post);
        break;
      case "delete":
        setDeleteConfirm(post.id);
        break;
      default:
        break;
    }
  };
  
  const handleSaveEdit = () => {
    if (!editContent) return;
    
    updatePost({
      id: editContent.id,
      data: {
        title: editContent.title,
        content: editContent.content
      }
    });
    
    setEditContent(null);
  };
  
  const handleDeleteConfirm = () => {
    if (!deleteConfirm) return;
    
    deletePost(deleteConfirm);
    setDeleteConfirm(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Management</h1>
          <p className="text-gray-300">Manage all your content in one place</p>
        </div>
        
        <Button onClick={handleCreateContent} className="btn-neon">
          <Plus size={16} className="mr-2" /> Create Content
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass-card border-white/20">
          <TabsTrigger value="all" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">All Content</TabsTrigger>
          <TabsTrigger value="published" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">Published</TabsTrigger>
          <TabsTrigger value="draft" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">Scheduled</TabsTrigger>
          <TabsTrigger value="archived" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <ContentList 
            items={posts}
            isLoading={isLoading}
            onView={(post) => handleAction("view", post)}
            onEdit={(post) => handleAction("edit", post)}
            onDelete={(post) => handleAction("delete", post)}
          />
        </TabsContent>
        
        <TabsContent value="published" className="mt-6">
          <ContentList 
            items={posts}
            isLoading={isLoading}
            onView={(post) => handleAction("view", post)}
            onEdit={(post) => handleAction("edit", post)}
            onDelete={(post) => handleAction("delete", post)}
          />
        </TabsContent>
        
        <TabsContent value="draft" className="mt-6">
          <ContentList 
            items={posts}
            isLoading={isLoading}
            onView={(post) => handleAction("view", post)}
            onEdit={(post) => handleAction("edit", post)}
            onDelete={(post) => handleAction("delete", post)}
          />
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <ContentList 
            items={posts}
            isLoading={isLoading}
            onView={(post) => handleAction("view", post)}
            onEdit={(post) => handleAction("edit", post)}
            onDelete={(post) => handleAction("delete", post)}
          />
        </TabsContent>
        
        <TabsContent value="archived" className="mt-6">
          <ContentList 
            items={posts}
            isLoading={isLoading}
            onView={(post) => handleAction("view", post)}
            onEdit={(post) => handleAction("edit", post)}
            onDelete={(post) => handleAction("delete", post)}
          />
        </TabsContent>
      </Tabs>
      
      {/* View Content Dialog */}
      <Dialog open={viewContent !== null} onOpenChange={() => setViewContent(null)}>
        <DialogContent className="sm:max-w-[600px] glass-card border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">{viewContent?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">{viewContent?.content || "No content available."}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewContent(null)} className="btn-neon">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Content Dialog */}
      <Dialog open={editContent !== null} onOpenChange={() => setEditContent(null)}>
        <DialogContent className="sm:max-w-[600px] glass-card border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Content</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title" className="text-white">Title</Label>
              <Input 
                id="edit-title" 
                value={editContent?.title || ""}
                onChange={(e) => setEditContent(prev => prev ? {...prev, title: e.target.value} : prev)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content" className="text-white">Content</Label>
              <textarea 
                id="edit-content"
                className="w-full min-h-[200px] p-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400"
                value={editContent?.content || ""}
                onChange={(e) => setEditContent(prev => prev ? {...prev, content: e.target.value} : prev)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setEditContent(null)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="btn-neon">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="glass-card border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">Are you sure you want to delete this content? This action cannot be undone.</p>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteConfirm(null)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
              className="bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ContentListProps {
  items?: Post[];
  isLoading: boolean;
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

const ContentList = ({ items, isLoading, onView, onEdit, onDelete }: ContentListProps) => {
  if (isLoading) {
    return (
      <Card className="glass-card border-white/20">
        <CardContent className="p-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-neon-electric" />
          <p className="text-gray-300 mt-2">Loading content...</p>
        </CardContent>
      </Card>
    );
  }

  if (!items?.length) {
    return (
      <Card className="glass-card border-white/20">
        <CardContent className="p-6 text-center">
          <p className="text-gray-300">No content found</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="glass-card border-white/20">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left text-white">Title</th>
                <th className="p-4 text-left text-white">Type</th>
                <th className="p-4 text-left text-white">Status</th>
                <th className="p-4 text-left text-white">Date</th>
                <th className="p-4 text-right text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-neon-electric" />
                      <span className="text-white">{item.title}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="capitalize text-gray-300">{item.type}</span>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-4">
                    <span className="text-gray-300">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => onView(item)} className="text-white hover:bg-white/10">
                        <Eye size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => onEdit(item)} className="text-white hover:bg-white/10">
                        <Edit size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => onDelete(item)} className="text-white hover:bg-white/10">
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
      case "published": return "bg-green-500/20 text-green-300 border-green-500/50";
      case "draft": return "bg-gray-500/20 text-gray-300 border-gray-500/50";
      case "scheduled": return "bg-blue-500/20 text-blue-300 border-blue-500/50";
      case "archived": return "bg-amber-500/20 text-amber-300 border-amber-500/50";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/50";
    }
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusColor()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default ContentPage;
