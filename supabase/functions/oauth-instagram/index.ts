
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
    
    // Exchange the authorization code for an access token (same as Facebook)
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
    
    // Get Instagram Business accounts linked to the user's Facebook Pages
    const pagesResponse = await fetch('https://graph.facebook.com/me/accounts', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    const pagesData = await pagesResponse.json();
    let instagramAccount = null;
    let instagramUsername = null;
    
    // For each page, check if there's an Instagram account linked
    if (pagesData.data && pagesData.data.length > 0) {
      for (const page of pagesData.data) {
        const instagramResponse = await fetch(`https://graph.facebook.com/v18.0/${page.id}?fields=instagram_business_account{id,name,username}`, {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        });
        
        const instagramData = await instagramResponse.json();
        
        if (instagramData.instagram_business_account) {
          instagramAccount = instagramData.instagram_business_account;
          instagramUsername = instagramData.instagram_business_account.username || '@instagram_user';
          // Use the page access token for Instagram API calls
          break;
        }
      }
    }
    
    // If no Instagram account found, return an error
    if (!instagramAccount) {
      return new Response(
        JSON.stringify({ 
          error: "No Instagram Business account found linked to your Facebook Pages" 
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    return new Response(
      JSON.stringify({
        access_token: tokenData.access_token,
        instagram_account_id: instagramAccount.id,
        account_name: instagramUsername,
        expires_in: tokenData.expires_in
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Error in oauth-instagram function:", error);
    
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
