
import React from 'react';
import { useAuthCore } from './auth/useAuthCore';
import { useSocialConnections } from './auth/useSocialConnections';

export const useAuth = () => {
  const authCore = useAuthCore();
  const { saveSocialPlatformConnection } = useSocialConnections(authCore.user);

  return {
    ...authCore,
    saveSocialPlatformConnection
  };
};
