
import axios from "axios";

interface NewsItem {
  title: string;
  summary: string;
  imageUrl?: string;
  source: string;
  url: string;
  pubDate?: string;
}

const RSS_FEEDS = {
  world: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
  technology: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
  business: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml"
};

// Convert RSS XML to JSON using a public API
const fetchRssData = async (feedUrl: string): Promise<NewsItem[]> => {
  try {
    // Use rss2json conversion service
    const response = await axios.get("https://api.rss2json.com/v1/api.json", {
      params: {
        rss_url: feedUrl,
        api_key: "xtjroyli5bxzacnionpqx8kdonrpackv1ypkxxyl", // Free tier API key
        count: 10
      }
    });

    if (response.data && response.data.items) {
      return response.data.items.map((item: any) => {
        // Extract image from content if available
        let imageUrl;
        if (item.content) {
          const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/i);
          imageUrl = imgMatch ? imgMatch[1] : undefined;
        }

        // Create news item
        return {
          title: item.title,
          summary: item.description?.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...",
          imageUrl: imageUrl || item.enclosure?.link,
          source: response.data.feed.title || "News Source",
          url: item.link,
          pubDate: item.pubDate
        };
      });
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    // Return empty array on error
    return [];
  }
};

const getNewsByCategory = async (category: string): Promise<NewsItem[]> => {
  const feedUrl = RSS_FEEDS[category as keyof typeof RSS_FEEDS] || RSS_FEEDS.world;
  return fetchRssData(feedUrl);
};

// Format news content for insertion into post
const formatNewsContent = (item: NewsItem): string => {
  const imageMarkdown = item.imageUrl ? `![${item.title}](${item.imageUrl})` : '';
  const sourceLink = item.url && item.source ? `\n\n*Source: [${item.source}](${item.url})*` : '';
  const pubDate = item.pubDate ? `\n\n*Published on: ${new Date(item.pubDate).toLocaleDateString()}*` : '';
  
  return `## ${item.title}\n\n${imageMarkdown}\n\n${item.summary}${sourceLink}${pubDate}`;
};

export {
  getNewsByCategory,
  formatNewsContent,
  type NewsItem
};
