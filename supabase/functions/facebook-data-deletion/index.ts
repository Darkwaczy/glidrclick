
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
    // Check if the request has a body
    const hasBody = req.headers.get("content-length") !== "0";
    
    // For GET requests or empty bodies (Facebook's initial verification)
    if (req.method === 'GET' || !hasBody) {
      console.log("Received verification request from Facebook");
      
      // Return a success response for verification
      return new Response(
        JSON.stringify({ 
          url: "https://your-app-domain.com/privacy",
          confirmation_code: "verification_accepted_" + Date.now()
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // For POST requests with a body (actual deletion request)
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.log("Failed to parse request body:", e);
      throw new Error("Invalid JSON in request body");
    }
    
    console.log("Received data deletion request body:", body);
    
    // Process signed_request if present
    if (body && body.signed_request) {
      const signed_request = body.signed_request;
      
      // Parse the signed request
      // Format is: encoded_signature.encoded_data
      const parts = signed_request.split('.');
      if (parts.length !== 2) {
        throw new Error("Invalid signed request format");
      }
      
      // Decode the data
      const encodedData = parts[1];
      const decodedData = JSON.parse(atob(encodedData.replace(/-/g, '+').replace(/_/g, '/')));
      
      // Log the data (in production, you'd delete user data here)
      console.log("Processing deletion request for user:", decodedData.user_id);
      
      // In a real implementation, you would:
      // 1. Verify that the request is authentic using your app secret
      // 2. Delete all user data associated with the provided user_id
      // 3. Return confirmation
      
      return new Response(
        JSON.stringify({ 
          url: "https://your-app-domain.com/privacy",
          confirmation_code: "deletion_confirmed_" + Date.now()
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // If we get here, the request didn't have a signed_request
    throw new Error("Missing signed_request parameter");
    
  } catch (error) {
    console.error("Error processing Facebook data deletion request:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
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
});
