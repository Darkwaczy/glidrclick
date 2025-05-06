
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Edit, X } from "lucide-react";
import { addMonths, subMonths, format, isSameDay } from "date-fns";
import { getScheduledPosts } from "@/utils/social/posts";
import { supabase } from "@/integrations/supabase/client";

const SchedulePage = () => {
  const [activeView, setActiveView] = useState<"calendar" | "list">("calendar");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
  const [holidays, setHolidays] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchScheduledPosts = async () => {
    setIsLoading(true);
    try {
      const posts = await getScheduledPosts();
      
      const formattedPosts = posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        platform: post.post_platforms?.length > 0 
          ? post.post_platforms.map((p: any) => p.platforms?.name || 'Unknown').join(', ')
          : 'Multiple',
        date: new Date(post.scheduled_for)
      }));
      
      setScheduledPosts(formattedPosts);
      console.log("Scheduled posts loaded:", formattedPosts);
    } catch (error) {
      console.error("Error fetching scheduled posts:", error);
      toast.error("Failed to load scheduled posts");
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchHolidays = async () => {
    try {
      // Get current year
      const year = new Date().getFullYear();
      
      // Get holidays from an API or use a predefined list
      const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`);
      
      if (response.ok) {
        const holidayData = await response.json();
        const formattedHolidays = holidayData.map((holiday: any) => ({
          date: new Date(holiday.date),
          name: holiday.name,
          type: 'holiday'
        }));
        
        // Add some common awareness days
        const awarenessEvents = [
          { date: new Date(year, 2, 8), name: "International Women's Day", type: 'awareness' },
          { date: new Date(year, 11, 1), name: "World AIDS Day", type: 'awareness' },
          { date: new Date(year, 9, 10), name: "World Mental Health Day", type: 'awareness' },
          { date: new Date(year, 5, 5), name: "World Environment Day", type: 'awareness' },
          { date: new Date(year, 2, 22), name: "World Water Day", type: 'awareness' },
          { date: new Date(year, 2, 31), name: "Mothers Day", type: 'awareness' }
        ];
        
        setHolidays([...formattedHolidays, ...awarenessEvents]);
      } else {
        console.error("Failed to fetch holidays");
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };
  
  useEffect(() => {
    fetchScheduledPosts();
    fetchHolidays();
  }, []);
  
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
    toast.info(`Viewing ${format(subMonths(currentDate, 1), 'MMMM yyyy')}`);
  };
  
  const goToNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
    toast.info(`Viewing ${format(addMonths(currentDate, 1), 'MMMM yyyy')}`);
  };
  
  const handleEditPost = (postId: string) => {
    setEditPostId(postId);
  };
  
  const handleCancelPost = async (postId: string) => {
    const postToCancel = scheduledPosts.find(post => post.id === postId);
    
    if (confirm(`Are you sure you want to cancel "${postToCancel?.title}"?`)) {
      try {
        const { error } = await supabase
          .from('posts')
          .delete()
          .eq('id', postId);
          
        if (error) throw error;
        
        setScheduledPosts(scheduledPosts.filter(post => post.id !== postId));
        toast.success("Post has been cancelled");
      } catch (error) {
        console.error("Error cancelling post:", error);
        toast.error("Failed to cancel post");
      }
    }
  };
  
  const handleSaveEdit = async (postId: string, updatedTitle: string, updatedDate: Date) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          title: updatedTitle,
          scheduled_for: updatedDate.toISOString()
        })
        .eq('id', postId);
        
      if (error) throw error;
      
      setScheduledPosts(posts => 
        posts.map(post => 
          post.id === postId 
            ? { ...post, title: updatedTitle, date: updatedDate } 
            : post
        )
      );
      
      toast.success("Post updated successfully");
      setEditPostId(null);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    }
  };
  
  const editingPost = scheduledPosts.find(post => post.id === editPostId);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState<Date | null>(null);
  
  useEffect(() => {
    if (editingPost) {
      setEditTitle(editingPost.title);
      setEditDate(editingPost.date);
    }
  }, [editingPost]);
  
  const formatDate = (date: Date) => {
    return format(date, "MMM d, yyyy, h:mm a");
  };
  
  const getPostsByDate = (date: Date) => {
    return scheduledPosts.filter(post => 
      isSameDay(post.date, date)
    );
  };
  
  const getHolidaysByDate = (date: Date) => {
    return holidays.filter(holiday => 
      isSameDay(holiday.date, date)
    );
  };
  
  const hasContentOnDay = (date: Date) => {
    return scheduledPosts.some(post => isSameDay(post.date, date)) || 
           holidays.some(holiday => isSameDay(holiday.date, date));
  };
  
  const renderDay = (day: Date) => {
    const hasContent = hasContentOnDay(day);
    const hasPost = scheduledPosts.some(post => isSameDay(post.date, day));
    const hasHoliday = holidays.some(holiday => isSameDay(holiday.date, day));
    
    return (
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onClick={() => setCurrentDate(day)}
      >
        <div className={`${hasHoliday ? 'text-red-500 font-medium' : ''}`}>
          {day.getDate()}
        </div>
        <div className="absolute bottom-1 flex gap-0.5 justify-center">
          {hasPost && <div className="w-1 h-1 bg-blue-500 rounded-full"></div>}
          {hasHoliday && <div className="w-1 h-1 bg-red-500 rounded-full"></div>}
        </div>
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
            <CalendarIcon size={16} className="mr-2" /> Calendar
          </Button>
          <Button 
            variant={activeView === "list" ? "default" : "outline"} 
            onClick={() => setActiveView("list")}
          >
            <X size={16} className="mr-2" /> List View
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
                    Day: ({ date }) => renderDay(date)
                  }}
                />
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-lg mb-4">
                  {format(currentDate, "MMMM d, yyyy")}
                </h3>
                
                {/* Show holidays or awareness days for the selected date */}
                {getHolidaysByDate(currentDate).length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Events & Holidays</h4>
                    <div className="space-y-2">
                      {getHolidaysByDate(currentDate).map((holiday, index) => (
                        <div key={index} className="rounded-md bg-gray-50 p-2 border border-gray-100">
                          <p className={`text-sm font-medium ${holiday.type === 'awareness' ? 'text-blue-600' : 'text-red-600'}`}>
                            {holiday.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <h4 className="text-sm font-medium text-gray-600 mb-2">Scheduled Posts</h4>
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
                    <p className="text-gray-500 text-center py-6 bg-gray-50 rounded-md">No posts scheduled for this day</p>
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
              {isLoading ? (
                <div className="py-8 text-center">Loading scheduled posts...</div>
              ) : scheduledPosts.length === 0 ? (
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
