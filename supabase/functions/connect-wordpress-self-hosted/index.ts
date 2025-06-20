
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
    // Parse the request body
    const { userId, siteUrl, username, applicationPassword } = await req.json();
    
    // Validation
    if (!userId) throw new Error("User ID is required");
    if (!siteUrl) throw new Error("WordPress site URL is required");
    if (!username) throw new Error("Username is required");
    if (!applicationPassword) throw new Error("Application password is required");
    
    // Normalize the site URL
    let normalizedSiteUrl = siteUrl;
    if (!normalizedSiteUrl.startsWith('http')) {
      normalizedSiteUrl = 'https://' + normalizedSiteUrl;
    }
    if (normalizedSiteUrl.endsWith('/')) {
      normalizedSiteUrl = normalizedSiteUrl.slice(0, -1);
    }
    
    // Verify connection to the WordPress site
    const testResponse = await fetch(`${normalizedSiteUrl}/wp-json/wp/v2/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + applicationPassword)
      }
    });
    
    const testData = await testResponse.json();
    
    if (testResponse.status !== 200 || !testData.id) {
      throw new Error("Failed to connect to WordPress site. Please check your credentials.");
    }
    
    // Get the supabase client
    const supabaseClient = Deno.env.get('SUPABASE_URL') 
      ? { 
          url: Deno.env.get('SUPABASE_URL')!,
          key: Deno.env.get('SUPABASE_ANON_KEY')!,
          authHeader: req.headers.get('Authorization')!
        } 
      : null;
      
    if (!supabaseClient) {
      throw new Error("Supabase configuration not found");
    }
    
    // Store the WordPress connection in the database
    const connectionData = {
      user_id: userId,
      platform_id: 'wordpress',
      name: 'WordPress Blog',
      icon: 'wordpress',
      is_connected: true,
      account_name: testData.name || username,
      last_sync: new Date().toISOString(),
      sync_frequency: 'daily',
      access_token: btoa(username + ':' + applicationPassword), // Base64 encode for basic auth
      notifications: { mentions: true, messages: true }
    };
    
    // Make the API request to store the connection
    const storeResponse = await fetch(`${supabaseClient.url}/rest/v1/social_platforms`, {
      method: 'POST',
      headers: {
        'Authorization': supabaseClient.authHeader,
        'apikey': supabaseClient.key,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(connectionData)
    });
    
    if (!storeResponse.ok) {
      throw new Error("Failed to store WordPress connection");
    }
    
    // Return success
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Successfully connected to WordPress site",
        site: {
          name: testData.name,
          url: normalizedSiteUrl
        }
      }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    );
  } catch (error) {
    console.error("Error in connect-wordpress-self-hosted function:", error);
    
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
