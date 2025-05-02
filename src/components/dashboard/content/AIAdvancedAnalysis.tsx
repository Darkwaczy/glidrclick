
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader } from "lucide-react";
import { analyzeAudience, personalizeContent, generateABTest, optimizeSEO } from "@/services/aiAdvancedService";

interface AIAdvancedAnalysisProps {
  content: string;
  title: string;
  platforms: string[];
  onApplySuggestion?: (type: string, value: string) => void;
  onClose: () => void;
}

const AIAdvancedAnalysis: React.FC<AIAdvancedAnalysisProps> = ({
  content,
  title,
  platforms,
  onApplySuggestion,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("audience");
  const [isLoading, setIsLoading] = useState(false);
  const [audienceData, setAudienceData] = useState<any>(null);
  const [personalizationData, setPersonalizationData] = useState<any>(null);
  const [abTestData, setAbTestData] = useState<any>(null);
  const [seoData, setSeoData] = useState<any>(null);

  const handleAnalyzeAudience = async () => {
    setIsLoading(true);
    try {
      // Mock historical data for demonstration
      const historicalData = [
        { day: "Monday", hour: 8, engagement: 0.85 },
        { day: "Wednesday", hour: 12, engagement: 0.78 },
        { day: "Friday", hour: 18, engagement: 0.72 }
      ];
      
      const result = await analyzeAudience(historicalData, platforms[0] || "all");
      setAudienceData(result);
    } catch (error) {
      console.error("Error analyzing audience:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonalizeContent = async () => {
    setIsLoading(true);
    try {
      // Mock analytics data for demonstration
      const analytics = {
        facebook: { engagementRate: 0.05, clickThrough: 0.02 },
        twitter: { engagementRate: 0.03, clickThrough: 0.01 },
        instagram: { engagementRate: 0.08, clickThrough: 0.015 }
      };
      
      const result = await personalizeContent(content, platforms, analytics);
      setPersonalizationData(result);
    } catch (error) {
      console.error("Error personalizing content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateABTest = async () => {
    setIsLoading(true);
    try {
      const result = await generateABTest(title, content);
      setAbTestData(result);
    } catch (error) {
      console.error("Error generating A/B test:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimizeSEO = async () => {
    setIsLoading(true);
    try {
      const result = await optimizeSEO(title, content);
      setSeoData(result);
    } catch (error) {
      console.error("Error optimizing SEO:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Load data for the selected tab if not already loaded
    if (value === "audience" && !audienceData) {
      handleAnalyzeAudience();
    } else if (value === "personalization" && !personalizationData) {
      handlePersonalizeContent();
    } else if (value === "abtest" && !abTestData) {
      handleGenerateABTest();
    } else if (value === "seo" && !seoData) {
      handleOptimizeSEO();
    }
  };

  const handleApply = (type: string, value: string) => {
    if (onApplySuggestion) {
      onApplySuggestion(type, value);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Advanced AI Analysis</CardTitle>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="audience">Audience Analysis</TabsTrigger>
            <TabsTrigger value="personalization">Personalization</TabsTrigger>
            <TabsTrigger value="abtest">A/B Testing</TabsTrigger>
            <TabsTrigger value="seo">SEO Optimization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="audience" className="space-y-4">
            {isLoading && activeTab === "audience" ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-2">Analyzing audience data...</span>
              </div>
            ) : audienceData ? (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Optimal Posting Times</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {audienceData.optimalTimes.map((time: any, index: number) => (
                    <div key={index} className="border rounded-md p-3 bg-gray-50">
                      <div className="font-medium">{time.day}, {time.time}</div>
                      <div className="text-sm text-gray-500">Engagement: {(time.engagement * 100).toFixed(0)}%</div>
                    </div>
                  ))}
                </div>
                
                <h3 className="font-medium text-lg mt-6">Recommendations</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {audienceData.recommendations.map((rec: string, index: number) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Click the button below to analyze audience data
                <div className="mt-4">
                  <Button onClick={handleAnalyzeAudience}>
                    Analyze Audience Data
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="personalization" className="space-y-4">
            {isLoading && activeTab === "personalization" ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-2">Generating personalization suggestions...</span>
              </div>
            ) : personalizationData ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Platform-Specific Suggestions</h3>
                  {Object.entries(personalizationData.platformSpecificSuggestions).map(([platform, suggestions]: [string, any]) => (
                    <div key={platform} className="mb-4">
                      <h4 className="font-medium capitalize mb-2">{platform}</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {suggestions.map((suggestion: string, index: number) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Content Adjustments</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {personalizationData.contentAdjustments.map((adjustment: string, index: number) => (
                      <li key={index}>{adjustment}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Tone Recommendations</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {personalizationData.toneRecommendations.map((rec: string, index: number) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Click the button below to get personalization suggestions
                <div className="mt-4">
                  <Button onClick={handlePersonalizeContent}>
                    Generate Personalization Suggestions
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="abtest" className="space-y-4">
            {isLoading && activeTab === "abtest" ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-2">Generating A/B test variations...</span>
              </div>
            ) : abTestData ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Title Variations</h3>
                  <div className="space-y-2">
                    {abTestData.titleVariations.map((variant: string, index: number) => (
                      <div key={index} className="flex items-center justify-between border p-3 rounded-md">
                        <span>{variant}</span>
                        <Button size="sm" onClick={() => handleApply('title', variant)}>Use</Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Content Variations</h3>
                  <div className="space-y-2">
                    {abTestData.contentVariations.map((variant: string, index: number) => (
                      <div key={index} className="border p-3 rounded-md">
                        <div className="mb-2">{variant}</div>
                        <Button size="sm" onClick={() => handleApply('content', variant)}>Use</Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Expected Performance</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(abTestData.expectedPerformance).map(([key, value]: [string, any]) => (
                      <div key={key} className="border rounded-md p-3 bg-gray-50">
                        <div className="font-medium capitalize">{key}</div>
                        <div className="text-sm">{(value * 100).toFixed(0)}% engagement</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Click the button below to generate A/B test variations
                <div className="mt-4">
                  <Button onClick={handleGenerateABTest}>
                    Generate A/B Test Variations
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="seo" className="space-y-4">
            {isLoading && activeTab === "seo" ? (
              <div className="flex items-center justify-center py-8">
                <Loader className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-2">Analyzing content for SEO optimization...</span>
              </div>
            ) : seoData ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Recommended Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {seoData.keywords.map((keyword: string, index: number) => (
                      <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">SEO-Optimized Title Suggestions</h3>
                  <div className="space-y-2">
                    {seoData.titleSuggestions.map((title: string, index: number) => (
                      <div key={index} className="flex items-center justify-between border p-3 rounded-md">
                        <span>{title}</span>
                        <Button size="sm" onClick={() => handleApply('title', title)}>Use</Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Suggested Meta Description</h3>
                  <div className="border p-3 rounded-md bg-gray-50">
                    {seoData.metaDescription}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Content Optimization Tips</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {seoData.contentOptimizations.map((tip: string, index: number) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Click the button below to get SEO optimization suggestions
                <div className="mt-4">
                  <Button onClick={handleOptimizeSEO}>
                    Generate SEO Suggestions
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIAdvancedAnalysis;
