
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, LayoutDashboard, Zap, Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, signOut } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleLogout = async () => {
    console.log('Header: Attempting logout...');
    try {
      await signOut();
      console.log('Header: Logout successful, navigating to home');
      navigate("/");
    } catch (error) {
      console.error('Header: Logout error:', error);
    }
  };

  const handleDashboardClick = () => {
    console.log('Header: Dashboard clicked, isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      console.log('Header: Navigating to dashboard');
      navigate("/dashboard");
    } else {
      console.log('Header: Not authenticated, redirecting to auth');
      navigate("/auth");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-card backdrop-blur-2xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-electric to-neon-pink rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-dark-secondary p-3 rounded-xl border border-white/20">
                <Zap className="text-neon-electric" size={28} />
              </div>
            </div>
            <div className="text-2xl font-bold">
              <span className="neon-text">Flow</span>
              <span className="text-white">Craft</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-gray-300 hover:text-neon-electric transition-colors duration-300 font-medium">
                  Features
                  <ChevronDown size={16} className="ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="glass-card border-white/20 bg-dark-primary/95 backdrop-blur-md z-50">
                <DropdownMenuItem onClick={() => navigate("/features/ai-writing")} className="text-white hover:bg-white/10">
                  AI Writing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/features/auto-posting")} className="text-white hover:bg-white/10">
                  Auto Posting
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/features/social-sharing")} className="text-white hover:bg-white/10">
                  Social Sharing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/pricing"
              className="text-gray-300 hover:text-neon-electric transition-colors duration-300 font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-neon-electric transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-neon-electric transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="glass-card border-white/20 hover:border-neon-electric/50">
                    <User size={18} className="text-neon-electric" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card border-white/20 bg-dark-primary/95 backdrop-blur-md z-50">
                  <DropdownMenuItem onClick={handleDashboardClick} className="text-white hover:bg-white/10">
                    <LayoutDashboard className="mr-2 h-4 w-4 text-neon-electric" /> Dashboard
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin-dashboard")} className="text-white hover:bg-white/10">
                      <Settings className="mr-2 h-4 w-4 text-neon-pink" /> Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-white/20" />
                  <DropdownMenuItem onClick={handleLogout} className="text-white hover:bg-white/10">
                    <LogOut className="mr-2 h-4 w-4 text-gray-400" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate("/auth", { state: { initialTab: "sign-up" } })}
                className="btn-neon text-white font-semibold"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-neon-electric transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-card mt-4 p-6 border-white/20 bg-dark-primary/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-gray-300 hover:text-neon-electric transition-colors duration-300 font-medium">
                    Features
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="glass-card border-white/20 bg-dark-primary/95 backdrop-blur-md z-50">
                  <DropdownMenuItem onClick={() => {
                    navigate("/features/ai-writing");
                    setMobileMenuOpen(false);
                  }} className="text-white hover:bg-white/10">
                    AI Writing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    navigate("/features/auto-posting");
                    setMobileMenuOpen(false);
                  }} className="text-white hover:bg-white/10">
                    Auto Posting
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    navigate("/features/social-sharing");
                    setMobileMenuOpen(false);
                  }} className="text-white hover:bg-white/10">
                    Social Sharing
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                to="/pricing"
                className="text-gray-300 hover:text-neon-electric transition-colors duration-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-neon-electric transition-colors duration-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-neon-electric transition-colors duration-300 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {!isAuthenticated && (
                <Button
                  onClick={() => {
                    navigate("/auth", { state: { initialTab: "sign-up" } });
                    setMobileMenuOpen(false);
                  }}
                  className="btn-neon text-white font-semibold mt-4"
                >
                  Get Started
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
