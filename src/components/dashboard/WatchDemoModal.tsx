
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface WatchDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WatchDemoModal = ({ open, onOpenChange }: WatchDemoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Glidrclick Platform Demo</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            Watch this quick demo to learn how to use the platform effectively.
          </DialogDescription>
        </DialogHeader>
        
        <div className="aspect-video w-full bg-gradient-to-r from-glidr-purple to-glidr-bright-purple rounded-md overflow-hidden relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold animate-fade-in">Welcome to Glidrclick</h2>
              <p className="text-xl opacity-90 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Your All-in-One Content Management Solution
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">AI-Powered Content Creation</h3>
                <p className="text-sm opacity-90">Generate high-quality, SEO-optimized content with just a few clicks</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Smart Scheduling</h3>
                <p className="text-sm opacity-90">Schedule posts across multiple platforms at optimal times</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Analytics & Insights</h3>
                <p className="text-sm opacity-90">Track performance and make data-driven decisions</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Social Integration</h3>
                <p className="text-sm opacity-90">Seamlessly manage all your social media accounts</p>
              </div>
            </div>
            
            <div className="animate-bounce mt-8">
              <p className="text-sm opacity-75">Interactive Demo Coming Soon</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WatchDemoModal;
