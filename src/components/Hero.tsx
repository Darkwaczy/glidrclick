
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const Hero = () => {
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!dotsContainerRef.current) return;
    
    const container = dotsContainerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Clear any existing dots
    container.innerHTML = '';
    
    // Create floating dots
    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      
      // Random size between 10px and 50px
      const size = Math.random() * 40 + 10;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      dot.style.left = `${left}%`;
      dot.style.top = `${top}%`;
      
      // Random delay for animation
      const delay = Math.random() * 5;
      dot.style.animationDelay = `${delay}s`;
      
      container.appendChild(dot);
    }
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 animated-bg">
      <div className="flowing-dots" ref={dotsContainerRef}></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center space-y-6 py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto animate-fade-in-up">
            Automate Your Blog in <span className="gradient-text">One Click</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Let Glidrclick write and post high-quality content daily — straight to your blog and social media.
          </p>
          
          <div className="h-16 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl md:text-2xl font-medium gradient-text">
              Generate. Schedule. Auto-post. Grow.
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button className="gradient-button text-white rounded-full px-8 py-6 text-lg">
              Try Free for 7 Days
            </Button>
            
            <Button variant="outline" className="rounded-full border-2 border-gray-300 hover:border-glidr-purple px-8 py-6 text-lg">
              <Play size={18} className="mr-2" /> Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
