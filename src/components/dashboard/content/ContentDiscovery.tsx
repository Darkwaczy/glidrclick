
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, FileText, Link, Newspaper } from "lucide-react";
import { toast } from "sonner";
import { 
  getContentSuggestions, 
  getCompetitorAnalysis,
  getTopicAnalytics,
  CompetitorContent
} from "@/services/contentDiscoveryService";

interface ContentDiscoveryProps {
  onSelectTopic: (topic: string) => void;
  onSelectContent: (content: string) => void;
}

const ContentDiscovery: React.FC<ContentDiscoveryProps> = ({
  onSelectTopic,
  onSelectContent
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [competitors, setCompetitors] = useState<CompetitorContent[]>([]);
  const [activeTab, setActiveTab] = useState("suggestions");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topicAnalytics, setTopicAnalytics] = useState<{
    volume?: number;
    sentiment?: number;
    engagement?: number;
  }>({});

  useEffect(() => {
    loadSuggestions();
    loadCompetitorContent();
  }, []);

  useEffect(() => {
    if (selectedTopic) {
      analyzeSelectedTopic();
    }
  }, [selectedTopic]);

  const loadSuggestions = async () => {
    setIsLoading(true);
    try {
      // Use a placeholder user ID since we don't have authentication context here
      const topics = await getContentSuggestions("current-user");
      setSuggestions(topics);
    } catch (error) {
      console.error("Error loading content suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCompetitorContent = async () => {
    try {
      const content = await getCompetitorAnalysis("default");
      setCompetitors(content);
    } catch (error) {
      console.error("Error loading competitor content:", error);
    }
  };

  const analyzeSelectedTopic = async () => {
    try {
      const analytics = await getTopicAnalytics(selectedTopic);
      setTopicAnalytics(analytics);
    } catch (error) {
      console.error("Error analyzing topic:", error);
    }
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    onSelectTopic(topic);
    toast.success(`Topic "${topic}" selected`);
  };

  const handleContentSelect = (content: string) => {
    onSelectContent(content);
    toast.success("Content template added");
  };

  const handleCompetitorContentSelect = (competitor: CompetitorContent) => {
    onSelectContent(`# Inspired by: ${competitor.title}\n\nSource: ${competitor.source} (${competitor.url})\n\n`);
    toast.success("Competitor content reference added");
  };

  const renderSentimentBadge = (sentiment?: number) => {
    if (!sentiment) return null;
    
    if (sentiment > 0.7) {
      return <Badge className="bg-green-500">Positive</Badge>;
    } else if (sentiment > 0.4) {
      return <Badge className="bg-yellow-500">Neutral</Badge>;
    } else {
      return <Badge className="bg-red-500">Negative</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Content Discovery</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="suggestions">
              <FileText size={14} className="mr-1" /> Suggestions
            </TabsTrigger>
            <TabsTrigger value="competitors">
              <Newspaper size={14} className="mr-1" /> Competitor Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="suggestions" className="space-y-4 mt-2">
            {isLoading ? (
              <p className="text-center text-sm text-gray-500 py-4">Loading suggestions...</p>
            ) : (
              <>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Suggested Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((topic, index) => (
                      <Badge 
                        key={index}
                        variant={selectedTopic === topic ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTopicSelect(topic)}
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {selectedTopic && (
                  <div className="border-t pt-2">
                    <h4 className="text-sm font-medium mb-2">Topic Analysis: {selectedTopic}</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-gray-50 rounded">
                        <div className="text-xs text-gray-500">Volume</div>
                        <div className="font-medium">{topicAnalytics.volume?.toLocaleString() || "N/A"}</div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <div className="text-xs text-gray-500">Sentiment</div>
                        <div className="font-medium flex justify-center">
                          {renderSentimentBadge(topicAnalytics.sentiment)}
                        </div>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <div className="text-xs text-gray-500">Engagement</div>
                        <div className="font-medium">{topicAnalytics.engagement?.toLocaleString() || "N/A"}</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => handleContentSelect(`# ${selectedTopic}\n\nA comprehensive guide to ${selectedTopic.toLowerCase()}.\n\n## Key Points\n\n- Point 1\n- Point 2\n- Point 3\n\n## Conclusion\n`)}
                    >
                      Generate Template
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="competitors" className="space-y-4 mt-2">
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {competitors.length > 0 ? (
                competitors.map((item, index) => (
                  <div key={index} className="border rounded-md p-2 space-y-1">
                    <div className="flex items-start justify-between">
                      <h5 className="text-sm font-medium">{item.title}</h5>
                      <Badge variant="outline" className="text-xs ml-2 shrink-0">
                        {item.engagement} engagements
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.source} • {item.publishDate}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-7 px-2 text-xs"
                        onClick={() => handleCompetitorContentSelect(item)}
                      >
                        Use as Reference
                      </Button>
                      <Button
                        variant="link"
                        size="sm"
                        className="h-6 p-0 text-xs"
                        asChild
                      >
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <Link size={12} className="mr-1" /> View Original
                        </a>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500 py-4">
                  No competitor content available
                </p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadCompetitorContent()}
              className="w-full"
            >
              <TrendingUp size={14} className="mr-1" /> Refresh Analysis
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentDiscovery;
