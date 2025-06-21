
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<boolean>;
  signUp: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    let mounted = true;
    
    // Initialize auth state
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setIsAdmin(session?.user?.email?.includes('admin') ?? false);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          console.log('Auth state changed:', event, session);
          setSession(session);
          setUser(session?.user ?? null);
          setIsAdmin(session?.user?.email?.includes('admin') ?? false);
          setLoading(false);
        }
      }
    );

    // Initialize auth
    initAuth();
    
    // Cleanup function
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []); // Remove the loading dependency that was causing the infinite loop
  
  const signIn = async (credentials: { email: string; password: string }): Promise<boolean> => {
    console.log('Attempting sign in...');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) {
        console.error('Sign in error:', error);
        toast.error(error.message);
        return false;
      }
      
      toast.success('Signed in successfully!');
      return true;
    } catch (error) {
      console.error('Error during sign in:', error);
      toast.error('An unexpected error occurred during sign in');
      return false;
    }
  };
  
  const signUp = async (credentials: { email: string; password: string }): Promise<void> => {
    console.log('Attempting sign up...');
    try {
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) {
        console.error('Sign up error:', error);
        toast.error(error.message);
        return;
      }
      
      toast.success('Sign up successful! Please check your email for verification.');
    } catch (error) {
      console.error('Error during sign up:', error);
      toast.error('An unexpected error occurred during sign up');
    }
  };
  
  const signOut = async (): Promise<void> => {
    console.log('Attempting sign out...');
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast.error(error.message);
        return;
      }
      
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error during sign out:', error);
      toast.error('An unexpected error occurred during sign out');
    }
  };

  const value = {
    isAuthenticated: !!user,
    isAdmin,
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-deep-ocean to-midnight-blue">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-neon-electric" />
          <p className="text-lg font-medium text-white">Loading FlowCraft...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
