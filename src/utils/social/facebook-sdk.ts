import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getPlatformName } from "./helpers";

interface FacebookAuthResponse {
  accessToken: string;
  expiresIn: number;
  userID: string;
  grantedScopes: string;
}

interface FacebookUserInfo {
  id: string;
  name: string;
  email?: string;
}

interface FacebookPageInfo {
  id: string;
  name: string;
  access_token: string;
}

/**
 * Check if Facebook SDK is loaded and ready
 */
export const isFacebookSdkLoaded = (): boolean => {
  return typeof window !== 'undefined' && window.FB !== undefined;
};

/**
 * Initialize Facebook SDK (will use the script loaded in index.html)
 */
export const initFacebookSdk = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isFacebookSdkLoaded()) {
      console.log("Facebook SDK already loaded");
      resolve();
      return;
    }
    
    // Set a timeout in case the SDK doesn't load
    const timeout = setTimeout(() => {
      reject(new Error("Facebook SDK failed to load"));
    }, 10000);
    
    // Check periodically if FB is defined
    const checkInterval = setInterval(() => {
      if (isFacebookSdkLoaded()) {
        clearInterval(checkInterval);
        clearTimeout(timeout);
        console.log("Facebook SDK loaded successfully");
        resolve();
      }
    }, 100);
  });
};

/**
 * Check if user is already logged into Facebook
 */
export const checkFacebookLoginStatus = (): Promise<{status: string, authResponse?: FacebookAuthResponse}> => {
  return new Promise((resolve, reject) => {
    if (!isFacebookSdkLoaded()) {
      reject(new Error("Facebook SDK not loaded"));
      return;
    }
    
    window.FB.getLoginStatus((response: any) => {
      console.log("Facebook login status:", response);
      if (response) {
        resolve({
          status: response.status,
          authResponse: response.authResponse
        });
      } else {
        reject(new Error("Failed to get Facebook login status"));
      }
    });
  });
};

/**
 * Authenticate with Facebook using the SDK
 */
export const loginWithFacebook = (): Promise<FacebookAuthResponse> => {
  return new Promise((resolve, reject) => {
    if (!isFacebookSdkLoaded()) {
      reject(new Error("Facebook SDK not loaded"));
      return;
    }
    
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("Facebook login successful:", response.authResponse);
          resolve(response.authResponse);
        } else {
          console.log("User cancelled login or did not authorize the app");
          reject(new Error("User cancelled login or did not authorize the app"));
        }
      },
      {
        scope: 'public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts',
        return_scopes: true
      }
    );
  });
};

/**
 * Get user information from Facebook
 */
export const getFacebookUserInfo = (accessToken: string): Promise<FacebookUserInfo> => {
  return new Promise((resolve, reject) => {
    if (!isFacebookSdkLoaded()) {
      reject(new Error("Facebook SDK not loaded"));
      return;
    }
    
    window.FB.api(
      '/me',
      { fields: 'id,name,email' },
      (response) => {
        if (response && !response.error) {
          resolve(response);
        } else {
          reject(response.error || new Error("Failed to get user info"));
        }
      }
    );
  });
};

/**
 * Get the pages that the user manages
 */
export const getFacebookPages = (): Promise<FacebookPageInfo[]> => {
  return new Promise((resolve, reject) => {
    if (!isFacebookSdkLoaded()) {
      reject(new Error("Facebook SDK not loaded"));
      return;
    }
    
    window.FB.api(
      '/me/accounts',
      (response) => {
        if (response && !response.error) {
          resolve(response.data || []);
        } else {
          reject(response.error || new Error("Failed to get pages info"));
        }
      }
    );
  });
};

/**
 * Connect Facebook account using SDK
 */
