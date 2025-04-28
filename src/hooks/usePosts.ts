
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Post = {
  id: string;
  title: string;
  content: string;
  type: string;
  status: string;
  scheduled_for: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export const usePosts = (status?: string) => {
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', status],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select('*, post_platforms(platform_id)');

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        toast.error('Failed to fetch posts');
        throw error;
      }

      return data as Post[];
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully');
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast.error('Failed to delete post');
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Post> }) => {
      const { error } = await supabase
        .from('posts')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post updated successfully');
    },
    onError: (error) => {
      console.error('Update error:', error);
      toast.error('Failed to update post');
    },
  });

  return {
    posts,
    isLoading,
    deletePost: deletePost.mutate,
    updatePost: updatePost.mutate,
  };
};
