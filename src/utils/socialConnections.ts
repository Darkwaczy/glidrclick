
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

// API base URL - change this to your actual backend URL
const API_BASE_URL = "http://localhost:5000/api";

export const getSocialPlatforms = async (): Promise<SocialPlatform[]> => {
  try {
    // Try to get platforms from the API
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
    toast.error("Failed to load social platforms");
    
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
  try {
    // Redirect to the backend OAuth initiation endpoint
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
