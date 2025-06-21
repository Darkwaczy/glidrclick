
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  FileText, 
  Image, 
  Video, 
  Calendar, 
  Send, 
  Save, 
  Eye,
  Hash,
  AtSign,
  Link,
  Plus,
  X
} from 'lucide-react';

const NewPostPage: React.FC = () => {
  const [postType, setPostType] = useState('text');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState('');
  
  const platforms = [
    { id: 'facebook', name: 'Facebook', connected: true },
    { id: 'twitter', name: 'Twitter', connected: true },
    { id: 'instagram', name: 'Instagram', connected: false },
    { id: 'linkedin', name: 'LinkedIn', connected: true },
    { id: 'youtube', name: 'YouTube', connected: false },
  ];

  const postTypes = [
    { value: 'text', label: 'Text Post', icon: FileText },
    { value: 'image', label: 'Image Post', icon: Image },
    { value: 'video', label: 'Video Post', icon: Video },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const handlePublish = () => {
    toast.success('Post published successfully!');
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
  };

  const handleSchedule = () => {
    toast.success('Post scheduled successfully!');
  };

  return (
    <div className="space-y-6 bg-transparent">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Post</h1>
          <p className="text-gray-300">Create and publish content across your social platforms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Save size={16} className="mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish} className="btn-neon">
            <Send size={16} className="mr-2" />
            Publish Now
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
                  placeholder="Enter a catchy title for your post..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content" className="text-white">Content</Label>
                <Textarea 
                  id="content"
                  placeholder="What's on your mind? Share your thoughts..."
                  className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <div className="text-sm text-gray-400">
                  Character count: 0/280
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Post Type</Label>
                <div className="grid grid-cols-3 gap-3">
                  {postTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setPostType(type.value)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        postType === type.value
                          ? 'border-neon-electric bg-neon-electric/20 text-white'
                          : 'border-white/20 bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <type.icon size={20} className="mx-auto mb-1" />
                      <div className="text-sm">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {postType !== 'text' && (
                <div className="space-y-2">
                  <Label className="text-white">Media Upload</Label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                    <div className="space-y-2">
                      <div className="mx-auto w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        {postType === 'image' ? <Image size={24} className="text-gray-400" /> : <Video size={24} className="text-gray-400" />}
                      </div>
                      <p className="text-gray-300">
                        Drag and drop your {postType} here, or <button className="text-neon-electric hover:underline">browse</button>
                      </p>
                      <p className="text-sm text-gray-400">
                        {postType === 'image' ? 'PNG, JPG up to 10MB' : 'MP4, MOV up to 100MB'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hashtags & Mentions */}
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Hash size={20} className="text-neon-electric" />
                Hashtags & Mentions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Add Hashtags</Label>
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
                  {hashtags.map((tag, index) => (
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
              <CardTitle className="text-white">Select Platforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
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

          {/* Schedule Options */}
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar size={20} className="text-neon-electric" />
                Schedule Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Choose when to publish" />
                </SelectTrigger>
                <SelectContent className="bg-dark-primary border-white/20">
                  <SelectItem value="now" className="text-white">Publish Now</SelectItem>
                  <SelectItem value="schedule" className="text-white">Schedule for Later</SelectItem>
                  <SelectItem value="draft" className="text-white">Save as Draft</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  type="date" 
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input 
                  type="time" 
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              
              <Button onClick={handleSchedule} className="w-full btn-glass">
                <Calendar size={16} className="mr-2" />
                Schedule Post
              </Button>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye size={20} className="text-neon-electric" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-gray-300 text-sm">
                  Your post preview will appear here as you type...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;
