
import * as React from 'react';
import { useAuthCore } from './auth/useAuthCore';
import { useSocialConnections } from './auth/useSocialConnections';

export const useAuth = () => {
  // Get auth core functionality
  const authCore = useAuthCore();
  // Get social connections
  const socialConnections = useSocialConnections();
  
  return {
    ...authCore,
    socialConnections
  };
};
