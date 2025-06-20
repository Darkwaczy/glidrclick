
import { Twitter, Linkedin, Instagram, Waves } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-ocean-deep to-ocean-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-ocean-bright to-ocean-teal rounded-lg flex items-center justify-center">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold">FlowCraft</h2>
            </div>
            <p className="text-ocean-light mt-2">AI-powered content automation platform</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex space-x-8">
              <a href="#" className="text-ocean-light hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-ocean-light hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-ocean-light hover:text-white transition-colors">Support</a>
              <a href="#" className="text-ocean-light hover:text-white transition-colors">Contact</a>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-ocean-light hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-ocean-light hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-ocean-light hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-ocean-bright/20 mt-8 pt-8 text-center">
          <p className="text-ocean-light">© 2024 FlowCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
