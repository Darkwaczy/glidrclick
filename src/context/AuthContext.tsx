
import React, { createContext, useContext } from 'react';
import { useAuth, AuthContextType } from '../hooks/useAuth';

// Create a context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component that wraps your app and makes auth object available to any
// child component that calls useAuthContext().
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Hook for child components to get the auth object and re-render when it changes.
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
