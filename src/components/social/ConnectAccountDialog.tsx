
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSocial } from '@/contexts/SocialContext';
import { toast } from "sonner";

type SocialPlatform = 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram';

interface ConnectAccountDialogProps {
  className?: string;
}

const platformConfig = [
  { name: 'Facebook' as SocialPlatform, icon: <Facebook className="text-blue-600" />, color: "bg-blue-100" },
  { name: 'Twitter' as SocialPlatform, icon: <Twitter className="text-sky-500" />, color: "bg-sky-100" },
  { name: 'LinkedIn' as SocialPlatform, icon: <Linkedin className="text-blue-700" />, color: "bg-blue-100" },
  { name: 'Instagram' as SocialPlatform, icon: <Instagram className="text-pink-600" />, color: "bg-pink-100" }
];

const ConnectAccountDialog: React.FC<ConnectAccountDialogProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const { connectAccount, isLoading } = useSocial();

  const handlePlatformConnect = async (platform: SocialPlatform) => {
    try {
      // Show a loading toast
      toast.loading(`Connecting to ${platform}...`);
      
      if (platform === 'Facebook') {
        // Facebook OAuth example (in a real app, would use actual app ID and redirect)
        const fbAppId = "958890536078118";
        const redirectUri = encodeURIComponent(window.location.origin + "/dashboard/social/callback");
        const scope = encodeURIComponent("email,public_profile,pages_show_list,pages_read_engagement");

        const fbAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${fbAppId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;

        // In demo mode, we'll just simulate a successful connection
        await connectAccount(platform);
        toast.dismiss();
        toast.success(`Successfully connected to ${platform}`);
        
        // In a real app, you would redirect to the OAuth URL
        // window.location.href = fbAuthUrl;
      } else {
        // For demo purposes, simulate OAuth for other platforms
        await connectAccount(platform);
        toast.dismiss();
        toast.success(`Successfully connected to ${platform}`);
      }
      
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to connect platform:", error);
      toast.dismiss();
      toast.error(`Failed to connect to ${platform}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`gradient-button text-white rounded-full ${className}`}>
          Connect New Account <ArrowRight className="ml-2" size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect to a Platform</DialogTitle>
          <DialogDescription>
            Choose a social media platform to connect to your dashboard
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4">
          {!showPlatforms ? (
            <Button 
              className="w-full py-6 text-lg" 
              onClick={() => setShowPlatforms(true)}
              disabled={isLoading}
            >
              Choose Platform
            </Button>
          ) : (
            <div className="grid grid-cols-2 gap-4 w-full">
              {platformConfig.map((platform) => (
                <Button 
                  key={platform.name}
                  variant="outline" 
                  className={`flex items-center justify-center gap-2 p-6 h-auto ${platform.color} hover:bg-opacity-80`}
                  onClick={() => handlePlatformConnect(platform.name)}
                  disabled={isLoading}
                >
                  {platform.icon}
                  <span>Connect to {platform.name}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAccountDialog;
