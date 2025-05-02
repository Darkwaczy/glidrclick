
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { RefreshCw, Search, TrendingUp, Link } from "lucide-react";
import { getNewsByCategory, formatNewsContent, NewsItem } from "@/services/rssService";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getTrendingTopics } from "@/services/contentDiscoveryService";

interface RssFeedSelectorProps {
  onSelectNews: (newsItem: string) => void;
}

const RssFeedSelector: React.FC<RssFeedSelectorProps> = ({
  onSelectNews
}) => {
  const [feedType, setFeedType] = useState("world");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("feeds");
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [isLoadingTrends, setIsLoadingTrends] = useState(false);

  useEffect(() => {
    handleFetchNews();
    loadTrendingTopics();
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

  const loadTrendingTopics = async () => {
    setIsLoadingTrends(true);
    try {
      const topics = await getTrendingTopics(feedType);
      setTrendingTopics(topics);
    } catch (error) {
      console.error("Error loading trending topics:", error);
    } finally {
      setIsLoadingTrends(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    // Filter existing news items for quick results
    const filteredItems = newsItems.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filteredItems.length > 0) {
      setNewsItems(filteredItems);
      setIsLoading(false);
    } else {
      // If no matches, fetch from a broader source
      getNewsByCategory('technology')
        .then(news => {
          const searchResults = news.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.summary.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setNewsItems(searchResults.length > 0 ? searchResults : []);
          if (searchResults.length === 0) {
            toast.info("No results found. Try a different search term.");
          }
        })
        .catch(error => {
          console.error("Search error:", error);
          toast.error("Search failed");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleTopicClick = (topic: string) => {
    setSearchQuery(topic);
    handleSearch();
  };

  const filteredNews = searchQuery.trim()
    ? newsItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : newsItems;

  return (
    <div className="space-y-3">
      <Label>Content Discovery</Label>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feeds">RSS Feeds</TabsTrigger>
          <TabsTrigger value="trends">Trending Topics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feeds" className="space-y-3 mt-2">
          <div className="flex flex-col space-y-2">
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
            
            <div className="flex space-x-2 mt-2">
              <Input
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button type="button" variant="outline" size="icon" onClick={handleSearch}>
                <Search size={16} />
              </Button>
            </div>
            
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
                  <RefreshCw size={16} className="mr-2" /> Refresh Content
                </>
              )}
            </Button>
          </div>
          
          <div className="space-y-2 max-h-[240px] overflow-y-auto">
            {filteredNews.length > 0 ? (
              filteredNews.map((item, index) => (
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
                {isLoading ? "Loading content..." : "No content available"}
              </p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-3 mt-2">
          <div className="flex flex-wrap gap-2 mb-3">
            {isLoadingTrends ? (
              <div className="text-center w-full py-2">
                <RefreshCw size={16} className="inline animate-spin mr-2" /> 
                Loading trending topics...
              </div>
            ) : trendingTopics.length > 0 ? (
              trendingTopics.map((topic, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="cursor-pointer hover:bg-gray-100 flex items-center gap-1"
                  onClick={() => handleTopicClick(topic)}
                >
                  <TrendingUp size={12} /> {topic}
                </Badge>
              ))
            ) : (
              <div className="text-center w-full text-sm text-gray-500">
                No trending topics available
              </div>
            )}
          </div>
          
          <div className="border-t pt-2">
            <h4 className="text-sm font-medium mb-2">Suggested Content Sources</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Link size={14} /> Industry News
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {setFeedType('technology'); setActiveTab('feeds');}}
                >
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Link size={14} /> Competitor Content
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {setFeedType('business'); setActiveTab('feeds');}}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RssFeedSelector;
