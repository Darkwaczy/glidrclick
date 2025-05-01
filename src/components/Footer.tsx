
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/558779ac-cf8b-4763-986c-b8e82bc29c03.png" 
                alt="Glidrclick Logo" 
                className="h-[150px] w-[250px] object-contain"
              />
            </Link>
            <p className="mt-4 text-gray-400">
              Simplifying content creation and social media management for businesses of all sizes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features/ai-writing" className="text-gray-400 hover:text-white transition-colors">
                  AI Writing
                </Link>
              </li>
              <li>
                <Link to="/features/auto-posting" className="text-gray-400 hover:text-white transition-colors">
                  Auto Posting
                </Link>
              </li>
              <li>
                <Link to="/features/social-sharing" className="text-gray-400 hover:text-white transition-colors">
                  Social Sharing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Get Started</h3>
            <div className="space-y-3">
              <Link to="/auth">
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="w-full">Sign Up Free</Button>
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {currentYear} Glidrclick. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
