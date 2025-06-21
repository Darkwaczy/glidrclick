
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  // Handle preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postId, content, title, userId } = await req.json();
    
    if (!postId || !content || !userId) {
      throw new Error("Missing required fields: postId, content, userId");
    }
    
    // Get LinkedIn credentials from social_platforms table
    const { data: platform, error: platformError } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('user_id', userId)
      .eq('platform_id', 'linkedin')
      .eq('is_connected', true)
      .single();

    if (platformError || !platform) {
      throw new Error("LinkedIn account not connected");
    }

    // Prepare post content
    let postText = content;
    if (title) {
      postText = `${title}\n\n${content}`;
    }

    // Get LinkedIn person URN (user ID)
    const personUrn = platform.account_id || 'urn:li:person:' + platform.metadata?.personId;

    const postData = {
      author: personUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: postText
          },
          shareMediaCategory: "NONE"
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
      }
    };

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${platform.access_token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(postData)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${JSON.stringify(responseData)}`);
    }

    // Update post_platforms table with success
    await supabase
      .from('post_platforms')
      .upsert({
        post_id: postId,
        platform_id: 'linkedin',
        user_id: userId,
        status: 'published',
        published_at: new Date().toISOString(),
        platform_post_id: responseData.id,
      });

    return new Response(
      JSON.stringify({ 
        success: true,
        externalPostId: responseData.id,
        message: "Post published successfully to LinkedIn" 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Error publishing to LinkedIn:", error);
    
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
