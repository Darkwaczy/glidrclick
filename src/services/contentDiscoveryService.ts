
import { supabase } from "@/integrations/supabase/client";

// Interface for content trends
export interface ContentTrend {
  topic: string;
  volume: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  change: number; // percentage change since last period
}

// Interface for competitor analytics
export interface CompetitorContent {
  title: string;
  source: string;
  publishDate: string;
  engagement: number;
  url: string;
}

// Sample trending topics data (in a real app, this would come from an API)
const TRENDING_TOPICS: Record<string, string[]> = {
  world: [
    "Climate Action", 
    "Global Economy", 
    "International Relations", 
    "Humanitarian Aid",
    "Sustainable Development"
  ],
  technology: [
    "AI Ethics", 
    "Web3", 
    "Remote Work Tools", 
    "Cybersecurity",
    "Green Tech"
  ],
  business: [
    "Supply Chain Innovation", 
    "Digital Transformation", 
    "Workplace Culture", 
    "Financial Markets",
    "Startup Funding"
  ]
};

// Get trending topics based on category
export const getTrendingTopics = async (category: string): Promise<string[]> => {
  // In a real implementation, this would fetch data from an API or database
  // For demo purposes, return predefined topics
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(TRENDING_TOPICS[category as keyof typeof TRENDING_TOPICS] || TRENDING_TOPICS.world);
    }, 500); // Simulate network delay
  });
};

// Get content suggestions based on user's content history
export const getContentSuggestions = async (userId: string): Promise<string[]> => {
  try {
    // In a real implementation, this would analyze user's previous posts
    // and provide tailored suggestions
    
    // For demo purposes, fetch from the database if it exists, or use defaults
    const { data, error } = await supabase
      .from('content_templates')
      .select('title')
      .limit(5);
      
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data.map(item => item.title);
    }
    
    // Default suggestions
    return [
      "10 Ways to Improve Your Social Media Strategy",
      "Industry Trends for 2025",
      "How to Increase Engagement on Your Content",
      "Best Practices for Content Creation",
      "Understanding Your Audience: A Deep Dive"
    ];
  } catch (error) {
    console.error("Error fetching content suggestions:", error);
    return [];
  }
};

// Analyze competitor content
export const getCompetitorAnalysis = async (industry: string): Promise<CompetitorContent[]> => {
  // In a real implementation, this would fetch and analyze competitor content
  // For demo purposes, return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          title: "How to Optimize Your Content Strategy",
          source: "Industry Leader Blog",
          publishDate: "2025-04-28",
          engagement: 1240,
          url: "https://example.com/blog/content-strategy"
        },
        {
          title: "The Future of Digital Marketing",
          source: "Marketing Insights",
          publishDate: "2025-04-25",
          engagement: 986,
          url: "https://example.com/blog/digital-marketing-future"
        },
        {
          title: "Building Audience Engagement Through Storytelling",
          source: "Content Creator Hub",
          publishDate: "2025-04-20",
          engagement: 1520,
          url: "https://example.com/blog/storytelling"
        }
      ]);
    }, 800); // Simulate network delay
  });
};

// Get topic analytics
export const getTopicAnalytics = async (topic: string): Promise<{
  volume: number;
  sentiment: number;
  engagement: number;
}> => {
  // In a real implementation, this would fetch analytics data for a given topic
  // For demo purposes, return random data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        volume: Math.floor(Math.random() * 10000),
        sentiment: parseFloat((0.3 + Math.random() * 0.6).toFixed(2)), // 0.3 to 0.9
        engagement: Math.floor(Math.random() * 5000)
      });
    }, 600);
  });
};
