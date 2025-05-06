
/**
 * Helper functions for social media integration
 */

/**
 * Get platform name from ID
 * @param platformId The platform ID
 * @returns The formatted platform name
 */
export const getPlatformName = (platformId: string): string => {
  const platforms: Record<string, string> = {
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'linkedin': 'LinkedIn',
    'instagram': 'Instagram',
    'pinterest': 'Pinterest',
    'wordpress': 'WordPress',
  };
  
  return platforms[platformId] || platformId.charAt(0).toUpperCase() + platformId.slice(1);
};

/**
 * Format date for display
 * @param date Date string
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString();
};

/**
 * Get current user ID from Supabase auth
 * @returns User ID or null if not authenticated
 */
export const getCurrentUserId = async () => {
  const { supabase } = await import('@/integrations/supabase/client');
  const { data } = await supabase.auth.getUser();
  return data?.user?.id || null;
};

/**
 * Get platform documentation URL
 * @param platformId The platform ID (e.g., 'facebook', 'wordpress')
 * @returns URL to the platform documentation
 */
export const getPlatformDocUrl = (platformId: string): string => {
  const docUrls: Record<string, string> = {
    'facebook': 'https://developers.facebook.com/docs/pages/',
    'instagram': 'https://developers.facebook.com/docs/instagram-api/',
    'twitter': 'https://developer.twitter.com/en/docs',
    'linkedin': 'https://developer.linkedin.com/docs',
    'wordpress': 'https://developer.wordpress.org/rest-api/',
  };
  
  return docUrls[platformId] || '#';
};

/**
 * Get OAuth configuration for a platform
 * @param platformId The platform ID
 * @returns OAuth configuration object
 */
export const getPlatformOAuthConfig = (platformId: string) => {
  const configs: Record<string, any> = {
    'facebook': {
      appId: '1315958822809269',
      scopes: 'pages_show_list,pages_read_engagement,pages_manage_posts',
    },
    'instagram': {
      appId: '1315958822809269',
      scopes: 'instagram_basic,instagram_content_publish,pages_show_list',
    },
    'wordpress': {
      clientId: process.env.WORDPRESS_CLIENT_ID || '',
      redirectUri: `${window.location.origin}/dashboard/social`,
    }
  };
  
  return configs[platformId] || {};
};
