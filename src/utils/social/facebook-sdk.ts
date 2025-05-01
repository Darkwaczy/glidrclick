
import { toast } from 'sonner';
import { connectPlatform } from '@/utils/socialConnections';

// Facebook SDK configuration
const FB_APP_ID = '1315958822809269';
const FB_VERSION = 'v18.0';

// Initialize Facebook SDK
export const initFacebookSdk = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if SDK is already loaded
    if ((window as any).FB) {
      console.log("Facebook SDK already loaded");
      resolve();
      return;
    }

    // Load the SDK asynchronously
    (window as any).fbAsyncInit = function() {
      (window as any).FB.init({
        appId: FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: FB_VERSION
      });
      
      console.log("Facebook SDK initialized");
      resolve();
    };

    // Load the Facebook SDK script
    try {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.onerror = () => {
        reject(new Error("Failed to load Facebook SDK"));
      };
      document.head.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });
};

// Check if SDK is loaded
export const isFacebookSdkLoaded = (): boolean => {
  return !!(window as any).FB;
};

// Check login status
export const checkFacebookLoginStatus = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      if (!isFacebookSdkLoaded()) {
        throw new Error("Facebook SDK not loaded");
      }
      
      (window as any).FB.getLoginStatus(function(response: any) {
        console.log("Facebook login status:", response);
        resolve(response);
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Login with Facebook
export const loginWithFacebook = (scope: string = 'email,public_profile'): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      if (!isFacebookSdkLoaded()) {
        throw new Error("Facebook SDK not loaded");
      }
      
      (window as any).FB.login(function(response: any) {
        console.log("Facebook login response:", response);
        if (response.status === 'connected') {
          resolve(response.authResponse);
        } else {
          reject(new Error("User cancelled login or did not fully authorize"));
        }
      }, { scope });
    } catch (error) {
      reject(error);
    }
  });
};

// Connect Facebook with SDK
export const connectFacebookWithSdk = async (): Promise<boolean> => {
  try {
    // Request necessary permissions for posting to Facebook
    const authResponse = await loginWithFacebook('pages_show_list,pages_read_engagement,pages_manage_posts');
    
    if (!authResponse || !authResponse.accessToken) {
      throw new Error("Failed to obtain Facebook access token");
    }
    
    // Get user info
    const userInfo = await getFacebookUserInfo();
    
    // Get pages that the user manages
    const pages = await getFacebookPages(authResponse.accessToken);
    
    // Store the connection
    const success = await connectPlatform('facebook', {
      accessToken: authResponse.accessToken,
      userId: userInfo.id,
      userName: userInfo.name,
      pages: pages,
      expiresIn: authResponse.expiresIn
    });
    
    return success;
  } catch (error) {
    console.error("Error connecting Facebook with SDK:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    toast.error(`Failed to connect Facebook: ${errorMessage}`);
    return false;
  }
};

// Get user information
export const getFacebookUserInfo = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      if (!isFacebookSdkLoaded()) {
        throw new Error("Facebook SDK not loaded");
      }
      
      (window as any).FB.api('/me', {fields: 'id,name,email'}, function(response: any) {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(response?.error || new Error("Failed to get user info"));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Get Facebook pages
export const getFacebookPages = (accessToken: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    try {
      if (!isFacebookSdkLoaded()) {
        throw new Error("Facebook SDK not loaded");
      }
      
      (window as any).FB.api('/me/accounts', { access_token: accessToken }, function(response: any) {
        if (response && !response.error) {
          resolve(response.data || []);
        } else {
          reject(response?.error || new Error("Failed to get pages"));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
