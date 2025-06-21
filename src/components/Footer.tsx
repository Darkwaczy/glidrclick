
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-electric/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-pink/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-electric to-neon-pink rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative glass-card p-3 border-white/20">
                  <Zap className="text-neon-electric" size={28} />
                </div>
              </div>
              <div className="text-2xl font-bold">
                <span className="neon-text">Flow</span>
                <span className="text-white">Craft</span>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Revolutionizing content creation and social media management with 
              <span className="neon-text font-semibold"> AI-powered automation</span>.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Features</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/features/ai-writing" className="text-gray-300 hover:text-neon-electric transition-colors duration-300">
                  AI Writing
                </Link>
              </li>
              <li>
                <Link to="/features/auto-posting" className="text-gray-300 hover:text-neon-electric transition-colors duration-300">
                  Auto Posting
                </Link>
              </li>
              <li>
                <Link to="/features/social-sharing" className="text-gray-300 hover:text-neon-electric transition-colors duration-300">
                  Social Sharing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-neon-electric transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-neon-electric transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#blog" className="text-gray-300 hover:text-neon-electric transition-colors duration-300">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Get Started</h3>
            <div className="space-y-4">
              <Link to="/auth">
                <Button className="w-full btn-glass text-white border-white/30 hover:border-neon-electric/50">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="w-full btn-neon text-white font-semibold">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400">
              © {currentYear} FlowCraft. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <Link to="/terms" className="text-gray-400 hover:text-neon-electric transition-colors duration-300">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-neon-electric transition-colors duration-300">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
