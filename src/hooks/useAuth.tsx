
import React from 'react';
import { useAuthCore } from './auth/useAuthCore';

export interface AuthContextType {
  user: any;
  loading: boolean;
  error: any;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

export const useAuth = (): AuthContextType => {
  const auth = useAuthCore();
  
  return {
    user: auth.user,
    loading: auth.loading,
    error: auth.error,
    login: auth.login,
    logout: auth.logout
  };
};
