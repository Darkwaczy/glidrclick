
import { toast } from "sonner";
import { getPlatformOAuthConfig } from "./helpers";

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
      : oauthConfig.scope;
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store the connection
    toast.success(`Successfully connected to ${platform}!`);
    return true;
  } catch (error) {
    console.error(`Error handling OAuth callback for ${platform}:`, error);
    toast.error(`Failed to complete ${platform} connection`);
    return false;
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
    
    // In a real application, we would validate the credentials and save them
    console.log(`Connecting to WordPress site: ${siteUrl}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store the connection
    toast.success('Successfully connected to WordPress!');
    return true;
  } catch (error) {
    console.error('Error connecting to WordPress:', error);
    toast.error('Failed to connect to WordPress');
    return false;
  }
};

// Add placeholder for connectPlatform function to avoid import errors
export const connectPlatform = async (platformId: string): Promise<boolean> => {
  try {
    return await import('./platforms').then(module => module.connectPlatform(platformId));
  } catch (error) {
    console.error(`Error connecting to platform ${platformId}:`, error);
    toast.error(`Failed to connect to ${platformId}`);
    return false;
  }
};
