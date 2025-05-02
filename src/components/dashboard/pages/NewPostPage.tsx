
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

const NewPostPage = () => {
  const [selectedModel, setSelectedModel] = useState("llama");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [showAIAdvancedAnalysis, setShowAIAdvancedAnalysis] = useState(false);
  const [showTeamCollaboration, setShowTeamCollaboration] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  
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
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Create New Post</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ContentEditor 
            content={content} 
            setContent={setContent}
            title={title}
            setTitle={setTitle}
          />
          
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
                <CategorySelector />
                <ToneSelector />
                <RssFeedSelector />
              </div>
            </TabsContent>
            <TabsContent value="media" className="p-4 border rounded-md mt-2">
              <div className="space-y-6">
                <ImageGenerator />
                <ImageUploader />
                <PlatformSelector />
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
              <AIAdvancedAnalysis />
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
