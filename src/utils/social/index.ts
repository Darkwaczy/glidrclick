
// Export all functionality from the social modules
export * from './types';
export * from './helpers';
export * from './posts';

// Handle the connectPlatform conflict by explicitly re-exporting from authentication
// and renaming the platforms version
export * from './authentication';

// Export everything from platforms except connectPlatform (which would conflict)
import * as platformsModule from './platforms';
export const connectPlatformDirectly = platformsModule.connectPlatform; // Renamed export
export const { 
  disconnectPlatform, 
  updatePlatformSettings, 
  getSocialPlatforms 
} = platformsModule;

// Default export all utilities
export default {
  // Platform management
  getSocialPlatforms: async () => {
    const { getSocialPlatforms } = await import('./platforms');
    return getSocialPlatforms();
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
  connectWordPressSelfHosted: async (siteUrl: string, username: string, password: string) => {
    const { connectWordPressSelfHosted } = await import('./authentication');
    return connectWordPressSelfHosted(siteUrl, username, password);
  },
  
  // We're keeping this function but pointing it to authentication module's version
  connectPlatform: async (platformId: string) => {
    const { connectPlatform } = await import('./authentication');
    return connectPlatform(platformId);
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
  checkAndUpdatePostStatus: async () => {
    const { checkAndUpdatePostStatus } = await import('./posts');
    return checkAndUpdatePostStatus();
  },
  
  // Helper functions
  getPlatformName: (platformId: string) => {
    const { getPlatformName } = require('./helpers');
    return getPlatformName(platformId);
  },
  getPlatformDocUrl: (platformId: string) => {
    const { getPlatformDocUrl } = require('./helpers');
    return getPlatformDocUrl(platformId);
  },
  getPlatformOAuthConfig: (platform: string) => {
    const { getPlatformOAuthConfig } = require('./helpers');
    return getPlatformOAuthConfig(platform);
  }
};
