
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Check, Loader2, X } from 'lucide-react'; // Import the X icon from lucide-react
import { toast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'failed' | null>(null);

  const plan = searchParams.get('plan');
  const cycle = searchParams.get('cycle');
  const txRef = searchParams.get('tx_ref');
  const status = searchParams.get('status');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!txRef) {
        toast({
          title: 'Error',
          description: 'Payment reference not found',
          variant: 'destructive',
        });
        setVerificationStatus('failed');
        setIsVerifying(false);
        return;
      }

      try {
        // Verify payment with Flutterwave
        const { data, error } = await supabase.functions.invoke('verify-flutterwave-payment', {
          body: { reference: txRef },
        });

        if (error || !data.success) {
          throw new Error(error?.message || 'Payment verification failed');
        }

        if (data.payment_status === 'successful') {
          setVerificationStatus('success');
          toast({
            title: 'Payment Successful',
            description: `Your ${plan} subscription is now active!`,
            variant: 'default',
          });
        } else {
          setVerificationStatus('failed');
          toast({
            title: 'Payment Failed',
            description: 'Your payment could not be verified. Please try again.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setVerificationStatus('failed');
        toast({
          title: 'Verification Error',
          description: error instanceof Error ? error.message : 'Failed to verify payment',
          variant: 'destructive',
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [txRef, plan]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {isVerifying ? (
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-glidr-purple mx-auto" />
            <h2 className="mt-4 text-xl font-semibold">Verifying Your Payment</h2>
            <p className="mt-2 text-gray-600">Please wait while we confirm your subscription...</p>
          </div>
        ) : verificationStatus === 'success' ? (
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Payment Successful!</h2>
            <p className="mt-2 text-gray-600">
              Your {plan} plan subscription has been activated successfully.
            </p>
            <div className="mt-6 bg-gray-100 rounded-lg p-4 text-left">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold">{plan?.charAt(0).toUpperCase() + plan?.slice(1)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="text-gray-600">Billing Cycle:</span>
                <span className="font-semibold">{cycle}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-semibold">Active</span>
              </div>
            </div>
            <Button 
              className="mt-8 w-full" 
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <X className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Payment Failed</h2>
            <p className="mt-2 text-gray-600">
              We couldn't verify your payment. Please try again or contact support.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button 
                variant="outline"
                onClick={() => navigate('/pricing')}
              >
                Try Again
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
