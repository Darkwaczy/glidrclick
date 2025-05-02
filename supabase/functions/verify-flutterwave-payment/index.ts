
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
    
    // Remove any trailing 'X' or '-X' if present in the key
    const cleanKey = FLUTTERWAVE_SECRET_KEY.replace(/-X$/, '');
    
    console.log("Using Flutterwave API with properly formatted key");

    // Extract request details
    const { reference } = await req.json();
    
    if (!reference) {
      throw new Error("Payment reference is required");
    }

    console.log(`Verifying Flutterwave payment with reference: ${reference}`);

    // Verify the transaction
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${reference}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${cleanKey}`,
        "Content-Type": "application/json"
      }
    });

    const verificationData = await response.json();
    
    console.log("Flutterwave verification response:", JSON.stringify(verificationData));
    
    if (!verificationData.status || verificationData.status !== "success") {
      console.error("Payment verification failed:", verificationData);
      throw new Error("Payment verification failed: " + (verificationData.message || "Unknown error"));
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
      console.error("Subscription fetch error:", fetchError);
      throw new Error("Subscription not found for reference: " + reference);
    }

    console.log("Found subscription:", subscriptionData.id);

    // Update the subscription status
    const { error: updateError } = await supabaseAdmin
      .from('subscriptions')
      .update({
        status: isSuccessful ? 'active' : 'failed',
        updated_at: new Date().toISOString(),
        payment_details: verificationData.data
      })
      .eq('payment_reference', reference);
    
    if (updateError) {
      console.error("Subscription update error:", updateError);
      throw new Error("Failed to update subscription status");
    }

    console.log(`Subscription ${subscriptionData.id} updated to status: ${isSuccessful ? 'active' : 'failed'}`);

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
