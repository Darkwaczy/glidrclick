
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
    
    // Revoke the access token by deleting permissions
    const response = await fetch(`https://graph.facebook.com/v18.0/me/permissions`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    
    // Check if the response is ok before parsing
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`Failed to revoke token: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    
    console.log('Facebook token revocation response:', JSON.stringify(data));
    
    return new Response(
      JSON.stringify({ 
        success: data.success || true,
        message: "Facebook permissions revoked successfully" 
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
