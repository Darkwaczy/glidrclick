
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
  const [isInitializing, setIsInitializing] = useState(true);
  
  useEffect(() => {
    // Get current session and user
    const initAuth = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check if user is admin (simplified - in a real app, this would check roles)
          setIsAdmin(session.user.email?.includes('admin') ?? false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (session?.user) {
          setIsAdmin(session.user.email?.includes('admin') ?? false);
        }
      }
    );
    
    // Set a timeout to prevent UI flickering for fast auth loads
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);
    
    // If auth finishes loading before timeout, clear the timeout
    if (!loading) {
      clearTimeout(timer);
      setIsInitializing(false);
    }
    
    // Cleanup
    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [loading]);
  
  const signIn = async (credentials: { email: string; password: string }): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) {
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
    try {
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) {
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
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
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

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-ocean-primary" />
          <p className="text-lg font-medium text-gray-600">Loading FlowCraft...</p>
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
