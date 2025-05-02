
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-bold">
                <span className="text-[#9b87f5]">Glidr</span>
                <span className="text-gray-800">click</span>
              </h1>
            </Link>
            <p className="text-sm text-gray-600 mt-1">
              AI-powered blog automation
            </p>
          </div>

          <div className="flex space-x-8 mb-4 md:mb-0">
            <Link to="/terms" className="text-gray-600 hover:text-[#9b87f5] transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-[#9b87f5] transition-colors">
              Privacy
            </Link>
            <Link to="/support" className="text-gray-600 hover:text-[#9b87f5] transition-colors">
              Support
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-[#9b87f5] transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link to="#" className="text-gray-500 hover:text-[#9b87f5]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link to="#" className="text-gray-500 hover:text-[#9b87f5]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
            <Link to="#" className="text-gray-500 hover:text-[#9b87f5]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © {currentYear} Glidrclick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
