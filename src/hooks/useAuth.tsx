
import { useAuthCore } from './auth/useAuthCore';

export const useAuth = () => {
  // Get auth core functionality
  const authCore = useAuthCore();
  
  return {
    ...authCore
  };
};
