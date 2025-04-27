
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Loader } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AIContentGenerator from "@/components/dashboard/content/AIContentGenerator";
import PlatformSelector from "@/components/dashboard/content/PlatformSelector";
import CategorySelector from "@/components/dashboard/content/CategorySelector";
import ToneSelector from "@/components/dashboard/content/ToneSelector";
import ContentEditor from "@/components/dashboard/content/ContentEditor";
import ImageGenerator from "@/components/dashboard/content/ImageGenerator";
import RssFeedSelector from "@/components/dashboard/content/RssFeedSelector";
import { generateContent, generateTitle } from "@/services/aiService";

const NewPostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["all"]);
  const [scheduledDate, setScheduledDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTone, setSelectedTone] = useState("professional");
  const [aiModel, setAiModel] = useState("llama");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);

  const handleGenerateContent = async () => {
    if (!selectedCategory || !selectedTone) {
      toast.error("Please select a category and tone first");
      return;
    }

    setIsGenerating(true);
    toast.info("Generating content with AI...");
    
    try {
      const generated = await generateContent(selectedCategory, selectedTone);
      setTitle(generated.title);
      setContent(generated.content);
      toast.success("Content generated successfully!");
    } catch (error) {
      console.error("Content generation error:", error);
      toast.error("Failed to generate content. You can still write content manually.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateTitle = async () => {
    if (!content) {
      toast.error("Please write or generate content first");
      return;
    }

    setIsGeneratingTitle(true);
    toast.info("Generating title based on content...");
    
    try {
      const newTitle = await generateTitle(content);
      setTitle(newTitle);
      toast.success("Title generated successfully!");
    } catch (error) {
      console.error("Title generation error:", error);
      toast.error("Failed to generate title. You can still write a title manually.");
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Post created and scheduled successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Create New Post</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="title" 
                      placeholder="Enter title" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleGenerateTitle}
                      disabled={isGeneratingTitle || !content}
                    >
                      {isGeneratingTitle ? (
                        <>
                          <Loader size={16} className="mr-2 animate-spin" /> Generating...
                        </>
                      ) : (
                        "Generate Title"
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Content Creator</Label>
                  <Tabs defaultValue="ai">
                    <TabsList className="grid grid-cols-2">
                      <TabsTrigger value="ai">AI Writer</TabsTrigger>
                      <TabsTrigger value="manual">Manual Writing</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="ai" className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AIContentGenerator 
                          selectedModel={aiModel}
                          onSelectModel={setAiModel}
                        />
                        
                        <CategorySelector 
                          selectedCategory={selectedCategory}
                          onSelectCategory={setSelectedCategory}
                        />
                      </div>
                      
                      <ToneSelector
                        selectedTone={selectedTone}
                        onSelectTone={setSelectedTone}
                      />
                      
                      <div className="mt-4">
                        <Button 
                          type="button" 
                          onClick={handleGenerateContent}
                          disabled={isGenerating || !selectedCategory || !selectedTone}
                          className="w-full"
                        >
                          {isGenerating ? (
                            <>
                              <Loader size={16} className="mr-2 animate-spin" /> Generating...
                            </>
                          ) : (
                            "Generate Content"
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="manual" className="space-y-4 mt-4">
                      <ContentEditor
                        content={content}
                        onChange={setContent}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageGenerator 
                      onImageGenerated={setGeneratedImage} 
                    />
                    
                    <RssFeedSelector
                      onSelectNews={(newsItem) => {
                        setContent(prev => prev + "\n\n" + newsItem);
                        toast.success("News item added to your content!");
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Publishing Platforms</Label>
                  <PlatformSelector 
                    selectedPlatforms={selectedPlatforms}
                    onSelectPlatforms={setSelectedPlatforms}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Schedule Date</Label>
                  <Input 
                    id="scheduledDate" 
                    type="datetime-local" 
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Schedule Post
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-bold text-lg">{title || "Your Title Here"}</h3>
                
                {generatedImage && (
                  <div className="rounded-md overflow-hidden">
                    <img 
                      src={generatedImage} 
                      alt="Generated Preview"
                      className="w-full h-auto"
                    />
                  </div>
                )}
                
                <div className="prose max-w-none">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ 
                      __html: content
                        .split('\n')
                        .slice(0, Math.ceil(content.split('\n').length / 2)) // Only show 50% of the content
                        .join('\n')
                        .replace(/\n/g, '<br/>') 
                    }} />
                  ) : (
                    <p className="text-gray-400 italic">Your content will appear here...</p>
                  )}
                  
                  {content && (
                    <p className="text-blue-600 mt-2">
                      ... [Preview shows first 50% of content]
                    </p>
                  )}
                </div>
                
                {selectedPlatforms.length > 0 && selectedPlatforms[0] !== "all" && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    <span className="text-sm font-medium">Publishing to:</span>
                    {selectedPlatforms.map(platform => (
                      <span key={platform} className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {platform}
                      </span>
                    ))}
                  </div>
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
