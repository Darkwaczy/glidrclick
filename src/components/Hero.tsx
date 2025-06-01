
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowDown, Sparkles, Zap } from 'lucide-react';
import TypeAnimation from './TypeAnimation';

const Hero = () => {
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!dotsContainerRef.current) return;
    
    const container = dotsContainerRef.current;
    container.innerHTML = '';
    
    // Create animated particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 8 + 4;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${8 + Math.random() * 4}s`;
      
      container.appendChild(particle);
    }

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 animated-bg">
      {/* Animated background particles */}
      <div className="flowing-dots" ref={dotsContainerRef}></div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-glidr-soft-purple/30 via-transparent to-glidr-soft-blue/30"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/10 to-transparent"></div>
      
      {/* Interactive mouse follower */}
      <div 
        className="absolute w-96 h-96 bg-gradient-radial from-glidr-bright-purple/10 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center space-y-8 py-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-glidr-bright-purple/20 rounded-full px-6 py-3 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-glidr-purple" />
            <span className="text-sm font-semibold text-glidr-purple">AI-Powered Content Revolution</span>
            <Zap className="w-4 h-4 text-glidr-bright-purple animate-pulse" />
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mx-auto animate-fade-in-up">
            Create. Schedule. 
            <br />
            <span className="gradient-text">Automate</span> Everything.
          </h1>
          
          {/* Dynamic subheadline */}
          <div className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Transform your content strategy with AI that writes, schedules, and publishes 
            <TypeAnimation 
              text=" high-converting content automatically."
              speed={50}
              className="gradient-text font-semibold"
            />
          </div>
          
          {/* Stats banner */}
          <div className="flex flex-wrap justify-center gap-8 text-center py-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
              <div className="text-2xl font-bold gradient-text">5000+</div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
              <div className="text-2xl font-bold gradient-text">1M+</div>
              <div className="text-sm text-gray-600">Posts Generated</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
              <div className="text-2xl font-bold gradient-text">300%</div>
              <div className="text-sm text-gray-600">Avg. Growth</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button className="gradient-button text-white rounded-full px-10 py-6 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Free 7-Day Trial
            </Button>
            
            <Button variant="outline" className="rounded-full border-2 border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-10 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105">
              <Play size={20} className="mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-1">
              <span>✅</span>
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🔒</span>
              <span>Enterprise-Grade Security</span>
            </div>
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span>4.9/5 Rating</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <span className="text-sm">Discover More</span>
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
