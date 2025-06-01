
import { Shield, Clock, Lock, Award, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const trustBadges = [
  { icon: Clock, text: "99.9% Uptime", color: "text-green-500" },
  { icon: Lock, text: "Secure API", color: "text-blue-500" },
  { icon: Shield, text: "GDPR Compliant", color: "text-purple-500" },
  { icon: Award, text: "ISO Certified", color: "text-orange-500" },
];

const brandLogos = [
  "TechCrunch", "Forbes", "Wired", "Fast Company", "Business Insider", "The Verge"
];

const companyLogos = [
  "Shopify", "Stripe", "Notion", "Slack", "Zoom", "Adobe", "Microsoft", "Google"
];

const TrustSignals = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Trust Stats */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-700">4.9/5 from 2,000+ reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by <span className="gradient-text">5,000+ Businesses</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of companies already automating their content with Glidrclick
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {trustBadges.map((badge, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <badge.icon className={`w-8 h-8 ${badge.color} mb-3`} />
                <span className="font-semibold text-gray-800">{badge.text}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured In */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-600 mb-6">FEATURED IN</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            {brandLogos.map((brand, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-6">TRUSTED BY LEADING COMPANIES</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {companyLogos.map((company, index) => (
              <div key={index} className="text-xl font-semibold text-gray-500 hover:text-gray-700 transition-colors duration-300 opacity-60 hover:opacity-100 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
