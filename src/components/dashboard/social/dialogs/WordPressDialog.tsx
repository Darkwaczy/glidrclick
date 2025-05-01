
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FileText, Link, Lock, User } from "lucide-react";
import { connectWordPressSelfHosted } from "@/utils/social/authentication";

interface WordPressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WordPressDialog = ({ open, onOpenChange }: WordPressDialogProps) => {
  const [siteUrl, setSiteUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!siteUrl || !username || !password) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await connectWordPressSelfHosted(siteUrl, username, password);
      
      if (success) {
        setSiteUrl("");
        setUsername("");
        setPassword("");
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error connecting to WordPress:", error);
      toast.error("Failed to connect to WordPress site. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText size={18} /> Connect WordPress Site
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="site-url" className="flex items-center gap-2">
                <Link size={14} /> Site URL
              </Label>
              <Input
                id="site-url"
                placeholder="https://example.com"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                required
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the full URL of your WordPress site
              </p>
            </div>
            
            <div>
              <Label htmlFor="username" className="flex items-center gap-2">
                <User size={14} /> Username
              </Label>
              <Input
                id="username"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock size={14} /> Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                We recommend creating an app-specific password for security
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !siteUrl || !username || !password}
            >
              {isSubmitting ? "Connecting..." : "Connect Site"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WordPressDialog;
