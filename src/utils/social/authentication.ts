
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getPlatformName, getPlatformStatus, isPlatformSupported } from "./helpers";

export const connectPlatform = async (platformId: string): Promise<void> => {
  try {
    // Get platform status
    const platformStatus = getPlatformStatus(platformId);
    
    // Check if the platform is supported
    if (platformStatus.status === 'coming-soon') {
      toast.info(`${getPlatformName(platformId)} integration coming soon`, {
        description: platformStatus.message
      });
      return;
    }
    
    // For demo purposes in development, we'll simulate a successful connection
    // In a production environment, this would use actual OAuth flows with the platforms
    
    // Get the user ID
    const { data: userSession } = await supabase.auth.getSession();
    const userId = userSession.session?.user.id;
    
    if (!userId) {
      toast.error("You must be logged in to connect platforms");
      return;
    }
    
    // Simulate OAuth flow completion
    toast.success(`Connecting to ${getPlatformName(platformId)}...`);
    
    // Create a connection record in the database
    const { error } = await supabase
      .from('social_platforms')
      .insert({
        user_id: userId,
        platform_id: platformId,
        name: getPlatformName(platformId),
        icon: platformId,
        is_connected: true,
        account_name: `@user_${platformId}`,
        last_sync: new Date().toISOString(),
        sync_frequency: 'daily',
        notifications: { mentions: true, messages: true }
      });
      
    if (error) {
      console.error('Error connecting platform:', error);
      throw error;
    }
    
    // Simulate delay for the connection process
    setTimeout(() => {
      toast.success(`Successfully connected to ${getPlatformName(platformId)}!`, {
        description: "You can now manage posts and replies from this platform."
      });
    }, 1500);
    
  } catch (err) {
    console.error('Error in connectPlatform:', err);
    toast.error(`Something went wrong while connecting to ${getPlatformName(platformId)}`);
  }
};

export const disconnectPlatform = async (platformId: string): Promise<boolean> => {
  try {
    // Get the user ID
    const { data: userSession } = await supabase.auth.getSession();
    const userId = userSession.session?.user.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }
    
    // Remove from Supabase
    const { error } = await supabase
      .from('social_platforms')
      .delete()
      .eq('platform_id', platformId)
      .eq('user_id', userId);
    
    if (error) throw error;
    
    toast.success(`Disconnected from ${getPlatformName(platformId)}`);
    return true;
  } catch (error) {
    console.error("Error disconnecting platform:", error);
    toast.error(`Failed to disconnect from ${platformId}`);
    return false;
  }
};
