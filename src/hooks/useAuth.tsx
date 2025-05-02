
import { useAuthCore } from './auth/useAuthCore';
import { useSocialConnections } from './auth/useSocialConnections';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  // Get auth core functionality first
  const authCore = useAuthCore();
  
  // Only use social connections after we have auth core data
  const socialConnections = useSocialConnections(authCore.user);
  
  return {
    ...authCore,
    saveSocialPlatformConnection: socialConnections.saveSocialPlatformConnection,
  };
};
