
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

async function publishToSocialMedia(postId: string, platformId: string, content: string, title?: string, userId?: string) {
  try {
    let functionName = '';
    
    switch (platformId) {
      case 'facebook':
        functionName = 'publish-facebook';
        break;
      case 'twitter':
        functionName = 'publish-twitter';
        break;
      case 'instagram':
        functionName = 'publish-instagram';
        break;
      case 'linkedin':
        functionName = 'publish-linkedin';
        break;
      default:
        throw new Error(`Unsupported platform: ${platformId}`);
    }

    const { data, error } = await supabase.functions.invoke(functionName, {
      body: {
        postId,
        content,
        title,
        userId
      }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error publishing to ${platformId}:`, error);
    
    // Update post_platforms table with error
    await supabase
      .from('post_platforms')
      .upsert({
        post_id: postId,
        platform_id: platformId,
        user_id: userId,
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
      });
    
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

serve(async (req) => {
  // Handle preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Checking for scheduled posts to publish...');
    
    // Get all posts that are scheduled and should be published now
    const now = new Date().toISOString();
    const { data: scheduledPosts, error: postsError } = await supabase
      .from('posts')
      .select(`
        *,
        post_platforms(platform_id, user_id)
      `)
      .eq('status', 'scheduled')
      .lte('scheduled_for', now);

    if (postsError) {
      throw postsError;
    }

    if (!scheduledPosts || scheduledPosts.length === 0) {
      console.log('No scheduled posts found to publish');
      return new Response(
        JSON.stringify({ 
          message: 'No scheduled posts to publish',
          processed: 0 
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    console.log(`Found ${scheduledPosts.length} posts to publish`);
    let successCount = 0;
    let errorCount = 0;

    // Process each scheduled post
    for (const post of scheduledPosts) {
      try {
        console.log(`Processing post ${post.id}: ${post.title}`);
        
        // Get platforms for this post
        if (post.post_platforms && post.post_platforms.length > 0) {
          for (const platformLink of post.post_platforms) {
            try {
              const result = await publishToSocialMedia(
                post.id,
                platformLink.platform_id,
                post.content,
                post.title,
                platformLink.user_id
              );
              
              if (result.success) {
                console.log(`Successfully published post ${post.id} to ${platformLink.platform_id}`);
                successCount++;
              } else {
                console.error(`Failed to publish post ${post.id} to ${platformLink.platform_id}:`, result.error);
                errorCount++;
              }
            } catch (platformError) {
              console.error(`Error publishing post ${post.id} to ${platformLink.platform_id}:`, platformError);
              errorCount++;
            }
          }
        }

        // Update post status to published
        const { error: updateError } = await supabase
          .from('posts')
          .update({
            status: 'published',
            published_at: new Date().toISOString()
          })
          .eq('id', post.id);

        if (updateError) {
          console.error(`Error updating post ${post.id} status:`, updateError);
        }

      } catch (postError) {
        console.error(`Error processing post ${post.id}:`, postError);
        errorCount++;
      }
    }

    console.log(`Scheduled post processing complete. Success: ${successCount}, Errors: ${errorCount}`);

    return new Response(
      JSON.stringify({ 
        message: 'Scheduled posts processed',
        processed: scheduledPosts.length,
        successful: successCount,
        errors: errorCount
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error("Error in schedule-posts function:", error);
    
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
