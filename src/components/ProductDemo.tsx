
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Monitor, Smartphone, Globe, BarChart3 } from "lucide-react";

const ProductDemo = () => {
  const [activeDemo, setActiveDemo] = useState("dashboard");

  const demoTabs = [
    { id: "dashboard", label: "Dashboard", icon: Monitor },
    { id: "mobile", label: "Mobile", icon: Smartphone },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "social", label: "Social", icon: Globe }
  ];

  return (
    <section className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-neon-purple/5 to-neon-electric/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">See </span>
            <span className="gradient-text">FlowCraft</span>
            <span className="text-white"> in Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of content automation with our 
            <span className="neon-text font-semibold"> intelligent platform</span>
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Demo Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {demoTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDemo(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeDemo === tab.id
                    ? "glass-card border-neon-electric/50 text-neon-electric"
                    : "glass-dark border-white/20 text-gray-300 hover:border-white/40 hover:text-white"
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Demo Area */}
          <Card className="glass-card border-white/20 overflow-hidden mb-12">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-dark-secondary to-dark-tertiary aspect-video flex items-center justify-center">
                {/* Simulated Interface */}
                <div className="absolute inset-4 glass-dark rounded-xl border border-white/20 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-400">FlowCraft Dashboard</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="glass-dark p-4 rounded-lg border border-white/10">
                        <div className="w-full h-2 bg-gradient-to-r from-neon-electric to-neon-pink rounded-full mb-2"></div>
                        <div className="w-3/4 h-2 bg-gray-600 rounded-full"></div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button
                      size="lg"
                      className="btn-neon text-white font-semibold group"
                    >
                      <Play size={24} className="mr-3 group-hover:scale-110 transition-transform" />
                      Watch Full Demo (2:30)
                    </Button>
                    <p className="text-gray-400 mt-3">See how it works in under 3 minutes</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 glass-card p-3 animate-float">
                  <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse-neon"></div>
                </div>
                <div className="absolute bottom-4 left-4 glass-card p-3 animate-float" style={{animationDelay: '1s'}}>
                  <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse-neon"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Connect Platforms",
                description: "Link all your social accounts and blogs with one-click integrations",
                color: "neon-electric"
              },
              {
                step: "02", 
                title: "AI Creates Content",
                description: "Watch as our AI generates engaging, on-brand content automatically",
                color: "neon-pink"
              },
              {
                step: "03",
                title: "Auto-Publish & Scale",
                description: "Content gets published across all platforms while you focus on growth",
                color: "neon-lime"
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-card border-white/20 hover:border-white/40 transition-all duration-300 group hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-${feature.color}/20 to-${feature.color}/10 border border-${feature.color}/30 mb-4 group-hover:animate-neon-glow`}>
                    <span className={`text-${feature.color} font-bold text-lg`}>{feature.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button className="btn-neon text-white font-semibold group">
              Start Your Free Trial
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
