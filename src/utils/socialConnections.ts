
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/integrations/supabase/client";

export type SocialPlatform = {
  id: string;
  name: string;
  icon: "facebook" | "twitter" | "instagram" | "linkedin" | "wordpress";
  isConnected: boolean;
  accountName?: string;
  lastSync?: string;
  syncFrequency?: "realtime" | "hourly" | "daily";
  notifications?: {
    mentions: boolean;
    messages: boolean;
  };
};

// API base URL - changed to use Supabase for real authentication
const API_BASE_URL = "http://localhost:5000/api";

// Store platforms in memory so they persist during the session
let mockScheduledPosts: any[] = [];
let mockPublishedPosts: any[] = [];

export const getSocialPlatforms = async (): Promise<SocialPlatform[]> => {
  try {
    // Try to get platforms from Supabase first
    const { data: socialPlatforms, error } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('user_id', supabase.auth.getSession().then(res => res.data.session?.user.id));
    
    if (error) throw error;
    
    if (socialPlatforms && socialPlatforms.length > 0) {
      return socialPlatforms;
    }
    
    // If no platforms are returned, return default platforms list
    return [
      { id: "facebook", name: "Facebook", icon: "facebook", isConnected: false },
      { id: "instagram", name: "Instagram", icon: "instagram", isConnected: false },
      { id: "wordpress", name: "WordPress Blog", icon: "wordpress", isConnected: false }
    ];
  } catch (error) {
    console.error("Error fetching social platforms:", error);
    
    // Return default platforms on error
    return [
      { id: "facebook", name: "Facebook", icon: "facebook", isConnected: false },
      { id: "instagram", name: "Instagram", icon: "instagram", isConnected: false },
      { id: "wordpress", name: "WordPress Blog", icon: "wordpress", isConnected: false }
    ];
  }
};

export const connectPlatform = (platformId: string): void => {
  // Configure OAuth providers based on platform
  const authProviders: Record<string, string> = {
    facebook: 'facebook',
    instagram: 'instagram',
    wordpress: 'github' // Using GitHub as a proxy for WordPress OAuth
  };
  
  if (!authProviders[platformId]) {
    toast.error(`${getPlatformName(platformId)} authentication is not available yet`);
    return;
  }

  // Use Supabase OAuth for authentication
  supabase.auth.signInWithOAuth({
    provider: authProviders[platformId] as any,
    options: {
      redirectTo: `${window.location.origin}/dashboard/social?connected=${platformId}`,
      // Store the social platform connection in the session
      queryParams: {
        platform: platformId
      }
    }
  })
  .then(({ error }) => {
    if (error) {
      console.error('Error connecting platform:', error);
      toast.error(`Failed to connect to ${platformId}`);
    }
  });
};

export const disconnectPlatform = async (platformId: string): Promise<boolean> => {
  try {
    // Remove from Supabase
    const { error } = await supabase
      .from('social_platforms')
      .delete()
      .eq('platform_id', platformId)
      .eq('user_id', supabase.auth.getSession().then(res => res.data.session?.user.id));
    
    if (error) throw error;
    
    toast.success(`Disconnected from ${getPlatformName(platformId)}`);
    return true;
  } catch (error) {
    console.error("Error disconnecting platform:", error);
    toast.error(`Failed to disconnect from ${platformId}`);
    return false;
  }
};

export const updatePlatformSettings = async (
  platformId: string, 
  settings: Partial<SocialPlatform>
): Promise<boolean> => {
  try {
    // Update settings in Supabase
    const { error } = await supabase
      .from('social_platforms')
      .update(settings)
      .eq('platform_id', platformId)
      .eq('user_id', supabase.auth.getSession().then(res => res.data.session?.user.id));
    
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error updating platform settings:", error);
    toast.error("Failed to update settings");
    return false;
  }
};

export const publishToSocialMedia = async (
  platformId: string,
  content: string,
  title?: string
): Promise<boolean> => {
  try {
    // Create a post in Supabase
    const user = await supabase.auth.getUser();
    
    if (!user.data?.user?.id) {
      toast.error('You must be logged in to publish content');
      return false;
    }
    
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        title: title || 'Untitled Post',
        content,
        status: 'published',
        published_at: new Date().toISOString(),
        user_id: user.data.user.id,
        type: 'social'
      })
      .select()
      .single();
      
    if (postError) throw postError;
    
    // Create post_platform relation
    const { error: platformError } = await supabase
      .from('post_platforms')
      .insert({
        post_id: post.id,
        platform_id: platformId,
        status: 'published'
      });
      
    if (platformError) throw platformError;
    
    toast.success(`Published to ${getPlatformName(platformId)}`);
    return true;
  } catch (error) {
    console.error(`Error publishing to ${platformId}:`, error);
    toast.error(`Failed to publish to ${platformId}`);
    return false;
  }
};

export const schedulePost = async (
  title: string,
  content: string,
  platforms: string[],
  scheduledDate: Date
): Promise<boolean> => {
  try {
    // Insert into posts table
    const user = await supabase.auth.getUser();
    
    if (!user.data?.user?.id) {
      toast.error('You must be logged in to schedule posts');
      return false;
    }
    
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        status: 'scheduled',
        scheduled_for: scheduledDate.toISOString(),
        user_id: user.data.user.id,
        type: 'social'
      })
      .select()
      .single();
      
    if (postError) throw postError;
    
    // Create post_platform relations for each platform
    for (const platformId of platforms) {
      const { error: platformError } = await supabase
        .from('post_platforms')
        .insert({
          post_id: post.id,
          platform_id: platformId,
          status: 'scheduled'
        });
        
      if (platformError) throw platformError;
    }
    
    return true;
  } catch (error) {
    console.error('Error scheduling post:', error);
    toast.error('Failed to schedule post');
    return false;
  }
};

export const getScheduledPosts = async () => {
  try {
    const user = await supabase.auth.getUser();
    
    if (!user.data?.user?.id) {
      return [];
    }
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, post_platforms(*, platforms:platform_id(name))')
      .eq('user_id', user.data.user.id)
      .eq('status', 'scheduled')
      .order('scheduled_for', { ascending: true });
      
    if (error) throw error;
    
    return posts || [];
  } catch (error) {
    console.error('Error getting scheduled posts:', error);
    return [];
  }
};

export const getPublishedPosts = async () => {
  try {
    const user = await supabase.auth.getUser();
    
    if (!user.data?.user?.id) {
      return [];
    }
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, post_platforms(*, platforms:platform_id(name))')
      .eq('user_id', user.data.user.id)
      .eq('status', 'published')
      .order('published_at', { ascending: false });
      
    if (error) throw error;
    
    return posts || [];
  } catch (error) {
    console.error('Error getting published posts:', error);
    return [];
  }
};

// Helper function to get platform name
const getPlatformName = (platformId: string): string => {
  const platforms: Record<string, string> = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    wordpress: 'WordPress Blog'
  };
  
  return platforms[platformId] || platformId;
};
