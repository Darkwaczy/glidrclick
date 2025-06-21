
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 500;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleGetStarted = () => {
    navigate("/auth", { state: { initialTab: "sign-up" } });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up max-w-md w-full mx-4">
      <div className="glass-card border-white/20 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-electric/10 via-neon-pink/10 to-neon-lime/10"></div>
        
        <div className="relative z-10 flex items-center p-6">
          <div className="flex-shrink-0 mr-4">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-electric to-neon-pink rounded-xl flex items-center justify-center animate-neon-glow">
              <Sparkles className="text-white" size={24} />
            </div>
          </div>
          
          <div className="flex-1 min-w-0 mr-4">
            <p className="font-bold text-white text-lg mb-1">Start Your Free Trial</p>
            <p className="text-gray-300 text-sm">Transform your content strategy today</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleGetStarted}
              className="btn-neon text-white font-semibold px-6 py-3 text-sm group"
            >
              Get Started
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <button
              onClick={handleDismiss}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              aria-label="Dismiss"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
