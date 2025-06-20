
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
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";

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

          <div className="hidden md:flex items-center space-x-6 text-gray-600">
            <Link
              to="/features/social-sharing"
              className="hover:text-glidr-purple transition-colors"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="hover:text-glidr-purple transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              className="hover:text-glidr-purple transition-colors"
            >
              Blog
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
                variant="outline"
                onClick={handleLogin}
                className="border-glidr-purple text-glidr-purple hover:bg-glidr-purple/10"
              >
                Login
              </Button>
            )}
            {!isAuthenticated && (
              <Button
                onClick={() => navigate("/auth", { state: { initialTab: "sign-up" } })}
                className="gradient-button"
              >
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
