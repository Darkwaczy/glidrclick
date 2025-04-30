
// Export all functionality from the social modules
export * from './types';
export * from './platforms';
export * from './authentication';
export * from './posts';
export * from './helpers';

// Default export all utilities
export default {
  // Platform management
  getSocialPlatforms: async () => {
    const { getSocialPlatforms } = await import('./platforms');
    return getSocialPlatforms();
  },
  connectPlatform: async (platformId: string) => {
    const { connectPlatform } = await import('./platforms');
    return connectPlatform(platformId);
  },
  disconnectPlatform: async (platformId: string) => {
    const { disconnectPlatform } = await import('./platforms');
    return disconnectPlatform(platformId);
  },
  updatePlatformSettings: async (platformId: string, settings: any) => {
    const { updatePlatformSettings } = await import('./platforms');
    return updatePlatformSettings(platformId, settings);
  },
  
  // Authentication
  handleOAuthCallback: async (platform: string, code: string) => {
    const { handleOAuthCallback } = await import('./authentication');
    return handleOAuthCallback(platform, code);
  },
  connectWithOAuth: async (platform: string) => {
    const { connectWithOAuth } = await import('./authentication');
    return connectWithOAuth(platform);
  },
  
  // Post management
  publishToSocialMedia: async (platformId: string, content: string, title?: string) => {
    const { publishToSocialMedia } = await import('./posts');
    return publishToSocialMedia(platformId, content, title);
  },
  schedulePost: async (title: string, content: string, platforms: string[], scheduledDate: Date) => {
    const { schedulePost } = await import('./posts');
    return schedulePost(title, content, platforms, scheduledDate);
  },
  getScheduledPosts: async () => {
    const { getScheduledPosts } = await import('./posts');
    return getScheduledPosts();
  },
  getPublishedPosts: async () => {
    const { getPublishedPosts } = await import('./posts');
    return getPublishedPosts();
  },
  
  // Helper functions
  getPlatformName: (platformId: string) => {
    const { getPlatformName } = require('./helpers');
    return getPlatformName(platformId);
  }
};
