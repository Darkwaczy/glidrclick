
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getPlatformName, getPlatformStatus, isPlatformSupported } from "./helpers";

// Main function to initiate platform connection
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

    // Make sure the user is logged in
    const { data: userSession } = await supabase.auth.getSession();
    const userId = userSession.session?.user.id;
    
    if (!userId) {
      toast.error("You must be logged in to connect platforms");
      return;
    }

    // Let user know we're initiating auth
    toast.info(`Starting connection to ${getPlatformName(platformId)}...`);
    
    // Create the OAuth URL based on platform
    let authUrl;
    
    switch(platformId) {
      case 'facebook':
        // Redirect to Facebook OAuth flow
        authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/dashboard/social?connected=facebook')}&scope=pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish,pages_show_list,public_profile`;
        break;
        
      case 'instagram':
        // Redirect to Instagram OAuth flow (via Facebook)
        authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/dashboard/social?connected=instagram')}&scope=instagram_basic,instagram_content_publish,pages_show_list,public_profile`;
        break;
        
      case 'wordpress':
        // For WordPress, we first need to determine if it's WordPress.com or self-hosted
        // We'll handle this in the ConnectWordPressDialog component
        const { data: wpResult } = await supabase.functions.invoke('connect-wordpress', {
          body: { userId }
        });
        
        if (wpResult && wpResult.authUrl) {
          authUrl = wpResult.authUrl;
        } else {
          // Show WordPress connection dialog (handled in the UI)
          // This is for displaying the self-hosted WordPress option
          window.dispatchEvent(new CustomEvent('show-wordpress-dialog'));
          return;
        }
        break;
        
      default:
        toast.error(`Connection method for ${getPlatformName(platformId)} is not configured`);
        return;
    }
    
    // Redirect to the authentication URL
    if (authUrl) {
      window.location.href = authUrl;
    }
    
  } catch (err) {
    console.error('Error in connectPlatform:', err);
    toast.error(`Something went wrong while connecting to ${getPlatformName(platformId)}`);
  }
};

// Handle OAuth callback for platform connections
export const handleOAuthCallback = async (platform: string, code: string): Promise<boolean> => {
  try {
    // Make sure the user is logged in
    const { data: userSession } = await supabase.auth.getSession();
    const userId = userSession.session?.user.id;
    
    if (!userId) {
      toast.error("Authentication failed: User not logged in");
      return false;
    }
    
    // Exchange code for access token using Edge Function
    const { data, error } = await supabase.functions.invoke(`oauth-${platform}`, {
      body: { code, redirect_uri: window.location.origin + `/dashboard/social?connected=${platform}` }
    });
    
    if (error) {
      console.error("OAuth callback error:", error);
      throw error;
    }
    
    if (!data || !data.access_token) {
      throw new Error("No access token received");
    }
    
    // Format data for storage
    const platformData = {
      user_id: userId,
      platform_id: platform,
      name: getPlatformName(platform),
      icon: platform,
      is_connected: true,
      access_token: data.access_token,
      refresh_token: data.refresh_token || null,
      token_expires_at: data.expires_in ? new Date(Date.now() + (data.expires_in * 1000)).toISOString() : null,
      account_name: data.account_name || `@user_${platform}`,
      last_sync: new Date().toISOString(),
      sync_frequency: 'daily',
      notifications: { mentions: true, messages: true }
    };
    
    // Check if platform is already connected
    const { data: existingPlatform } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('user_id', userId)
      .eq('platform_id', platform)
      .single();
    
    // Update or insert platform data
    let result;
    if (existingPlatform) {
      result = await supabase
        .from('social_platforms')
        .update(platformData)
        .eq('id', existingPlatform.id);
    } else {
      result = await supabase
        .from('social_platforms')
        .insert(platformData);
    }
    
    if (result.error) throw result.error;
    
    toast.success(`Successfully connected to ${getPlatformName(platform)}!`);
    return true;
    
  } catch (err) {
    console.error('Error in handleOAuthCallback:', err);
    toast.error(`Failed to complete authentication with ${getPlatformName(platform)}`);
    return false;
  }
};

// Connect WordPress self-hosted site
export const connectWordPressSelfHosted = async (
  siteUrl: string, 
  username: string, 
  applicationPassword: string
): Promise<boolean> => {
  try {
    // Make sure the user is logged in
    const { data: userSession } = await supabase.auth.getSession();
    const userId = userSession.session?.user.id;
    
    if (!userId) {
      toast.error("You must be logged in to connect platforms");
      return false;
    }
    
    // Call the WordPress connection edge function
    const { data, error } = await supabase.functions.invoke('connect-wordpress-self-hosted', {
      body: { 
        userId,
        siteUrl,
        username,
        applicationPassword
      }
    });
    
    if (error) {
      console.error("WordPress connection error:", error);
      throw error;
    }
    
    if (!data || !data.success) {
      throw new Error(data?.message || "Failed to connect to WordPress site");
    }
    
    toast.success(`Successfully connected to WordPress site at ${siteUrl}`);
    return true;
    
  } catch (err) {
    console.error('Error connecting WordPress site:', err);
    toast.error(`Failed to connect WordPress site: ${err instanceof Error ? err.message : 'Unknown error'}`);
    return false;
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
    
    // Revoke access tokens if needed
    const { data: platform } = await supabase
      .from('social_platforms')
      .select('access_token, refresh_token')
      .eq('platform_id', platformId)
      .eq('user_id', userId)
      .single();
    
    if (platform && platform.access_token) {
      // Call the edge function to revoke the token
      await supabase.functions.invoke(`revoke-${platformId}`, {
        body: { access_token: platform.access_token }
      });
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

