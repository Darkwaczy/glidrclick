
import { supabase } from '@/integrations/supabase/client';

// Get current user ID
export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const { data } = await supabase.auth.getUser();
    return data?.user?.id || null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};

// Get platform name from ID
export const getPlatformName = (platformId: string): string => {
  const platforms = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    twitter: 'Twitter',
    x: 'X',
    linkedin: 'LinkedIn',
    wordpress: 'WordPress',
    'wordpress-self': 'WordPress Self-hosted'
  };
  
  return platforms[platformId as keyof typeof platforms] || platformId;
};

// Get platform documentation URL
export const getPlatformDocUrl = (platformId: string): string => {
  const docs = {
    facebook: 'https://developers.facebook.com/docs/facebook-login/',
    instagram: 'https://developers.facebook.com/docs/instagram-api/',
    twitter: 'https://developer.twitter.com/en/docs/authentication/guides/log-in-with-twitter',
    x: 'https://developer.twitter.com/en/docs/authentication/guides/log-in-with-twitter',
    linkedin: 'https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fconsumer%2Fcontext',
    wordpress: 'https://developer.wordpress.com/docs/oauth2/',
    'wordpress-self': 'https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/'
  };
  
  return docs[platformId as keyof typeof docs] || '#';
};

// Get platform OAuth configuration
export const getPlatformOAuthConfig = (platform: string): any => {
  const configs = {
    facebook: {
      clientId: '123456789012345',
      authorizationUrl: 'https://www.facebook.com/v12.0/dialog/oauth',
      redirectUri: `${window.location.origin}/dashboard/social?connected=facebook`,
      scope: ['public_profile', 'email', 'pages_show_list', 'pages_read_engagement', 'pages_manage_posts']
    },
    instagram: {
      clientId: '123456789012345',
      authorizationUrl: 'https://api.instagram.com/oauth/authorize',
      redirectUri: `${window.location.origin}/dashboard/social?connected=instagram`,
      scope: ['user_profile', 'user_media']
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID,
      authorizationUrl: 'https://twitter.com/i/oauth2/authorize',
      redirectUri: `${window.location.origin}/dashboard/social?connected=twitter`,
      scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access']
    },
    x: {
      clientId: process.env.TWITTER_CLIENT_ID,
      authorizationUrl: 'https://twitter.com/i/oauth2/authorize',
      redirectUri: `${window.location.origin}/dashboard/social?connected=twitter`,
      scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access']
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID,
      authorizationUrl: 'https://www.linkedin.com/oauth/v2/authorization',
      redirectUri: `${window.location.origin}/dashboard/social?connected=linkedin`,
      scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social']
    },
    wordpress: {
      clientId: process.env.WORDPRESS_CLIENT_ID,
      authorizationUrl: 'https://public-api.wordpress.com/oauth2/authorize',
      redirectUri: `${window.location.origin}/dashboard/social?connected=wordpress`,
      scope: ['global']
    }
  };
  
  return configs[platform as keyof typeof configs];
};

// Format social account for display
export const formatSocialAccount = (platform: any): string => {
  if (!platform || !platform.isConnected) return 'Not connected';
  
  return platform.accountName || `@${platform.id}_user`;
};
