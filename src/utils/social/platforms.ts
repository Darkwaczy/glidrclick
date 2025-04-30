
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getCurrentUserId } from './helpers';

/**
 * Get connected social platforms for the current user
 */
export const getSocialPlatforms = async () => {
  try {
    // Get current user
    const userId = await getCurrentUserId();
    
    if (!userId) {
      console.log("No authenticated user found");
      return [];
    }
    
    // Get platforms from database
    const { data: userPlatforms, error: userPlatformsError } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('user_id', userId);
      
    if (userPlatformsError) {
      console.error("Error fetching user platforms:", userPlatformsError);
      throw userPlatformsError;
    }
    
    // Get all available platforms
    const availablePlatforms = [
      { id: 'facebook', name: 'Facebook', icon: 'facebook' },
      { id: 'instagram', name: 'Instagram', icon: 'instagram' },
      { id: 'twitter', name: 'Twitter', icon: 'twitter' },
      { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
      { id: 'wordpress', name: 'WordPress', icon: 'wordpress' }
    ];
    
    // Merge available platforms with user's connected platforms
    const platforms = availablePlatforms.map(platform => {
      const userPlatform = userPlatforms?.find(p => p.platform_id === platform.id);
      
      return {
        ...platform,
        isConnected: !!userPlatform,
        accountName: userPlatform?.account_name || null,
        lastSync: userPlatform?.last_sync || null,
        userId: userId
      };
    });
    
    return platforms;
  } catch (error) {
    console.error("Error fetching social platforms:", error);
    return [];
  }
};

/**
 * Connect to a social platform
 * @param platformId The platform ID to connect to
 */
export const connectPlatform = async (platformId: string): Promise<boolean> => {
  try {
    if (platformId === 'facebook') {
      window.open('/dashboard/social?platform=facebook', '_self');
      return true;
    } else if (platformId === 'instagram') {
      window.open('/dashboard/social?platform=instagram', '_self');
      return true;
    } else if (platformId === 'wordpress') {
      // Show WordPress dialog instead of redirecting
      window.dispatchEvent(new CustomEvent('show-wordpress-dialog'));
      return true;
    } else {
      toast.error(`Connection to ${platformId} is not yet implemented`);
      return false;
    }
  } catch (error) {
    console.error(`Error connecting to ${platformId}:`, error);
    toast.error(`Failed to connect to ${platformId}`);
    return false;
  }
};

/**
 * Disconnect from a social platform
 * @param platformId The platform ID to disconnect from
 */
export const disconnectPlatform = async (platformId: string): Promise<boolean> => {
  try {
    // Get current user
    const userId = await getCurrentUserId();
    
    if (!userId) {
      toast.error('You must be logged in to disconnect platforms');
      return false;
    }
    
    // Delete platform connection from database
    const { error } = await supabase
      .from('social_platforms')
      .delete()
      .eq('user_id', userId)
      .eq('platform_id', platformId);
      
    if (error) throw error;
    
    toast.success(`Successfully disconnected from ${platformId}`);
    return true;
  } catch (error) {
    console.error(`Error disconnecting from ${platformId}:`, error);
    toast.error(`Failed to disconnect from ${platformId}`);
    return false;
  }
};

/**
 * Update platform settings
 * @param platformId The platform ID
 * @param settings The new settings
 */
export const updatePlatformSettings = async (platformId: string, settings: any): Promise<boolean> => {
  try {
    // Get current user
    const userId = await getCurrentUserId();
    
    if (!userId) {
      toast.error('You must be logged in to update platform settings');
      return false;
    }
    
    // Update platform settings in database
    const { error } = await supabase
      .from('social_platforms')
      .update({
        notifications: settings.notifications,
        sync_frequency: settings.syncFrequency
      })
      .eq('user_id', userId)
      .eq('platform_id', platformId);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`Error updating settings for ${platformId}:`, error);
    toast.error(`Failed to update settings for ${platformId}`);
    return false;
  }
};
