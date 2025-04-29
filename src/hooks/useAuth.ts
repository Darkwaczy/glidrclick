
import { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle social auth redirects
        if (event === 'SIGNED_IN' && window.location.href.includes('dashboard/social')) {
          const urlParams = new URLSearchParams(window.location.search);
          const platform = urlParams.get('platform');
          
          if (platform) {
            // Save the platform connection in a separate call to avoid
            // running Supabase calls inside the auth state change handler
            setTimeout(() => {
              saveSocialPlatformConnection(platform, session?.user?.id);
            }, 0);
          }
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Existing session:', session ? 'Yes' : 'No');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const saveSocialPlatformConnection = async (platformId: string, userId: string | undefined) => {
    if (!userId) return;
    
    try {
      // Check if the platform is already connected
      const { data: existingPlatforms } = await supabase
        .from('social_platforms')
        .select('*')
        .eq('user_id', userId)
        .eq('platform_id', platformId);
      
      if (existingPlatforms && existingPlatforms.length > 0) {
        // Update the existing platform connection
        await supabase
          .from('social_platforms')
          .update({
            is_connected: true,
            last_sync: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('platform_id', platformId);
      } else {
        // Create a new platform connection
        await supabase
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
      }
      
      toast.success(`Connected to ${getPlatformName(platformId)} successfully!`);
    } catch (error) {
      console.error('Error saving social platform connection:', error);
    }
  };

  const getPlatformName = (platformId: string): string => {
    const platforms: Record<string, string> = {
      facebook: 'Facebook',
      twitter: 'Twitter',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      wordpress: 'WordPress Blog'
    };
    
    return platforms[platformId] || platformId;
  };

  const signIn = async ({ email, password }: { email: string, password: string }) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async ({ email, password }: { email: string, password: string }) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast.success('Check your email for the confirmation link!');
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
