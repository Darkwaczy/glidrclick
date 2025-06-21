
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, MessageCircle, Share2, Users2, Sparkles } from "lucide-react";

const SocialProof = () => {
  const activities = [
    {
      user: "Sarah M.",
      company: "Tech Startup",
      action: "generated 50 blog posts",
      time: "2 hours ago",
      metric: "+300% engagement",
      avatar: "S"
    },
    {
      user: "Mike R.",
      company: "E-commerce",
      action: "automated Instagram posts",
      time: "5 hours ago", 
      metric: "15k new followers",
      avatar: "M"
    },
    {
      user: "Jessica L.",
      company: "Consulting Firm",
      action: "scheduled 2 weeks of content",
      time: "1 day ago",
      metric: "2x conversion rate",
      avatar: "J"
    },
    {
      user: "David K.",
      company: "Restaurant Chain", 
      action: "created viral TikTok content",
      time: "2 days ago",
      metric: "1M+ views",
      avatar: "D"
    }
  ];

  const stats = [
    {
      icon: TrendingUp,
      number: "2.5M+",
      label: "Posts Generated",
      color: "neon-electric"
    },
    {
      icon: MessageCircle,
      number: "150k+",
      label: "Conversations Started",
      color: "neon-pink"
    },
    {
      icon: Share2,
      number: "5M+", 
      label: "Social Shares",
      color: "neon-lime"
    },
    {
      icon: Users2,
      number: "10k+",
      label: "Active Users",
      color: "neon-purple"
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-neon-lime/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-neon-purple/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Real Results, </span>
            <span className="gradient-text">Real People</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See what our community is achieving with FlowCraft 
            <span className="neon-text font-semibold"> right now</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Live Activity Feed */}
          <div>
            <div className="flex items-center mb-8">
              <div className="w-3 h-3 bg-neon-lime rounded-full mr-4 animate-pulse-neon"></div>
              <h3 className="text-2xl font-bold text-white">Live Activity</h3>
            </div>
            
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <Card key={index} className="glass-card border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-neon-electric to-neon-pink rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white/20">
                          {activity.avatar}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-white">{activity.user}</span>
                          <span className="text-gray-400 text-sm">from {activity.company}</span>
                        </div>
                        <p className="text-gray-300 mb-3">{activity.action}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm">{activity.time}</span>
                          <span className="neon-text font-semibold text-sm px-3 py-1 rounded-full glass-dark border border-neon-electric/30">
                            {activity.metric}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center">
              <Sparkles className="text-neon-electric mr-3" size={28} />
              Community Impact
            </h3>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-card border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 text-center p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-${stat.color}/20 to-${stat.color}/10 border border-${stat.color}/30 mx-auto mb-4 hover:animate-neon-glow`}>
                    <stat.icon className={`text-${stat.color}`} size={28} />
                  </div>
                  <div className="text-3xl font-bold mb-2 text-white">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </Card>
              ))}
            </div>

            <Card className="glass-card border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-electric/10 via-neon-pink/10 to-neon-lime/10"></div>
              <CardContent className="p-8 text-center relative z-10">
                <h4 className="text-2xl font-bold mb-4 text-white">
                  Join the <span className="gradient-text">Revolution</span>
                </h4>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Be part of the content revolution that's changing how businesses engage online
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-400">
                    <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse-neon"></div>
                    No setup fees
                  </span>
                  <span className="hidden sm:block text-gray-600">•</span>
                  <span className="flex items-center gap-2 text-gray-400">
                    <div className="w-2 h-2 bg-neon-electric rounded-full animate-pulse-neon"></div>
                    Cancel anytime
                  </span>
                  <span className="hidden sm:block text-gray-600">•</span>
                  <span className="flex items-center gap-2 text-gray-400">
                    <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse-neon"></div>
                    7-day free trial
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
