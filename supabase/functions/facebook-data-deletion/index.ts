
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
    // Parse the Facebook deletion request
    const { signed_request } = await req.json();
    
    if (!signed_request) {
      throw new Error("Signed request is required");
    }
    
    // In production, you should verify the signed_request
    // using your Facebook App Secret. This is just a placeholder implementation.
    
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
    console.log("Received deletion request for user:", decodedData.user_id);
    
    // In a real implementation, you would:
    // 1. Verify that the request is authentic using your app secret
    // 2. Delete all user data associated with the provided user_id
    // 3. Return confirmation
    
    // Return a success response as required by Facebook
    return new Response(
      JSON.stringify({ 
        url: "https://your-app-domain.com/privacy-policy",
        confirmation_code: "deletion_confirmed_" + Date.now() // You can use any unique confirmation code
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
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
