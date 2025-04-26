
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface RssFeedSelectorProps {
  onSelectNews: (newsItem: string) => void;
}

const RssFeedSelector: React.FC<RssFeedSelectorProps> = ({
  onSelectNews
}) => {
  const [feedType, setFeedType] = useState("world");
  const [newsItems, setNewsItems] = useState<{ title: string; summary: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock news data
  const mockNews = {
    world: [
      { title: "Global Climate Summit Announces New Agreements", summary: "Leaders from over 190 countries reached consensus on reducing carbon emissions by 2030." },
      { title: "International Space Station Celebrates 25 Years", summary: "The ISS marks a quarter century of continuous human presence in space with new scientific achievements." },
      { title: "WHO Reports Decline in Global Pandemic Cases", summary: "New data shows a significant reduction in cases worldwide as vaccination rates improve." }
    ],
    local: [
      { title: "City Council Approves New Downtown Development", summary: "The $50 million project will include retail spaces, apartments, and a public park." },
      { title: "Local School Wins National Science Competition", summary: "Students from Franklin High School took first place with their innovative renewable energy project." },
      { title: "Community Farmers Market Expands to Three Days Weekly", summary: "Due to increasing popularity, the market will now operate Friday through Sunday." }
    ],
    tech: [
      { title: "New AI Model Achieves Breakthrough in Natural Language Processing", summary: "Researchers have developed an AI system that understands context with near-human accuracy." },
      { title: "Tech Giant Unveils Next-Generation Smartphone", summary: "The device features revolutionary battery technology and enhanced camera capabilities." },
      { title: "Quantum Computing Milestone Reached by Research Team", summary: "Scientists have successfully maintained quantum coherence for a record-breaking duration." }
    ]
  };

  useEffect(() => {
    handleFetchNews();
  }, [feedType]);

  const handleFetchNews = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setNewsItems(mockNews[feedType as keyof typeof mockNews] || []);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-3">
      <Label>Recent News (RSS)</Label>
      <div className="space-y-2">
        <Select value={feedType} onValueChange={setFeedType}>
          <SelectTrigger>
            <SelectValue placeholder="Select news category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="world">World News</SelectItem>
            <SelectItem value="local">Local News</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          type="button"
          variant="outline" 
          onClick={handleFetchNews} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Loading..." : "Refresh News"}
        </Button>
      </div>
      
      <div className="space-y-2 max-h-[240px] overflow-y-auto">
        {newsItems.length > 0 ? (
          newsItems.map((item, index) => (
            <Card key={index} className="p-3 hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium text-sm">{item.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{item.summary}</p>
              <Button 
                type="button"
                variant="link" 
                size="sm" 
                className="p-0 h-auto mt-1"
                onClick={() => onSelectNews(`${item.title}\n${item.summary}`)}
              >
                Add to Content
              </Button>
            </Card>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            {isLoading ? "Loading news items..." : "No news items available"}
          </p>
        )}
      </div>
    </div>
  );
};

export default RssFeedSelector;
