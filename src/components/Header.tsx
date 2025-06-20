
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Waves } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleFeatureClick = (feature: string) => {
    scrollToSection('interactive-demo');
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/dashboard/analytics');
  };

  const handleTrialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection('pricing');
  };

  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection('pricing');
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-lg shadow-ocean-primary/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-ocean-primary to-ocean-bright rounded-lg flex items-center justify-center">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">FlowCraft</h1>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="relative group">
            <button className="text-gray-700 hover:text-ocean-primary transition-colors font-medium">
              Features
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-ocean-light opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-2 px-4">
                <button 
                  onClick={() => handleFeatureClick('ai-writing')}
                  className="block py-2 text-sm text-gray-700 hover:text-ocean-primary w-full text-left transition-colors"
                >
                  AI Content Generation
                </button>
                <button 
                  onClick={() => handleFeatureClick('auto-posting')}
                  className="block py-2 text-sm text-gray-700 hover:text-ocean-primary w-full text-left transition-colors"
                >
                  Smart Automation
                </button>
                <button 
                  onClick={() => handleFeatureClick('social-sharing')}
                  className="block py-2 text-sm text-gray-700 hover:text-ocean-primary w-full text-left transition-colors"
                >
                  Multi-Platform Publishing
                </button>
              </div>
            </div>
          </div>
          <button 
            className="text-gray-700 hover:text-ocean-primary transition-colors font-medium"
            onClick={handlePricingClick}
          >
            Pricing
          </button>
          <button 
            className="text-gray-700 hover:text-ocean-primary transition-colors font-medium"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <Button 
            className="gradient-button text-white rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={handleTrialClick}
          >
            Start Free Trial
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-ocean-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg py-4 animate-fade-in border-t border-ocean-light">
          <div className="container mx-auto flex flex-col space-y-4 px-4">
            <button className="text-left px-4 py-2 text-gray-700 hover:bg-ocean-mist rounded-lg transition-colors">
              Features
            </button>
            <div className="px-8 py-2 flex flex-col space-y-2 text-sm">
              <button 
                onClick={() => handleFeatureClick('ai-writing')}
                className="text-gray-700 hover:text-ocean-primary text-left transition-colors"
              >
                AI Content Generation
              </button>
              <button 
                onClick={() => handleFeatureClick('auto-posting')}
                className="text-gray-700 hover:text-ocean-primary text-left transition-colors"
              >
                Smart Automation
              </button>
              <button 
                onClick={() => handleFeatureClick('social-sharing')}
                className="text-gray-700 hover:text-ocean-primary text-left transition-colors"
              >
                Multi-Platform Publishing
              </button>
            </div>
            <button 
              className="text-left px-4 py-2 text-gray-700 hover:bg-ocean-mist rounded-lg transition-colors"
              onClick={handlePricingClick}
            >
              Pricing
            </button>
            <button 
              className="text-left px-4 py-2 text-gray-700 hover:bg-ocean-mist rounded-lg transition-colors"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <div className="px-4 pt-2">
              <Button 
                className="w-full gradient-button text-white rounded-full font-semibold"
                onClick={handleTrialClick}
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
