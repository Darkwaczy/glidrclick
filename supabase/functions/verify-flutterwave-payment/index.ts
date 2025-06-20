
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
    // Get Flutterwave secret key
    const FLUTTERWAVE_SECRET_KEY = Deno.env.get('FLUTTERWAVE_SECRET_KEY');
    if (!FLUTTERWAVE_SECRET_KEY) {
      throw new Error("Flutterwave secret key not configured");
    }

    // Extract request details
    const { reference } = await req.json();
    
    if (!reference) {
      throw new Error("Payment reference is required");
    }

    // Verify the transaction
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${reference}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const verificationData = await response.json();
    
    if (!verificationData.status || verificationData.status !== "success") {
      throw new Error("Payment verification failed");
    }

    const paymentStatus = verificationData.data?.status;
    const isSuccessful = paymentStatus === "successful" || paymentStatus === "completed";

    // Create a service role client to update the subscriptions table
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? "",
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ""
    );

    // Get the subscription details
    const { data: subscriptionData, error: fetchError } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('payment_reference', reference)
      .single();
      
    if (fetchError || !subscriptionData) {
      throw new Error("Subscription not found");
    }

    // Update the subscription status
    await supabaseAdmin
      .from('subscriptions')
      .update({
        status: isSuccessful ? 'active' : 'failed',
        updated_at: new Date().toISOString(),
        payment_details: verificationData.data
      })
      .eq('payment_reference', reference);

    return new Response(
      JSON.stringify({ 
        success: true, 
        payment_status: isSuccessful ? 'successful' : 'failed',
        subscription_status: isSuccessful ? 'active' : 'failed',
        transaction_details: verificationData.data
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("Error in verify-flutterwave-payment function:", error);
    
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
