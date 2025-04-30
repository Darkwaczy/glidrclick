
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getPlatformName } from "./helpers";

export const connectPlatform = (platformId: string): void => {
  // Configure OAuth providers based on platform
  const authProviders: Record<string, string> = {
    facebook: 'facebook',
    instagram: 'instagram',
    wordpress: 'github' // Using GitHub as a proxy for WordPress OAuth
  };
  
  if (!authProviders[platformId]) {
    toast.error(`${getPlatformName(platformId)} authentication is not available yet`);
    return;
  }

  // Use Supabase OAuth for authentication
  supabase.auth.signInWithOAuth({
    provider: authProviders[platformId] as any,
    options: {
      redirectTo: `${window.location.origin}/dashboard/social?connected=${platformId}`,
      // Store the social platform connection in the session
      queryParams: {
        platform: platformId
      }
    }
  })
  .then(({ error }) => {
    if (error) {
      console.error('Error connecting platform:', error);
      toast.error(`Failed to connect to ${platformId}`);
    }
  });
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
