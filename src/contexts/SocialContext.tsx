
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

type SocialPlatform = 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram';

interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  username: string;
  isConnected: boolean;
  lastSynced?: Date;
}

interface SocialContextType {
  accounts: SocialAccount[];
  connectAccount: (platform: SocialPlatform) => Promise<void>;
  disconnectAccount: (accountId: string) => Promise<void>;
  isLoading: boolean;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    { id: '1', platform: 'Facebook', username: 'yourpage', isConnected: true, lastSynced: new Date() },
    { id: '2', platform: 'Twitter', username: 'yourtwitterhandle', isConnected: true, lastSynced: new Date() },
    { id: '3', platform: 'LinkedIn', username: '', isConnected: false },
    { id: '4', platform: 'Instagram', username: '', isConnected: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real application, this would fetch accounts from an API
  useEffect(() => {
    console.log("SocialContext initialized with accounts:", accounts);
  }, []);
  
  const connectAccount = async (platform: SocialPlatform) => {
    console.log(`Connecting to ${platform}...`);
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAccounts(prev => {
        return prev.map(account => {
          if (account.platform === platform) {
            return {
              ...account,
              isConnected: true,
              username: `demo_${platform.toLowerCase()}`,
              lastSynced: new Date()
            };
          }
          return account;
        });
      });
      
      console.log(`Successfully connected to ${platform}`);
    } catch (error) {
      console.error(`Error connecting to ${platform}:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const disconnectAccount = async (accountId: string) => {
    console.log(`Disconnecting account ${accountId}...`);
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAccounts(prev => {
        return prev.map(account => {
          if (account.id === accountId) {
            return {
              ...account,
              isConnected: false,
              username: '',
              lastSynced: undefined
            };
          }
          return account;
        });
      });
      
      toast.success(`Successfully disconnected account`);
      console.log(`Successfully disconnected account ${accountId}`);
    } catch (error) {
      console.error(`Error disconnecting account ${accountId}:`, error);
      toast.error(`Error disconnecting account`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    accounts,
    connectAccount,
    disconnectAccount,
    isLoading
  };
  
  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
};
