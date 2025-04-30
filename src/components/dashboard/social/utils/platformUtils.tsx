
import React from "react";
import { Facebook, Instagram, X, Linkedin, FileText, Link2 } from "lucide-react";

// Helper function to render platform icons
export const getPlatformIcon = (platform: string, size: number = 16) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return <Facebook size={size} className="text-blue-600" />;
    case 'instagram':
      return <Instagram size={size} className="text-pink-600" />;
    case 'twitter':
      return <X size={size} className="text-blue-400" />;
    case 'linkedin':
      return <Linkedin size={size} className="text-blue-800" />;
    case 'wordpress':
      return <FileText size={size} className="text-gray-700" />;
    default:
      return <Link2 size={size} className="text-gray-500" />;
  }
};
