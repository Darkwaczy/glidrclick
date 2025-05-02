
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
    // Get the OAuth configuration parameters
    const TWITTER_CLIENT_ID = Deno.env.get('TWITTER_CLIENT_ID');
    const redirectUri = new URL(req.url).origin + "/dashboard/social?connected=twitter";

    if (!TWITTER_CLIENT_ID) {
      throw new Error("Twitter client ID not configured");
    }

    // Generate state and code challenge for PKCE
    const state = Math.random().toString(36).substring(2, 15);
    const codeVerifier = Math.random().toString(36).substring(2, 15) + 
                       Math.random().toString(36).substring(2, 15) + 
                       Math.random().toString(36).substring(2, 15);
    
    // Store the code verifier in the response for the client to save temporarily
    // In a real app, you might want to store this server-side or in a secure cookie
    
    // Build the Twitter OAuth URL (OAuth 2.0 with PKCE)
    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=${state}&code_challenge=challenge&code_challenge_method=plain`;

    // Return the URL and code verifier
    return new Response(
      JSON.stringify({ 
        success: true, 
        authUrl,
        state,
        codeVerifier
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    );
  } catch (error) {
    console.error("Error in connect-twitter function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
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
