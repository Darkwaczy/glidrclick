
import { toast } from "sonner";
import axios from "axios";

export type SocialPlatform = {
  id: string;
  name: string;
  icon: "facebook" | "twitter" | "instagram" | "linkedin" | "wordpress";
  isConnected: boolean;
  accountName?: string;
  lastSync?: string;
  syncFrequency?: "realtime" | "hourly" | "daily";
  notifications?: {
    mentions: boolean;
    messages: boolean;
  };
};

// API base URL - changed to use mock data instead of a real server
// since the actual server isn't running
const USE_MOCK_API = true;
const API_BASE_URL = "http://localhost:5000/api";

// Store platforms in memory so they persist during the session
let mockConnectedPlatforms: SocialPlatform[] = [];
let mockScheduledPosts: any[] = [];
let mockPublishedPosts: any[] = [];

export const getSocialPlatforms = async (): Promise<SocialPlatform[]> => {
  try {
    if (USE_MOCK_API) {
      return mockConnectedPlatforms.length > 0 ? mockConnectedPlatforms : [
        { id: "facebook", name: "Facebook", icon: "facebook", isConnected: false },
        { id: "twitter", name: "Twitter", icon: "twitter", isConnected: false },
        { id: "instagram", name: "Instagram", icon: "instagram", isConnected: false },
        { id: "wordpress", name: "WordPress Blog", icon: "instagram", isConnected: false }
      ];
    }
    
    // Real API call (not used currently)
    const response = await axios.get(`${API_BASE_URL}/platforms`, { withCredentials: true });
    if (response.data && response.data.length > 0) {
      return response.data;
    }
    
    // If no platforms are returned, return default platforms list
    return [
      { id: "facebook", name: "Facebook", icon: "facebook", isConnected: false },
      { id: "twitter", name: "Twitter", icon: "twitter", isConnected: false },
      { id: "instagram", name: "Instagram", icon: "instagram", isConnected: false },
      { id: "wordpress", name: "WordPress Blog", icon: "instagram", isConnected: false }
    ];
  } catch (error) {
    console.error("Error fetching social platforms:", error);
    
    // Return default platforms on error
    return [
      { id: "facebook", name: "Facebook", icon: "facebook", isConnected: false },
      { id: "twitter", name: "Twitter", icon: "twitter", isConnected: false },
      { id: "instagram", name: "Instagram", icon: "instagram", isConnected: false },
      { id: "wordpress", name: "WordPress Blog", icon: "instagram", isConnected: false }
    ];
  }
};

export const connectPlatform = (platformId: string): void => {
  if (USE_MOCK_API) {
    // Simulate successful connection
    const platform = {
      id: platformId,
      name: getPlatformName(platformId),
      icon: platformId as any,
      isConnected: true,
      accountName: `@user_${platformId}`,
      lastSync: new Date().toISOString(),
      syncFrequency: "daily" as const,
      notifications: { mentions: true, messages: true }
    };
    
    mockConnectedPlatforms = [
      ...mockConnectedPlatforms.filter(p => p.id !== platformId),
      platform
    ];
    
    // Simulate a redirect and callback
    setTimeout(() => {
      // Update URL to simulate redirect back
      window.history.pushState(
        {}, 
        document.title, 
        `${window.location.pathname}?connected=${platformId}`
      );
      
      // Simulate the successful connection toast
      toast.success(`Connected to ${getPlatformName(platformId)} successfully!`);
      
      // Clean up URL after delay
      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 1000);
    }, 500);
    
    return;
  }
  
  try {
    // Real OAuth flow (not used currently)
    const returnUrl = encodeURIComponent(window.location.pathname);
    const authUrl = `${API_BASE_URL}/auth/${platformId}?returnTo=${returnUrl}`;
    
    // Redirect the browser to start the OAuth flow
    window.location.href = authUrl;
  } catch (error) {
    console.error("Error connecting platform:", error);
    toast.error(`Failed to connect to ${platformId}`);
    return;
  }
};

export const disconnectPlatform = async (platformId: string): Promise<boolean> => {
  if (USE_MOCK_API) {
    // Remove from local mock storage
    mockConnectedPlatforms = mockConnectedPlatforms.filter(p => p.id !== platformId);
    toast.success(`Disconnected from ${getPlatformName(platformId)}`);
    return true;
  }
  
  try {
    await axios.delete(`${API_BASE_URL}/platforms/${platformId}`, { withCredentials: true });
    toast.success(`Disconnected from ${platformId}`);
    return true;
  } catch (error) {
    console.error("Error disconnecting platform:", error);
    toast.error(`Failed to disconnect from ${platformId}`);
    return false;
  }
};

export const updatePlatformSettings = async (
  platformId: string, 
  settings: Partial<SocialPlatform>
): Promise<boolean> => {
  if (USE_MOCK_API) {
    // Update settings in mock storage
    mockConnectedPlatforms = mockConnectedPlatforms.map(platform => {
      if (platform.id === platformId) {
        return { ...platform, ...settings };
      }
      return platform;
    });
    return true;
  }
  
  try {
    await axios.patch(`${API_BASE_URL}/platforms/${platformId}/settings`, settings, { withCredentials: true });
    return true;
  } catch (error) {
    console.error("Error updating platform settings:", error);
    toast.error("Failed to update settings");
    return false;
  }
};

export const publishToSocialMedia = async (
  platformId: string,
  content: string,
  title?: string
): Promise<boolean> => {
  if (USE_MOCK_API) {
    // Add to published posts
    mockPublishedPosts.push({
      id: Date.now(),
      title: title || 'Untitled Post',
      content,
      platform: platformId,
      date: new Date().toLocaleDateString(),
      views: Math.floor(Math.random() * 1000),
      engagement: Math.floor(Math.random() * 100)
    });
    
    toast.success(`Published to ${getPlatformName(platformId)}`);
    return true;
  }
  
  try {
    await axios.post(`${API_BASE_URL}/publish/${platformId}`, { content, title }, { withCredentials: true });
    toast.success(`Published to ${platformId}`);
    return true;
  } catch (error) {
    console.error(`Error publishing to ${platformId}:`, error);
    toast.error(`Failed to publish to ${platformId}`);
    return false;
  }
};

export const schedulePost = (
  title: string,
  content: string,
  platforms: string[],
  scheduledDate: Date
): void => {
  const newPost = {
    id: mockScheduledPosts.length + 1,
    title,
    content,
    platforms: platforms.map(id => getPlatformName(id)),
    scheduledFor: scheduledDate.toLocaleString()
  };
  
  mockScheduledPosts.push(newPost);
};

export const getScheduledPosts = () => {
  return mockScheduledPosts;
};

export const getPublishedPosts = () => {
  return mockPublishedPosts;
};

// Helper function to get platform name
const getPlatformName = (platformId: string): string => {
  const platforms: Record<string, string> = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    wordpress: 'WordPress Blog'
  };
  
  return platforms[platformId] || platformId;
};
