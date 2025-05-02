
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  const renderFeature = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={20} className="text-green-500 mx-auto" />
      ) : (
        <X size={20} className="text-red-500 mx-auto" />
      );
    }
    return <span>{value}</span>;
  };

  const handlePlanSelection = (plan: 'free' | 'pro' | 'elite') => {
    navigate('/register', { state: { selectedPlan: plan } });
  };

  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing Plans</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core AI blog automation.
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 ${!isAnnual ? 'text-glidr-purple font-semibold' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-glidr-purple ${
                isAnnual ? 'bg-glidr-purple' : 'bg-gray-200'
              }`}
            >
              <span 
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`} 
              />
            </button>
            <span className={`ml-3 ${isAnnual ? 'text-glidr-purple font-semibold' : 'text-gray-500'}`}>
              Annual <span className="text-xs bg-glidr-soft-purple text-glidr-purple px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Trial Plan */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white animate-fade-in-up">
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-2">Free Trial</h3>
              <div className="flex items-end">
                <span className="text-4xl font-bold">₦0</span>
                <span className="text-gray-600 ml-2 mb-1">/ 7 days</span>
              </div>
              <Button 
                onClick={() => handlePlanSelection('free')}
                className="w-full mt-6 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
              >
                Try Free
              </Button>
            </div>
            <div className="bg-gray-50 p-8">
              <ul className="space-y-4">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{feature.title}</span>
                    <span>{renderFeature(feature.free)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="relative border-2 border-glidr-bright-purple rounded-2xl overflow-hidden shadow-lg bg-white transform scale-105 z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 bg-glidr-bright-purple text-white px-4 py-1 text-sm font-medium">
              POPULAR
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
              <div className="flex items-end">
                <span className="text-4xl font-bold">₦{isAnnual ? '7,600' : '9,500'}</span>
                <span className="text-gray-600 ml-2 mb-1">/ mo</span>
              </div>
              <Button 
                onClick={() => handlePlanSelection('pro')}
                className="w-full mt-6 gradient-button text-white rounded-full"
              >
                Get Pro
              </Button>
            </div>
            <div className="bg-glidr-soft-purple p-8">
              <ul className="space-y-4">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{feature.title}</span>
                    <span className="font-medium">{renderFeature(feature.pro)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Elite Plan */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-2">Elite Plan</h3>
              <div className="flex items-end">
                <span className="text-4xl font-bold">₦{isAnnual ? '15,200' : '19,000'}</span>
                <span className="text-gray-600 ml-2 mb-1">/ mo</span>
              </div>
              <Button 
                onClick={() => handlePlanSelection('elite')}
                className="w-full mt-6 bg-gray-800 hover:bg-black text-white rounded-full"
              >
                Go Elite
              </Button>
            </div>
            <div className="bg-gray-50 p-8">
              <ul className="space-y-4">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{feature.title}</span>
                    <span className="font-medium">{renderFeature(feature.elite)}</span>
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
