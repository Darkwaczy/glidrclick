
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
    
    const FB_CLIENT_ID = Deno.env.get("FACEBOOK_APP_ID");
    const FB_CLIENT_SECRET = Deno.env.get("FACEBOOK_APP_SECRET");
    
    if (!FB_CLIENT_ID || !FB_CLIENT_SECRET) {
      throw new Error("Facebook app configuration missing");
    }
    
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: FB_CLIENT_ID,
        client_secret: FB_CLIENT_SECRET,
        redirect_uri: redirect_uri,
        code: code
      })
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      throw new Error("Failed to obtain access token: " + JSON.stringify(tokenData));
    }
    
    // Get user info
    const userResponse = await fetch('https://graph.facebook.com/me?fields=name,email', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    const userData = await userResponse.json();
    
    // Get pages that the user manages
    const pagesResponse = await fetch('https://graph.facebook.com/me/accounts', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    const pagesData = await pagesResponse.json();
    
    // For now, use the first page if available
    let pageAccessToken = tokenData.access_token;
    let accountName = userData.name;
    
    if (pagesData.data && pagesData.data.length > 0) {
      pageAccessToken = pagesData.data[0].access_token;
      accountName = pagesData.data[0].name;
    }
    
    return new Response(
      JSON.stringify({
        access_token: pageAccessToken,
        user_id: userData.id,
        account_name: accountName,
        expires_in: tokenData.expires_in,
        pages: pagesData.data || []
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Error in oauth-facebook function:", error);
    
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
