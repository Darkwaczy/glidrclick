import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2, AlertCircle, Calendar, CreditCard, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/context/AuthContext';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

type Subscription = {
  id: string;
  plan: string;
  status: string;
  billing_cycle: string;
  amount: number;
  currency: string;
  created_at: string;
  next_billing_date: string;
};

type Transaction = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  description: string;
  plan: string;
};

const BillingPage = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (!user) return;
      
      try {
        // Fetch active subscription
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (subscriptionError && subscriptionError.code !== 'PGRST116') {
          console.error('Error fetching subscription:', subscriptionError);
          toast({
            title: 'Error',
            description: 'Failed to load subscription data',
            variant: 'destructive',
          });
        }

        setSubscription(subscriptionData || null);

        // Fetch transaction history
        const { data: transactionData, error: transactionError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (transactionError) {
          console.error('Error fetching transactions:', transactionError);
        } else {
          setTransactions(transactionData as Transaction[] || []);
        }
      } catch (error) {
        console.error('Error in billing data fetch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionData();
  }, [user]);

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    
    setIsUpdating(true);
    try {
      // Call the cancel subscription function
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { subscription_id: subscription.id },
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: 'Subscription Cancelled',
        description: 'Your subscription has been cancelled successfully',
      });

      // Update the local subscription state
      setSubscription({
        ...subscription,
        status: 'cancelled',
      });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to cancel subscription',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpgradeSubscription = () => {
    navigate('/pricing');
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
      case 'pro':
        return 'bg-neon-electric/20 text-neon-electric border-neon-electric/50';
      case 'elite':
        return 'bg-white/20 text-white border-white/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/50">
          <CheckCircle className="w-3 h-3 mr-1" />Active
        </span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/50">
          <Clock className="w-3 h-3 mr-1" />Pending
        </span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/50">
          <AlertCircle className="w-3 h-3 mr-1" />Cancelled
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/20 text-gray-300 border border-gray-500/50">
          {status}
        </span>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-neon-electric" />
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-transparent">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Billing & Subscription</h1>
        <p className="text-gray-300">Manage your subscription and view your billing history</p>
      </div>

      {/* Current Subscription */}
      <Card className="glass-card border-white/20 bg-dark-secondary/50">
        <CardHeader>
          <CardTitle className="text-white">Current Plan</CardTitle>
          <CardDescription className="text-gray-300">Your current subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          {subscription ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium border ${getPlanBadgeColor(subscription.plan)}`}>
                      {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
                    </span>
                    {getStatusBadge(subscription.status)}
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    {subscription.billing_cycle.charAt(0).toUpperCase() + subscription.billing_cycle.slice(1)} billing
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">₦{subscription.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">per {subscription.billing_cycle === 'monthly' ? 'month' : 'year'}</p>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar size={16} className="mr-2" />
                  Next billing date: {subscription.next_billing_date 
                    ? format(new Date(subscription.next_billing_date), 'MMMM d, yyyy') 
                    : 'N/A'}
                </div>
                <div className="flex gap-2">
                  {subscription.status === 'active' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCancelSubscription}
                      disabled={isUpdating}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Cancel Plan
                    </Button>
                  )}
                  <Button 
                    size="sm"
                    onClick={handleUpgradeSubscription}
                    className="btn-neon"
                  >
                    {subscription.plan !== 'elite' ? 'Upgrade' : 'Renew'} Plan
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">No Active Subscription</h3>
              <p className="text-gray-400 mt-1 mb-4">You're currently on the free plan with limited features.</p>
              <Button onClick={handleUpgradeSubscription} className="btn-neon">
                Upgrade to Premium
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="glass-card border-white/20 bg-dark-secondary/50">
        <CardHeader>
          <CardTitle className="text-white">Billing History</CardTitle>
          <CardDescription className="text-gray-300">Your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/20 text-sm">
                    <th className="pb-2 font-medium text-white">Date</th>
                    <th className="pb-2 font-medium text-white">Description</th>
                    <th className="pb-2 font-medium text-white">Amount</th>
                    <th className="pb-2 font-medium text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-white/20 last:border-b-0">
                      <td className="py-3 text-sm text-gray-300">{format(new Date(transaction.created_at), 'MMM d, yyyy')}</td>
                      <td className="py-3 text-sm text-gray-300">
                        {transaction.plan.charAt(0).toUpperCase() + transaction.plan.slice(1)} Plan Subscription
                      </td>
                      <td className="py-3 text-sm text-white">₦{transaction.amount.toLocaleString()}</td>
                      <td className="py-3">{getStatusBadge(transaction.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-400">No transaction history available</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t border-white/20 bg-white/5">
          <p className="text-sm text-gray-400">
            For any billing issues, please contact our support team at support@glidrclick.com
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BillingPage;
