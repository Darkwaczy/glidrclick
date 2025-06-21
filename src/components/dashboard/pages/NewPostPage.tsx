import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Plus,
  X,
  Wand2,
  Bot
} from 'lucide-react';

// Import AI content generation components
import CategorySelector from '../content/CategorySelector';
import ToneSelector from '../content/ToneSelector';
import PostLengthSelector from '../content/PostLengthSelector';
import SectionTitlesInput from '../content/SectionTitlesInput';
import AIContentGenerator from '../content/AIContentGenerator';
import WordCounter from '../content/WordCounter';
import ContentEditor from '../content/ContentEditor';
import ImageGenerator from '../content/ImageGenerator';
import { generateBlogContent } from '@/services/aiService';

const NewPostPage: React.FC = () => {
  const [postType, setPostType] = useState('text');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [newHashtag, setNewHashtag] = useState('');
  const [activeTab, setActiveTab] = useState('manual');
  
  // Manual content states
  const [manualTitle, setManualTitle] = useState('');
  const [manualContent, setManualContent] = useState('');
  
  // AI content generation states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [postLength, setPostLength] = useState(600);
  const [sectionTitles, setSectionTitles] = useState(['Introduction', 'Main Content', 'Conclusion']);
  const [selectedAIModel, setSelectedAIModel] = useState('openai');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [imageMetadata, setImageMetadata] = useState<any>(null);
  
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

  const handleGenerateContent = async () => {
    if (!selectedCategory || !selectedTone) {
      toast.error('Please select both category and tone');
      return;
    }

    setIsGenerating(true);
    try {
      console.log('Starting content generation...', {
        selectedCategory,
        selectedTone,
        postLength,
        sectionTitles,
        selectedAIModel
      });

      const result = await generateBlogContent(
        selectedCategory,
        selectedTone,
        postLength,
        sectionTitles,
        selectedAIModel
      );
      
      console.log('Content generation result:', result);
      
      setGeneratedTitle(result.title);
      setGeneratedContent(result.content);
      toast.success('Content generated successfully!');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error(`Failed to generate content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageGenerated = (imageUrl: string, metadata?: any) => {
    console.log('Image generated:', imageUrl, metadata);
    setGeneratedImage(imageUrl);
    setImageMetadata(metadata);
  };

  const handlePublish = () => {
    const title = activeTab === 'manual' ? manualTitle : generatedTitle;
    const content = activeTab === 'manual' ? manualContent : generatedContent;
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please provide both title and content');
      return;
    }
    
    toast.success('Post published successfully!');
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
  };

  const handleSchedule = () => {
    toast.success('Post scheduled successfully!');
  };

  const getCurrentContent = () => {
    return activeTab === 'manual' ? manualContent : generatedContent;
  };

  const getCurrentTitle = () => {
    return activeTab === 'manual' ? manualTitle : generatedTitle;
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
              <CardTitle className="text-white">Content Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid grid-cols-2 bg-white/10">
                  <TabsTrigger value="manual" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">
                    <FileText size={16} className="mr-2" />
                    Manual
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">
                    <Bot size={16} className="mr-2" />
                    AI Generate
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">Post Title</Label>
                    <Input 
                      id="title"
                      placeholder="Enter a catchy title for your post..."
                      value={manualTitle}
                      onChange={(e) => setManualTitle(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-white">Content</Label>
                    <ContentEditor
                      content={manualContent}
                      onChange={setManualContent}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="ai" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Select Category</Label>
                      <CategorySelector
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Content Tone</Label>
                      <ToneSelector
                        selectedTone={selectedTone}
                        onSelectTone={setSelectedTone}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Post Length</Label>
                      <PostLengthSelector
                        length={postLength}
                        onLengthChange={setPostLength}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">AI Engine</Label>
                      <AIContentGenerator
                        selectedModel={selectedAIModel}
                        onSelectModel={setSelectedAIModel}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white">Section Titles</Label>
                    <SectionTitlesInput
                      sections={sectionTitles}
                      onSectionsChange={setSectionTitles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Generate Hero Image</Label>
                    <ImageGenerator onImageGenerated={handleImageGenerated} />
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      onClick={handleGenerateContent}
                      disabled={isGenerating || !selectedCategory || !selectedTone}
                      className="btn-neon px-8"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 size={16} className="mr-2" />
                          Generate Content
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {(generatedContent || generatedImage) && (
                    <div className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label className="text-white">Generated Title</Label>
                        <Input 
                          value={generatedTitle}
                          onChange={(e) => setGeneratedTitle(e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        />
                      </div>

                      {generatedImage && (
                        <div className="space-y-2">
                          <Label className="text-white">Hero Image</Label>
                          <div className="relative">
                            <img 
                              src={generatedImage} 
                              alt="Generated hero image" 
                              className="w-full rounded-lg border border-white/20"
                              style={{ aspectRatio: imageMetadata?.aspectRatio === '16:9' ? '16/9' : 'auto' }}
                            />
                            {imageMetadata && (
                              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                {imageMetadata.aspectRatio} • {imageMetadata.size}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label className="text-white">Generated Content</Label>
                        <ContentEditor
                          content={generatedContent}
                          onChange={setGeneratedContent}
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              <div className="space-y-2 mt-4">
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
                <div className="space-y-2 mt-4">
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
          {/* Word Counter */}
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white">Content Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <WordCounter 
                content={getCurrentContent()} 
                targetLength={activeTab === 'ai' ? postLength : undefined}
              />
            </CardContent>
          </Card>

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
                  <SelectItem value="now" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Publish Now</SelectItem>
                  <SelectItem value="schedule" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Schedule for Later</SelectItem>
                  <SelectItem value="draft" className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white">Save as Draft</SelectItem>
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

          {/* Enhanced Preview with proper blog structure */}
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye size={20} className="text-neon-electric" />
                Blog Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                {getCurrentTitle() || getCurrentContent() || generatedImage ? (
                  <div className="space-y-4">
                    {/* Hero Image first */}
                    {generatedImage && (
                      <div className="w-full">
                        <img 
                          src={generatedImage} 
                          alt="Hero image" 
                          className="w-full rounded border border-white/20"
                          style={{ aspectRatio: imageMetadata?.aspectRatio === '16:9' ? '16/9' : 'auto' }}
                        />
                      </div>
                    )}
                    
                    {/* Title after image */}
                    {getCurrentTitle() && (
                      <h1 className="font-bold text-white text-xl leading-tight">{getCurrentTitle()}</h1>
                    )}
                    
                    {/* Content below title */}
                    {getCurrentContent() && (
                      <div className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                        {getCurrentContent().length > 300 
                          ? getCurrentContent().substring(0, 300) + '...'
                          : getCurrentContent()
                        }
                      </div>
                    )}
                    
                    {/* Hashtags at the bottom */}
                    {hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                        {hashtags.slice(0, 5).map((tag, index) => (
                          <span key={index} className="text-neon-electric text-xs">
                            #{tag}
                          </span>
                        ))}
                        {hashtags.length > 5 && (
                          <span className="text-gray-400 text-xs">+{hashtags.length - 5} more</span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Your blog post preview will appear here as you create content...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewPostPage;
