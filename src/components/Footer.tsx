
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Waves } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-ocean-deep to-ocean-primary text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <Waves className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-white">Flow</span>
                <span className="text-ocean-foam">Craft</span>
              </h1>
            </Link>
            <p className="mt-4 text-ocean-mist">
              Simplifying content creation and social media management for businesses of all sizes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features/ai-writing" className="text-ocean-foam hover:text-white transition-colors">
                  AI Writing
                </Link>
              </li>
              <li>
                <Link to="/features/auto-posting" className="text-ocean-foam hover:text-white transition-colors">
                  Auto Posting
                </Link>
              </li>
              <li>
                <Link to="/features/social-sharing" className="text-ocean-foam hover:text-white transition-colors">
                  Social Sharing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-ocean-foam hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-ocean-foam hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#blog" className="text-ocean-foam hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Get Started</h3>
            <div className="space-y-3">
              <Link to="/auth">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="w-full bg-white text-ocean-primary hover:bg-ocean-mist">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-ocean-light/30 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-ocean-foam">
            © {currentYear} FlowCraft. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-ocean-foam hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-ocean-foam hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
