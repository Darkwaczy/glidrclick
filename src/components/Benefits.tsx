
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, Users, Zap, DollarSign, Target, Shield, Sparkles } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save 15+ Hours Weekly",
      description: "Automate your entire content pipeline and reclaim your time for strategic work that matters.",
      metric: "90% time reduction",
      color: "neon-electric"
    },
    {
      icon: TrendingUp,
      title: "300% Engagement Boost",
      description: "AI-optimized content consistently outperforms manual posts with higher engagement rates.",
      metric: "Proven results",
      color: "neon-pink"
    },
    {
      icon: Users,
      title: "Exponential Growth",
      description: "Consistent, high-quality content helps you attract and retain more followers across platforms.",
      metric: "2x faster growth",
      color: "neon-lime"
    },
    {
      icon: DollarSign,
      title: "Slash Marketing Costs",
      description: "Replace expensive agencies and freelancers with our intelligent AI-powered solution.",
      metric: "Up to 80% savings",
      color: "neon-purple"
    },
    {
      icon: Zap,
      title: "Lightning Fast Creation",
      description: "Generate blog posts, social content, and captions in seconds, not hours.",
      metric: "10x faster output",
      color: "neon-orange"
    },
    {
      icon: Target,
      title: "Maximize ROI",
      description: "Advanced analytics and optimization ensure every piece of content drives results.",
      metric: "250% ROI increase",
      color: "neon-electric"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "2.5M+", label: "Posts Generated", icon: Sparkles },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "AI Support", icon: Zap }
  ];

  return (
    <section className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-neon-electric/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-r from-neon-pink/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-neon-lime/5 to-neon-purple/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Measurable </span>
            <span className="gradient-text">Results</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Don't just take our word for it. Here are the real benefits our customers experience
            <span className="neon-text font-semibold"> every single day</span>.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="glass-card p-6 border-white/20 hover:border-white/40 transition-all duration-300 group-hover:scale-105">
                <stat.icon className="text-neon-electric mx-auto mb-4 group-hover:animate-neon-glow" size={32} />
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {benefits.map((benefit, index) => (
            <Card key={index} className="glass-card border-white/20 hover:border-white/40 transition-all duration-500 group hover:scale-105 hover:-translate-y-2">
              <CardContent className="p-8 text-center h-full flex flex-col">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-${benefit.color}/20 to-${benefit.color}/10 border border-${benefit.color}/30 mx-auto mb-6 group-hover:animate-neon-glow transition-all duration-300`}>
                  <benefit.icon className={`text-${benefit.color} group-hover:scale-110 transition-transform`} size={36} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
                  {benefit.description}
                </p>
                
                <div className="mt-auto">
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r from-${benefit.color}/20 to-${benefit.color}/10 border border-${benefit.color}/30`}>
                    <span className={`text-${benefit.color} font-bold text-sm`}>
                      {benefit.metric}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="glass-card p-10 max-w-4xl mx-auto border-white/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(0, 245, 255, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(255, 20, 147, 0.3) 0%, transparent 50%)
                `
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to <span className="gradient-text">Transform</span> Your Content Strategy?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already experiencing these incredible results with FlowCraft
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-6 text-gray-400">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse-neon"></div>
                    ⭐⭐⭐⭐⭐ 4.9/5 rating
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-electric rounded-full animate-pulse-neon"></div>
                    2,000+ happy users
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
