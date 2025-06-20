
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
    const LINKEDIN_CLIENT_ID = Deno.env.get('LINKEDIN_CLIENT_ID');
    const redirectUri = new URL(req.url).origin + "/dashboard/social?connected=linkedin";

    if (!LINKEDIN_CLIENT_ID) {
      throw new Error("LinkedIn client ID not configured");
    }

    // Generate state for security
    const state = Math.random().toString(36).substring(2, 15);

    // Build the LinkedIn OAuth URL
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&state=${state}&scope=r_emailaddress%20r_liteprofile%20w_member_social`;

    // Return the URL
    return new Response(
      JSON.stringify({ 
        success: true, 
        authUrl,
        state
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    );
  } catch (error) {
    console.error("Error in connect-linkedin function:", error);
    
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
