
import { useAuthCore } from './auth/useAuthCore';
import { useSocialConnections } from './auth/useSocialConnections';

export const useAuth = () => {
  // Get auth core functionality first
  const authCore = useAuthCore();
  
  // Use social connections with the user from authCore
  const socialConnections = useSocialConnections(authCore.user);
  
  return {
    ...authCore,
    saveSocialPlatformConnection: socialConnections.saveSocialPlatformConnection,
  };
};
