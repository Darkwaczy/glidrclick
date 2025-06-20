
import { toast } from "sonner";
import { getPlatformOAuthConfig, getPlatformName } from "./helpers";
import { supabase } from "@/integrations/supabase/client";

// Simulate OAuth flow
export const connectWithOAuth = async (platform: string): Promise<boolean> => {
  try {
    const oauthConfig = getPlatformOAuthConfig(platform);
    
    if (!oauthConfig) {
      toast.error(`OAuth configuration for ${platform} not found`);
      return false;
    }
    
    // Generate a state parameter for security
    const state = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('oauth_state', state);
    
    // Build the authorization URL
    const authUrl = new URL(oauthConfig.authorizationUrl);
    authUrl.searchParams.append('client_id', oauthConfig.clientId);
    authUrl.searchParams.append('redirect_uri', oauthConfig.redirectUri);
    // Ensure scope is an array before joining
    const scope = Array.isArray(oauthConfig.scope) 
      ? oauthConfig.scope.join(' ') 
      : oauthConfig.scope || '';
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('response_type', 'code');
    
    // Redirect to the authorization URL
    window.location.href = authUrl.toString();
    return true;
  } catch (error) {
    console.error(`Error initiating OAuth flow for ${platform}:`, error);
    toast.error(`Failed to connect to ${platform}`);
    return false;
  }
};

// Handle OAuth callback
export const handleOAuthCallback = async (platform: string, code: string): Promise<boolean> => {
  try {
    // In a real application, we would exchange the code for an access token
    console.log(`Handling OAuth callback for ${platform} with code: ${code.substring(0, 10)}...`);
    
    // Get the user
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      toast.error("You must be logged in to connect social accounts");
      return false;
    }
    
    // Call the appropriate function based on the platform
    let result;
    
    switch (platform.toLowerCase()) {
      case 'twitter':
      case 'x':
        result = await handleTwitterOAuth(code, userData.user.id);
        break;
      case 'facebook':
        result = await handleFacebookOAuth(code, userData.user.id);
        break;
      case 'linkedin':
        result = await handleLinkedInOAuth(code, userData.user.id);
        break;
      case 'instagram':
        result = await handleInstagramOAuth(code, userData.user.id);
        break;
      case 'wordpress':
        result = await handleWordPressOAuth(code, userData.user.id);
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
    
    // Store the connection
    if (result && result.success) {
      await saveSocialPlatformConnection(platform, userData.user.id, result);
      toast.success(`Successfully connected to ${platform}!`);
      return true;
    } else {
      throw new Error(result?.error || "Unknown error");
    }
  } catch (error) {
    console.error(`Error handling OAuth callback for ${platform}:`, error);
    toast.error(`Failed to complete ${platform} connection`);
    return false;
  }
};

