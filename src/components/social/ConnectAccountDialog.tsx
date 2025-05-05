
import React from 'react';
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
  const [isOpen, setIsOpen] = React.useState(false);
  const { connectAccount, isLoading } = useSocial();

  const handlePlatformConnect = async (platform: SocialPlatform) => {
    try {
      await connectAccount(platform);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to connect platform:", error);
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
          <DialogTitle>Connect a social media account</DialogTitle>
          <DialogDescription>
            Choose a platform to connect to your dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {platformConfig.map((platform) => (
            <Button 
              key={platform.name}
              variant="outline" 
              className={`flex items-center justify-center gap-2 p-6 h-auto ${platform.color} hover:bg-opacity-80`}
              onClick={() => handlePlatformConnect(platform.name)}
              disabled={isLoading}
            >
              {platform.icon}
              <span>{platform.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAccountDialog;
