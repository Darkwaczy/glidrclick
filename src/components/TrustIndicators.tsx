
import React from "react";
import { Shield, Award, Users, Zap, Lock, HeadphonesIcon } from "lucide-react";

const TrustIndicators = () => {
  const indicators = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and SOC 2 compliance"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Featured in TechCrunch and Product Hunt #1"
    },
    {
      icon: Users,
      title: "Trusted by 10k+ Users",
      description: "From startups to Fortune 500 companies"
    },
    {
      icon: Zap,
      title: "99.9% Uptime",
      description: "Reliable service you can count on"
    },
    {
      icon: Lock,
      title: "GDPR Compliant",
      description: "Your data is safe and secure with us"
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Real humans ready to help anytime"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of companies that trust Glidrclick with their content strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {indicators.map((indicator, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <indicator.icon className="text-white" size={32} />
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{indicator.title}</h3>
              <p className="text-gray-600 text-sm">{indicator.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Featured in:</div>
            <div className="text-lg text-gray-500">TechCrunch</div>
            <div className="text-lg text-gray-500">Product Hunt</div>
            <div className="text-lg text-gray-500">Forbes</div>
            <div className="text-lg text-gray-500">Entrepreneur</div>
            <div className="text-lg text-gray-500">Inc. Magazine</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
