
/**
 * Type definitions for social media integration
 */

export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  isConnected: boolean;
  accountName?: string | null;
  lastSync?: string | null;
  userId?: string | null;
}

export interface PlatformSettings {
  notifications: {
    mentions: boolean;
    messages: boolean;
    comments?: boolean;
  };
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  autoPublish?: boolean;
}

export interface ScheduledPost {
  id: string;
  title: string;
  content: string;
  scheduledFor: string;
  platforms: string[];
}

export interface Mention {
  id: string;
  platform: string;
  username: string;
  timeAgo: string;
  content: string;
}
