
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSocialPage } from "@/hooks/useSocialPage";
import { useFacebookAuth } from "@/hooks/useFacebookAuth";

// Import components
import SocialPageHeader from "../social/SocialPageHeader";
import SocialPageTabs from "../social/SocialPageTabs";
import SocialPageDialogs from "../social/SocialPageDialogs";
import FacebookSdkWarning from "../social/FacebookSdkWarning";
import OAuthProcessingMessage from "../social/OAuthProcessingMessage";
import MentionsMonitor from "../social/MentionsMonitor";

const SocialPage = () => {
  const social = useSocialPage();
  const { error: facebookSdkError } = useFacebookAuth();
  const [activeTab, setActiveTab] = useState("accounts");

  return (
    <div className="space-y-6">
      <SocialPageHeader
        isRefreshing={social.isRefreshing}
        isLoading={social.isLoading}
        processingOAuth={social.processingOAuth}
        onRefresh={social.handleRefreshConnections}
      />
      
      {/* Display Facebook SDK warning if there's an error */}
      {facebookSdkError && <FacebookSdkWarning error={facebookSdkError} />}
      
      <OAuthProcessingMessage processingOAuth={social.processingOAuth} />
      
      <Tabs defaultValue="accounts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass-card border-white/20">
          <TabsTrigger value="accounts" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">Connected Accounts</TabsTrigger>
          <TabsTrigger value="mentions" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">Engagement Monitor</TabsTrigger>
          <TabsTrigger value="publish" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white">Multi-Platform Publishing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts" className="mt-6">
          <SocialPageTabs social={social} />
        </TabsContent>
        
        <TabsContent value="mentions" className="mt-6">
          <MentionsMonitor />
        </TabsContent>
        
        <TabsContent value="publish" className="mt-6">
          <div className="glass-card border-white/20 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-2 text-white">Multi-Platform Publishing</h3>
            <p className="text-gray-300 mb-4">
              Create and schedule content for multiple social media platforms at once.
            </p>
            <button 
              className="btn-neon"
              onClick={social.handleCreatePost}
            >
              Create New Post
            </button>
          </div>
        </TabsContent>
      </Tabs>
      
      <SocialPageDialogs social={social} />
    </div>
  );
};

export default SocialPage;
