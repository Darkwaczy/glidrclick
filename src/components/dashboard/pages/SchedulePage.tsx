
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, CalendarDays, ListFilter, Calendar as CalendarIcon, Edit, X } from "lucide-react";
import { addMonths, subMonths, format } from "date-fns";

const SchedulePage = () => {
  const [activeView, setActiveView] = useState<"calendar" | "list">("calendar");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [scheduledPosts, setScheduledPosts] = useState([
    { 
      id: 1, 
      title: "10 Ways to Improve Your Social Media Strategy", 
      platform: "Multiple", 
      date: new Date(2025, 3, 27, 9, 0) // April 27, 2025, 9:00 AM
    },
    { 
      id: 2, 
      title: "How to Increase Website Traffic in 2025", 
      platform: "Blog, LinkedIn", 
      date: new Date(2025, 3, 28, 10, 30) // April 28, 2025, 10:30 AM
    },
    { 
      id: 3, 
      title: "Email Marketing Best Practices", 
      platform: "Newsletter", 
      date: new Date(2025, 4, 1, 8, 0) // May 1, 2025, 8:00 AM
    }
  ]);
  
  // Calendar navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
    toast.info(`Viewing ${format(subMonths(currentDate, 1), 'MMMM yyyy')}`);
  };
  
  const goToNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
    toast.info(`Viewing ${format(addMonths(currentDate, 1), 'MMMM yyyy')}`);
  };
  
  const handleEditPost = (postId: number) => {
    setEditPostId(postId);
  };
  
  const handleCancelPost = (postId: number) => {
    const postToCancel = scheduledPosts.find(post => post.id === postId);
    
    if (confirm(`Are you sure you want to cancel "${postToCancel?.title}"?`)) {
      setScheduledPosts(scheduledPosts.filter(post => post.id !== postId));
      toast.success("Post has been cancelled");
    }
  };
  
  const handleSaveEdit = (postId: number, updatedTitle: string, updatedDate: Date) => {
    setScheduledPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { ...post, title: updatedTitle, date: updatedDate } 
          : post
      )
    );
    
    toast.success("Post updated successfully");
    setEditPostId(null);
  };
  
  // Find the post being edited
  const editingPost = scheduledPosts.find(post => post.id === editPostId);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState<Date | null>(null);
  
  // Update edit form when selected post changes
  React.useEffect(() => {
    if (editingPost) {
      setEditTitle(editingPost.title);
      setEditDate(editingPost.date);
    }
  }, [editingPost]);
  
  // Helper function to format a date to string
  const formatDate = (date: Date) => {
    return format(date, "MMM d, yyyy, h:mm a");
  };
  
  // Helper function to group posts by date
  const getPostsByDate = (date: Date) => {
    return scheduledPosts.filter(post => 
      post.date.getDate() === date.getDate() && 
      post.date.getMonth() === date.getMonth() &&
      post.date.getFullYear() === date.getFullYear()
    );
  };
  
  // When a day in calendar has posts
  const hasPostsOnDay = (date: Date) => {
    return scheduledPosts.some(post => 
      post.date.getDate() === date.getDate() && 
      post.date.getMonth() === date.getMonth() &&
      post.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Render a calendar day cell
  const renderDay = (date: Date) => {
    const hasContent = hasPostsOnDay(date);
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {date.getDate()}
        {hasContent && <div className="absolute bottom-0 w-1 h-1 bg-blue-500 rounded-full"></div>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Content Schedule</h1>
          <p className="text-gray-600">Manage your upcoming content</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={activeView === "calendar" ? "default" : "outline"} 
            onClick={() => setActiveView("calendar")}
          >
            <CalendarDays size={16} className="mr-2" /> Calendar
          </Button>
          <Button 
            variant={activeView === "list" ? "default" : "outline"} 
            onClick={() => setActiveView("list")}
          >
            <ListFilter size={16} className="mr-2" /> List View
          </Button>
        </div>
      </div>
      
      <Tabs value={activeView}>
        <TabsContent value="calendar">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Calendar View</CardTitle>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="mx-4 font-medium">
                  {format(currentDate, "MMMM yyyy")}
                </div>
                <Button variant="outline" size="icon" onClick={goToNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <Calendar 
                  mode="single"
                  selected={currentDate}
                  onSelect={(date) => date && setCurrentDate(date)}
                  month={currentDate}
                  className="rounded-md border"
                  components={{
                    Day: ({ day }) => renderDay(day.date)
                  }}
                />
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-lg mb-4">
                  Posts on {format(currentDate, "MMMM d, yyyy")}
                </h3>
                <div className="space-y-4">
                  {getPostsByDate(currentDate).length > 0 ? (
                    getPostsByDate(currentDate).map(post => (
                      <div key={post.id} className="border rounded-lg p-4 flex justify-between">
                        <div>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            <CalendarIcon className="inline-block mr-1 h-3 w-3" />
                            {formatDate(post.date)}
                          </div>
                          <div className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-0.5 inline-block mt-2">
                            {post.platform}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditPost(post.id)}>
                            <Edit size={14} className="mr-1" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleCancelPost(post.id)}>
                            <X size={14} className="mr-1" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-10">No posts scheduled for this day</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Content</CardTitle>
            </CardHeader>
            <CardContent>
              {scheduledPosts.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No upcoming posts</p>
              ) : (
                <div className="space-y-4">
                  {scheduledPosts
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map(post => (
                      <div key={post.id} className="border rounded-lg p-4 flex justify-between">
                        <div>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            <CalendarIcon className="inline-block mr-1 h-3 w-3" />
                            {formatDate(post.date)}
                          </div>
                          <div className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-0.5 inline-block mt-2">
                            {post.platform}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditPost(post.id)}>
                            <Edit size={14} className="mr-1" /> Edit
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleCancelPost(post.id)}>
                            <X size={14} className="mr-1" /> Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Edit Post Dialog */}
      <Dialog open={editPostId !== null} onOpenChange={(open) => !open && setEditPostId(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Scheduled Post</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Post Title</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-date">Scheduled Date</Label>
              <Input
                id="edit-date"
                type="datetime-local"
                value={editDate ? format(editDate, "yyyy-MM-dd'T'HH:mm") : ""}
                onChange={(e) => setEditDate(new Date(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditPostId(null)}>Cancel</Button>
            <Button 
              onClick={() => {
                if (editPostId && editDate) {
                  handleSaveEdit(editPostId, editTitle, editDate);
                }
              }}
              disabled={!editTitle || !editDate}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulePage;
