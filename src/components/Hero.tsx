
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import TypeAnimation from "@/components/TypeAnimation";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center ocean-bg pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="ocean-particles">
          {/* Ocean-themed decorative elements */}
          <div className="particle absolute top-1/4 left-1/5 w-16 h-16"></div>
          <div className="particle absolute top-1/2 right-1/4 w-24 h-24" style={{animationDelay: '2s'}}></div>
          <div className="particle absolute bottom-1/4 left-1/3 w-20 h-20" style={{animationDelay: '4s'}}></div>
          <div className="particle absolute top-1/3 right-1/5 w-12 h-12" style={{animationDelay: '1s'}}></div>
          <div className="particle absolute bottom-1/3 left-1/4 w-28 h-28" style={{animationDelay: '3s'}}></div>
          <div className="particle absolute top-20 left-1/2 w-14 h-14" style={{animationDelay: '5s'}}></div>
        </div>
        
        <div className="wave-pattern">
          <div className="wave absolute w-full h-32 bg-gradient-to-r from-transparent via-ocean-foam/20 to-transparent" style={{top: '20%'}}></div>
          <div className="wave absolute w-full h-24 bg-gradient-to-r from-transparent via-ocean-light/20 to-transparent" style={{top: '60%', animationDelay: '1.5s'}}></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-ocean-deep">Automate Your Content in </span>
          <span className="gradient-text"><TypeAnimation /></span>
        </h1>
        
        <p className="text-xl text-ocean-deep/80 mb-12 max-w-2xl mx-auto">
          Let FlowCraft create and publish high-quality, AI-powered content daily — 
          straight to your blog and social media platforms.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button size="lg" className="gradient-button text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Start Free Trial
            <ArrowRight size={18} className="ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-ocean-primary text-ocean-primary hover:bg-ocean-mist px-8 py-6 text-lg rounded-full backdrop-blur-sm bg-white/20"
          >
            <Play size={18} className="mr-2" /> Watch Demo
          </Button>
        </div>
        
        <div className="mt-12 text-ocean-deep/60">
          <p className="text-sm">✓ No credit card required • ✓ 7-day free trial • ✓ Cancel anytime</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
