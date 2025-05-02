
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from '@/context/AuthContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, signOut } = useAuthContext();
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-[#9b87f5]">Glidr</span>
              <span className="text-gray-800">click</span>
            </h1>
          </Link>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:text-[#9b87f5] transition-colors">
                      Features
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-2 p-4 w-[200px]">
                        <Link
                          to="/features/ai-writing"
                          className="block p-2 hover:bg-slate-100 rounded-md"
                        >
                          AI Writing
                        </Link>
                        <Link
                          to="/features/auto-posting"
                          className="block p-2 hover:bg-slate-100 rounded-md"
                        >
                          Auto Posting
                        </Link>
                        <Link
                          to="/features/social-sharing"
                          className="block p-2 hover:bg-slate-100 rounded-md"
                        >
                          Social Sharing
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <Link
                to="/pricing"
                className="hover:text-[#9b87f5] transition-colors"
              >
                Pricing
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/dashboard")}
                  className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleLogin}
                    className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/auth", { state: { initialTab: "sign-up" } })}
                    className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white rounded-full px-6"
                  >
                    Try Free for 7 Days
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
