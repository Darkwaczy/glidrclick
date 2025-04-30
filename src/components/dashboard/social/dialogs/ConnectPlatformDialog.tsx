
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Facebook, Instagram, X, FileText, AlertCircle, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ConnectPlatformDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (platformId: string) => void;
}

const ConnectPlatformDialog = ({ open, onOpenChange, onConnect }: ConnectPlatformDialogProps) => {
  // Define which platforms would be available if configured
  const enabledPlatforms = {
    facebook: false,
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button 
                      variant="outline" 
                      className="flex flex-col items-center justify-center h-24 space-y-2 opacity-60"
                      disabled
                    >
                      <Facebook size={24} className="text-blue-600" />
                      <span className="flex items-center gap-1">
                        Facebook <AlertCircle size={12} />
                      </span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Facebook provider is not enabled in this project</p>
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
                      <Instagram size={24} className="text-pink-600" />
                      <span className="flex items-center gap-1">
                        Instagram <AlertCircle size={12} />
                      </span>
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Instagram provider is not enabled in this project</p>
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
                  <p>WordPress provider is not enabled in this project</p>
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
            <div className="flex items-start gap-3">
              <Settings size={24} className="text-amber-800 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800">Configuration Required</h4>
                <p className="text-xs text-amber-800 mt-1">
                  No authentication providers are currently enabled for this project. 
                  To enable these providers, you need to configure them in your Supabase authentication settings 
                  and add the appropriate OAuth credentials for each platform.
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
