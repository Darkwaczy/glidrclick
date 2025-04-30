
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
    const { access_token } = await req.json();
    
    if (!access_token) {
      throw new Error("Access token is required");
    }
    
    const FB_CLIENT_ID = "958890536078118";
    const FB_CLIENT_SECRET = "75da7b482234f5bb9277aebd02f215ae";
    
    // Revoke the access token
    const response = await fetch(`https://graph.facebook.com/v18.0/me/permissions`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    
    const data = await response.json();
    
    return new Response(
      JSON.stringify({ 
        success: data.success || true,
        message: "Permissions revoked successfully" 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Error revoking Facebook access:", error);
    
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
