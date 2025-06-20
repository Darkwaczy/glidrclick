
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { getCurrentUserId } from './helpers';

/**
 * Publish content to a social media platform
 * @param platformId The platform ID to publish to
 * @param content The content to publish
 * @param title Optional title for the post
 */
export const publishToSocialMedia = async (
  platformId: string,
  content: string,
  title?: string
): Promise<boolean> => {
  try {
    // Get the platform-specific token
    const userId = await getCurrentUserId();
    
    if (!userId) {
      toast.error('You must be logged in to publish content');
      return false;
    }
    
    const { data: platform, error } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('user_id', userId)
      .eq('platform_id', platformId)
      .single();
      
    if (error || !platform) {
      toast.error(`Platform ${platformId} not found or not connected`);
      return false;
    }
    
    // In a real app, we would use the platform token to publish to the social media API
    // For now, we'll just simulate success
    console.log(`Publishing to ${platformId}: ${title || ''} - ${content}`);
    
    // Record the publish action in the database
    const { error: insertError } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        title: title || 'Post from Glidrclick',
        content: content,
        status: 'published',
        type: 'social',
        published_at: new Date().toISOString()
      });
      
    if (insertError) {
      console.error('Error recording publish action:', insertError);
    }
    
    return true;
  } catch (error) {
    console.error(`Error publishing to ${platformId}:`, error);
    toast.error(`Failed to publish to ${platformId}`);
    return false;
  }
};

/**
 * Schedule a post for later publishing
 * @param title Post title
 * @param content Post content
 * @param platforms Platforms to publish to
 * @param scheduledDate Date to publish
 */
export const schedulePost = async (
  title: string,
  content: string,
  platforms: string[],
  scheduledDate: Date
): Promise<boolean> => {
  try {
    // Get current user
    const userId = await getCurrentUserId();
    
    if (!userId) {
      toast.error('You must be logged in to schedule posts');
      return false;
    }
    
    // Insert post into database
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        user_id: userId,
        title: title,
        content: content,
        status: 'scheduled',
        type: 'social',
        scheduled_for: scheduledDate.toISOString()
      })
      .select()
      .single();
      
    if (error) throw error;
    
    // Link post to platforms
    if (post && platforms.length > 0) {
      const platformLinks = platforms.map(platformId => ({
        post_id: post.id,
        platform_id: platformId,
        user_id: userId
      }));
      
      const { error: linkError } = await supabase
        .from('post_platforms')
        .insert(platformLinks);
        
      if (linkError) {
        console.error('Error linking post to platforms:', linkError);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error scheduling post:', error);
    toast.error('Failed to schedule post');
    return false;
  }
};

/**
 * Get scheduled posts for the current user
 */
export const getScheduledPosts = async () => {
  try {
    // Get current user
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return [];
    }
    
    // Get posts from database
    const { data, error } = await supabase
      .from('posts')
      .select('*, post_platforms(platform_id)')
      .eq('user_id', userId)
      .eq('status', 'scheduled')
      .order('scheduled_for', { ascending: true });
      
    if (error) throw error;

    // Check if any scheduled posts should now be published
    const now = new Date();
    const postsToUpdate = data?.filter(post => {
      return post.scheduled_for && new Date(post.scheduled_for) <= now;
    });

    // Auto-publish posts whose scheduled time has passed
    if (postsToUpdate && postsToUpdate.length > 0) {
      for (const post of postsToUpdate) {
        await supabase
          .from('posts')
          .update({
            status: 'published',
            published_at: now.toISOString()
          })
          .eq('id', post.id);
        
        console.log(`Automatically published scheduled post: ${post.title}`);
      }
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    return [];
  }
};

/**
 * Get published posts for the current user
 */
export const getPublishedPosts = async () => {
  try {
    // Get current user
    const userId = await getCurrentUserId();
    
    if (!userId) {
      return [];
    }
    
    // Get posts from database
    const { data, error } = await supabase
      .from('posts')
      .select('*, post_platforms(platform_id)')
      .eq('user_id', userId)
      .eq('status', 'published')
      .order('published_at', { ascending: false });
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }
};

/**
 * Check and update post status
 * This function will check if any scheduled posts should be marked as published
 */
export const checkAndUpdatePostStatus = async () => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return;
    
    const now = new Date();
    
    // Get all scheduled posts that should be published by now
    const { data: postsToPublish, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'scheduled')
      .lt('scheduled_for', now.toISOString());
      
    if (error) throw error;
    
    if (postsToPublish && postsToPublish.length > 0) {
      // Update all these posts to published status
      const postIds = postsToPublish.map(post => post.id);
      
      const { error: updateError } = await supabase
        .from('posts')
        .update({
          status: 'published',
          published_at: now.toISOString()
        })
        .in('id', postIds);
        
      if (updateError) throw updateError;
      
      console.log(`Updated ${postsToPublish.length} posts from scheduled to published`);
      return postsToPublish.length;
    }
    
    return 0;
  } catch (error) {
    console.error('Error updating post status:', error);
    return 0;
  }
};
