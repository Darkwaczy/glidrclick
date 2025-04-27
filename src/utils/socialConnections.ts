
import { toast } from "sonner";

export type SocialPlatform = {
  id: string;
  name: string;
  icon: "facebook" | "twitter" | "instagram" | "linkedin";
  isConnected: boolean;
  accountName?: string;
  lastSync?: string;
  syncFrequency?: "realtime" | "hourly" | "daily";
  notifications?: {
    mentions: boolean;
    messages: boolean;
  };
};

export const getSocialPlatforms = (): SocialPlatform[] => {
  const savedPlatforms = localStorage.getItem('connectedPlatforms');
  if (savedPlatforms) {
    return JSON.parse(savedPlatforms);
  }
  
  // Default platforms with no connections
  return [
    { id: "facebook", name: "Facebook", icon: "facebook", isConnected: false },
    { id: "twitter", name: "Twitter", icon: "twitter", isConnected: false },
    { id: "instagram", name: "Instagram", icon: "instagram", isConnected: false },
    { id: "linkedin", name: "LinkedIn", icon: "linkedin", isConnected: false }
  ];
};

export const connectPlatform = async (platformId: string): Promise<boolean> => {
  try {
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const platforms = getSocialPlatforms();
    const updatedPlatforms = platforms.map(platform => {
      if (platform.id === platformId) {
        return {
          ...platform,
          isConnected: true,
          accountName: `@user_${Math.random().toString(36).substring(7)}`,
          lastSync: new Date().toISOString(),
          syncFrequency: "daily",
          notifications: { mentions: true, messages: true }
        };
      }
      return platform;
    });
    
    localStorage.setItem('connectedPlatforms', JSON.stringify(updatedPlatforms));
    return true;
  } catch (error) {
    console.error('Error connecting platform:', error);
    return false;
  }
};

export const disconnectPlatform = (platformId: string): boolean => {
  try {
    const platforms = getSocialPlatforms();
    const updatedPlatforms = platforms.map(platform => 
      platform.id === platformId 
        ? { ...platform, isConnected: false, accountName: undefined, lastSync: undefined }
        : platform
    );
    
    localStorage.setItem('connectedPlatforms', JSON.stringify(updatedPlatforms));
    return true;
  } catch (error) {
    console.error('Error disconnecting platform:', error);
    return false;
  }
};

export const updatePlatformSettings = (
  platformId: string, 
  settings: Partial<SocialPlatform>
): boolean => {
  try {
    const platforms = getSocialPlatforms();
    const updatedPlatforms = platforms.map(platform => 
      platform.id === platformId 
        ? { ...platform, ...settings }
        : platform
    );
    
    localStorage.setItem('connectedPlatforms', JSON.stringify(updatedPlatforms));
    return true;
  } catch (error) {
    console.error('Error updating platform settings:', error);
    return false;
  }
};
