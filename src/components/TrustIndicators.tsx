
import React from "react";
import { Shield, Award, Users, Zap, Lock, HeadphonesIcon } from "lucide-react";

const TrustIndicators = () => {
  const indicators = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and SOC 2 compliance for your peace of mind",
      color: "neon-electric"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Featured in TechCrunch and ranked #1 on Product Hunt",
      color: "neon-pink"
    },
    {
      icon: Users,
      title: "Trusted by 10k+ Users",
      description: "From startups to Fortune 500 companies worldwide",
      color: "neon-lime"
    },
    {
      icon: Zap,
      title: "99.9% Uptime",
      description: "Rock-solid reliability you can count on 24/7",
      color: "neon-purple"
    },
    {
      icon: Lock,
      title: "GDPR Compliant",
      description: "Your data is protected with the highest standards",
      color: "neon-orange"
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 AI Support",
      description: "Instant help whenever you need it, powered by AI",
      color: "neon-electric"
    }
  ];

  const brands = [
    "TechCrunch", "Product Hunt", "Forbes", "Entrepreneur", "Inc. Magazine", "Wired"
  ];

  return (
    <section className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-electric/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-pink/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Trusted by </span>
            <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join the growing community of businesses that trust FlowCraft 
            <span className="neon-text font-semibold"> with their content strategy</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {indicators.map((indicator, index) => (
            <div key={index} className="group text-center">
              <div className="glass-card p-8 border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 h-full">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-${indicator.color}/20 to-${indicator.color}/10 border border-${indicator.color}/30 mx-auto mb-6 group-hover:animate-neon-glow transition-all duration-300`}>
                  <indicator.icon className={`text-${indicator.color} group-hover:scale-110 transition-transform`} size={36} />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white">{indicator.title}</h3>
                <p className="text-gray-300 leading-relaxed">{indicator.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Mentions */}
        <div className="text-center">
          <div className="glass-card p-8 border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-white">
              <span className="neon-text">Featured</span> In
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {brands.map((brand, index) => (
                <div key={index} className="text-lg text-gray-400 hover:text-neon-electric transition-colors duration-300 cursor-pointer">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
