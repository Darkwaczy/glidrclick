
import { Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold gradient-text">Glidrclick</h2>
            <p className="text-gray-600 mt-2">AI-powered blog automation</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-glidr-purple transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-glidr-purple transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-glidr-purple transition-colors">Support</a>
              <a href="#" className="text-gray-600 hover:text-glidr-purple transition-colors">Contact</a>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-glidr-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-glidr-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-glidr-purple transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">© 2024 Glidrclick. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
