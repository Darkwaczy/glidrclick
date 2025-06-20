
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Facebook, Instagram, X, FileText, Clock, Info, Loader, Linkedin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { connectPlatform, connectWordPressSelfHosted } from "@/utils/social/authentication";
import { getPlatformDocUrl, getPlatformOAuthConfig } from "@/utils/social/helpers";
import { connectFacebookWithSdk, connectInstagramWithSdk, isFacebookSdkLoaded, initFacebookSdk, checkFacebookLoginStatus } from "@/utils/social/facebook-sdk";
import { toast } from "sonner";

interface ConnectPlatformDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (platformId: string) => void;
}

const ConnectPlatformDialog = ({ open, onOpenChange, onConnect }: ConnectPlatformDialogProps) => {
  const [isWordPressTab, setIsWordPressTab] = useState(false);
  const [wordPressTab, setWordPressTab] = useState("wordpress-com");
  const [selfHostedUrl, setSelfHostedUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fbSdkLoaded, setFbSdkLoaded] = useState(false);
  const [fbLoginStatus, setFbLoginStatus] = useState<{status?: string; authenticated?: boolean}>({});

  // Check if Facebook SDK is loaded when dialog opens
  useEffect(() => {
    if (open) {
      const checkFbSdk = async () => {
        try {
          setFbSdkLoaded(isFacebookSdkLoaded());
          if (!isFacebookSdkLoaded()) {
            await initFacebookSdk();
            setFbSdkLoaded(true);
          }
          
          // Check login status once SDK is loaded
          if (isFacebookSdkLoaded()) {
            try {
              const loginStatus = await checkFacebookLoginStatus();
              setFbLoginStatus({
                status: loginStatus.status,
                authenticated: loginStatus.status === 'connected'
              });
              console.log("Facebook login status on dialog open:", loginStatus);
            } catch (statusError) {
              console.warn("Error checking Facebook login status:", statusError);
            }
          }
        } catch (error) {
          console.error("Failed to load Facebook SDK:", error);
        }
      };
      
      checkFbSdk();
    }
  }, [open]);

  const handleConnect = async (platformId: string) => {
    setIsLoading(true);
    
    try {
      // Use SDK for Facebook and Instagram
      if (platformId === 'facebook') {
        const success = await connectFacebookWithSdk();
        if (success) {
          onOpenChange(false);
          onConnect(platformId);
        }
      } else if (platformId === 'instagram') {
        const success = await connectInstagramWithSdk();
        if (success) {
          onOpenChange(false);
          onConnect(platformId);
        }
      } else {
        // Use standard OAuth flow for other platforms
        onConnect(platformId);
      }
    } catch (error) {
      console.error(`Error connecting to ${platformId}:`, error);
      toast.error(`Failed to connect to ${platformId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWordPressConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (wordPressTab === "wordpress-com") {
      // Handle WordPress.com connection
      handleConnect("wordpress");
    } else {
      // Handle WordPress self-hosted connection
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
    }
  };

  // Get the right button text based on Facebook login status
  const getFacebookButtonText = () => {
    if (!fbSdkLoaded) return "Connect Facebook";
    if (fbLoginStatus.authenticated) return "Continue with Facebook";
    return "Connect Facebook";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect Platform</DialogTitle>
        </DialogHeader>
        
        {!isWordPressTab ? (
          <>
            <div className="py-6 space-y-4">
              <p className="text-sm text-gray-600">
                Connect your social media accounts to manage posts, engage with followers, and respond to comments - all from one dashboard.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className={`flex flex-col items-center justify-center h-24 space-y-2 ${fbLoginStatus.authenticated ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => handleConnect('facebook')}
                  disabled={isLoading || !fbSdkLoaded}
                >
                  {isLoading ? (
                    <Loader size={24} className="animate-spin text-blue-600" />
                  ) : (
                    <Facebook size={24} className="text-blue-600" />
                  )}
                  <span>{getFacebookButtonText()}</span>
                  {fbLoginStatus.authenticated && (
                    <span className="text-xs text-blue-600">Already logged in</span>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className={`flex flex-col items-center justify-center h-24 space-y-2 ${fbLoginStatus.authenticated ? 'border-pink-500 bg-pink-50' : ''}`}
                  onClick={() => handleConnect('instagram')}
                  disabled={isLoading || !fbSdkLoaded}
                >
                  {isLoading ? (
                    <Loader size={24} className="animate-spin text-pink-600" />
                  ) : (
                    <Instagram size={24} className="text-pink-600" />
                  )}
                  <span>{fbLoginStatus.authenticated ? "Continue with Instagram" : "Connect Instagram"}</span>
                  {fbLoginStatus.authenticated && (
                    <span className="text-xs text-pink-600">Already logged in to Facebook</span>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-24 space-y-2"
                  onClick={() => setIsWordPressTab(true)}
                  disabled={isLoading}
                >
                  <FileText size={24} className="text-gray-700" />
                  <span>WordPress</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-24 space-y-2"
                  onClick={() => handleConnect('twitter')}
                  disabled={isLoading}
                >
                  <X size={24} className="text-gray-700" />
                  <span>Twitter</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-24 space-y-2 mt-4"
                  onClick={() => handleConnect('linkedin')}
                  disabled={isLoading}
                >
                  <Linkedin size={24} className="text-blue-700" />
                  <span>LinkedIn</span>
                </Button>
              </div>
              
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-md mt-4">
                <div className="flex items-start gap-3">
                  <div className="text-blue-800 mt-1 flex-shrink-0">💡</div>
                  <div>
                    <h4 className="font-medium text-blue-800">Facebook Authentication</h4>
                    <p className="text-xs text-blue-800 mt-1">
                      {fbSdkLoaded 
                        ? fbLoginStatus.authenticated
                          ? "You're already logged in to Facebook. Click to continue with this account."
                          : "We'll use the Facebook SDK for a secure and reliable connection to your account."
                        : "Loading Facebook SDK... If this takes too long, try refreshing the page."}
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
          </>
        ) : (
          <Tabs defaultValue={wordPressTab} onValueChange={setWordPressTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="wordpress-com">WordPress.com</TabsTrigger>
              <TabsTrigger value="self-hosted">Self-hosted</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wordpress-com" className="space-y-4">
              <p className="text-sm text-gray-600">
                Connect your WordPress.com blog to schedule and publish posts directly from this dashboard.
              </p>
              
              <div className="flex justify-center py-4">
                <Button 
                  onClick={() => handleConnect('wordpress')}
                  className="flex items-center gap-2"
                >
                  <FileText size={18} />
                  Connect with WordPress.com
                </Button>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex items-start gap-2">
                  <Info size={16} className="mt-1 text-blue-500" />
                  <p className="text-xs text-gray-600">
                    You'll be redirected to WordPress.com to authorize access to your blog. Once authorized, you'll be redirected back to this dashboard.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="self-hosted">
              <form onSubmit={handleWordPressConnection} className="space-y-4">
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
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsWordPressTab(false)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Connecting..." : "Connect WordPress Site"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ConnectPlatformDialog;
