
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuthContext } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface PricingFeature {
  title: string;
  free: boolean | string;
  pro: boolean | string;
  elite: boolean | string;
}

const pricingFeatures: PricingFeature[] = [
  { title: 'Posts/Day', free: '1', pro: '5', elite: 'Unlimited' },
  { title: 'Platforms', free: 'Blog Only', pro: 'Blog + 2 Social', elite: 'All Platforms' },
  { title: 'AI Images', free: false, pro: true, elite: 'Yes + HD' },
  { title: 'Support', free: 'Basic', pro: 'Priority', elite: '24/7 VIP' },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  
  const renderFeature = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={20} className="text-neon-lime mx-auto" />
      ) : (
        <X size={20} className="text-red-400 mx-auto" />
      );
    }
    return <span className="text-white font-medium">{value}</span>;
  };

  const handlePlanSelection = async (plan: 'free' | 'pro' | 'elite') => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { selectedPlan: plan } });
      return;
    }
    
    try {
      setIsLoading(plan);
      
      if (plan === 'free') {
        navigate('/dashboard');
        return;
      }
      
      const { data, error } = await supabase.functions.invoke('create-flutterwave-payment', {
        body: { plan, isAnnual },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else if (data?.redirectUrl) {
        navigate(data.redirectUrl);
      } else {
        throw new Error('No payment URL returned');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast({
        title: 'Payment Error',
        description: error instanceof Error ? error.message : 'Failed to initiate payment',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <section className="py-24 relative" id="pricing">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-neon-pink/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-neon-electric/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Pricing </span>
            <span className="gradient-text">Plans</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that fits your needs. All plans include our 
            <span className="neon-text font-semibold"> core AI blog automation</span>.
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 text-lg ${!isAnnual ? 'text-neon-electric font-semibold' : 'text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neon-electric ${
                isAnnual ? 'bg-gradient-to-r from-neon-electric to-neon-pink' : 'bg-gray-600'
              }`}
            >
              <span 
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-lg ${
                  isAnnual ? 'translate-x-7' : 'translate-x-1'
                }`} 
              />
            </button>
            <span className={`ml-3 text-lg ${isAnnual ? 'text-neon-electric font-semibold' : 'text-gray-400'}`}>
              Annual <span className="text-xs bg-neon-lime/20 text-neon-lime px-2 py-1 rounded-full ml-2">Save 20%</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Trial Plan */}
          <div className="glass-card border-white/20 rounded-2xl overflow-hidden hover:border-white/40 transition-all duration-300 hover:scale-105 animate-slide-up">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Free Trial</h3>
              <div className="flex items-end mb-6">
                <span className="text-5xl font-bold text-white">₦0</span>
                <span className="text-gray-300 ml-2 mb-2 text-lg">/ 7 days</span>
              </div>
              <Button 
                onClick={() => handlePlanSelection('free')}
                disabled={isLoading !== null}
                className="w-full btn-glass text-white border-white/30 hover:border-neon-electric/50 font-semibold text-lg py-3"
              >
                {isLoading === 'free' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : 'Try Free'}
              </Button>
            </div>
            <div className="glass-dark p-8 border-t border-white/10">
              <ul className="space-y-4">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-300 font-medium">{feature.title}</span>
                    <span>{renderFeature(feature.free)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="relative glass-card border-neon-electric/50 rounded-2xl overflow-hidden shadow-2xl transform scale-105 z-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 bg-gradient-to-r from-neon-electric to-neon-pink text-white px-6 py-2 text-sm font-bold shadow-lg">
              POPULAR
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Pro Plan</h3>
              <div className="flex items-end mb-6">
                <span className="text-5xl font-bold gradient-text">₦{isAnnual ? '7,600' : '9,500'}</span>
                <span className="text-gray-300 ml-2 mb-2 text-lg">/ mo</span>
              </div>
              <Button 
                onClick={() => handlePlanSelection('pro')}
                disabled={isLoading !== null}
                className="w-full btn-neon text-white font-semibold text-lg py-3"
              >
                {isLoading === 'pro' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : 'Get Pro'}
              </Button>
            </div>
            <div className="glass-dark p-8 border-t border-white/10">
              <ul className="space-y-4">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-300 font-medium">{feature.title}</span>
                    <span>{renderFeature(feature.pro)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Elite Plan */}
          <div className="glass-card border-white/20 rounded-2xl overflow-hidden hover:border-white/40 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Elite Plan</h3>
              <div className="flex items-end mb-6">
                <span className="text-5xl font-bold text-white">₦{isAnnual ? '15,200' : '19,000'}</span>
                <span className="text-gray-300 ml-2 mb-2 text-lg">/ mo</span>
              </div>
              <Button 
                onClick={() => handlePlanSelection('elite')}
                disabled={isLoading !== null}
                className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-black hover:to-gray-900 text-white font-semibold text-lg py-3"
              >
                {isLoading === 'elite' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : 'Go Elite'}
              </Button>
            </div>
            <div className="glass-dark p-8 border-t border-white/10">
              <ul className="space-y-4">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-300 font-medium">{feature.title}</span>
                    <span>{renderFeature(feature.elite)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
