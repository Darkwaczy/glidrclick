
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Facebook, Instagram, X, FileText, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ConnectPlatformDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (platformId: string) => void;
}

const ConnectPlatformDialog = ({ open, onOpenChange, onConnect }: ConnectPlatformDialogProps) => {
  // Define which platforms are actually enabled and available
  const enabledPlatforms = {
    facebook: true,
    instagram: false,
    wordpress: false,
    twitter: false
  };

  const handleConnect = (platformId: string) => {
    onConnect(platformId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect Platform</DialogTitle>
        </DialogHeader>
        <div className="py-6 space-y-4">
          <p className="text-sm text-gray-600">
            Select a platform to connect to your social media dashboard:
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
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center justify-center h-24 space-y-2 opacity-60"
                      disabled
                    >
                      <Instagram size={24} className="text-pink-600" />
                      <span className="flex items-center gap-1">
                        Instagram <AlertCircle size={12} />
                      </span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Instagram provider is not enabled in this project yet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center justify-center h-24 space-y-2 opacity-60"
                      disabled
                    >
                      <FileText size={24} className="text-gray-700" />
                      <span className="flex items-center gap-1">
                        WordPress <AlertCircle size={12} />
                      </span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>WordPress provider is not enabled in this project yet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center justify-center h-24 space-y-2 opacity-60"
                      disabled
                    >
                      <X size={24} className="text-gray-700" />
                      <span className="flex items-center gap-1">
                        Twitter <AlertCircle size={12} />
                      </span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="p-4 border border-amber-200 bg-amber-50 rounded-md mt-4">
            <p className="text-xs text-amber-800">
              <strong>Note:</strong> Currently, only Facebook authentication is enabled for this project. 
              To enable other providers, you would need to configure them in your Supabase authentication settings.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectPlatformDialog;
