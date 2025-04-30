
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold gradient-text">
          ContentScribe
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/features/ai-writing" className="text-gray-600 hover:text-gray-900">AI Writing</Link>
          <Link to="/features/auto-posting" className="text-gray-600 hover:text-gray-900">Auto Posting</Link>
          <Link to="/features/social-sharing" className="text-gray-600 hover:text-gray-900">Social Sharing</Link>
          <Link to="/auth" className="text-gray-600 hover:text-gray-900">Login</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/auth" className="hidden md:inline-block">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link to="/register" className="hidden md:inline-block">
            <Button>Sign Up</Button>
          </Link>
          
          <button className="md:hidden text-gray-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
