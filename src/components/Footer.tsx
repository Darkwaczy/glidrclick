
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 md:py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold gradient-text">Glidrclick</h2>
            <p className="text-gray-600 mt-2">AI-powered blog automation</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
              <Link to="/terms" className="text-gray-600 hover:text-glidr-purple transition-colors">Terms</Link>
              <Link to="/privacy" className="text-gray-600 hover:text-glidr-purple transition-colors">Privacy</Link>
              <a href="mailto:support@glidrclick.com" className="text-gray-600 hover:text-glidr-purple transition-colors">Support</a>
              <a href="mailto:contact@glidrclick.com" className="text-gray-600 hover:text-glidr-purple transition-colors">Contact</a>
            </div>
            
            <div className="flex space-x-4">
              <a href="https://twitter.com/glidrclick" className="text-gray-600 hover:text-glidr-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com/company/glidrclick" className="text-gray-600 hover:text-glidr-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com/glidrclick" className="text-gray-600 hover:text-glidr-purple transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">© {new Date().getFullYear()} Glidrclick. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
