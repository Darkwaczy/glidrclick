
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
    
    const LINKEDIN_CLIENT_ID = Deno.env.get("LINKEDIN_CLIENT_ID");
    const LINKEDIN_CLIENT_SECRET = Deno.env.get("LINKEDIN_CLIENT_SECRET");
    
    if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET) {
      throw new Error("LinkedIn app configuration missing");
    }
    
    // Exchange the authorization code for an access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET
      })
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      throw new Error("Failed to obtain access token: " + JSON.stringify(tokenData));
    }
    
    // Get user profile information
    const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    const profileData = await profileResponse.json();
    
    // Get user email address
    const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    const emailData = await emailResponse.json();
    
    // Extract email address if available
    let email = null;
    try {
      email = emailData.elements[0]['handle~'].emailAddress;
    } catch (e) {
      console.log("Could not extract email:", e);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token || null,
        expires_in: tokenData.expires_in || null,
        user_id: profileData.id,
        account_name: `${profileData.localizedFirstName || ''} ${profileData.localizedLastName || ''}`.trim(),
        email: email
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Error in oauth-linkedin function:", error);
    
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
