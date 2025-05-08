
import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Sample events data
const events = [
  {
    id: 1,
    title: "Team Meeting",
    date: new Date(2025, 4, 10), // May 10, 2025
    type: "meeting",
    time: "10:00 AM"
  },
  {
    id: 2,
    title: "Project Deadline",
    date: new Date(2025, 4, 15), // May 15, 2025
    type: "deadline",
    time: "11:59 PM"
  },
  {
    id: 3,
    title: "Client Call",
    date: new Date(2025, 4, 12), // May 12, 2025
    type: "call",
    time: "2:30 PM"
  },
  {
    id: 4,
    title: "Team Lunch",
    date: new Date(2025, 4, 20), // May 20, 2025
    type: "social",
    time: "12:30 PM"
  }
];

// Function to get today's date
const today = new Date();

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(today);
  
  // Get events for the selected date
  const selectedDateEvents = React.useMemo(() => {
    if (!selectedDate) return [];
    
    return events.filter((event) => {
      return event.date.toDateString() === selectedDate.toDateString();
    });
  }, [selectedDate]);

  // Function to format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Function to get badge variant based on event type
  const getEventBadgeVariant = (type: string) => {
    switch(type) {
      case 'meeting': return "default";
      case 'deadline': return "destructive";
      case 'call': return "outline";
      case 'social': return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-gray-500 mt-1">Schedule and manage your events</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border pointer-events-auto"
              />
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next 3 events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events
                  .filter(event => event.date >= today)
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 3)
                  .map(event => (
                    <div key={event.id} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-500">
                          {event.date.toLocaleDateString()} · {event.time}
                        </p>
                      </div>
                      <Badge variant={getEventBadgeVariant(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{formatDate(selectedDate)}</CardTitle>
              <CardDescription>
                {selectedDateEvents.length 
                  ? `${selectedDateEvents.length} events scheduled`
                  : "No events scheduled for this day"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-6">
                  {selectedDateEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="flex justify-between items-center p-4 border rounded-lg"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge variant={getEventBadgeVariant(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{event.time}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No events for this day</p>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
