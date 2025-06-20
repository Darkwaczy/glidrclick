
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
import { User, LogOut, Settings, LayoutDashboard, Waves } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
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

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-ocean-primary to-ocean-accent p-2 rounded-lg">
              <Waves className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold">
              <span className="text-ocean-primary">Flow</span>
              <span className="text-ocean-secondary">Craft</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center space-x-6 text-gray-600">
            <Link
              to="/features/social-sharing"
              className="hover:text-ocean-primary transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="hover:text-ocean-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="hover:text-ocean-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-ocean-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full border-ocean-primary">
                    <User size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate("/admin-dashboard")}>
                      <Settings className="mr-2 h-4 w-4" /> Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate("/auth", { state: { initialTab: "sign-up" } })}
                className="gradient-button text-white"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
