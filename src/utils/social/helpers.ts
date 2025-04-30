
/**
 * Get the display name of a social media platform
 * @param platformId The ID of the platform
 * @returns The display name of the platform
 */
export const getPlatformName = (platformId: string): string => {
  const platforms: Record<string, string> = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
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
