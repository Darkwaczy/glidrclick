
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CalendarDays, FileText, Clock, Edit, X } from "lucide-react";

const SchedulePage = () => {
  const [view, setView] = useState<"calendar" | "list">("calendar");
  
  const handleActionClick = (action: string, id: number) => {
    toast.success(`${action} post ${id}`);
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
        <CalendarView />
      ) : (
        <ListView 
          items={scheduledPosts}
          onEdit={(id) => handleActionClick("Editing", id)}
          onCancel={(id) => handleActionClick("Cancelling", id)}
        />
      )}
    </div>
  );
};

const CalendarView = () => {
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
    const hasEvent = scheduledPosts.some(post => {
      const postDate = new Date(post.dateTime);
      return postDate.getDate() === day && 
             postDate.getMonth() === currentDate.getMonth() &&
             postDate.getFullYear() === currentDate.getFullYear();
    });
    
    days.push(
      <div key={day} className="h-32 border p-2 hover:bg-gray-50">
        <div className="font-medium">{day}</div>
        {hasEvent && (
          <div className="mt-1 p-1 text-xs bg-blue-100 text-blue-800 rounded">
            Scheduled Content
          </div>
        )}
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

const ListView = ({ 
  items, 
  onEdit, 
  onCancel 
}: { 
  items: ScheduledPost[]; 
  onEdit: (id: number) => void;
  onCancel: (id: number) => void;
}) => {
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
                    <X size={14} className="mr-2" /> Cancel
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
  }
];

export default SchedulePage;
