
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Remove the .tsx extension
import { Loader2 } from 'lucide-react';
import { User, Session } from '@supabase/supabase-js';

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
  const { user, session, loading, isAdmin, signIn, signUp, signOut } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);
  
  useEffect(() => {
    // Set a timeout to prevent UI flickering for fast auth loads
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);
    
    // If auth finishes loading before timeout, clear the timeout
    if (!loading) {
      clearTimeout(timer);
      setIsInitializing(false);
    }
    
    return () => clearTimeout(timer);
  }, [loading]);

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
          <Loader2 className="h-12 w-12 animate-spin text-glidr-purple" />
          <p className="text-lg font-medium text-gray-600">Loading Glidrclick...</p>
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
