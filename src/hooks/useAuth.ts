
import { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { getPlatformName } from '@/utils/social/helpers';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change event:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check for admin role if user is signed in
        if (session?.user) {
          const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .eq('role', 'admin')
            .maybeSingle();
          
          setIsAdmin(!!data);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
        
        // Handle social auth redirects - moved to a separate function to avoid
        // running Supabase calls inside the auth state change handler
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const urlParams = new URLSearchParams(window.location.search);
          const connectedPlatform = urlParams.get('connected');
          
          if (connectedPlatform && session?.user?.id) {
            // Save the platform connection in a separate call to avoid
            // running Supabase calls inside the auth state change handler
            setTimeout(() => {
              saveSocialPlatformConnection(connectedPlatform, session.user!.id);
            }, 0);
          }
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Existing session:', session ? 'Yes' : 'No');
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check for admin role if user is signed in
      if (session?.user) {
        const { data } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'admin')
          .maybeSingle();
        
        setIsAdmin(!!data);
      }
      
      setLoading(false);
      
      // Handle URL parameters for social connections on initial load
      const urlParams = new URLSearchParams(window.location.search);
      const connectedPlatform = urlParams.get('connected');
      
      if (connectedPlatform && session?.user?.id) {
        setTimeout(() => {
          saveSocialPlatformConnection(connectedPlatform, session.user!.id);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const saveSocialPlatformConnection = async (platformId: string, userId: string) => {
    if (!userId) return;
    
    try {
      console.log(`Saving connection for platform: ${platformId}, user: ${userId}`);
      // Check if the platform is already connected
      const { data: existingPlatforms } = await supabase
        .from('social_platforms')
        .select('*')
        .eq('user_id', userId)
        .eq('platform_id', platformId);
      
      if (existingPlatforms && existingPlatforms.length > 0) {
        console.log('Updating existing platform connection');
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
        console.log('Creating new platform connection');
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
      
      // Clean up the URL parameters
      const url = new URL(window.location.href);
      url.searchParams.delete('connected');
      window.history.replaceState({}, document.title, url.toString());
    } catch (error) {
      console.error('Error saving social platform connection:', error);
      toast.error(`Failed to complete ${getPlatformName(platformId)} connection`);
    }
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
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user,
    session,
    loading,
    isAdmin,
    signIn,
    signUp,
    signOut,
  };
};
