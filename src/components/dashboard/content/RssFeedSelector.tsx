
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

interface RssFeedSelectorProps {
  onSelectNews: (newsItem: string) => void;
}

interface NewsItem {
  title: string;
  summary: string;
  imageUrl?: string;
  source?: string;
  url?: string;
}

const RssFeedSelector: React.FC<RssFeedSelectorProps> = ({
  onSelectNews
}) => {
  const [feedType, setFeedType] = useState("world");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock news data with images and sources
  const mockNews = {
    world: [
      { 
        title: "Global Climate Summit Announces New Agreements", 
        summary: "Leaders from over 190 countries reached consensus on reducing carbon emissions by 2030.",
        imageUrl: "https://images.unsplash.com/photo-1532408840957-031d8034aaef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2xpbWF0ZSUyMGNoYW5nZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        source: "Global News",
        url: "https://example.com/climate-summit"
      },
      { 
        title: "International Space Station Celebrates 25 Years", 
        summary: "The ISS marks a quarter century of continuous human presence in space with new scientific achievements.",
        imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        source: "Space News",
        url: "https://example.com/iss-anniversary"
      },
      { 
        title: "WHO Reports Decline in Global Pandemic Cases", 
        summary: "New data shows a significant reduction in cases worldwide as vaccination rates improve.",
        imageUrl: "https://images.unsplash.com/photo-1584118624012-df056829fbd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjY2luZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        source: "Health Journal",
        url: "https://example.com/pandemic-decline"
      }
    ],
    local: [
      { 
        title: "City Council Approves New Downtown Development", 
        summary: "The $50 million project will include retail spaces, apartments, and a public park.",
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0eSUyMGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        source: "Local News Daily",
        url: "https://example.com/downtown-development"
      },
      { 
        title: "Local School Wins National Science Competition", 
        summary: "Students from Franklin High School took first place with their innovative renewable energy project.",
        imageUrl: "https://images.unsplash.com/photo-1567168539593-59673ababaae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2Nob29sJTIwc2NpZW5jZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        source: "Education Times",
        url: "https://example.com/school-science-win"
      },
      { 
        title: "Community Farmers Market Expands to Three Days Weekly", 
        summary: "Due to increasing popularity, the market will now operate Friday through Sunday.",
        imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWVycyUyMG1hcmtldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        source: "Community Gazette",
        url: "https://example.com/farmers-market-expands"
      }
    ],
    tech: [
      { 
        title: "New AI Model Achieves Breakthrough in Natural Language Processing", 
        summary: "Researchers have developed an AI system that understands context with near-human accuracy.",
        imageUrl: "https://images.unsplash.com/photo-1677442135000-3401e6ddd0c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBicmFpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        source: "Tech Review",
        url: "https://example.com/ai-breakthrough"
      },
      { 
        title: "Tech Giant Unveils Next-Generation Smartphone", 
        summary: "The device features revolutionary battery technology and enhanced camera capabilities.",
        imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnRwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        source: "Gadget News",
        url: "https://example.com/new-smartphone"
      },
      { 
        title: "Quantum Computing Milestone Reached by Research Team", 
        summary: "Scientists have successfully maintained quantum coherence for a record-breaking duration.",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cXVhbnR1bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        source: "Science Daily",
        url: "https://example.com/quantum-milestone"
      }
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
      toast.success(`Loaded ${feedType} news feed`);
    }, 800);
  };

  const formatNewsContent = (item: NewsItem) => {
    const imageMarkdown = item.imageUrl ? `![${item.title}](${item.imageUrl})` : '';
    const sourceLink = item.url && item.source ? `\n\n*Source: [${item.source}](${item.url})*` : '';
    return `# ${item.title}\n\n${imageMarkdown}\n\n${item.summary}${sourceLink}`;
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
          {isLoading ? (
            <>
              <RefreshCw size={16} className="mr-2 animate-spin" /> Loading...
            </>
          ) : (
            <>
              <RefreshCw size={16} className="mr-2" /> Refresh News
            </>
          )}
        </Button>
      </div>
      
      <div className="space-y-2 max-h-[240px] overflow-y-auto">
        {newsItems.length > 0 ? (
          newsItems.map((item, index) => (
            <Card key={index} className="p-3 hover:bg-gray-50 cursor-pointer">
              {item.imageUrl && (
                <div className="mb-2 rounded overflow-hidden h-24">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h4 className="font-medium text-sm">{item.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{item.summary}</p>
              {item.source && (
                <div className="text-xs text-blue-500 mt-1">
                  Source: {item.source}
                </div>
              )}
              <Button 
                type="button"
                variant="link" 
                size="sm" 
                className="p-0 h-auto mt-1"
                onClick={() => onSelectNews(formatNewsContent(item))}
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
