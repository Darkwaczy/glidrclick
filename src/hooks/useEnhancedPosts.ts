
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';
import { socialMediaService } from '@/services/socialMediaService';

export interface EnhancedPost {
  id: string;
  title: string;
  content: string;
  type: 'social' | 'blog';
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  image_url?: string;
  scheduled_for?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  platforms?: string[];
}

export const useEnhancedPosts = (status?: string) => {
  const [posts, setPosts] = useState<EnhancedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  const fetchPosts = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          post_platforms(platform_id)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;

      const enhancedPosts = data?.map(post => ({
        ...post,
        platforms: post.post_platforms?.map((pp: any) => pp.platform_id) || []
      })) || [];

      setPosts(enhancedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (postData: Partial<EnhancedPost>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...postData,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      // Add platform associations if provided
      if (postData.platforms && postData.platforms.length > 0) {
        const platformInserts = postData.platforms.map(platformId => ({
          post_id: data.id,
          platform_id: platformId,
          user_id: user.id,
        }));

        const { error: platformError } = await supabase
          .from('post_platforms')
          .insert(platformInserts);

        if (platformError) {
          console.error('Error linking platforms:', platformError);
        }
      }

      toast.success('Post created successfully');
      await fetchPosts();
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
      return null;
    }
  };

  const updatePost = async ({ id, data }: { id: string; data: Partial<EnhancedPost> }) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast.success('Post updated successfully');
      await fetchPosts();
      return true;
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
      return false;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast.success('Post deleted successfully');
      await fetchPosts();
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
      return false;
    }
  };

  const uploadImage = async (file: File) => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('content')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('content')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    }
  };

  const getPostAnalytics = async (postId: string) => {
    try {
      return await socialMediaService.getPostAnalytics(postId);
    } catch (error) {
      console.error('Error fetching post analytics:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user, status]);

  return {
    posts,
    isLoading,
    createPost,
    updatePost,
    deletePost,
    uploadImage,
    getPostAnalytics,
    refetch: fetchPosts,
  };
};
