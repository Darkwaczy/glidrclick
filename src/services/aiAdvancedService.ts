
import axios from "axios";
import { toast } from "sonner";

// API configuration - reusing existing API keys from aiService.ts
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = "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";
const GROQ_MODEL = "llama3-70b-8192";

interface AudienceAnalysisResult {
  optimalTimes: {
    day: string;
    time: string;
    engagement: number;
  }[];
  recommendations: string[];
}

interface ContentPersonalizationResult {
  platformSpecificSuggestions: Record<string, string[]>;
  contentAdjustments: string[];
  toneRecommendations: string[];
}

interface ABTestResult {
  titleVariations: string[];
  contentVariations: string[];
  expectedPerformance: Record<string, number>;
}

interface SEOResult {
  keywords: string[];
  titleSuggestions: string[];
  metaDescription: string;
  contentOptimizations: string[];
}

// Analyze audience data to determine optimal posting times
export const analyzeAudience = async (
  historicalData: any[],
  platformId: string
): Promise<AudienceAnalysisResult> => {
  try {
    const prompt = `
      Analyze the following audience engagement data and recommend the optimal posting times:
      
      Platform: ${platformId}
      Historical Data: ${JSON.stringify(historicalData)}
      
      Please provide:
      1. The top 3 day/time combinations for highest engagement
      2. Specific recommendations based on the audience behavior
      Format your response as valid JSON with 'optimalTimes' and 'recommendations' fields.
    `;

    const response = await callAI(prompt);
    return parseAIResponseAsJson(response, {
      optimalTimes: [{ day: "Monday", time: "8:00 AM", engagement: 0.85 }],
      recommendations: ["Post during weekday mornings for highest engagement"]
    });
  } catch (error) {
    console.error("Error analyzing audience data:", error);
    toast.error("Failed to analyze audience data");
    return {
      optimalTimes: [
        { day: "Monday", time: "8:00 AM", engagement: 0.85 },
        { day: "Wednesday", time: "12:00 PM", engagement: 0.78 },
        { day: "Friday", time: "6:00 PM", engagement: 0.72 }
      ],
      recommendations: [
        "Post during weekday mornings for highest engagement",
        "Consider scheduling content for Friday evenings when leisure browsing increases",
        "Avoid posting on weekend mornings when engagement is lowest"
      ]
    };
  }
};

// Generate personalized content suggestions based on platform analytics
export const personalizeContent = async (
  content: string,
  platforms: string[],
  analytics: any
): Promise<ContentPersonalizationResult> => {
  try {
    const prompt = `
      Personalize the following content for different social media platforms based on analytics:
      
      Original Content: ${content}
      Target Platforms: ${platforms.join(", ")}
      Analytics Data: ${JSON.stringify(analytics)}
      
      Please provide:
      1. Platform-specific content adjustments for each platform
      2. General content improvement suggestions
      3. Tone recommendations for each platform
      Format your response as valid JSON with 'platformSpecificSuggestions', 'contentAdjustments', and 'toneRecommendations' fields.
    `;

    const response = await callAI(prompt);
    return parseAIResponseAsJson(response, {
      platformSpecificSuggestions: { 
        facebook: ["Use more emotional language"], 
        twitter: ["Keep it concise"] 
      },
      contentAdjustments: ["Add more imagery"],
      toneRecommendations: ["Use casual tone for Instagram"]
    });
  } catch (error) {
    console.error("Error personalizing content:", error);
    toast.error("Failed to personalize content");
    return {
      platformSpecificSuggestions: {
        facebook: [
          "Use more emotionally engaging language",
          "Include a personal story element",
          "End with a question to encourage comments"
        ],
        twitter: [
          "Keep it concise and punchy",
          "Use relevant hashtags",
          "Include a strong call-to-action"
        ],
        instagram: [
          "Focus on visual descriptors",
          "Use more casual, conversational language",
          "Include relevant emoji set"
        ]
      },
      contentAdjustments: [
        "Add more imagery and descriptive language",
        "Include data points to build credibility",
        "Create a stronger opening hook"
      ],
      toneRecommendations: [
        "Use casual, friendly tone for Instagram",
        "Adopt a more professional tone for LinkedIn",
        "Be concise and direct for Twitter"
      ]
    };
  }
};

