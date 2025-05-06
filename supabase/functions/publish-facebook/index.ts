
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
    const { postId, content, title, accessToken, platformSpecificData } = await req.json();
    
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    
    if (!content) {
      throw new Error("Content is required");
    }
    
    // Prepare the post content
    let message = content;
    if (title) {
      message = `${title}\n\n${content}`;
    }
    
    // Get the user or page ID
    const targetId = platformSpecificData?.user_id || 'me';
    
    // Post to Facebook
    const response = await fetch(`https://graph.facebook.com/v18.0/${targetId}/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        access_token: accessToken
      })
    });
    
    const data = await response.json();
    
    if (!data.id) {
      throw new Error(`Failed to publish post: ${JSON.stringify(data)}`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true,
        externalPostId: data.id,
        message: "Post published successfully to Facebook" 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Error publishing to Facebook:", error);
    
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
