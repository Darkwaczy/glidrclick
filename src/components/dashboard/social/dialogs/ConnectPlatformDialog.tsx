
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Facebook, Instagram, X, FileText, Clock } from "lucide-react";

interface ConnectPlatformDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (platformId: string) => void;
}

const ConnectPlatformDialog = ({ open, onOpenChange, onConnect }: ConnectPlatformDialogProps) => {
  const handleConnect = (platformId: string) => {
    onConnect(platformId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect Platform</DialogTitle>
        </DialogHeader>
        <div className="py-6 space-y-4">
          <p className="text-sm text-gray-600">
            Connect your social media accounts to manage posts, engage with followers, and respond to comments - all from one dashboard.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => handleConnect('facebook')}
            >
              <Facebook size={24} className="text-blue-600" />
              <span>Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => handleConnect('instagram')}
            >
              <Instagram size={24} className="text-pink-600" />
              <span>Instagram</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => handleConnect('wordpress')}
            >
              <FileText size={24} className="text-gray-700" />
              <span>WordPress</span>
            </Button>
            
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-24 space-y-2 opacity-60 w-full"
                disabled
              >
                <X size={24} className="text-gray-700" />
                <span>Twitter</span>
              </Button>
              <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <Clock size={10} className="mr-1" />
                Soon
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-md mt-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-800 mt-1 flex-shrink-0">💡</div>
              <div>
                <h4 className="font-medium text-blue-800">Hootsuite-like Functionality</h4>
                <p className="text-xs text-blue-800 mt-1">
                  After connecting your accounts, you'll be able to post content to multiple platforms simultaneously,
                  respond to comments, and manage all your social media engagement from this dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectPlatformDialog;
