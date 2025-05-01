
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getCurrentUserId } from './helpers';

/**
 * Handle OAuth callback from social platforms
 * @param platform The platform name (facebook, twitter, etc.)
 * @param code The authorization code from the OAuth process
 */
export const handleOAuthCallback = async (platform: string, code: string): Promise<boolean> => {
  try {
    // Determine which endpoint to call based on platform
    const endpoint = `oauth-${platform.toLowerCase()}`;
    const redirect_uri = window.location.origin + window.location.pathname;
    
    // Call appropriate supabase edge function to exchange code for token
    const { data, error } = await supabase.functions.invoke(endpoint, {
      body: { code, redirect_uri }
    });
    
    if (error) throw error;
    if (!data || data.error) throw new Error(data?.error || 'Failed to authenticate');
    
    // Get user ID
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    // Save connection to database
    const { error: insertError } = await supabase
      .from('social_platforms')
      .insert({
        platform_id: platform.toLowerCase(),
        user_id: userId,
        access_token: data.access_token,
        refresh_token: data.refresh_token || null,
        token_expires_at: data.expires_in ? 
          new Date(Date.now() + data.expires_in * 1000).toISOString() : null,
        account_name: data.account_name || data.user_id,
        is_connected: true,
        name: platform.charAt(0).toUpperCase() + platform.slice(1),
        icon: platform.toLowerCase()
      });
      
    if (insertError) throw insertError;
    
    toast.success(`Successfully connected to ${platform}`);
    return true;
  } catch (error) {
    console.error(`Error handling ${platform} callback:`, error);
    toast.error(`Failed to connect to ${platform}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

/**
 * Connect with OAuth
 * @param platform The platform to connect to
 */
export const connectWithOAuth = async (platform: string): Promise<boolean> => {
  try {
    const platformConfig = getPlatformConfig(platform);
    
    if (!platformConfig) {
      throw new Error(`Configuration for ${platform} not found`);
    }
    
    // Build authorization URL
    const state = generateRandomString(16);
    const redirect_uri = window.location.origin + window.location.pathname;
    
    // Store state to verify when returning
    sessionStorage.setItem('oauth_state', state);
    
    // Build OAuth URL
    const url = new URL(platformConfig.authUrl);
    url.searchParams.append('client_id', platformConfig.clientId);
    url.searchParams.append('redirect_uri', redirect_uri);
    url.searchParams.append('state', state);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', platformConfig.scope);
    
    // Redirect to authorization URL
    window.location.href = url.toString();
    return true;
  } catch (error) {
    console.error(`Error connecting to ${platform}:`, error);
    toast.error(`Failed to connect to ${platform}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

/**
 * Connect to WordPress with username and password (non-OAuth)
 */
export const connectWordPressSelfHosted = async (siteUrl: string, username: string, password: string): Promise<boolean> => {
  try {
    // Get user ID
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }
    
    // We would normally validate the credentials with the WordPress site
    // For now, let's just save the connection
    
    // Normalize URL
    let normalizedUrl = siteUrl;
    if (!normalizedUrl.startsWith('http')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }
    if (!normalizedUrl.endsWith('/')) {
      normalizedUrl += '/';
    }
    
    // Save connection to database
    const { error } = await supabase
      .from('social_platforms')
      .insert({
        platform_id: 'wordpress_self',
        user_id: userId,
        // Encrypt password in a real app
        access_token: `Basic ${btoa(`${username}:${password}`)}`,
        account_name: `${normalizedUrl} (${username})`,
        is_connected: true,
        name: 'WordPress (Self-hosted)',
        icon: 'wordpress'
      });
      
    if (error) throw error;
    
    toast.success('Successfully connected to WordPress site');
    return true;
  } catch (error) {
    console.error('Error connecting to WordPress:', error);
    toast.error(`Failed to connect to WordPress: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

// Helper functions

/**
 * Get OAuth configuration for a platform
 */
const getPlatformConfig = (platform: string): {
  clientId: string;
  authUrl: string;
  scope: string;
} | undefined => {
  const configs: Record<string, {
    clientId: string;
    authUrl: string;
    scope: string;
  }> = {
    facebook: {
      clientId: '1315958822809269',
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      scope: 'pages_show_list,pages_read_engagement,pages_manage_posts,public_profile'
    },
    twitter: {
      clientId: 'YOUR_TWITTER_CLIENT_ID',
      authUrl: 'https://twitter.com/i/oauth2/authorize',
      scope: 'tweet.read,tweet.write,users.read'
    },
    linkedin: {
      clientId: 'YOUR_LINKEDIN_CLIENT_ID',
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
      scope: 'r_liteprofile,r_emailaddress,w_member_social'
    }
  };
  
  return configs[platform.toLowerCase()];
};

/**
 * Generate random string for state parameter
 */
const generateRandomString = (length: number): string => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
};
