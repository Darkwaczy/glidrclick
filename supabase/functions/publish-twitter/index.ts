
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { createHmac } from "node:crypto";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string
): string {
  const signatureBaseString = `${method}&${encodeURIComponent(
    url
  )}&${encodeURIComponent(
    Object.entries(params)
      .sort()
      .map(([k, v]) => `${k}=${v}`)
      .join("&")
  )}`;
  const signingKey = `${encodeURIComponent(
    consumerSecret
  )}&${encodeURIComponent(tokenSecret)}`;
  const hmacSha1 = createHmac("sha1", signingKey);
  const signature = hmacSha1.update(signatureBaseString).digest("base64");
  return signature;
}

function generateOAuthHeader(method: string, url: string, consumerKey: string, consumerSecret: string, accessToken: string, accessTokenSecret: string): string {
  const oauthParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: "1.0",
  };

  const signature = generateOAuthSignature(
    method,
    url,
    oauthParams,
    consumerSecret,
    accessTokenSecret
  );

  const signedOAuthParams = {
    ...oauthParams,
    oauth_signature: signature,
  };

  const entries = Object.entries(signedOAuthParams).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    "OAuth " +
    entries
      .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
      .join(", ")
  );
}

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
    
    // Get Twitter credentials from social_platforms table
    const { data: platform, error: platformError } = await supabase
      .from('social_platforms')
      .select('*')
      .eq('user_id', userId)
      .eq('platform_id', 'twitter')
      .eq('is_connected', true)
      .single();

    if (platformError || !platform) {
      throw new Error("Twitter account not connected");
    }

    // Get Twitter API credentials from environment
    const consumerKey = Deno.env.get('TWITTER_CLIENT_ID');
    const consumerSecret = Deno.env.get('TWITTER_CLIENT_SECRET');
    
    if (!consumerKey || !consumerSecret) {
      throw new Error("Twitter API credentials not configured");
    }

    // Prepare tweet content
    let tweetText = content;
    if (title) {
      tweetText = `${title}\n\n${content}`;
    }

    // Truncate to Twitter's character limit
    if (tweetText.length > 280) {
      tweetText = tweetText.substring(0, 277) + '...';
    }

    const url = 'https://api.twitter.com/2/tweets';
    const method = 'POST';
    
    const oauthHeader = generateOAuthHeader(
      method, 
      url, 
      consumerKey, 
      consumerSecret, 
      platform.access_token, 
      platform.refresh_token || ''
    );

    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': oauthHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: tweetText }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`Twitter API error: ${JSON.stringify(responseData)}`);
    }

    // Update post_platforms table with success
    await supabase
      .from('post_platforms')
      .upsert({
        post_id: postId,
        platform_id: 'twitter',
        user_id: userId,
        status: 'published',
        published_at: new Date().toISOString(),
        platform_post_id: responseData.data?.id,
      });

    return new Response(
      JSON.stringify({ 
        success: true,
        externalPostId: responseData.data?.id,
        message: "Post published successfully to Twitter" 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error("Error publishing to Twitter:", error);
    
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
