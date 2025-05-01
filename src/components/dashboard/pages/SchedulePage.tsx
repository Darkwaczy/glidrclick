import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Edit2, Plus, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useAuthContext } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

interface Post {
  id: string;
  title: string;
  content: string;
  scheduledFor: string;
  platforms: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
}

interface CalendarDay {
  date: Date;
  isPreviousMonth: boolean;
  isNextMonth: boolean;
  isToday: boolean;
  posts: Post[];
}

const SchedulePage: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [showViewPostDialog, setShowViewPostDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  // Mock data - would be fetched from your API
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Weekly Social Media Tips',
      content: 'Check out our top 5 tips for improving your social media engagement this week!',
      scheduledFor: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2, 10, 0).toISOString(),
      platforms: ['facebook', 'twitter', 'linkedin'],
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'New Product Launch',
      content: 'We\'re excited to announce our new product line coming next month!',
      scheduledFor: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 5, 14, 30).toISOString(),
      platforms: ['facebook', 'instagram'],
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Company Update',
      content: 'Read about our Q2 results and plans for the upcoming quarter.',
      scheduledFor: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 2, 9, 0).toISOString(),
      platforms: ['linkedin'],
      status: 'published'
    }
  ]);
  
  // Platform options for the form
  const platformOptions = [
    { id: 'facebook', name: 'Facebook' },
    { id: 'twitter', name: 'Twitter' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'linkedin', name: 'LinkedIn' }
  ];
  
  // Logic to build calendar grid
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const buildCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    // Get days from previous month
    const daysInPrevMonth = getDaysInMonth(year, month - 1);
    const prevMonthDays: CalendarDay[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      prevMonthDays.push({
        date,
        isPreviousMonth: true,
        isNextMonth: false,
        isToday: false,
        posts: getPostsForDate(date)
      });
    }
    
    // Current month days
    const currentMonthDays: CalendarDay[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const today = new Date();
      const isToday = 
        date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear();
      
      currentMonthDays.push({
        date,
        isPreviousMonth: false,
        isNextMonth: false,
        isToday,
        posts: getPostsForDate(date)
      });
    }
    
    // Next month days to fill the grid (6 rows of 7 days = 42)
    const totalDays = prevMonthDays.length + currentMonthDays.length;
    const nextMonthDays: CalendarDay[] = [];
    for (let i = 1; i <= 42 - totalDays; i++) {
      const date = new Date(year, month + 1, i);
      nextMonthDays.push({
        date,
        isPreviousMonth: false,
        isNextMonth: true,
        isToday: false,
        posts: getPostsForDate(date)
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };
  
  // Helper function to get posts for a specific date
  const getPostsForDate = (date: Date): Post[] => {
    return posts.filter(post => {
      const postDate = new Date(post.scheduledFor);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  // Handle creating a new post
  const handleCreatePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const scheduledFor = new Date(`${date}T${time}`).toISOString();
    
    const selectedPlatforms = platformOptions
      .filter(platform => formData.get(`platform-${platform.id}`) === 'on')
      .map(platform => platform.id);
    
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }
    
    const newPost: Post = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      content,
      scheduledFor,
      platforms: selectedPlatforms,
      status: 'scheduled'
    };
    
    setPosts([...posts, newPost]);
    setShowNewPostDialog(false);
    toast.success('Post scheduled successfully!');
  };
  
  // Handle editing a post
  const handleEditPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!selectedPost) return;
    
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const scheduledFor = new Date(`${date}T${time}`).toISOString();
    
    const selectedPlatforms = platformOptions
      .filter(platform => formData.get(`platform-${platform.id}`) === 'on')
      .map(platform => platform.id);
    
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }
    
    const updatedPosts = posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          title,
          content,
          scheduledFor,
          platforms: selectedPlatforms
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setSelectedPost(null);
    setShowViewPostDialog(false);
    toast.success('Post updated successfully!');
  };
  
  // Handle deleting a post
  const handleDeletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    setSelectedPost(null);
    setShowViewPostDialog(false);
    toast.success('Post deleted successfully!');
  };
  
  // Handle selecting a date
  const handleSelectDate = (day: CalendarDay) => {
    setSelectedDate(day.date);
    if (day.posts.length > 0) {
      setSelectedPost(day.posts[0]);
      setShowViewPostDialog(true);
    } else {
      // Set the selected date for the new post dialog
      const formattedDate = day.date.toISOString().split('T')[0];
      setShowNewPostDialog(true);
      setTimeout(() => {
        const dateInput = document.getElementById('date') as HTMLInputElement;
        if (dateInput) {
          dateInput.value = formattedDate;
        }
      }, 100);
    }
  };
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Helper function to format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Helper function to check if a date is in the past
  const isPast = (dateString: string) => {
    return new Date(dateString) < new Date();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Calendar</h1>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-md p-1">
            <Button 
              variant={view === 'calendar' ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setView('calendar')}
              className="flex items-center gap-1"
            >
              <Calendar size={16} />
              <span>Calendar</span>
            </Button>
            <Button 
              variant={view === 'list' ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setView('list')}
              className="flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              <span>List</span>
            </Button>
          </div>
          <Button onClick={() => setShowNewPostDialog(true)} className="flex items-center gap-2">
            <Plus size={16} />
            <span>New Post</span>
          </Button>
        </div>
      </div>
      
      {view === 'calendar' ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 text-center font-medium border-b pb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-1 mt-2">
              {buildCalendarDays().map((day, i) => (
                <div 
                  key={i}
                  className={`p-1 h-28 border rounded-md overflow-y-auto ${
                    day.isPreviousMonth || day.isNextMonth 
                      ? 'bg-gray-100 opacity-50' 
                      : 'hover:bg-gray-50 cursor-pointer'
                  } ${day.isToday ? 'border-blue-500' : 'border-gray-200'}`}
                  onClick={() => handleSelectDate(day)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-medium ${day.isToday ? 'text-blue-600' : ''}`}>
                      {day.date.getDate()}
                    </span>
                    {day.posts.length > 0 && (
                      <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2">
                        {day.posts.length}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {day.posts.slice(0, 3).map(post => (
                      <div 
                        key={post.id}
                        className={`text-xs p-1 rounded truncate ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : post.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : isPast(post.scheduledFor)
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                        title={post.title}
                      >
                        {post.title}
                      </div>
                    ))}
                    {day.posts.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{day.posts.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Posts</CardTitle>
            <CardDescription>View and manage your scheduled social media posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts
                .filter(post => !isPast(post.scheduledFor) || post.status === 'scheduled')
                .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
                .map(post => (
                  <Card key={post.id} className="hover:bg-gray-50">
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedPost(post);
                              setShowViewPostDialog(true);
                            }}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Clock size={14} />
                        <span>
                          {formatDate(post.scheduledFor)} at {formatTime(post.scheduledFor)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.platforms.map(platform => (
                          <Badge key={platform} variant="outline">
                            {platformOptions.find(p => p.id === platform)?.name || platform}
                          </Badge>
                        ))}
                        <Badge 
                          variant={
                            post.status === 'published' 
                              ? 'secondary' 
                              : post.status === 'failed'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {post.status === 'published' && <CheckCircle2 size={14} className="mr-1" />}
                          {post.status === 'failed' && <X size={14} className="mr-1" />}
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
              {posts.filter(post => !isPast(post.scheduledFor) || post.status === 'scheduled').length === 0 && (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">No upcoming posts</h3>
                  <p className="text-gray-500 mb-4">You haven't scheduled any posts yet.</p>
                  <Button onClick={() => setShowNewPostDialog(true)}>Schedule a post</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* New Post Dialog */}
      <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule New Post</DialogTitle>
            <DialogDescription>
              Schedule a new post across multiple social media platforms.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreatePost}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Post Title
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-1">
                  Content
                </label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="What do you want to share?"
                  className="h-24"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-1">
                    Date
                  </label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    defaultValue={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium mb-1">
                    Time
                  </label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    defaultValue="12:00"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">
                  Select Platforms
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {platformOptions.map(platform => (
                    <div key={platform.id} className="flex items-center space-x-2">
                      <Checkbox id={`platform-${platform.id}`} name={`platform-${platform.id}`} />
                      <label
                        htmlFor={`platform-${platform.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {platform.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setShowNewPostDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Schedule Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* View/Edit Post Dialog */}
      <Dialog open={showViewPostDialog} onOpenChange={setShowViewPostDialog}>
        <DialogContent className="max-w-lg">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogDescription>
                  Make changes to your scheduled post.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleEditPost}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="edit-title" className="block text-sm font-medium mb-1">
                      Post Title
                    </label>
                    <Input
                      id="edit-title"
                      name="title"
                      placeholder="Enter title"
                      defaultValue={selectedPost.title}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-content" className="block text-sm font-medium mb-1">
                      Content
                    </label>
                    <Textarea
                      id="edit-content"
                      name="content"
                      placeholder="What do you want to share?"
                      className="h-24"
                      defaultValue={selectedPost.content}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-date" className="block text-sm font-medium mb-1">
                        Date
                      </label>
                      <Input
                        id="edit-date"
                        name="date"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        defaultValue={new Date(selectedPost.scheduledFor).toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-time" className="block text-sm font-medium mb-1">
                        Time
                      </label>
                      <Input
                        id="edit-time"
                        name="time"
                        type="time"
                        defaultValue={new Date(selectedPost.scheduledFor).toISOString().split('T')[1].substring(0, 5)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Select Platforms
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {platformOptions.map(platform => (
                        <div key={platform.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`platform-${platform.id}`} 
                            name={`platform-${platform.id}`} 
                            defaultChecked={selectedPost.platforms.includes(platform.id)}
                          />
                          <label
                            htmlFor={`platform-${platform.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {platform.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="mt-6">
                  <Button 
                    type="button" 
                    variant="destructive" 
                    onClick={() => handleDeletePost(selectedPost.id)}
                  >
                    Delete
                  </Button>
                  <div className="flex-1"></div>
                  <Button type="button" variant="outline" onClick={() => setShowViewPostDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulePage;
