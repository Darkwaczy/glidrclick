
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Edit, Trash2, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const SchedulePage: React.FC = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const scheduledPosts = [
    {
      id: 1,
      title: "New Product Launch",
      content: "Excited to announce our latest product launch! Stay tuned for more details.",
      platforms: ["Facebook", "Twitter", "LinkedIn"],
      scheduledDate: "2024-01-15",
      scheduledTime: "14:00",
      status: "scheduled"
    },
    {
      id: 2,
      title: "Weekly Tips",
      content: "Here are 5 amazing tips to boost your social media engagement...",
      platforms: ["Instagram", "Twitter"],
      scheduledDate: "2024-01-16",
      scheduledTime: "09:00",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Behind the Scenes",
      content: "Take a look behind the scenes at our office culture...",
      platforms: ["Instagram", "Facebook"],
      scheduledDate: "2024-01-14",
      scheduledTime: "16:30",
      status: "published"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">Scheduled</Badge>;
      case 'published':
        return <Badge className="bg-green-500/20 text-green-300 border-green-500/50">Published</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-300 border-red-500/50">Failed</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-300 border-gray-500/50">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-6 bg-transparent">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Schedule</h1>
          <p className="text-gray-300">Manage and schedule your content across all platforms</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="btn-neon">
          <Plus size={16} className="mr-2" />
          Schedule Post
        </Button>
      </div>

      {/* Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card border-white/20 bg-dark-secondary/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Scheduled Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-gray-400">Next 7 days</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-white/20 bg-dark-secondary/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Published Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-gray-400">Across all platforms</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-white/20 bg-dark-secondary/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">98%</div>
            <p className="text-xs text-gray-400">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Posts List */}
      <Card className="glass-card border-white/20 bg-dark-secondary/50">
        <CardHeader>
          <CardTitle className="text-white">Scheduled Posts</CardTitle>
          <CardDescription className="text-gray-300">
            Your upcoming and recent scheduled content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-white">{post.title}</h3>
                      {getStatusBadge(post.status)}
                    </div>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.scheduledDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{post.scheduledTime}</span>
                      </div>
                      <div className="flex gap-1">
                        {post.platforms.map((platform, index) => (
                          <Badge key={index} variant="secondary" className="bg-white/10 text-gray-300 text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                      <Edit size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                      <Send size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Schedule Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px] glass-card border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Schedule New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Title</Label>
              <Input 
                id="title" 
                placeholder="Enter post title"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-white">Content</Label>
              <Textarea 
                id="content" 
                placeholder="Write your post content..."
                className="min-h-[100px] bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-white">Date</Label>
                <Input 
                  id="date" 
                  type="date"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-white">Time</Label>
                <Input 
                  id="time" 
                  type="time"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCreateDialog(false)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setShowCreateDialog(false)}
              className="btn-neon"
            >
              Schedule Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulePage;
