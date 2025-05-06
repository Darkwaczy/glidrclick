
import { useAuthCore } from './auth/useAuthCore';
import { useSocialConnections } from './auth/useSocialConnections';

export const useAuth = () => {
  console.log("useAuth hook initializing...");
  const authCore = useAuthCore();
  const { saveSocialPlatformConnection } = useSocialConnections(authCore.user);

  return {
    ...authCore,
    saveSocialPlatformConnection
  };
};
