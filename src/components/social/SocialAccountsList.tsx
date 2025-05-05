
import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useSocial } from '@/contexts/SocialContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const SocialAccountsList: React.FC = () => {
  const { accounts, disconnectAccount, isLoading } = useSocial();

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook': return <Facebook className="text-blue-600" />;
      case 'Twitter': return <Twitter className="text-sky-500" />;
      case 'LinkedIn': return <Linkedin className="text-blue-700" />;
      case 'Instagram': return <Instagram className="text-pink-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <div key={account.id} className="flex justify-between items-center p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            {getPlatformIcon(account.platform)}
            <div>
              <p className="font-medium">{account.platform}</p>
              <p className="text-xs text-gray-500">
                {account.isConnected 
                  ? `Connected${account.username ? ` as ${account.username}` : ''}` 
                  : "Not connected"}
              </p>
            </div>
          </div>
          
          {account.isConnected ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Disconnect {account.platform}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove this social media account from your dashboard. You can reconnect it anytime.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => disconnectAccount(account.id)}
                    disabled={isLoading}
                  >
                    Yes, disconnect
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button 
              size="sm"
              disabled={isLoading}
              onClick={() => {
                // This would typically open a connection flow
                console.log(`Connect ${account.platform}`);
              }}
            >
              Connect
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SocialAccountsList;
