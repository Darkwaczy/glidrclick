
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 500; // Show after scrolling 500px
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
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-full shadow-2xl border border-white/20 backdrop-blur-sm">
        <div className="flex items-center px-6 py-4 text-white">
          <div className="mr-4">
            <p className="font-semibold text-sm">Start Your 7-Day Free Trial</p>
            <p className="text-xs opacity-90">No credit card required</p>
          </div>
          
          <Button
            onClick={handleGetStarted}
            size="sm"
            className="bg-white text-[#9b87f5] hover:bg-gray-100 mr-3 font-semibold"
          >
            Get Started
            <ArrowRight size={16} className="ml-1" />
          </Button>
          
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white transition-colors p-1"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
