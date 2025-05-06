
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const schedulePost = async (
  title: string,
  content: string,
  platforms: string[],
  scheduledDate: Date,
  imageUrl?: string
) => {
  try {
    // Get the current user ID
    const userResponse = await supabase.auth.getUser();
    const userId = userResponse.data.user?.id;
    
    if (!userId) {
      console.error("No user ID found");
      toast.error("Failed to schedule post. Please log in and try again.");
      return false;
    }
    
    // Create the post in the database
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        type: 'social',
        status: 'scheduled',
        scheduled_for: scheduledDate.toISOString(),
        image_url: imageUrl || null, // Add the image URL to the post data
        user_id: userId // Add the required user_id field
      })
      .select()
      .single();

    if (postError) throw postError;
    
    // Create platform-specific entries
    for (const platform of platforms) {
      const { error: platformError } = await supabase
        .from('post_platforms')
        .insert({
          post_id: post.id,
          platform_id: platform,
          status: 'pending'
        });
      
      if (platformError) throw platformError;
    }
    
    return true;
  } catch (error) {
    console.error("Error scheduling post:", error);
    return false;
  }
};

export const connectPlatform = async (platformType: string, authData: any) => {
  try {
    const userResponse = await supabase.auth.getUser();
    const userId = userResponse.data.user?.id;
    
    if (!userId) {
      console.error("No user ID found");
      toast.error(`Failed to connect ${platformType}. Please try again.`);
      return false;
    }
    
    const { error } = await supabase
      .from('social_platforms')
      .insert({
        platform_id: platformType,
        user_id: userId,
        name: platformType.charAt(0).toUpperCase() + platformType.slice(1),
        icon: platformType.toLowerCase(),
        access_token: authData.accessToken,
        refresh_token: authData.refreshToken,
        token_expires_at: authData.expiresIn ? new Date(Date.now() + authData.expiresIn * 1000).toISOString() : null,
        is_connected: true,
      });

    if (error) {
      console.error("Error connecting platform:", error);
      toast.error(`Failed to connect ${platformType}. Please try again.`);
      return false;
    }

    toast.success(`${platformType} connected successfully!`);
    return true;
  } catch (error) {
    console.error("Error connecting platform:", error);
    toast.error(`Failed to connect ${platformType}. Please try again.`);
    return false;
  }
};

export const disconnectPlatform = async (platformId: string) => {
  try {
    const { error } = await supabase
      .from('social_platforms')
      .update({
        access_token: null,
        refresh_token: null,
        token_expires_at: null,
        is_connected: false,
      })
      .eq('id', platformId);

    if (error) {
      console.error("Error disconnecting platform:", error);
      toast.error("Failed to disconnect platform. Please try again.");
      return false;
    }

    toast.success("Platform disconnected successfully.");
    return true;
  } catch (error) {
    console.error("Error disconnecting platform:", error);
    toast.error("Failed to disconnect platform. Please try again.");
    return false;
  }
};

export const getConnectedPlatforms = async () => {
  try {
    const userResponse = await supabase.auth.getUser();
    const userId = userResponse.data.user?.id;
    
    if (!userId) {
      console.error("No user ID found");
      toast.error("Failed to fetch connected platforms.");
      return [];
    }
    
    const { data, error } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('user_id', userId)
      .eq('is_connected', true);

    if (error) {
      console.error("Error fetching connected platforms:", error);
      toast.error("Failed to fetch connected platforms.");
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching connected platforms:", error);
    toast.error("Failed to fetch connected platforms.");
    return [];
  }
};

export const checkAndUpdatePostStatus = async () => {
  try {
    const { data: scheduledPosts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'scheduled')
      .lte('scheduled_for', new Date().toISOString());

    if (error) {
      console.error("Error fetching scheduled posts:", error);
      return;
    }

    if (scheduledPosts && scheduledPosts.length > 0) {
      for (const post of scheduledPosts) {
        await supabase
          .from('posts')
          .update({ status: 'published', published_at: new Date().toISOString() })
          .eq('id', post.id);

        toast.success(`Post "${post.title}" has been published!`);
      }
    }
  } catch (error) {
    console.error("Error updating post status:", error);
  }
};
