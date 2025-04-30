
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
  // Currently, only Facebook is configured in the Supabase project
  const supportedPlatforms = ['facebook'];
  return supportedPlatforms.includes(platformId);
};

/**
 * Get more detailed information about a platform's support status
 * @param platformId The ID of the platform
 * @returns Status object with availability info
 */
export const getPlatformStatus = (platformId: string) => {
  const statusMap: Record<string, { status: 'available' | 'coming-soon' | 'not-configured', message: string }> = {
    facebook: { status: 'available', message: 'Ready to connect' },
    instagram: { status: 'not-configured', message: 'Instagram provider is not enabled in this project' },
    wordpress: { status: 'not-configured', message: 'WordPress provider is not enabled in this project' },
    twitter: { status: 'coming-soon', message: 'Coming soon' },
    linkedin: { status: 'coming-soon', message: 'Coming soon' }
  };
  
  return statusMap[platformId] || { status: 'not-configured', message: 'Not configured' };
};
