
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SocialPlatform } from "./types";

// API base URL - changed to use Supabase for real authentication
const API_BASE_URL = "http://localhost:5000/api";

export const getSocialPlatforms = async (): Promise<SocialPlatform[]> => {
  try {
    // Try to get platforms from Supabase first
    const { data: userSession } = await supabase.auth.getSession();
    const userId = userSession.session?.user.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    const { data: socialPlatforms, error } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    if (socialPlatforms && socialPlatforms.length > 0) {
      // Transform the data to match our SocialPlatform type
      return socialPlatforms.map(platform => {
        // Convert notifications to the correct format
        let notificationsObj = {
          mentions: true,
          messages: true
        };
        
        // Check if notifications exists and is an object
        if (platform.notifications && typeof platform.notifications === 'object' && !Array.isArray(platform.notifications)) {
          const notifs = platform.notifications as Record<string, any>;
          notificationsObj = {
            mentions: Boolean(notifs.mentions),
            messages: Boolean(notifs.messages)
          };
        }
        
        return {
          id: platform.platform_id,
          name: platform.name,
          icon: platform.icon as "facebook" | "twitter" | "instagram" | "linkedin" | "wordpress",
          isConnected: platform.is_connected || false,
          accountName: platform.account_name,
          lastSync: platform.last_sync,
          syncFrequency: platform.sync_frequency as "realtime" | "hourly" | "daily",
          notifications: notificationsObj
        };
      });
    }
    
    // If no platforms are returned, return default platforms list
    return [
      { id: "facebook", name: "Facebook", icon: "facebook", isConnected: false },
      { id: "instagram", name: "Instagram", icon: "instagram", isConnected: false },
      { id: "wordpress", name: "WordPress Blog", icon: "wordpress", isConnected: false }
    ];
  } catch (error) {
    console.error("Error fetching social platforms:", error);
    
    // Return default platforms on error
    return [
      { id: "facebook", name: "Facebook", icon: "facebook", isConnected: false },
      { id: "instagram", name: "Instagram", icon: "instagram", isConnected: false },
      { id: "wordpress", name: "WordPress Blog", icon: "wordpress", isConnected: false }
    ];
  }
};

export const updatePlatformSettings = async (
  platformId: string, 
  settings: Partial<SocialPlatform>
): Promise<boolean> => {
  try {
    // Get the user ID
    const { data: userSession } = await supabase.auth.getSession();
    const userId = userSession.session?.user.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    // Transform settings to match database schema
    const dbSettings: any = {};
    if (settings.syncFrequency) dbSettings.sync_frequency = settings.syncFrequency;
    if (settings.notifications) dbSettings.notifications = settings.notifications;
    if (settings.accountName) dbSettings.account_name = settings.accountName;
    
    // Update settings in Supabase
    const { error } = await supabase
      .from('social_platforms')
      .update(dbSettings)
      .eq('platform_id', platformId)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error updating platform settings:", error);
    toast.error("Failed to update settings");
    return false;
  }
};
