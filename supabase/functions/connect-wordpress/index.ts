
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
    const WORDPRESS_CLIENT_ID = Deno.env.get('WORDPRESS_CLIENT_ID');
    const redirectUri = new URL(req.url).origin + "/dashboard/social?connected=wordpress";

    if (!WORDPRESS_CLIENT_ID) {
      throw new Error("WordPress client ID not configured");
    }

    // Build the WordPress.com OAuth URL
    const authUrl = `https://public-api.wordpress.com/oauth2/authorize?client_id=${WORDPRESS_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=global`;

    // Return the URL
    return new Response(
      JSON.stringify({ 
        success: true, 
        authUrl 
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    );
  } catch (error) {
    console.error("Error in connect-wordpress function:", error);
    
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
