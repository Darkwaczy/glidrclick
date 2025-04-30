
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getPlatformName } from "./helpers";

export const publishToSocialMedia = async (
  platformId: string,
  content: string,
  title?: string
): Promise<boolean> => {
  try {
    // Get the user ID
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user?.id) {
      toast.error('You must be logged in to publish content');
      return false;
    }
    
    // Get platform details including access token
    const { data: platform, error: platformError } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('platform_id', platformId)
      .eq('user_id', user.user.id)
      .single();
      
    if (platformError || !platform) {
      toast.error(`Platform ${getPlatformName(platformId)} not found or not connected`);
      return false;
    }
    
    // Create a post record first
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        title: title || 'Untitled Post',
        content,
        status: 'publishing',
        user_id: user.user.id,
        type: 'social'
      })
      .select()
      .single();
      
    if (postError) throw postError;
    
    // Call the appropriate edge function to publish based on platform
    const { data: publishResult, error: publishError } = await supabase.functions.invoke(`publish-${platformId}`, {
      body: { 
        postId: post.id,
        content,
        title,
        accessToken: platform.access_token,
        refreshToken: platform.refresh_token,
        platformSpecificData: platform
      }
    });
    
    if (publishError) throw publishError;
    
    if (!publishResult?.success) {
      throw new Error(publishResult?.message || 'Publishing failed');
    }
    
    // Update post status to published
    await supabase
      .from('posts')
      .update({
        status: 'published',
        published_at: new Date().toISOString()
      })
      .eq('id', post.id);
    
    // Create post_platform relation
    await supabase
      .from('post_platforms')
      .insert({
        post_id: post.id,
        platform_id: platformId,
        status: 'published',
        external_post_id: publishResult.externalPostId || null
      });
    
    toast.success(`Published to ${getPlatformName(platformId)}`);
    return true;
  } catch (error) {
    console.error(`Error publishing to ${platformId}:`, error);
    toast.error(`Failed to publish to ${getPlatformName(platformId)}`);
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
    // Get the user ID
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user?.id) {
      toast.error('You must be logged in to schedule posts');
      return false;
    }
    
    // Insert into posts table
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        status: 'scheduled',
        scheduled_for: scheduledDate.toISOString(),
        user_id: user.user.id,
        type: 'social'
      })
      .select()
      .single();
      
    if (postError) throw postError;
    
    // Get available platform information from the social_platforms table
    const { data: connectedPlatforms, error: platformsError } = await supabase
      .from('social_platforms')
      .select('platform_id, name')
      .eq('user_id', user.user.id)
      .eq('is_connected', true);
      
    if (platformsError) {
      console.error("Error fetching platforms:", platformsError);
      throw platformsError;
    }
    
    // Create a mapping of platform names to platform_ids
    const platformMap: Record<string, string> = {};
    if (connectedPlatforms && connectedPlatforms.length > 0) {
      connectedPlatforms.forEach(platform => {
        platformMap[platform.platform_id.toLowerCase()] = platform.platform_id;
      });
    }
    
    // Create post_platform relations for each selected platform
    for (const platformId of platforms) {
      // Handle 'all' case by using all available platform IDs
      const platformsToUse = platformId.toLowerCase() === 'all' 
        ? connectedPlatforms?.map(p => p.platform_id) || [] 
        : [platformMap[platformId.toLowerCase()] || platformId];
        
      for (const actualPlatformId of platformsToUse) {
        if (!actualPlatformId) {
          console.warn(`Platform not found or not connected: ${platformId}`);
          continue;
        }
        
        const { error: platformError } = await supabase
          .from('post_platforms')
          .insert({
            post_id: post.id,
            platform_id: actualPlatformId,
            status: 'scheduled'
          });
          
        if (platformError) {
          console.error(`Error connecting post to platform ${platformId}:`, platformError);
          throw platformError;
        }
      }
    }
    
    toast.success('Post scheduled successfully!');
    return true;
  } catch (error) {
    console.error('Error scheduling post:', error);
    toast.error('Failed to schedule post. Please try again.');
    return false;
  }
};

export const getScheduledPosts = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user?.id) {
      return [];
    }
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, post_platforms(*, social_platforms:platform_id(name))')
      .eq('user_id', user.user.id)
      .eq('status', 'scheduled')
      .order('scheduled_for', { ascending: true });
      
    if (error) throw error;
    
    return posts?.map(post => ({
      ...post,
      platforms: post.post_platforms?.map((pp: any) => pp.social_platforms?.name || pp.platform_id) || []
    })) || [];
  } catch (error) {
    console.error('Error getting scheduled posts:', error);
    return [];
  }
};

export const getPublishedPosts = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user?.id) {
      return [];
    }
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, post_platforms(*, social_platforms:platform_id(name))')
      .eq('user_id', user.user.id)
      .eq('status', 'published')
      .order('published_at', { ascending: false });
      
    if (error) throw error;
    
    return posts?.map(post => ({
      ...post,
      platforms: post.post_platforms?.map((pp: any) => pp.social_platforms?.name || pp.platform_id) || []
    })) || [];
  } catch (error) {
    console.error('Error getting published posts:', error);
    return [];
  }
};
