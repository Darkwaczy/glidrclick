
import React, { useState } from 'react';
import ContentEditor from '@/components/dashboard/content/ContentEditor';
import AIContentGenerator from '@/components/dashboard/content/AIContentGenerator';
import CategorySelector from '@/components/dashboard/content/CategorySelector';
import ToneSelector from '@/components/dashboard/content/ToneSelector';
import PlatformSelector from '@/components/dashboard/content/PlatformSelector';
import ImageGenerator from '@/components/dashboard/content/ImageGenerator';
import ImageUploader from '@/components/dashboard/content/ImageUploader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import RssFeedSelector from '../content/RssFeedSelector';
import AIAdvancedAnalysis from '../content/AIAdvancedAnalysis';
import TeamCollaboration from '../collaboration/TeamCollaboration';
import ContentApprovalDialog from '../content/ContentApprovalDialog';
import ContentDiscovery from '../content/ContentDiscovery';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, TrendingUp, FileText } from 'lucide-react';

const NewPostPage = () => {
  const [selectedModel, setSelectedModel] = useState("llama");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTone, setSelectedTone] = useState("professional");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [showAIAdvancedAnalysis, setShowAIAdvancedAnalysis] = useState(false);
  const [showTeamCollaboration, setShowTeamCollaboration] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [curatingSources, setCuratingSources] = useState<string[]>([]);
  
  const handleRequestAdvancedAnalysis = () => {
    setShowAIAdvancedAnalysis(true);
    toast.success("Generating advanced AI analysis");
  };
  
  const handleToggleCollaboration = () => {
    setShowTeamCollaboration(!showTeamCollaboration);
  };
  
  const handlePublish = () => {
    // For demonstration, we'll show the approval dialog instead of publishing directly
    setApprovalDialogOpen(true);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSelectNews = (newsContent: string) => {
    setContent(prevContent => prevContent + "\n\n" + newsContent);
    toast.success("News content added to the editor");
  };
  
  const handleImageGenerated = (imageUrl: string) => {
    setFeaturedImage(imageUrl);
    toast.success("Generated image set as featured image");
  };

  const handleImageUploaded = (imageUrl: string) => {
    setFeaturedImage(imageUrl);
    toast.success("Uploaded image set as featured image");
  };

  const handleApplySuggestion = (type: string, value: string) => {
    if (type === 'content') {
      setContent(value);
    } else if (type === 'title') {
      setTitle(value);
    }
    toast.success(`Applied ${type} suggestion`);
  };
  
  const handleSelectTopic = (topic: string) => {
    if (!title) {
      setTitle(topic);
    }
    
    // Add to curated sources
    if (!curatingSources.includes(topic)) {
      setCuratingSources(prev => [...prev, topic]);
    }
  };
  
  const handleSelectContent = (contentTemplate: string) => {
    if (content) {
      setContent(prev => prev + "\n\n" + contentTemplate);
    } else {
      setContent(contentTemplate);
    }
  };
  
  const handleRemoveCuratedSource = (source: string) => {
    setCuratingSources(prev => prev.filter(s => s !== source));
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Create New Post</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ContentEditor 
            content={content} 
            onChange={handleContentChange}
            title={title}
            setTitle={setTitle}
          />
          
          {curatingSources.length > 0 && (
            <div className="bg-gray-50 p-3 rounded-md">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <FileText size={16} className="mr-1" /> Curated Sources
              </h3>
              <div className="flex flex-wrap gap-2">
                {curatingSources.map((source, index) => (
                  <Badge key={index} variant="outline" className="pl-2 pr-1 flex items-center gap-1">
                    {source}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0 ml-1 rounded-full"
                      onClick={() => handleRemoveCuratedSource(source)}
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3">
            <Button variant="outline">Save Draft</Button>
            <Button onClick={handlePublish}>Submit for Approval</Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <Tabs defaultValue="ai">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ai">AI Tools</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>
            <TabsContent value="ai" className="p-4 border rounded-md mt-2">
              <AIContentGenerator 
                selectedModel={selectedModel} 
                onSelectModel={setSelectedModel}
                onRequestAdvancedAnalysis={handleRequestAdvancedAnalysis}
                onToggleCollaboration={handleToggleCollaboration}
              />
            </TabsContent>
            <TabsContent value="content" className="p-4 border rounded-md mt-2">
              <div className="space-y-6">
                <ContentDiscovery 
                  onSelectTopic={handleSelectTopic}
                  onSelectContent={handleSelectContent}
                />
                
                <CategorySelector 
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                <ToneSelector 
                  selectedTone={selectedTone}
                  onSelectTone={setSelectedTone}
                />
                <RssFeedSelector 
                  onSelectNews={handleSelectNews}
                />
              </div>
            </TabsContent>
            <TabsContent value="media" className="p-4 border rounded-md mt-2">
              <div className="space-y-6">
                <ImageGenerator 
                  onImageGenerated={handleImageGenerated}
                />
                <ImageUploader 
                  onImageUploaded={handleImageUploaded}
                />
                <PlatformSelector 
                  selectedPlatforms={selectedPlatforms}
                  onSelectPlatforms={setSelectedPlatforms}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          {showAIAdvancedAnalysis && (
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Advanced AI Analysis</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAIAdvancedAnalysis(false)}
                >
                  Hide
                </Button>
              </div>
              <AIAdvancedAnalysis 
                content={content}
                title={title}
                platforms={selectedPlatforms}
                onApplySuggestion={handleApplySuggestion}
                onClose={() => setShowAIAdvancedAnalysis(false)}
              />
            </div>
          )}
          
          {showTeamCollaboration && (
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Team Collaboration</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowTeamCollaboration(false)}
                >
                  Hide
                </Button>
              </div>
              <TeamCollaboration />
            </div>
          )}
        </div>
      </div>
      
      <ContentApprovalDialog
        open={approvalDialogOpen}
        onOpenChange={setApprovalDialogOpen}
        contentTitle={title || "Untitled Post"}
        contentType="post"
      />
    </div>
  );
};

export default NewPostPage;
