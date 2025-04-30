
import { useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { getPlatformName } from '@/utils/social/helpers';

export const useSocialConnections = (user: User | null) => {
  useEffect(() => {
    if (!user) return;
    
    console.log("Social connections hook initializing for user:", user.id);
    let isMounted = true;
    
    // Handle URL parameters for social connections on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const connectedPlatform = urlParams.get('connected');
    
    if (connectedPlatform) {
      console.log(`Found connected platform in URL: ${connectedPlatform}`);
      // Use setTimeout to avoid potential deadlocks with Supabase
      setTimeout(() => {
        if (isMounted && user) {
          saveSocialPlatformConnection(connectedPlatform, user.id);
        }
      }, 0);
    }
    
    return () => { 
      console.log('useSocialConnections cleanup');
      isMounted = false; 
    };
  }, [user]);

  const saveSocialPlatformConnection = async (platformId: string, userId: string) => {
    if (!userId) {
      console.warn("Cannot save connection - no user ID provided");
      return;
    }
    
    try {
      console.log(`Saving connection for platform: ${platformId}, user: ${userId}`);
      // Check if the platform is already connected
      const { data: existingPlatforms, error: queryError } = await supabase
        .from('social_platforms')
        .select('*')
        .eq('user_id', userId)
        .eq('platform_id', platformId);
      
      if (queryError) {
        throw queryError;
      }
      
      if (existingPlatforms && existingPlatforms.length > 0) {
        console.log('Updating existing platform connection');
        // Update the existing platform connection
        const { error } = await supabase
          .from('social_platforms')
          .update({
            is_connected: true,
            last_sync: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('platform_id', platformId);
          
        if (error) throw error;
      } else {
        console.log('Creating new platform connection');
        // Create a new platform connection
        const { error } = await supabase
          .from('social_platforms')
          .insert({
            user_id: userId,
            platform_id: platformId,
            name: getPlatformName(platformId),
            icon: platformId,
            is_connected: true,
            account_name: `@user_${platformId}`,
            last_sync: new Date().toISOString(),
            sync_frequency: 'daily',
            notifications: { mentions: true, messages: true }
          });
          
        if (error) throw error;
      }
      
      toast.success(`Connected to ${getPlatformName(platformId)} successfully!`);
      
      // Clean up the URL parameters
      const url = new URL(window.location.href);
      url.searchParams.delete('connected');
      window.history.replaceState({}, document.title, url.toString());
    } catch (error) {
      console.error('Error saving social platform connection:', error);
      toast.error(`Failed to complete ${getPlatformName(platformId)} connection`);
    }
  };

  return {
    saveSocialPlatformConnection
  };
};
