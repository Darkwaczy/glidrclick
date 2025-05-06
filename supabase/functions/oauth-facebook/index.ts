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
    
    // Use the provided Facebook App credentials
    const FB_CLIENT_ID = "1315958822809269";
    const FB_CLIENT_SECRET = "bf552835d3c08342b3bb35030d137207";
    
    if (!FB_CLIENT_ID || !FB_CLIENT_SECRET) {
      throw new Error("Facebook app configuration missing");
    }
    
    console.log("Exchanging code for access token...");
    console.log("Redirect URI:", redirect_uri);
    
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
    
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token exchange error response:", errorText);
      throw new Error(`Failed to exchange token: ${errorText}`);
    }
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      console.error("Token response error:", JSON.stringify(tokenData));
      throw new Error("Failed to obtain access token: " + JSON.stringify(tokenData));
    }
    
    console.log("Access token obtained successfully");
    
    // Get user info
    const userResponse = await fetch('https://graph.facebook.com/me?fields=name,email', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("User info error response:", errorText);
      throw new Error(`Failed to get user info: ${errorText}`);
    }
    
    const userData = await userResponse.json();
    console.log("User data retrieved:", userData.name);
    
    // Get pages that the user manages
    const pagesResponse = await fetch('https://graph.facebook.com/me/accounts', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    if (!pagesResponse.ok) {
      console.error("Pages fetch error:", await pagesResponse.text());
      // Continue even if we can't get pages
    }
    
    const pagesData = await pagesResponse.json().catch(err => {
      console.error("Error parsing pages response:", err);
      return { data: [] };
    });
    
    console.log("Pages data retrieved, count:", pagesData.data ? pagesData.data.length : 0);
    
    // For now, use the first page if available
    let pageAccessToken = tokenData.access_token;
    let accountName = userData.name;
    let accountId = userData.id;
    
    if (pagesData.data && pagesData.data.length > 0) {
      pageAccessToken = pagesData.data[0].access_token;
      accountName = pagesData.data[0].name;
      accountId = pagesData.data[0].id;
    }
    
    return new Response(
      JSON.stringify({
        access_token: pageAccessToken,
        user_id: accountId,
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
