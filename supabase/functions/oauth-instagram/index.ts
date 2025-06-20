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
    
    // Use the provided Facebook App credentials since Instagram uses the Facebook API
    const FB_CLIENT_ID = "1315958822809269";
    const FB_CLIENT_SECRET = "bf552835d3c08342b3bb35030d137207";
    
    if (!FB_CLIENT_ID || !FB_CLIENT_SECRET) {
      throw new Error("Instagram app configuration missing");
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
    
    // Get Instagram business accounts connected to the user's pages
    const accountsResponse = await fetch('https://graph.facebook.com/v18.0/me/accounts?fields=name,access_token,instagram_business_account', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    if (!accountsResponse.ok) {
      console.error("Instagram accounts fetch error:", await accountsResponse.text());
      // Continue even if we can't get accounts
    }
    
    const accountsData = await accountsResponse.json().catch(err => {
      console.error("Error parsing Instagram accounts response:", err);
      return { data: [] };
    });
    
    console.log("Pages with Instagram accounts retrieved, count:", accountsData.data ? accountsData.data.length : 0);
    
    // Filter to only pages with Instagram business accounts
    const instagramAccounts = accountsData.data ? 
      accountsData.data.filter(page => page.instagram_business_account) : [];
    
    // For now, use the first Instagram account if available
    let instagramToken = tokenData.access_token;
    let accountName = userData.name;
    let accountId = userData.id;
    let instagramId = null;
    
    if (instagramAccounts.length > 0) {
      instagramToken = instagramAccounts[0].access_token;
      accountName = instagramAccounts[0].name;
      accountId = instagramAccounts[0].id;
      instagramId = instagramAccounts[0].instagram_business_account.id;
      
      // Get Instagram account details
      if (instagramId) {
        try {
          const igResponse = await fetch(`https://graph.facebook.com/v18.0/${instagramId}?fields=name,username,profile_picture_url`, {
            headers: {
              'Authorization': `Bearer ${instagramToken}`
            }
          });
          
          if (igResponse.ok) {
            const igData = await igResponse.json();
            if (igData.username) {
              accountName = `@${igData.username}`;
            }
          }
        } catch (igError) {
          console.error("Error fetching Instagram details:", igError);
          // Continue with what we have
        }
      }
    }
    
    return new Response(
      JSON.stringify({
        access_token: instagramToken,
        user_id: instagramId || accountId,
        account_name: accountName,
        expires_in: tokenData.expires_in,
        instagram_accounts: instagramAccounts.map(account => ({
          id: account.instagram_business_account?.id,
          name: account.name,
          access_token: account.access_token
        })) || []
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
