
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import SocialPageHeader from '../social/SocialPageHeader';
import ConnectedPlatformsList from '../social/ConnectedPlatformsList';
import OAuthProcessingMessage from '../social/OAuthProcessingMessage';
import SocialPageDialogs from '../social/SocialPageDialogs';
import MentionsList from '../social/MentionsList';
import SocialPageTabs from '../social/SocialPageTabs';
import ScheduledPostsList from '../social/ScheduledPostsList';
import MentionsMonitor from '../social/MentionsMonitor';
import MobileCompanion from '../social/MobileCompanion';  
import { useIsMobile } from '@/hooks/use-mobile';
import { useSocialPage } from '@/hooks/useSocialPage';
import ReplyDialog from '../social/dialogs/ReplyDialog';

const SocialPage = () => {
  const socialHook = useSocialPage();
  const isMobile = useIsMobile();
  const showMobileView = isMobile && window.innerWidth < 768;

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
          registration => {
            console.log('ServiceWorker registration successful');
          },
          err => {
            console.error('ServiceWorker registration failed:', err);
          }
        );
      });
    }
  }, []);

  if (socialHook.processingOAuth) {
    return <OAuthProcessingMessage processingOAuth={socialHook.processingOAuth} />;
  }

  // Mobile-optimized view
  if (showMobileView) {
    return (
      <div className="p-4">
        <SocialPageHeader 
          onRefresh={socialHook.handleRefreshConnections} 
          isRefreshing={socialHook.isRefreshing}
          isLoading={socialHook.isLoading}
          processingOAuth={socialHook.processingOAuth}
          onOpenConnectDialog={socialHook.handleOpenConnectDialog}
        />
        
        <MobileCompanion socialHook={socialHook} />
        
        {/* Include necessary dialogs */}
        <SocialPageDialogs
          socialHook={socialHook}
          platforms={socialHook.platforms}
          showSettingsDialog={socialHook.showSettingsDialog}
          showConnectDialog={socialHook.showConnectDialog} 
          showWordPressDialog={socialHook.showWordPressDialog}
          showCreatePostDialog={socialHook.showCreatePostDialog}
          currentPlatform={socialHook.currentPlatformObj}
          onSettingsDialogChange={socialHook.setShowSettingsDialog}
          onConnectDialogChange={socialHook.setShowConnectDialog}
          onWordPressDialogChange={socialHook.setShowWordPressDialog}
          onCreatePostDialogChange={socialHook.setShowCreatePostDialog}
          onConnectPlatform={socialHook.handleConnectPlatform}
          onSaveSettings={socialHook.handleSavePlatformSettings}
          onSubmitPost={socialHook.handleSubmitNewPost}
        />
        
        <ReplyDialog 
          open={Boolean(socialHook.replyingToMention)}
          onOpenChange={() => socialHook.setReplyingToMention(null)}
          mentionId={socialHook.replyingToMention}
          mentions={socialHook.mentionsList}
        />
      </div>
    );
  }

  // Regular desktop view
  return (
    <div className="p-6">
      <SocialPageHeader 
        onRefresh={socialHook.handleRefreshConnections} 
        isRefreshing={socialHook.isRefreshing}
        isLoading={socialHook.isLoading}
        processingOAuth={socialHook.processingOAuth}
        onOpenConnectDialog={socialHook.handleOpenConnectDialog}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <SocialPageTabs social={socialHook} />
        </div>
        
        <div>
          <ConnectedPlatformsList 
            platforms={socialHook.platforms}
            isLoading={socialHook.isLoading} 
            onOpenConnectDialog={socialHook.handleOpenConnectDialog}
            onDisconnectPlatform={socialHook.handleDisconnectPlatform}
            onOpenPlatformSettings={socialHook.handleOpenPlatformSettings}
          />
          
          <div className="mt-6">
            {socialHook.mentionsList.length > 0 ? (
              <MentionsList 
                mentions={socialHook.mentionsList}
                onReply={socialHook.handleOpenReplyDialog}
                onMarkAsRead={socialHook.handleMarkAsRead}
              />
            ) : (
              <MentionsMonitor />
            )}
          </div>
        </div>
      </div>
      
      {/* Include necessary dialogs */}
      <SocialPageDialogs
        socialHook={socialHook}
        platforms={socialHook.platforms}
        showSettingsDialog={socialHook.showSettingsDialog}
        showConnectDialog={socialHook.showConnectDialog} 
        showWordPressDialog={socialHook.showWordPressDialog}
        showCreatePostDialog={socialHook.showCreatePostDialog}
        currentPlatform={socialHook.currentPlatformObj}
        onSettingsDialogChange={socialHook.setShowSettingsDialog}
        onConnectDialogChange={socialHook.setShowConnectDialog}
        onWordPressDialogChange={socialHook.setShowWordPressDialog}
        onCreatePostDialogChange={socialHook.setShowCreatePostDialog}
        onConnectPlatform={socialHook.handleConnectPlatform}
        onSaveSettings={socialHook.handleSavePlatformSettings}
        onSubmitPost={socialHook.handleSubmitNewPost}
      />
      
      <ReplyDialog 
        open={Boolean(socialHook.replyingToMention)}
        onOpenChange={() => socialHook.setReplyingToMention(null)}
        mentionId={socialHook.replyingToMention}
        mentions={socialHook.mentionsList}
      />
    </div>
  );
};

export default SocialPage;
