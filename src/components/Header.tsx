
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
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/558779ac-cf8b-4763-986c-b8e82bc29c03.png" 
            alt="Glidrclick Logo" 
            className="h-8"
          />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
          <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/register" className="hidden md:block">
            <Button className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-5 py-2 rounded-full">
              Try Free for 7 Days
            </Button>
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
