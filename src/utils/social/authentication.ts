
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getCurrentUserId } from './helpers';
import { getPlatformName } from './helpers';

/**
 * Handle OAuth callback for various platforms
 * @param platform The platform ID (e.g., 'facebook', 'instagram')
 * @param code The authorization code from the OAuth provider
 */
export const handleOAuthCallback = async (platform: string, code: string): Promise<boolean> => {
  try {
    if (!code) {
      throw new Error("No authorization code provided");
    }
    
    // Get current user
    const userId = await getCurrentUserId();
    
    if (!userId) {
      toast.error('You must be logged in to connect platforms');
      return false;
    }
    
    const redirectUri = `${window.location.origin}/dashboard/social`;
    
    // Exchange authorization code for access token
    const response = await fetch(`${window.location.origin}/api/oauth-${platform}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, redirect_uri: redirectUri })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to exchange token: ${errorText}`);
    }
    
    const data = await response.json();
    
    // Insert or update platform in database
    const { error } = await supabase
      .from('social_platforms')
      .upsert({
        user_id: userId,
        platform_id: platform,
        name: getPlatformName(platform),
        account_name: data.account_name || `@user_${data.user_id}`,
        access_token: data.access_token,
        token_expires_at: data.expires_in ? new Date(Date.now() + data.expires_in * 1000).toISOString() : null,
        refresh_token: data.refresh_token || null,
        platform_user_id: data.user_id,
        is_connected: true,
        icon: platform,
        last_sync: new Date().toISOString(),
        sync_frequency: 'daily',
        notifications: { mentions: true, messages: true }
      });
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`Error handling OAuth callback for ${platform}:`, error);
    toast.error(`Failed to connect to ${platform}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

/**
 * Generic function to handle different OAuth flows
 * @param platform The platform to connect to
 */
export const connectWithOAuth = async (platform: string): Promise<void> => {
  // This is the URL that the OAuth provider will redirect back to
  const redirectUri = `${window.location.origin}/dashboard/social`;
  
  // Generate a random state to prevent CSRF attacks
  const state = Math.random().toString(36).substring(2, 15);
  localStorage.setItem('oauth_state', state);
  
  // Facebook OAuth URL
  if (platform === 'facebook') {
    const fbAppId = '1315958822809269'; // Your Facebook App ID
    const fbOAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${fbAppId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=pages_show_list,pages_read_engagement,pages_manage_posts,pages_manage_metadata,public_profile`;
    window.location.href = fbOAuthUrl;
  }
  // Instagram OAuth URL (uses Facebook's OAuth)
  else if (platform === 'instagram') {
    const igAppId = '1315958822809269'; // Your Facebook App ID
    const igOAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${igAppId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}&scope=instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement`;
    window.location.href = igOAuthUrl;
  }
  // Add more platforms as needed
  else {
    toast.error(`Connection to ${platform} is not implemented`);
  }
};
