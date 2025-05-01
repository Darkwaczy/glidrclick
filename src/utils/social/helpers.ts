
import { supabase } from '@/integrations/supabase/client';

// Get the current user ID from Supabase auth
export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Get platform name from platform ID
export const getPlatformName = (platformId: string): string => {
  const platforms: Record<string, string> = {
    'facebook': 'Facebook',
    'instagram': 'Instagram',
    'twitter': 'Twitter',
    'linkedin': 'LinkedIn',
    'wordpress': 'WordPress',
    'wordpress_self': 'WordPress (Self-hosted)',
    'medium': 'Medium',
    'pinterest': 'Pinterest',
    'tiktok': 'TikTok'
  };
  
  return platforms[platformId] || platformId;
};

// Get platform documentation URL
export const getPlatformDocUrl = (platformId: string): string => {
  const docUrls: Record<string, string> = {
    'facebook': 'https://developers.facebook.com/docs/',
    'instagram': 'https://developers.facebook.com/docs/instagram-api/',
    'twitter': 'https://developer.twitter.com/en/docs',
    'linkedin': 'https://docs.microsoft.com/en-us/linkedin/',
    'wordpress': 'https://developer.wordpress.org/rest-api/',
    'wordpress_self': 'https://developer.wordpress.org/rest-api/'
  };
  
  return docUrls[platformId] || '#';
};

// Get platform OAuth configuration
export const getPlatformOAuthConfig = (platformId: string): Record<string, string> => {
  const configs: Record<string, Record<string, string>> = {
    'facebook': {
      scope: 'pages_show_list,pages_read_engagement,pages_manage_posts,public_profile',
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth'
    },
    'instagram': {
      scope: 'instagram_basic,instagram_content_publish,pages_show_list',
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth'
    },
    'twitter': {
      scope: 'tweet.read,tweet.write,users.read',
      authUrl: 'https://twitter.com/i/oauth2/authorize'
    },
    'linkedin': {
      scope: 'r_liteprofile,r_emailaddress,w_member_social',
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization'
    }
  };
  
  return configs[platformId] || {};
};