// Platform-specific OAuth handlers
const handleTwitterOAuth = async (code: string, userId: string) => {
  // Call the oauth-twitter edge function
  try {
    // Retrieve the code verifier from session storage (if saved in connect step)
    const codeVerifier = sessionStorage.getItem('twitter_code_verifier') || 'challenge';
    
    const response = await fetch('/api/oauth-twitter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code,
        code_verifier: codeVerifier,
        redirect_uri: `${window.location.origin}/dashboard/social?connected=twitter` 
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to exchange Twitter token');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Twitter OAuth error:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  } finally {
    // Clean up
    sessionStorage.removeItem('twitter_code_verifier');
  }
};

const handleFacebookOAuth = async (code: string, userId: string) => {
  // Call the oauth-facebook edge function
  try {
    const response = await fetch('/api/oauth-facebook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code,
        redirect_uri: `${window.location.origin}/dashboard/social?platform=facebook` 
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to exchange Facebook token');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Facebook OAuth error:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};

const handleLinkedInOAuth = async (code: string, userId: string) => {
  // Call the oauth-linkedin edge function
  try {
    const response = await fetch('/api/oauth-linkedin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code,
        redirect_uri: `${window.location.origin}/dashboard/social?connected=linkedin` 
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to exchange LinkedIn token');
    }
    
    const result = await response.json();
    return { ...result, success: true };
  } catch (error) {
    console.error("LinkedIn OAuth error:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};

const handleInstagramOAuth = async (code: string, userId: string) => {
  // Call the oauth-instagram edge function
  try {
    const response = await fetch('/api/oauth-instagram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code,
        redirect_uri: `${window.location.origin}/dashboard/social?platform=instagram` 
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to exchange Instagram token');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Instagram OAuth error:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};

const handleWordPressOAuth = async (code: string, userId: string) => {
  // Call the oauth-wordpress edge function
  try {
    const response = await fetch('/api/oauth-wordpress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code,
        redirect_uri: `${window.location.origin}/dashboard/social?connected=wordpress` 
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to exchange WordPress token');
    }
    
    return await response.json();
  } catch (error) {
    console.error("WordPress OAuth error:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
};

// Connect WordPress self-hosted
export const connectWordPressSelfHosted = async (
  siteUrl: string,
  username: string,
  password: string
): Promise<boolean> => {
  try {
    // Validate the site URL
    if (!siteUrl.startsWith('http')) {
      toast.error('Please enter a valid site URL starting with http:// or https://');
      return false;
    }
    
    // Get the user
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      toast.error("You must be logged in to connect social accounts");
      return false;
    }
    
    // In a real application, we would validate the credentials and save them
    console.log(`Connecting to WordPress site: ${siteUrl}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store the connection
    await saveSocialPlatformConnection('wordpress-self', userData.user.id, {
      success: true,
      site_url: siteUrl,
      username: username,
      account_name: siteUrl
    });
    
    toast.success('Successfully connected to WordPress!');
    return true;
  } catch (error) {
    console.error('Error connecting to WordPress:', error);
    toast.error('Failed to connect to WordPress');
    return false;
  }
};

// Save social platform connection to database
const saveSocialPlatformConnection = async (
  platform: string, 
  userId: string, 
  connectionData: any
): Promise<boolean> => {
  try {
    if (!connectionData.success) {
      throw new Error(connectionData.error || "Failed to connect");
    }

    const platformData = {
      user_id: userId,
      platform_id: platform,
      name: getPlatformName(platform),
      icon: platform,
      is_connected: true,
      access_token: connectionData.access_token,
      account_id: connectionData.user_id || connectionData.account_id,
      account_name: connectionData.account_name || `@${platform}_user`,
      refresh_token: connectionData.refresh_token,
      token_expires_at: connectionData.expires_in 
        ? new Date(Date.now() + connectionData.expires_in * 1000).toISOString() 
        : null,
      last_sync: new Date().toISOString(),
      metadata: connectionData
    };

    // Check if platform already exists for this user
    const { data: existingPlatform } = await supabase
      .from('social_platforms')
      .select('id')
      .eq('user_id', userId)
      .eq('platform_id', platform)
      .maybeSingle();
    
    if (existingPlatform?.id) {
      // Update existing platform
      const { error } = await supabase
        .from('social_platforms')
        .update(platformData)
        .eq('id', existingPlatform.id);
        
      if (error) throw error;
    } else {
      // Insert new platform
      const { error } = await supabase
        .from('social_platforms')
        .insert(platformData);
        
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error saving social platform connection:", error);
    return false;
  }
};

// Add placeholder for connectPlatform function to avoid import errors
export const connectPlatform = async (platformId: string): Promise<boolean> => {
  try {
    // For LinkedIn
    if (platformId === 'linkedin') {
      try {
        // Call the connect-linkedin edge function
        const response = await fetch('/api/connect-linkedin', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get LinkedIn authorization URL');
        }
        
        const data = await response.json();
        
        if (data.state) {
          sessionStorage.setItem('linkedin_oauth_state', data.state);
        }
        
        if (data.authUrl) {
          window.location.href = data.authUrl;
          return true;
        }
        
        throw new Error('No authorization URL returned');
      } catch (error) {
        console.error('LinkedIn connect error:', error);
        toast.error(`Failed to connect to LinkedIn: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return false;
      }
    }
    
    // For Twitter
    if (platformId === 'twitter' || platformId === 'x') {
      try {
        // Call the connect-twitter edge function
        const response = await fetch('/api/connect-twitter', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get Twitter authorization URL');
        }
        
        const data = await response.json();
        
        if (data.state) {
          sessionStorage.setItem('twitter_oauth_state', data.state);
        }
        
        if (data.codeVerifier) {
          sessionStorage.setItem('twitter_code_verifier', data.codeVerifier);
        }
        
        if (data.authUrl) {
          window.location.href = data.authUrl;
          return true;
        }
        
        throw new Error('No authorization URL returned');
      } catch (error) {
        console.error('Twitter connect error:', error);
        toast.error(`Failed to connect to Twitter: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return false;
      }
    }
    
    // For other platforms, use the original implementation
    return await import('./platforms').then(module => module.connectPlatform(platformId));
  } catch (error) {
    console.error(`Error connecting to platform ${platformId}:`, error);
    toast.error(`Failed to connect to ${platformId}`);
    return false;
  }
};
