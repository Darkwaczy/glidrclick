
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
      // Get platform connection
      const { data: platform, error: platformError } = await supabase
        .from('social_platforms')
        .select('*')
        .eq('platform_id', platformId)
        .eq('is_connected', true)
        .single();

      if (platformError || !platform) {
        return {
          success: false,
          error: `Platform ${platformId} not connected or not found`,
        };
      }

      // Simulate publishing to different platforms
      const publishResult = await this.simulatePublish(platformId, content, title, imageUrl);

      // Update post_platforms table
      const { error: updateError } = await supabase
        .from('post_platforms')
        .upsert({
          post_id: postId,
          platform_id: platformId,
          user_id: platform.user_id,
          status: publishResult.success ? 'published' : 'failed',
          published_at: publishResult.success ? new Date().toISOString() : null,
          platform_post_id: publishResult.platformPostId,
          error_message: publishResult.error,
        });

      if (updateError) {
        console.error('Error updating post platform status:', updateError);
      }

      return publishResult;
    } catch (error) {
      console.error(`Error publishing to ${platformId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  async simulatePublish(
    platformId: string,
    content: string,
    title?: string,
    imageUrl?: string
  ): Promise<PublishResult> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simulate success/failure (90% success rate)
    const success = Math.random() > 0.1;

    if (success) {
      return {
        success: true,
        platformPostId: `${platformId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };
    } else {
      return {
        success: false,
        error: `Failed to publish to ${platformId}: API rate limit exceeded`,
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
          await new Promise(resolve => setTimeout(resolve, 500));
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
    // This would integrate with actual social media APIs to get analytics
    // For now, return mock data
    return {
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      shares: Math.floor(Math.random() * 25),
      clicks: Math.floor(Math.random() * 75),
    };
  },
};
