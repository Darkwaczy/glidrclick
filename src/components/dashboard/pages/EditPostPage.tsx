
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Send, Calendar, Hash, X, Plus } from 'lucide-react';

interface EditPostPageProps {
  postId: string | null;
}

const EditPostPage: React.FC<EditPostPageProps> = ({ postId }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: 'Sample Post Title',
    content: 'This is a sample post content that you can edit...',
    platforms: ['facebook', 'twitter'],
    hashtags: ['marketing', 'socialmedia'],
    scheduledDate: '2024-01-15',
    scheduledTime: '14:00'
  });
  const [newHashtag, setNewHashtag] = useState('');
  
  const platforms = [
    { id: 'facebook', name: 'Facebook', connected: true },
    { id: 'twitter', name: 'Twitter', connected: true },
    { id: 'instagram', name: 'Instagram', connected: false },
    { id: 'linkedin', name: 'LinkedIn', connected: true },
    { id: 'youtube', name: 'YouTube', connected: false },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setPost(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(id => id !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  const addHashtag = () => {
    if (newHashtag && !post.hashtags.includes(newHashtag)) {
      setPost(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, newHashtag]
      }));
      setNewHashtag('');
    }
  };

  const removeHashtag = (tag: string) => {
    setPost(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(t => t !== tag)
    }));
  };

  const handleSave = () => {
    toast.success('Post updated successfully!');
    navigate('/dashboard/content');
  };

  const handlePublish = () => {
    toast.success('Post published successfully!');
    navigate('/dashboard/content');
  };

  return (
    <div className="space-y-6 bg-transparent">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate('/dashboard/content')}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft size={16} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Post</h1>
            <p className="text-gray-300">Make changes to your content</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
          <Button onClick={handlePublish} className="btn-neon">
            <Send size={16} className="mr-2" />
            Update & Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white">Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">Post Title</Label>
                <Input 
                  id="title"
                  value={post.title}
                  onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content" className="text-white">Content</Label>
                <Textarea 
                  id="content"
                  value={post.content}
                  onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <div className="text-sm text-gray-400">
                  Character count: {post.content.length}/280
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hashtags */}
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Hash size={20} className="text-neon-electric" />
                Hashtags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Manage Hashtags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter hashtag without #"
                    value={newHashtag}
                    onChange={(e) => setNewHashtag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Button onClick={addHashtag} size="icon" className="bg-neon-electric/20 border-neon-electric/50 text-neon-electric hover:bg-neon-electric/30">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.hashtags.map((tag, index) => (
                    <Badge key={index} className="bg-neon-electric/20 text-neon-electric border-neon-electric/50">
                      #{tag}
                      <button onClick={() => removeHashtag(tag)} className="ml-1 hover:text-red-400">
                        <X size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white">Publishing Platforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={post.platforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                      disabled={!platform.connected}
                      className="border-white/20"
                    />
                    <Label htmlFor={platform.id} className="text-white">
                      {platform.name}
                    </Label>
                  </div>
                  <Badge 
                    variant={platform.connected ? 'default' : 'secondary'}
                    className={platform.connected 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    }
                  >
                    {platform.connected ? 'Connected' : 'Not Connected'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Schedule Settings */}
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar size={20} className="text-neon-electric" />
                Schedule Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label className="text-white">Date</Label>
                  <Input 
                    type="date" 
                    value={post.scheduledDate}
                    onChange={(e) => setPost(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Time</Label>
                  <Input 
                    type="time" 
                    value={post.scheduledTime}
                    onChange={(e) => setPost(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              
              <Button className="w-full btn-glass">
                <Calendar size={16} className="mr-2" />
                Update Schedule
              </Button>
            </CardContent>
          </Card>

          {/* Post Status */}
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white">Post Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Current Status</span>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">Scheduled</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Last Modified</span>
                <span className="text-white text-sm">Today, 2:30 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Created</span>
                <span className="text-white text-sm">Jan 10, 2024</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
