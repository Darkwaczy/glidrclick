
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold gradient-text">Glidrclick</h1>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="relative group">
            <button className="text-gray-700 hover:text-glidr-purple transition-colors">
              Features
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-2 px-4">
                <a href="#" className="block py-2 text-sm text-gray-700 hover:text-glidr-purple">AI Writing</a>
                <a href="#" className="block py-2 text-sm text-gray-700 hover:text-glidr-purple">Auto-Posting</a>
                <a href="#" className="block py-2 text-sm text-gray-700 hover:text-glidr-purple">Social Sharing</a>
              </div>
            </div>
          </div>
          <button 
            className="text-gray-700 hover:text-glidr-purple transition-colors"
            onClick={() => scrollToSection('pricing')}
          >
            Pricing
          </button>
          <button className="text-gray-700 hover:text-glidr-purple transition-colors">
            Login
          </button>
          <Button className="gradient-button text-white rounded-full px-8">Try Free for 7 Days</Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 animate-fade-in">
          <div className="container mx-auto flex flex-col space-y-4">
            <button className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Features
            </button>
            <div className="px-8 py-2 flex flex-col space-y-2 text-sm">
              <a href="#" className="text-gray-700 hover:text-glidr-purple">AI Writing</a>
              <a href="#" className="text-gray-700 hover:text-glidr-purple">Auto-Posting</a>
              <a href="#" className="text-gray-700 hover:text-glidr-purple">Social Sharing</a>
            </div>
            <button 
              className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => scrollToSection('pricing')}
            >
              Pricing
            </button>
            <button className="text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Login
            </button>
            <div className="px-4 pt-2">
              <Button className="w-full gradient-button text-white rounded-full">
                Try Free for 7 Days
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
