
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
  const supportedPlatforms = ['facebook', 'instagram', 'linkedin', 'wordpress'];
  return supportedPlatforms.includes(platformId);
};

