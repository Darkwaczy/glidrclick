
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Sparkles, Zap } from "lucide-react";
import TypeAnimation from "@/components/TypeAnimation";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="floating-particles">
          <div className="particle w-32 h-32 top-1/4 left-1/5 bg-gradient-to-r from-neon-electric/30 to-transparent rounded-full"></div>
          <div className="particle w-24 h-24 top-1/2 right-1/4 bg-gradient-to-r from-neon-pink/30 to-transparent rounded-full" style={{animationDelay: '2s'}}></div>
          <div className="particle w-40 h-40 bottom-1/4 left-1/3 bg-gradient-to-r from-neon-lime/30 to-transparent rounded-full" style={{animationDelay: '4s'}}></div>
          <div className="particle w-16 h-16 top-1/3 right-1/5 bg-gradient-to-r from-neon-purple/30 to-transparent rounded-full" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Floating Glass Cards */}
          <div className="absolute -top-20 -left-20 glass-card p-4 animate-float hidden lg:block">
            <Sparkles className="text-neon-electric" size={24} />
          </div>
          <div className="absolute -top-16 -right-16 glass-card p-4 animate-float hidden lg:block" style={{animationDelay: '1s'}}>
            <Zap className="text-neon-pink" size={24} />
          </div>
          
          {/* Main Heading */}
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block text-white mb-4">Automate Your</span>
              <span className="block gradient-text mb-4">Content in</span>
              <span className="block">
                <TypeAnimation />
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Let FlowCraft's AI create and publish high-quality content daily — 
              straight to your blog and social media platforms with{' '}
              <span className="neon-text font-semibold">zero effort</span>.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="animate-slide-up flex flex-col sm:flex-row gap-6 justify-center mb-16" style={{animationDelay: '0.4s'}}>
            <Button size="lg" className="btn-neon text-white px-10 py-6 text-lg font-semibold group">
              Start Free Trial
              <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-glass text-white border-white/30 hover:border-neon-electric/50 px-10 py-6 text-lg font-semibold group"
            >
              <Play size={20} className="mr-3 group-hover:scale-110 transition-transform" /> 
              Watch Demo
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse-neon"></div>
                <span>No credit card required</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-electric rounded-full animate-pulse-neon"></div>
                <span>7-day free trial</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse-neon"></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-primary to-transparent"></div>
    </div>
  );
};

export default Hero;
