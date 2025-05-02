
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

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
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? "",
      Deno.env.get('SUPABASE_ANON_KEY') ?? ""
    );

    // Get user details from the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error("Not authenticated");
    }
    
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      throw new Error("Authentication failed");
    }
    
    const user = userData.user;

    // Create a service role client to get subscription data
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? "",
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ""
    );

    // Get active subscription
    const { data: subscription, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (subError && subError.code !== 'PGRST116') {
      throw new Error(subError.message);
    }

    // Check if subscription has expired (if exists)
    if (subscription && subscription.next_billing_date) {
      const nextBillingDate = new Date(subscription.next_billing_date);
      const now = new Date();
      
      if (nextBillingDate < now) {
        // Subscription has expired
        await supabaseAdmin
          .from('subscriptions')
          .update({
            status: 'expired',
            updated_at: now.toISOString()
          })
          .eq('id', subscription.id);
          
        return new Response(
          JSON.stringify({ 
            has_subscription: false,
            plan: null,
            billing_cycle: null,
            next_billing_date: null 
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ 
        has_subscription: !!subscription,
        plan: subscription?.plan || null,
        billing_cycle: subscription?.billing_cycle || null,
        next_billing_date: subscription?.next_billing_date || null
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("Error in check-subscription function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
