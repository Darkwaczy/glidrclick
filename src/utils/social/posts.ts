
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
    
    // Create a post in Supabase
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        title: title || 'Untitled Post',
        content,
        status: 'published',
        published_at: new Date().toISOString(),
        user_id: user.user.id,
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
        platformMap[platform.name.toLowerCase()] = platform.platform_id;
      });
    }
    
    // Create post_platform relations for each selected platform
    for (const platformName of platforms) {
      // Handle 'all' case by using all available platform IDs
      const platformsToUse = platformName.toLowerCase() === 'all' 
        ? connectedPlatforms?.map(p => p.platform_id) || [] 
        : [platformMap[platformName.toLowerCase()]];
        
      for (const platformId of platformsToUse) {
        if (!platformId) {
          console.warn(`Platform not found or not connected: ${platformName}`);
          continue;
        }
        
        const { error: platformError } = await supabase
          .from('post_platforms')
          .insert({
            post_id: post.id,
            platform_id: platformId,
            status: 'scheduled'
          });
          
        if (platformError) {
          console.error(`Error connecting post to platform ${platformName}:`, platformError);
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
      .select('*, post_platforms(*, platforms:platform_id(name))')
      .eq('user_id', user.user.id)
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
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user?.id) {
      return [];
    }
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*, post_platforms(*, platforms:platform_id(name))')
      .eq('user_id', user.user.id)
      .eq('status', 'published')
      .order('published_at', { ascending: false });
      
    if (error) throw error;
    
    return posts || [];
  } catch (error) {
    console.error('Error getting published posts:', error);
    return [];
  }
};