export const connectFacebookWithSdk = async (): Promise<boolean> => {
  try {
    toast.loading("Connecting to Facebook...");
    
    // Make sure Facebook SDK is loaded
    await initFacebookSdk();
    
    // Check if user is already logged into Facebook
    try {
      const loginStatus = await checkFacebookLoginStatus();
      
      if (loginStatus.status === 'connected' && loginStatus.authResponse) {
        console.log("User already logged into Facebook, using existing auth:", loginStatus);
        
        // Use existing authentication
        const authResponse = loginStatus.authResponse;
        
        // Get user information
        const userInfo = await getFacebookUserInfo(authResponse.accessToken);
        
        // Get pages that the user manages
        const pages = await getFacebookPages();
        
        // Continue with the existing flow...
        const { data: userSession } = await supabase.auth.getSession();
        const userId = userSession.session?.user.id;
        
        if (!userId) {
          toast.error("You must be logged in to connect platforms");
          return false;
        }
        
        // Format data for storage (same as before)
        const platformData = {
          user_id: userId,
          platform_id: 'facebook',
          name: getPlatformName('facebook'),
          icon: 'facebook',
          is_connected: true,
          access_token: authResponse.accessToken,
          refresh_token: null,
          token_expires_at: new Date(Date.now() + (authResponse.expiresIn * 1000)).toISOString(),
          account_name: userInfo.name || `Facebook User`,
          last_sync: new Date().toISOString(),
          sync_frequency: 'daily',
          notifications: { mentions: true, messages: true },
          meta: {
            user_id: userInfo.id,
            pages: pages
          }
        };
        
        // Check if platform is already connected
        const { data: existingPlatform } = await supabase
          .from('social_platforms')
          .select('*')
          .eq('user_id', userId)
          .eq('platform_id', 'facebook')
          .maybeSingle();
        
        // Update or insert platform data
        let result;
        if (existingPlatform) {
          result = await supabase
            .from('social_platforms')
            .update(platformData)
            .eq('id', existingPlatform.id);
        } else {
          result = await supabase
            .from('social_platforms')
            .insert(platformData);
        }
        
        if (result.error) throw result.error;
        
        toast.success(`Successfully connected to Facebook!`);
        return true;
      }
    } catch (loginStatusError) {
      console.warn("Error checking Facebook login status:", loginStatusError);
      // Continue with normal login flow if status check fails
    }
    
    // If not already logged in or status check failed, proceed with regular login
    const authResponse = await loginWithFacebook();
    
    if (!authResponse) {
      toast.error("Facebook authentication failed");
      return false;
    }
    
    // Get user information
    const userInfo = await getFacebookUserInfo(authResponse.accessToken);
    
    // Get pages that the user manages
    const pages = await getFacebookPages();
    
    // Get the user ID for storing the connection
    const { data: userSession } = await supabase.auth.getSession();
    const userId = userSession.session?.user.id;
    
    if (!userId) {
      toast.error("You must be logged in to connect platforms");
      return false;
    }
    
    // Format data for storage
    const platformData = {
      user_id: userId,
      platform_id: 'facebook',
      name: getPlatformName('facebook'),
      icon: 'facebook',
      is_connected: true,
      access_token: authResponse.accessToken,
      refresh_token: null,
      token_expires_at: new Date(Date.now() + (authResponse.expiresIn * 1000)).toISOString(),
      account_name: userInfo.name || `Facebook User`,
      last_sync: new Date().toISOString(),
      sync_frequency: 'daily',
      notifications: { mentions: true, messages: true },
      meta: {
        user_id: userInfo.id,
        pages: pages
      }
    };
    
    // Check if platform is already connected
    const { data: existingPlatform } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('user_id', userId)
      .eq('platform_id', 'facebook')
      .maybeSingle();
    
    // Update or insert platform data
    let result;
    if (existingPlatform) {
      result = await supabase
        .from('social_platforms')
        .update(platformData)
        .eq('id', existingPlatform.id);
    } else {
      result = await supabase
        .from('social_platforms')
        .insert(platformData);
    }
    
    if (result.error) throw result.error;
    
    toast.success(`Successfully connected to Facebook!`);
    return true;
    
  } catch (error) {
    console.error('Error in connectFacebookWithSdk:', error);
    toast.error(`Something went wrong while connecting to Facebook: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

/**
 * Connect Instagram account using Facebook SDK
 * (Instagram Business accounts are connected through Facebook Pages)
 */
export const connectInstagramWithSdk = async (): Promise<boolean> => {
  try {
    toast.loading("Connecting to Instagram...");
    
    // Make sure Facebook SDK is loaded
    await initFacebookSdk();
    
    // Check if user is already logged into Facebook
    try {
      const loginStatus = await checkFacebookLoginStatus();
      
      if (loginStatus.status === 'connected' && loginStatus.authResponse) {
        console.log("User already logged into Facebook, using existing auth for Instagram:", loginStatus);
        
        // Use existing authentication
        const authResponse = loginStatus.authResponse;
        
        // Get user information
        const userInfo = await getFacebookUserInfo(authResponse.accessToken);
        
        // Get the user ID for storing the connection
        const { data: userSession } = await supabase.auth.getSession();
        const userId = userSession.session?.user.id;
        
        if (!userId) {
          toast.error("You must be logged in to connect platforms");
          return false;
        }
        
        // Get Instagram accounts connected to Facebook
        const result = await new Promise<any>((resolve, reject) => {
          window.FB.api(
            '/me/accounts',
            { fields: 'name,access_token,instagram_business_account{id,name,username}' },
            (response) => {
              if (response && !response.error) {
                resolve(response);
              } else {
                reject(response?.error || new Error("Failed to get Instagram accounts"));
              }
            }
          );
        });
        
        // Continue with normal Instagram connection flow...
        // Filter to only pages with Instagram business accounts
        const instagramAccounts = result.data ? 
          result.data.filter((page: any) => page.instagram_business_account) : [];
        
        if (instagramAccounts.length === 0) {
          toast.error("No Instagram Business accounts found. Please connect your Instagram account to a Facebook Page first.");
          return false;
        }
        
        // Use the first Instagram account
        const instagramAccount = instagramAccounts[0];
        const instagramBusinessAccount = instagramAccount.instagram_business_account;
        
        // Format data for storage
        const platformData = {
          user_id: userId,
          platform_id: 'instagram',
          name: getPlatformName('instagram'),
          icon: 'instagram',
          is_connected: true,
          access_token: instagramAccount.access_token,
          refresh_token: null,
          token_expires_at: new Date(Date.now() + (authResponse.expiresIn * 1000)).toISOString(),
          account_name: instagramBusinessAccount.username ? `@${instagramBusinessAccount.username}` : instagramBusinessAccount.name || `Instagram User`,
          last_sync: new Date().toISOString(),
          sync_frequency: 'daily',
          notifications: { mentions: true, messages: true },
          meta: {
            user_id: instagramBusinessAccount.id,
            facebook_page_id: instagramAccount.id,
            instagram_accounts: instagramAccounts.map((account: any) => ({
              id: account.instagram_business_account?.id,
              name: account.name,
              username: account.instagram_business_account?.username,
              access_token: account.access_token
            }))
          }
        };
        
        // Check if platform is already connected
        const { data: existingPlatform } = await supabase
          .from('social_platforms')
          .select('*')
          .eq('user_id', userId)
          .eq('platform_id', 'instagram')
          .maybeSingle();
        
        // Update or insert platform data
        let result2;
        if (existingPlatform) {
          result2 = await supabase
            .from('social_platforms')
            .update(platformData)
            .eq('id', existingPlatform.id);
        } else {
          result2 = await supabase
            .from('social_platforms')
            .insert(platformData);
        }
        
        if (result2.error) throw result2.error;
        
        toast.success(`Successfully connected to Instagram!`);
        return true;
      }
    } catch (loginStatusError) {
      console.warn("Error checking Facebook login status for Instagram connection:", loginStatusError);
      // Continue with normal login flow if status check fails
    }
    
    // If not already logged in or status check failed, proceed with regular login
    const authResponse = await loginWithFacebook();
    
    if (!authResponse) {
      toast.error("Facebook authentication failed");
      return false;
    }
    
    // Get user information
    const userInfo = await getFacebookUserInfo(authResponse.accessToken);
    
    // Get the user ID for storing the connection
    const { data: userSession } = await supabase.auth.getSession();
    const userId = userSession.session?.user.id;
    
    if (!userId) {
      toast.error("You must be logged in to connect platforms");
      return false;
    }
    
    // Get Instagram accounts connected to Facebook
    const result = await new Promise<any>((resolve, reject) => {
      window.FB.api(
        '/me/accounts',
        { fields: 'name,access_token,instagram_business_account{id,name,username}' },
        (response) => {
          if (response && !response.error) {
            resolve(response);
          } else {
            reject(response?.error || new Error("Failed to get Instagram accounts"));
          }
        }
      );
    });
    
    // Filter to only pages with Instagram business accounts
    const instagramAccounts = result.data ? 
      result.data.filter((page: any) => page.instagram_business_account) : [];
    
    if (instagramAccounts.length === 0) {
      toast.error("No Instagram Business accounts found. Please connect your Instagram account to a Facebook Page first.");
      return false;
    }
    
    // Use the first Instagram account
    const instagramAccount = instagramAccounts[0];
    const instagramBusinessAccount = instagramAccount.instagram_business_account;
    
    // Format data for storage
    const platformData = {
      user_id: userId,
      platform_id: 'instagram',
      name: getPlatformName('instagram'),
      icon: 'instagram',
      is_connected: true,
      access_token: instagramAccount.access_token,
      refresh_token: null,
      token_expires_at: new Date(Date.now() + (authResponse.expiresIn * 1000)).toISOString(),
      account_name: instagramBusinessAccount.username ? `@${instagramBusinessAccount.username}` : instagramBusinessAccount.name || `Instagram User`,
      last_sync: new Date().toISOString(),
      sync_frequency: 'daily',
      notifications: { mentions: true, messages: true },
      meta: {
        user_id: instagramBusinessAccount.id,
        facebook_page_id: instagramAccount.id,
        instagram_accounts: instagramAccounts.map((account: any) => ({
          id: account.instagram_business_account?.id,
          name: account.name,
          username: account.instagram_business_account?.username,
          access_token: account.access_token
        }))
      }
    };
    
    // Check if platform is already connected
    const { data: existingPlatform } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('user_id', userId)
      .eq('platform_id', 'instagram')
      .maybeSingle();
    
    // Update or insert platform data
    let result2;
    if (existingPlatform) {
      result2 = await supabase
        .from('social_platforms')
        .update(platformData)
        .eq('id', existingPlatform.id);
    } else {
      result2 = await supabase
        .from('social_platforms')
        .insert(platformData);
    }
    
    if (result2.error) throw result2.error;
    
    toast.success(`Successfully connected to Instagram!`);
    return true;
    
  } catch (error) {
    console.error('Error in connectInstagramWithSdk:', error);
    toast.error(`Something went wrong while connecting to Instagram: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

// Add Facebook SDK types
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}
