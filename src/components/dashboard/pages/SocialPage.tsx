
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
        <TabsList>
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
          <TabsTrigger value="mentions">Engagement Monitor</TabsTrigger>
          <TabsTrigger value="publish">Multi-Platform Publishing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts" className="mt-6">
          <SocialPageTabs social={social} />
        </TabsContent>
        
        <TabsContent value="mentions" className="mt-6">
          <MentionsMonitor />
        </TabsContent>
        
        <TabsContent value="publish" className="mt-6">
          <div className="bg-gray-50 border rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Multi-Platform Publishing</h3>
            <p className="text-gray-600 mb-4">
              Create and schedule content for multiple social media platforms at once.
            </p>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
