
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Facebook, Instagram, Twitter, FileText, AlertCircle } from "lucide-react";

interface ConnectPlatformDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (platformId: string) => void;
}

const ConnectPlatformDialog = ({ open, onOpenChange, onConnect }: ConnectPlatformDialogProps) => {
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
              onClick={() => onConnect('facebook')}
            >
              <Facebook size={24} className="text-blue-600" />
              <span>Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => onConnect('instagram')}
            >
              <Instagram size={24} className="text-pink-600" />
              <span>Instagram</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2"
              onClick={() => onConnect('wordpress')}
            >
              <FileText size={24} className="text-gray-700" />
              <span>WordPress Blog</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-24 space-y-2 opacity-60"
              disabled
            >
              <Twitter size={24} className="text-blue-400" />
              <span className="flex items-center gap-1">
                Twitter <AlertCircle size={12} />
                <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">Coming Soon</span>
              </span>
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            Connect your social media accounts to manage them directly from your dashboard.
          </p>
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
