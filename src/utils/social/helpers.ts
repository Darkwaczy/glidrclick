
// Helper function to get platform name
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
