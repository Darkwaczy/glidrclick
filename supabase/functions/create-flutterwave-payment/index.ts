
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

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? "",
      Deno.env.get('SUPABASE_ANON_KEY') ?? ""
    );

    // Extract request details
    const { plan, isAnnual } = await req.json();
    
    // Get user details from the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error("Not authenticated");
    }
    
    const token = authHeader.replace('Bearer ', '');
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user) {
      console.error("Authentication error:", userError);
      throw new Error("Authentication failed");
    }
    
    const user = userData.user;
    console.log(`Creating payment for user: ${user.id}, plan: ${plan}, isAnnual: ${isAnnual}`);
    
    // Determine pricing based on plan and billing cycle
    let amount;
    let currency = "NGN";
    let interval = isAnnual ? "yearly" : "monthly";
    let planName = "";
    
    switch (plan) {
      case 'free':
        // Free trial should not be charged
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Free trial activated",
            redirectUrl: `${req.headers.get("origin")}/dashboard`
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      case 'pro':
        amount = isAnnual ? 7600 * 12 : 9500; // Annual vs Monthly pricing
        planName = "Pro Plan";
        break;
      case 'elite':
        amount = isAnnual ? 15200 * 12 : 19000; // Annual vs Monthly pricing
        planName = "Elite Plan";
        break;
      default:
        throw new Error("Invalid plan selected");
    }

    // Create a unique reference for this payment
    const reference = `glidrclick-${plan}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    console.log(`Generated payment reference: ${reference}`);

    // Initialize Flutterwave payment
    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${cleanKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tx_ref: reference,
        amount: amount,
        currency: currency,
        redirect_url: `${req.headers.get("origin")}/payment-success?plan=${plan}&cycle=${interval}`,
        customer: {
          email: user.email,
          name: user.user_metadata?.full_name || user.email
        },
        customizations: {
          title: `Glidrclick ${planName} Subscription`,
          description: `${planName} ${interval} subscription`,
          logo: `${req.headers.get("origin")}/favicon.ico`
        },
        meta: {
          plan: plan,
          user_id: user.id,
          isAnnual: isAnnual
        }
      })
    });

    const paymentData = await response.json();
    
    console.log("Flutterwave payment response:", JSON.stringify(paymentData));
    
    if (!paymentData.status || paymentData.status !== "success") {
      console.error("Payment initialization failed:", paymentData);
      throw new Error(paymentData.message || "Failed to initialize payment");
    }

    // Create a service role client to write to the subscriptions table
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? "",
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ""
    );

    // Record the pending subscription
    const { data, error } = await supabaseAdmin.from('subscriptions').insert({
      user_id: user.id,
      plan: plan,
      billing_cycle: interval,
      status: 'pending',
      payment_reference: reference,
      amount: amount,
      currency: currency,
      next_billing_date: new Date(Date.now() + (isAnnual ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString()
    });

    if (error) {
      console.error("Error creating subscription record:", error);
      // We still continue because the payment has been initialized successfully
    } else {
      console.log("Subscription record created");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        payment_url: paymentData.data.link,
        reference: reference 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error("Error in create-flutterwave-payment function:", error);
    
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
