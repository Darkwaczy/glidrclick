
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { getNewsByCategory, formatNewsContent, NewsItem } from "@/services/rssService";

interface RssFeedSelectorProps {
  onSelectNews: (newsItem: string) => void;
}

const RssFeedSelector: React.FC<RssFeedSelectorProps> = ({
  onSelectNews
}) => {
  const [feedType, setFeedType] = useState("world");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleFetchNews();
  }, [feedType]);

  const handleFetchNews = async () => {
    setIsLoading(true);
    
    try {
      const news = await getNewsByCategory(feedType);
      setNewsItems(news);
      toast.success(`Loaded ${feedType} news feed`);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to load news feed");
      setNewsItems([]);
    } finally {
      setIsLoading(false);
    }
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
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="business">Business</SelectItem>
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
