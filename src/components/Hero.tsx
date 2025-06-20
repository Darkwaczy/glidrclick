
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowDown, Sparkles, Zap, Waves } from 'lucide-react';
import TypeAnimation from './TypeAnimation';

const Hero = () => {
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!dotsContainerRef.current) return;
    
    const container = dotsContainerRef.current;
    container.innerHTML = '';
    
    // Create animated ocean particles
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 10 + 6;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 12}s`;
      particle.style.animationDuration = `${12 + Math.random() * 6}s`;
      
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
      
      {/* Ocean wave patterns */}
      <div className="absolute inset-0 wave-pattern opacity-30"></div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-mist/50 via-transparent to-ocean-light/40"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-transparent"></div>
      
      {/* Interactive mouse follower */}
      <div 
        className="absolute w-96 h-96 bg-gradient-radial from-ocean-bright/10 to-transparent rounded-full pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center space-y-8 py-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-ocean-bright/30 rounded-full px-6 py-3 animate-fade-in-up shadow-lg">
            <Waves className="w-4 h-4 text-ocean-primary" />
            <span className="text-sm font-semibold text-ocean-deep">AI-Powered Content Automation</span>
            <Zap className="w-4 h-4 text-ocean-bright animate-pulse-ocean" />
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mx-auto animate-fade-in-up">
            Streamline. Automate. 
            <br />
            <span className="gradient-text">Dominate</span> Your Content.
          </h1>
          
          {/* Dynamic subheadline */}
          <div className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Transform your digital presence with AI that creates, schedules, and optimizes
            <TypeAnimation 
              text=" high-impact content across all platforms."
              speed={50}
              className="gradient-text font-semibold"
            />
          </div>
          
          {/* Stats banner */}
          <div className="flex flex-wrap justify-center gap-8 text-center py-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-ocean-light shadow-lg hover:shadow-xl transition-all hover-lift">
              <div className="text-2xl font-bold gradient-text">15K+</div>
              <div className="text-sm text-gray-600">Active Creators</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-ocean-light shadow-lg hover:shadow-xl transition-all hover-lift">
              <div className="text-2xl font-bold gradient-text">2.5M+</div>
              <div className="text-sm text-gray-600">Content Pieces</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-ocean-light shadow-lg hover:shadow-xl transition-all hover-lift">
              <div className="text-2xl font-bold gradient-text">450%</div>
              <div className="text-sm text-gray-600">Avg. Engagement Boost</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button className="gradient-button text-white rounded-full px-10 py-6 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-ocean-primary/25">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            
            <Button variant="outline" className="rounded-full border-2 border-ocean-primary/30 bg-white/30 backdrop-blur-sm hover:bg-white/50 text-ocean-deep hover:text-ocean-primary px-10 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              <Play size={20} className="mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-1 bg-white/50 rounded-full px-4 py-2">
              <span>✅</span>
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1 bg-white/50 rounded-full px-4 py-2">
              <span>🔒</span>
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-1 bg-white/50 rounded-full px-4 py-2">
              <span>⭐</span>
              <span>4.9/5 User Rating</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
            <div className="flex flex-col items-center gap-2 text-ocean-primary">
              <span className="text-sm font-medium">Discover More</span>
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
