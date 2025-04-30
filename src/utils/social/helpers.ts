
/**
 * Get the display name of a social media platform
 * @param platformId The ID of the platform
 * @returns The display name of the platform
 */
export const getPlatformName = (platformId: string): string => {
  const platforms: Record<string, string> = {
    facebook: 'Facebook',
    twitter: 'Twitter (coming soon)',
    instagram: 'Instagram',
    linkedin: 'LinkedIn (coming soon)',
    wordpress: 'WordPress Blog'
  };
  
  return platforms[platformId] || platformId;
};

/**
 * Check if a platform is supported for authentication
 * @param platformId The ID of the platform
 * @returns Whether the platform is supported
 */
export const isPlatformSupported = (platformId: string): boolean => {
  // Currently supported platforms
  const supportedPlatforms: string[] = ['facebook', 'instagram', 'wordpress'];
  return supportedPlatforms.includes(platformId);
};

/**
 * Get more detailed information about a platform's support status
 * @param platformId The ID of the platform
 * @returns Status object with availability info
 */
export const getPlatformStatus = (platformId: string) => {
  const statusMap: Record<string, { status: 'available' | 'coming-soon' | 'not-configured', message: string }> = {
    facebook: { status: 'available', message: 'Connect your Facebook page to manage posts and comments' },
    instagram: { status: 'available', message: 'Connect Instagram to manage posts and engage with followers' },
    wordpress: { status: 'available', message: 'Connect your WordPress blog to publish content' },
    twitter: { status: 'coming-soon', message: 'Twitter integration coming soon' },
    linkedin: { status: 'coming-soon', message: 'Coming soon' }
  };
  
  return statusMap[platformId] || { status: 'not-configured', message: 'Not configured' };
};

/**
 * Get URL for platform documentation
 * @param platformId The ID of the platform
 * @returns URL to documentation for platform setup
 */
export const getPlatformDocUrl = (platformId: string): string => {
  const urlMap: Record<string, string> = {
    facebook: 'https://developers.facebook.com/docs/pages/',
    instagram: 'https://developers.facebook.com/docs/instagram-api/',
    wordpress: 'https://developer.wordpress.org/rest-api/',
    twitter: 'https://developer.twitter.com/en/docs/twitter-api',
  };
  
  return urlMap[platformId] || '#';
};

/**
 * Get OAuth application configuration for platforms
 * @param platformId The ID of the platform
 * @returns OAuth app configuration
 */
export const getPlatformOAuthConfig = (platformId: string) => {
  // Hardcoded configuration instead of using process.env which is not available in browser
  const config: Record<string, { clientId: string, scopes: string[] }> = {
    facebook: { 
      clientId: '958890536078118', 
      scopes: ['pages_read_engagement', 'pages_manage_posts', 'public_profile'] 
    },
    instagram: { 
      clientId: '958890536078118', // Same as Facebook since Instagram uses Facebook's API
      scopes: ['instagram_basic', 'instagram_content_publish', 'pages_show_list'] 
    },
    wordpress: { 
      clientId: 'your-wordpress-client-id', // This should be replaced with actual WordPress client ID
      scopes: ['global'] 
    }
  };
  
  return config[platformId] || { clientId: '', scopes: [] };
};
