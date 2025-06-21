
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  status: string;
  billing_cycle: string;
  amount: number;
  currency: string;
  next_billing_date?: string;
  created_at: string;
  updated_at: string;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  const fetchSubscription = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast.error('Failed to load subscription data');
    } finally {
      setIsLoading(false);
    }
  };

  const createSubscription = async (plan: string, billingCycle: string, amount: number) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan,
          status: 'active',
          billing_cycle: billingCycle,
          amount,
          currency: 'NGN',
          next_billing_date: new Date(Date.now() + (billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setSubscription(data);
      toast.success('Subscription created successfully');
      return true;
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast.error('Failed to create subscription');
      return false;
    }
  };

  const cancelSubscription = async () => {
    if (!subscription) return false;

    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          status: 'cancelled',
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscription.id);

      if (error) throw error;

      setSubscription(prev => prev ? { ...prev, status: 'cancelled' } : null);
      toast.success('Subscription cancelled successfully');
      return true;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
      return false;
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, [user]);

  return {
    subscription,
    isLoading,
    createSubscription,
    cancelSubscription,
    refetch: fetchSubscription,
  };
};
