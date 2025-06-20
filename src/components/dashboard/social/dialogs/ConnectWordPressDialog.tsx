
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FileText, Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { connectWordPressSelfHosted } from "@/utils/social/authentication";
import { getPlatformDocUrl } from "@/utils/social/helpers";

interface ConnectWordPressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConnectWordPressDialog = ({ open, onOpenChange }: ConnectWordPressDialogProps) => {
  const [selfHostedUrl, setSelfHostedUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selfHostedUrl || !username || !password) {
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await connectWordPressSelfHosted(selfHostedUrl, username, password);
      if (success) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error connecting WordPress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect Self-hosted WordPress</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="site-url">WordPress Site URL</Label>
            <Input 
              id="site-url" 
              placeholder="https://yourblog.com" 
              value={selfHostedUrl}
              onChange={(e) => setSelfHostedUrl(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              placeholder="Your WordPress username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="app-password">Application Password</Label>
            <Input 
              id="app-password" 
              type="password" 
              placeholder="Application password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-gray-500">
              Create an application password in your WordPress admin under Users &gt; Application Passwords.
            </p>
          </div>
          
          <div className="p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800">
            <div className="flex items-start gap-2">
              <Info size={16} className="mt-1" />
              <div>
                <p className="mb-1 font-medium">WordPress Setup Instructions:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Make sure your WordPress site has the REST API enabled</li>
                  <li>Go to Users &gt; Profile &gt; Application Passwords in your WordPress admin</li>
                  <li>Create a new application password with a name like "Content Scheduler"</li>
                  <li>Copy the generated password and paste it above</li>
                </ol>
                <a 
                  href={getPlatformDocUrl('wordpress')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block mt-2 underline"
                >
                  View detailed instructions
                </a>
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect WordPress Site"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectWordPressDialog;
