
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
    
    // Prepare the caption
    let caption = content;
    if (title) {
      caption = `${title}\n\n${content}`;
    }
    
    // For Instagram, we need to check if we have a valid Instagram business account ID
    const igAccountId = platformSpecificData?.user_id;
    
    if (!igAccountId) {
      throw new Error("No Instagram business account ID provided");
    }
    
    // Instagram requires an image for posts
    // Since we don't have image handling here, we'll simulate a text-only post
    // In a real app, you would upload an image first, then create the media container
    
    // Note: In a real implementation, this is where you would:
    // 1. Upload the image to Facebook's media service
    // 2. Create a media container with the uploaded image
    // 3. Publish the container
    
    // For demo purposes, we'll return a success message
    // In a real app, this would be replaced with the actual Instagram API call
    
    return new Response(
      JSON.stringify({ 
        success: true,
        externalPostId: `ig_simulated_${Date.now()}`,
        message: "Note: Instagram API requires media (image/video). In a complete implementation, this would upload media with your caption." 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
    
    /* A real implementation would look like:
    
    // 1. Create a media container
    const containerResponse = await fetch(`https://graph.facebook.com/v18.0/${igAccountId}/media`, {
      method: 'POST',
      body: JSON.stringify({
        image_url: imageUrl,
        caption: caption,
        access_token: accessToken
      })
    });
    
    const containerData = await containerResponse.json();
    
    if (!containerData.id) {
      throw new Error(`Failed to create media container: ${JSON.stringify(containerData)}`);
    }
    
    // 2. Publish the container
    const publishResponse = await fetch(`https://graph.facebook.com/v18.0/${igAccountId}/media_publish`, {
      method: 'POST',
      body: JSON.stringify({
        creation_id: containerData.id,
        access_token: accessToken
      })
    });
    
    const publishData = await publishResponse.json();
    
    if (!publishData.id) {
      throw new Error(`Failed to publish media: ${JSON.stringify(publishData)}`);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true,
        externalPostId: publishData.id,
        message: "Post published successfully to Instagram" 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
    */
    
  } catch (error) {
    console.error("Error publishing to Instagram:", error);
    
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
