
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CalendarDays, FileText, Clock, Edit, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const SchedulePage = () => {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [posts, setPosts] = useState<ScheduledPost[]>(scheduledPosts);
  
  const handleActionClick = (action: string, id: number) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    
    if (action === "edit") {
      setSelectedPost(post);
      setIsEditing(true);
    } else if (action === "cancel") {
      setSelectedPost(post);
      setIsDeleting(true);
    }
  };
  
  const handleSaveEdit = () => {
    if (selectedPost) {
      setPosts(posts.map(p => p.id === selectedPost.id ? selectedPost : p));
      toast.success(`Post "${selectedPost.title}" updated`);
      setSelectedPost(null);
      setIsEditing(false);
    }
  };
  
  const handleConfirmDelete = () => {
    if (selectedPost) {
      setPosts(posts.filter(p => p.id !== selectedPost.id));
      toast.success(`Post "${selectedPost.title}" has been cancelled`);
      setSelectedPost(null);
      setIsDeleting(false);
    }
  };

  // Helper function to get date for a specific day in current month
  const getDateForDay = (day: number) => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  };
  
  // Function to handle calendar date click
  const handleDateClick = (day: number) => {
    const clickedDate = getDateForDay(day);
    const postsForDay = posts.filter(post => {
      const postDate = new Date(post.dateTime);
      return (
        postDate.getDate() === day && 
        postDate.getMonth() === clickedDate.getMonth() && 
        postDate.getFullYear() === clickedDate.getFullYear()
      );
    });
    
    if (postsForDay.length > 0) {
      toast.info(`${postsForDay.length} post(s) scheduled for this day`);
      
      // If only one post, select it for editing
      if (postsForDay.length === 1) {
        setSelectedPost(postsForDay[0]);
        setIsEditing(true);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Content Schedule</h1>
          <p className="text-gray-600">Manage your upcoming content schedule</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={view === "calendar" ? "default" : "outline"} 
            onClick={() => setView("calendar")}
          >
            <CalendarDays size={16} className="mr-2" /> Calendar View
          </Button>
          <Button 
            variant={view === "list" ? "default" : "outline"} 
            onClick={() => setView("list")}
          >
            <FileText size={16} className="mr-2" /> List View
          </Button>
        </div>
      </div>
      
      {view === "calendar" ? (
        <CalendarView 
          posts={posts} 
          onDateClick={handleDateClick} 
        />
      ) : (
        <ListView 
          items={posts}
          onEdit={(id) => handleActionClick("edit", id)}
          onCancel={(id) => handleActionClick("cancel", id)}
        />
      )}
      
      {/* Edit Dialog */}
      {selectedPost && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Scheduled Post</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input
                  className="w-full p-2 border rounded-md"
                  value={selectedPost.title}
                  onChange={(e) => setSelectedPost({...selectedPost, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded-md"
                  value={selectedPost.dateTime.slice(0, 16)}
                  onChange={(e) => setSelectedPost({...selectedPost, dateTime: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'Blog'].map(platform => (
                    <label key={platform} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedPost.platforms.includes(platform)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPost({
                              ...selectedPost, 
                              platforms: [...selectedPost.platforms, platform]
                            });
                          } else {
                            setSelectedPost({
                              ...selectedPost, 
                              platforms: selectedPost.platforms.filter(p => p !== platform)
                            });
                          }
                        }}
                      />
                      <span>{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Confirmation Dialog */}
      {selectedPost && (
        <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Scheduled Post</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this scheduled post? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <p className="font-medium">{selectedPost.title}</p>
              <p className="text-sm text-gray-500">Scheduled for: {formatDate(selectedPost.dateTime)}</p>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleting(false)}>
                Keep
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Cancel Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

interface CalendarViewProps {
  posts: ScheduledPost[];
  onDateClick: (day: number) => void;
}

const CalendarView = ({ posts, onDateClick }: CalendarViewProps) => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  // Generate days for the current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  // Calendar grid
  const days = [];
  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-32 border bg-gray-50"></div>);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const hasEvents = posts.some(post => {
      const postDate = new Date(post.dateTime);
      return postDate.getDate() === day && 
             postDate.getMonth() === currentDate.getMonth() &&
             postDate.getFullYear() === currentDate.getFullYear();
    });
    
    const postsForDay = posts.filter(post => {
      const postDate = new Date(post.dateTime);
      return postDate.getDate() === day && 
             postDate.getMonth() === currentDate.getMonth() &&
             postDate.getFullYear() === currentDate.getFullYear();
    });
    
    days.push(
      <div 
        key={day} 
        className={`h-32 border p-2 ${hasEvents ? 'hover:bg-blue-50 cursor-pointer' : 'hover:bg-gray-50'}`}
        onClick={hasEvents ? () => onDateClick(day) : undefined}
      >
        <div className="font-medium">{day}</div>
        {postsForDay.map((post, index) => (
          <div 
            key={index}
            className="mt-1 p-1 text-xs bg-blue-100 text-blue-800 rounded truncate"
            title={post.title}
          >
            {post.title.length > 20 ? post.title.substring(0, 20) + '...' : post.title}
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{currentMonth} {currentYear}</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-medium p-2">{day}</div>
          ))}
          {days}
        </div>
      </CardContent>
    </Card>
  );
};

interface ListViewProps { 
  items: ScheduledPost[]; 
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
}

const ListView = ({ 
  items, 
  onEdit, 
  onCancel 
}: ListViewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No scheduled content</p>
          ) : (
            items.map((post) => (
              <div key={post.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <h3 className="font-medium">{post.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock size={14} className="mr-1" />
                    <span>{formatDate(post.dateTime)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.platforms.map((platform) => (
                      <span key={platform} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex mt-4 md:mt-0 gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(post.id)}>
                    <Edit size={14} className="mr-2" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => onCancel(post.id)}>
                    <Trash size={14} className="mr-2" /> Cancel
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric',
    hour: 'numeric', 
    minute: 'numeric'
  }).format(date);
};

// Type and mock data
interface ScheduledPost {
  id: number;
  title: string;
  dateTime: string;
  platforms: string[];
}

const scheduledPosts: ScheduledPost[] = [
  {
    id: 1,
    title: "10 Ways to Improve Your Social Media Strategy",
    dateTime: "2025-04-27T09:00:00",
    platforms: ["Facebook", "Twitter", "LinkedIn"]
  },
  {
    id: 2,
    title: "How to Increase Website Traffic in 2025",
    dateTime: "2025-04-28T10:30:00",
    platforms: ["Blog", "LinkedIn"]
  },
  {
    id: 3,
    title: "Email Marketing Best Practices",
    dateTime: "2025-05-01T08:00:00", 
    platforms: ["Newsletter"]
  },
  {
    id: 4,
    title: "Content Marketing Trends for 2025",
    dateTime: "2025-05-05T14:00:00", 
    platforms: ["Facebook", "Twitter", "LinkedIn"]
  },
  {
    id: 5,
    title: "How to Create Engaging Social Media Content",
    dateTime: "2025-05-10T11:00:00", 
    platforms: ["Instagram", "Facebook"]
  }
];

export default SchedulePage;
