
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
    const { code, redirect_uri } = await req.json();
    
    if (!code) {
      throw new Error("Authorization code is required");
    }
    
    const WP_CLIENT_ID = Deno.env.get("WORDPRESS_CLIENT_ID");
    const WP_CLIENT_SECRET = Deno.env.get("WORDPRESS_CLIENT_SECRET");
    
    if (!WP_CLIENT_ID || !WP_CLIENT_SECRET) {
      throw new Error("WordPress.com app configuration missing");
    }
    
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch('https://public-api.wordpress.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: WP_CLIENT_ID,
        client_secret: WP_CLIENT_SECRET,
        redirect_uri: redirect_uri,
        code: code,
        grant_type: 'authorization_code'
      })
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      throw new Error("Failed to obtain access token: " + JSON.stringify(tokenData));
    }
    
    // Get user info
    const userResponse = await fetch('https://public-api.wordpress.com/rest/v1.1/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    const userData = await userResponse.json();
    
    // Get sites that the user can publish to
    const sitesResponse = await fetch('https://public-api.wordpress.com/rest/v1.1/sites', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    const sitesData = await sitesResponse.json();
    
    return new Response(
      JSON.stringify({
        access_token: tokenData.access_token,
        user_id: userData.ID,
        account_name: userData.username || userData.display_name,
        sites: sitesData.sites || [],
        blog_id: sitesData.sites && sitesData.sites.length > 0 ? sitesData.sites[0].ID : null
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Error in oauth-wordpress function:", error);
    
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