// Generate A/B test variations for headlines and content
export const generateABTest = async (
  title: string,
  content: string
): Promise<ABTestResult> => {
  try {
    const prompt = `
      Generate A/B test variations for the following content:
      
      Original Title: ${title}
      Original Content: ${content}
      
      Please provide:
      1. 3 alternative headline variations
      2. 2 alternative content variations (intros only)
      3. Expected performance metrics for each variation
      Format your response as valid JSON with 'titleVariations', 'contentVariations', and 'expectedPerformance' fields.
    `;

    const response = await callAI(prompt);
    return parseAIResponseAsJson(response, {
      titleVariations: [
        "10 Ways to Boost Your Business",
        "Skyrocket Your Business: 10 Proven Methods",
        "The Ultimate Guide to Business Growth"
      ],
      contentVariations: [
        "Have you ever wondered how successful businesses consistently grow? In this guide...",
        "Growing a business isn't just about hard work - it's about smart strategy. Let's explore..."
      ],
      expectedPerformance: {
        "original": 0.75,
        "variation1": 0.85,
        "variation2": 0.70
      }
    });
  } catch (error) {
    console.error("Error generating A/B test variations:", error);
    toast.error("Failed to generate A/B test variations");
    return {
      titleVariations: [
        "10 Ways to Boost Your Business",
        "Skyrocket Your Business: 10 Proven Methods",
        "The Ultimate Guide to Business Growth"
      ],
      contentVariations: [
        "Have you ever wondered how successful businesses consistently grow? In this guide...",
        "Growing a business isn't just about hard work - it's about smart strategy. Let's explore..."
      ],
      expectedPerformance: {
        "original": 0.75,
        "variation1": 0.85,
        "variation2": 0.70
      }
    };
  }
};

// Provide SEO optimization suggestions
export const optimizeSEO = async (
  title: string,
  content: string
): Promise<SEOResult> => {
  try {
    const prompt = `
      Provide SEO optimization suggestions for the following blog content:
      
      Title: ${title}
      Content: ${content}
      
      Please provide:
      1. Recommended keywords to focus on
      2. SEO-optimized title suggestions
      3. Meta description suggestion
      4. Content optimization recommendations
      Format your response as valid JSON with 'keywords', 'titleSuggestions', 'metaDescription', and 'contentOptimizations' fields.
    `;

    const response = await callAI(prompt);
    return parseAIResponseAsJson(response, {
      keywords: ["business growth", "marketing strategy"],
      titleSuggestions: ["10 Proven Business Growth Strategies for 2025"],
      metaDescription: "Discover 10 effective strategies to grow your business...",
      contentOptimizations: ["Add more subheadings", "Include statistics"]
    });
  } catch (error) {
    console.error("Error optimizing for SEO:", error);
    toast.error("Failed to generate SEO suggestions");
    return {
      keywords: [
        "business growth",
        "marketing strategy",
        "revenue increase",
        "customer acquisition",
        "sales optimization"
      ],
      titleSuggestions: [
        "10 Proven Business Growth Strategies for 2025",
        "How to Scale Your Business: 10 Expert-Backed Methods",
        "Boost Your Business Growth with These 10 Powerful Techniques"
      ],
      metaDescription: "Discover 10 effective strategies to grow your business in 2025, backed by data and expert insights. Learn practical methods to increase revenue and expand your customer base.",
      contentOptimizations: [
        "Add more subheadings with keywords",
        "Include relevant statistics and case studies",
        "Expand the conclusion with actionable next steps",
        "Add internal links to related content",
        "Include a FAQ section addressing common questions"
      ]
    };
  }
};

// Helper function to call AI API
const callAI = async (prompt: string): Promise<string> => {
  try {
    // Try with Groq API
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: "You are an AI marketing specialist that provides data-driven recommendations for content optimization and audience targeting. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw new Error("Failed to get AI response");
  }
};

// Helper function to parse AI response as JSON with fallback
const parseAIResponseAsJson = <T>(response: string, fallback: T): T => {
  try {
    // Extract JSON object if the response includes explanatory text
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : response;
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing AI response as JSON:", error);
    return fallback;
  }
};

export default {
  analyzeAudience,
  personalizeContent,
  generateABTest,
  optimizeSEO
};
