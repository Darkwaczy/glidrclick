
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface SocialPlatform {
  id: string;
  user_id: string;
  platform_id: string;
  name: string;
  icon?: string;
  is_connected: boolean;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
  account_id?: string;
  account_name?: string;
  last_sync?: string;
  notifications: {
    mentions: boolean;
    messages: boolean;
  };
  sync_frequency: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export const useSocialPlatforms = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  const availablePlatforms = [
    { id: 'facebook', name: 'Facebook', icon: 'facebook' },
    { id: 'instagram', name: 'Instagram', icon: 'instagram' },
    { id: 'twitter', name: 'Twitter', icon: 'twitter' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'linkedin' },
    { id: 'wordpress', name: 'WordPress', icon: 'wordpress' }
  ];

  const fetchPlatforms = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('social_platforms')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      // Merge with available platforms to show all options
      const mergedPlatforms = availablePlatforms.map(available => {
        const connected = data?.find(p => p.platform_id === available.id);
        return connected || {
          id: `temp-${available.id}`,
          user_id: user.id,
          platform_id: available.id,
          name: available.name,
          icon: available.icon,
          is_connected: false,
          notifications: { mentions: true, messages: true },
          sync_frequency: 'daily',
          metadata: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      });

      setPlatforms(mergedPlatforms);
    } catch (error) {
      console.error('Error fetching platforms:', error);
      toast.error('Failed to load social platforms');
    } finally {
      setIsLoading(false);
    }
  };

  const connectPlatform = async (platformId: string) => {
    if (!user) return false;

    try {
      // Simulate OAuth connection (would be handled by edge functions in production)
      const { data, error } = await supabase
        .from('social_platforms')
        .upsert({
          user_id: user.id,
          platform_id: platformId,
          name: availablePlatforms.find(p => p.id === platformId)?.name || platformId,
          icon: platformId,
          is_connected: true,
          account_name: `@${user.email?.split('@')[0]}_${platformId}`,
          last_sync: new Date().toISOString(),
          notifications: { mentions: true, messages: true },
          sync_frequency: 'daily',
          metadata: {},
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      toast.success(`Successfully connected to ${platformId}`);
      await fetchPlatforms();
      return true;
    } catch (error) {
      console.error(`Error connecting to ${platformId}:`, error);
      toast.error(`Failed to connect to ${platformId}`);
      return false;
    }
  };

  const disconnectPlatform = async (platformId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('social_platforms')
        .delete()
        .eq('user_id', user.id)
        .eq('platform_id', platformId);

      if (error) throw error;

      toast.success(`Disconnected from ${platformId}`);
      await fetchPlatforms();
      return true;
    } catch (error) {
      console.error(`Error disconnecting from ${platformId}:`, error);
      toast.error(`Failed to disconnect from ${platformId}`);
      return false;
    }
  };

  const updatePlatformSettings = async (platformId: string, settings: Partial<SocialPlatform>) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('social_platforms')
        .update({
          ...settings,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('platform_id', platformId);

      if (error) throw error;

      toast.success('Platform settings updated');
      await fetchPlatforms();
      return true;
    } catch (error) {
      console.error('Error updating platform settings:', error);
      toast.error('Failed to update settings');
      return false;
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, [user]);

  return {
    platforms,
    isLoading,
    connectPlatform,
    disconnectPlatform,
    updatePlatformSettings,
    refetch: fetchPlatforms,
  };
};
