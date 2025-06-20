
import { useState, useEffect } from 'react';
import { 
  initFacebookSdk, 
  checkFacebookLoginStatus, 
  isFacebookSdkLoaded,
  connectFacebookWithSdk
} from '@/utils/social/facebook-sdk';
import { toast } from 'sonner';

interface FacebookLoginStatus {
  status?: 'connected' | 'not_authorized' | 'unknown';
  authenticated: boolean;
  accessToken?: string;
  userID?: string;
  expiresIn?: number;
}

export const useFacebookAuth = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginStatus, setLoginStatus] = useState<FacebookLoginStatus>({ 
    authenticated: false 
  });
  const [error, setError] = useState<string | null>(null);

  // Initialize SDK and check login status
  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!isFacebookSdkLoaded()) {
          await initFacebookSdk();
        }
        
        try {
          const status = await checkFacebookLoginStatus();
          setLoginStatus({
            status: status.status as 'connected' | 'not_authorized' | 'unknown',
            authenticated: status.status === 'connected',
            accessToken: status.authResponse?.accessToken,
            userID: status.authResponse?.userID,
            expiresIn: status.authResponse?.expiresIn
          });
          console.log("Facebook login status from hook:", status);
        } catch (statusError) {
          console.warn("Error checking Facebook login status:", statusError);
          
          // Check if it's the specific JSSDK error
          const errorMessage = statusError instanceof Error ? statusError.message : String(statusError);
          if (errorMessage.includes("JSSDK option is not toggled") || 
              errorMessage.toLowerCase().includes("log in with javascript sdk")) {
            setError("Please toggle the 'Log in with JavaScript SDK' option to 'Yes' in your Facebook Developer settings.");
          }
          
          setLoginStatus({
            status: 'unknown',
            authenticated: false
          });
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize Facebook SDK:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);
  
  // Function to check status again
  const refreshLoginStatus = async (): Promise<FacebookLoginStatus> => {
    try {
      setError(null);
      const status = await checkFacebookLoginStatus();
      const newStatus = {
        status: status.status as 'connected' | 'not_authorized' | 'unknown',
        authenticated: status.status === 'connected',
        accessToken: status.authResponse?.accessToken,
        userID: status.authResponse?.userID,
        expiresIn: status.authResponse?.expiresIn
      };
      
      setLoginStatus(newStatus);
      return newStatus;
    } catch (error) {
      console.error("Error refreshing Facebook login status:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes("JSSDK option is not toggled") || 
          errorMessage.toLowerCase().includes("log in with javascript sdk")) {
        setError("Please toggle the 'Log in with JavaScript SDK' option to 'Yes' in your Facebook Developer settings.");
      } else {
        setError(errorMessage);
      }
      
      return { authenticated: false, status: 'unknown' };
    }
  };
  
  // Connect with existing login or create new login
  const connectWithFacebook = async (): Promise<boolean> => {
    try {
      setError(null);
      // First refresh the login status to make sure it's current
      const currentStatus = await refreshLoginStatus();
      
      // If already authenticated, use that
      if (currentStatus.authenticated && currentStatus.accessToken) {
        return await connectFacebookWithSdk();
      } else {
        // Otherwise try to login and connect
        return await connectFacebookWithSdk();
      }
    } catch (error) {
      console.error("Error connecting with Facebook:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes("JSSDK option is not toggled") || 
          errorMessage.toLowerCase().includes("log in with javascript sdk")) {
        setError("Please toggle the 'Log in with JavaScript SDK' option to 'Yes' in your Facebook Developer settings.");
        toast.error(`Failed to connect with Facebook: ${errorMessage}`);
      } else {
        setError(errorMessage);
        toast.error(`Failed to connect with Facebook: ${errorMessage}`);
      }
      
      return false;
    }
  };

  return {
    isInitialized,
    isLoading,
    loginStatus,
    error,
    refreshLoginStatus,
    connectWithFacebook
  };
};

export default useFacebookAuth;
