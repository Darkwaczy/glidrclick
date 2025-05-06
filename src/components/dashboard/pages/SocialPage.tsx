
import React from "react";
import { useSocialPage } from "@/hooks/useSocialPage";
import { useFacebookAuth } from "@/hooks/useFacebookAuth";

// Import components
import SocialPageHeader from "../social/SocialPageHeader";
import SocialPageTabs from "../social/SocialPageTabs";
import SocialPageDialogs from "../social/SocialPageDialogs";
import FacebookSdkWarning from "../social/FacebookSdkWarning";
import OAuthProcessingMessage from "../social/OAuthProcessingMessage";

const SocialPage = () => {
  const social = useSocialPage();
  
  // Use our enhanced Facebook hook
  const { error: facebookSdkError } = useFacebookAuth();

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
      
      <SocialPageTabs social={social} />
      
      <SocialPageDialogs social={social} />
    </div>
  );
};

export default SocialPage;
