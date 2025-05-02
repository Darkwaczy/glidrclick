
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Heart, Star, Bell, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { SocialPageHook } from '@/hooks/useSocialPage';
import ReplyMentionDialog from './dialogs/ReplyMentionDialog';
import { formatDistanceToNow } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileMentionsMonitorProps {
  socialHook: SocialPageHook;
}

const MobileMentionsMonitor: React.FC<MobileMentionsMonitorProps> = ({ socialHook }) => {
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Check for permission to show notifications
    if ('Notification' in window) {
      if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        toast.info(
          <div>
            <p>Enable notifications to receive real-time alerts</p>
            <Button 
              size="sm" 
              className="mt-2" 
              onClick={() => requestNotificationPermission()}
            >
              Enable
            </Button>
          </div>
        );
      }
    }
  }, []);
  
  // Request notification permission
  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast.success('Notifications enabled!');
      } else {
        toast.error('Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };
  
  // Show push notification
  const showNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      // Create and show the notification
      const notification = new Notification(title, {
        body: body,
        icon: '/favicon.ico'
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  };
  
  // Handle refreshing mentions
  const handleRefreshMentions = async () => {
    await socialHook.handleRefreshConnections();
    
    // Show notification when new mentions are found
    if (socialHook.mentionsList.length > 0) {
      showNotification(
        'New Social Mentions', 
        `You have ${socialHook.mentionsList.length} new mentions to review`
      );
    }
  };
  
  // Handle reply dialog
  const handleOpenReply = (mentionId: string) => {
    socialHook.handleOpenReplyDialog(mentionId);
    setShowReplyDialog(true);
  };
  
  const handleCloseReply = () => {
    setShowReplyDialog(false);
    socialHook.setReplyingToMention(null);
  };
  
  const handleSubmitReply = () => {
    socialHook.handleSubmitReply();
    handleCloseReply();
  };
  
  // Get platform color based on platform name
  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return 'bg-blue-100 text-blue-800';
      case 'twitter':
        return 'bg-sky-100 text-sky-800';
      case 'instagram':
        return 'bg-pink-100 text-pink-800';
      case 'linkedin':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get icon for mention type
  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="h-4 w-4 mr-1" />;
      case 'like':
        return <Heart className="h-4 w-4 mr-1" />;
      default:
        return <span className="text-xs mr-1">@</span>;
    }
  };
  
  return (
    <>
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">
            Quick Responses
            {socialHook.mentionsList.length > 0 && (
              <Badge variant="warning" className="ml-2">
                {socialHook.mentionsList.length}
              </Badge>
            )}
          </CardTitle>
          <Button 
            onClick={handleRefreshMentions} 
            variant="outline" 
            size="sm"
            disabled={socialHook.isRefreshing}
            className="h-8 w-8 p-0"
          >
            {socialHook.isRefreshing ? (
              <RefreshCcw className="h-4 w-4 animate-spin" />
            ) : (
              <Bell className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        
        <CardContent className="p-3">
          <Tabs defaultValue="mentions" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="mentions">
                Mentions
              </TabsTrigger>
              <TabsTrigger value="engage">
                Engagements
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mentions" className="space-y-2">
              {socialHook.mentionsList.length === 0 ? (
                <div className="text-center py-3">
                  <p className="text-gray-500">No new mentions</p>
                </div>
              ) : (
                socialHook.mentionsList.map((mention) => (
                  <Card key={mention.id} className="overflow-hidden mb-2">
                    <div className="flex items-center justify-between bg-muted px-3 py-1.5">
                      <div className="flex items-center">
                        <Badge className={`mr-2 ${getPlatformColor(mention.platform)}`}>
                          {mention.platform}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {mention.timeAgo}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => socialHook.handleMarkAsRead(mention.id)}
                      >
                        <Star className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center mb-1.5">
                        <strong className="text-sm">{mention.username}</strong>
                      </div>
                      <p className="text-sm mb-2 line-clamp-2">{mention.content}</p>
                      <div className="flex justify-end">
                        <Button 
                          size="sm" 
                          onClick={() => handleOpenReply(mention.id)}
                          className="h-7 text-xs px-2"
                        >
                          Quick Reply
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="engage" className="pt-1">
              <div className="text-center py-3">
                <p className="text-gray-500">No recent engagements</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Reply Dialog */}
      <ReplyMentionDialog 
        open={showReplyDialog}
        onOpenChange={setShowReplyDialog}
        mention={socialHook.currentReplyMention}
        replyContent={socialHook.replyContent}
        onReplyContentChange={socialHook.setReplyContent}
        onSubmitReply={handleSubmitReply}
      />
    </>
  );
};

export default MobileMentionsMonitor;
