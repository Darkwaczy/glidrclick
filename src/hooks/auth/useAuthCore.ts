
import { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

export const useAuthCore = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth core initializing...");
    let isMounted = true;

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change event:', event);
        
        if (!isMounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check for admin role if user is signed in
        if (session?.user) {
          const isAdminEmail = session.user.email === 'admin@glidrclick.com';
          
          if (isAdminEmail) {
            setIsAdmin(true);
          } else {
            try {
              const { data } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .eq('role', 'admin')
                .maybeSingle();
              
              if (isMounted) {
                setIsAdmin(!!data);
              }
            } catch (error) {
              console.error("Error checking admin role:", error);
            }
          }
        } else {
          setIsAdmin(false);
        }
        
        if (isMounted) {
          setLoading(false);
        }
      }
    );

    // Then check for existing session
    const checkSession = async () => {
      try {
        console.log('Checking for existing session...');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        console.log('Existing session:', session ? 'Yes' : 'No');
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check for admin role if user is signed in
        if (session?.user) {
          const isAdminEmail = session.user.email === 'admin@glidrclick.com';
            
          if (isAdminEmail) {
            setIsAdmin(true);
          } else {
            try {
              const { data } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .eq('role', 'admin')
                .maybeSingle();
              
              if (isMounted) {
                setIsAdmin(!!data);
              }
            } catch (error) {
              console.error("Error checking admin role:", error);
            }
          }
        }
        
        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Session check error:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    return () => { 
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async ({ email, password }: { email: string, password: string }) => {
    try {
      console.log(`Signing in with email: ${email}`);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.error('Error signing in:', error);
        throw error;
      }
      
      // Special handling for admin account
      if (email === 'admin@glidrclick.com') {
        setIsAdmin(true);
      }
      
      // Navigation will be handled by the onAuthStateChange listener
      return true;
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
    isAdmin,
    signIn,
    signUp,
    signOut,
  };
};
