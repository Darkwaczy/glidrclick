
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface PublishResult {
  success: boolean;
  platformPostId?: string;
  error?: string;
}

export const socialMediaService = {
  async publishPost(
    postId: string,
    platformId: string,
    content: string,
    title?: string,
    imageUrl?: string
  ): Promise<PublishResult> {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return {
          success: false,
          error: 'User not authenticated',
        };
      }

      // Get platform connection
      const { data: platform, error: platformError } = await supabase
        .from('social_platforms')
        .select('*')
        .eq('platform_id', platformId)
        .eq('user_id', user.id)
        .eq('is_connected', true)
        .single();

      if (platformError || !platform) {
        return {
          success: false,
          error: `Platform ${platformId} not connected or not found`,
        };
      }

      // Call the appropriate edge function
      let functionName = '';
      switch (platformId) {
        case 'facebook':
          functionName = 'publish-facebook';
          break;
        case 'twitter':
          functionName = 'publish-twitter';
          break;
        case 'instagram':
          functionName = 'publish-instagram';
          break;
        case 'linkedin':
          functionName = 'publish-linkedin';
          break;
        default:
          return {
            success: false,
            error: `Platform ${platformId} not supported`,
          };
      }

      const { data, error } = await supabase.functions.invoke(functionName, {
        body: {
          postId,
          content,
          title,
          imageUrl,
          userId: user.id
        }
      });

      if (error) {
        console.error(`Error calling ${functionName}:`, error);
        return {
          success: false,
          error: error.message || 'Failed to publish post',
        };
      }

      return data;
    } catch (error) {
      console.error(`Error publishing to ${platformId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  async publishToMultiplePlatforms(
    postId: string,
    platforms: string[],
    content: string,
    title?: string,
    imageUrl?: string
  ): Promise<{ [platformId: string]: PublishResult }> {
    const results: { [platformId: string]: PublishResult } = {};

    // Publish to platforms sequentially to avoid rate limiting
    for (const platformId of platforms) {
      try {
        results[platformId] = await this.publishPost(postId, platformId, content, title, imageUrl);
        
        // Add delay between publishes
        if (platforms.indexOf(platformId) < platforms.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        results[platformId] = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }

    return results;
  },

  async schedulePost(
    postId: string,
    platforms: string[],
    scheduledTime: Date
  ): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('User not authenticated');
        return false;
      }

      // Update post status to scheduled
      const { error: postError } = await supabase
        .from('posts')
        .update({
          status: 'scheduled',
          scheduled_for: scheduledTime.toISOString(),
        })
        .eq('id', postId);

      if (postError) throw postError;

      // Create platform entries for scheduled post
      const platformEntries = platforms.map(platformId => ({
        post_id: postId,
        platform_id: platformId,
        user_id: user.id,
        status: 'pending',
      }));

      const { error: platformError } = await supabase
        .from('post_platforms')
        .upsert(platformEntries);

      if (platformError) throw platformError;

      toast.success('Post scheduled successfully');
      return true;
    } catch (error) {
      console.error('Error scheduling post:', error);
      toast.error('Failed to schedule post');
      return false;
    }
  },

  async getPostAnalytics(postId: string) {
    try {
      // Get post platform data
      const { data: postPlatforms, error } = await supabase
        .from('post_platforms')
        .select('*')
        .eq('post_id', postId);

      if (error) throw error;

      // For now, return mock analytics data
      // In a real implementation, you would call the actual social media APIs
      const analytics = {
        views: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
        clicks: Math.floor(Math.random() * 200),
        platforms: postPlatforms?.map(pp => ({
          platform: pp.platform_id,
          status: pp.status,
          publishedAt: pp.published_at,
          platformPostId: pp.platform_post_id,
        })) || []
      };

      return analytics;
    } catch (error) {
      console.error('Error fetching post analytics:', error);
      return null;
    }
  },

  async checkScheduledPosts() {
    try {
      const { error } = await supabase.functions.invoke('schedule-posts');
      
      if (error) {
        console.error('Error checking scheduled posts:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error calling schedule-posts function:', error);
      return false;
    }
  },
};
