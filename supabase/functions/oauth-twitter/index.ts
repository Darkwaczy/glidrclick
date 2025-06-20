
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, redirect_uri, code_verifier } = await req.json();
    
    if (!code) {
      throw new Error("Authorization code is required");
    }
    
    const TWITTER_CLIENT_ID = Deno.env.get("TWITTER_CLIENT_ID");
    const TWITTER_CLIENT_SECRET = Deno.env.get("TWITTER_CLIENT_SECRET");
    
    if (!TWITTER_CLIENT_ID || !TWITTER_CLIENT_SECRET) {
      throw new Error("Twitter app configuration missing");
    }
    
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch('https://api.twitter.com/2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`)
      },
      body: new URLSearchParams({
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri,
        code_verifier: code_verifier || 'challenge' // For simplicity, using the same value as challenge
      })
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      throw new Error("Failed to obtain access token: " + JSON.stringify(tokenData));
    }
    
    // Get user profile information
    const userResponse = await fetch('https://api.twitter.com/2/users/me?user.fields=name,username,profile_image_url', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    const userData = await userResponse.json();
    
    if (!userData.data) {
      throw new Error("Failed to fetch user data: " + JSON.stringify(userData));
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token || null,
        expires_in: tokenData.expires_in || null,
        user_id: userData.data.id,
        account_name: `@${userData.data.username}`,
        name: userData.data.name,
        profile_image_url: userData.data.profile_image_url
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Error in oauth-twitter function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});
