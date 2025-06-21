import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useEnhancedPosts, type EnhancedPost } from './useEnhancedPosts';

export type Post = EnhancedPost;

export const usePosts = (status?: string) => {
  // Use the enhanced posts hook for better functionality
  const enhancedHook = useEnhancedPosts(status);
  
  return {
    ...enhancedHook,
    // Keep backward compatibility
    posts: enhancedHook.posts,
    isLoading: enhancedHook.isLoading,
    deletePost: enhancedHook.deletePost,
    updatePost: enhancedHook.updatePost,
    createPost: enhancedHook.createPost,
  };
};
