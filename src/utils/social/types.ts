
// Social Platform Types
export type SocialPlatform = {
  id: string;
  name: string;
  icon: string;
  isConnected: boolean;
  accountName: string | null;
  lastSync: string | null;
  userId: string;
};

// Social Connection Types
export interface SocialConnection {
  platformId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  userData: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
  };
}

// Post Types
export enum PostStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  FAILED = 'failed'
}

export enum PostType {
  SOCIAL = 'social',
  BLOG = 'blog'
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  status: PostStatus;
  type: PostType;
  imageUrl?: string;
  scheduledFor?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  platforms: string[];
}

// Analytics Types
export interface PostAnalytics {
  postId: string;
  platformId: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
}
