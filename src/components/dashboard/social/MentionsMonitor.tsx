
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, MessageSquare, Heart, Star, BarChart2, RefreshCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface Mention {
  id: string;
  platform: string;
  platform_logo?: string;
  username: string;
  content: string;
  created_at: string;
  is_read: boolean;
  is_important: boolean;
  type: 'mention' | 'comment' | 'like' | 'share';
}

const MentionsMonitor: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  useEffect(() => {
    fetchMentions();
  }, []);
  
  const fetchMentions = async () => {
    try {
      setIsLoading(true);
      
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return;
      }
      
      // Get user's connected social platforms
      const { data: platforms } = await supabase
        .from('social_platforms')
        .select('id, platform_id, name')
        .eq('user_id', user.id)
        .eq('is_connected', true);
      
      // Return if no platforms connected
      if (!platforms || platforms.length === 0) {
        setIsLoading(false);
        return;
      }
      
      // Get platform IDs
      const platformIds = platforms.map(p => p.id);
      
      // Get mentions from the database
      const { data: mentionsData, error } = await supabase
        .from('mentions')
        .select('*')
        .in('platform_id', platformIds)
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (error) {
        throw error;
      }
      
      if (mentionsData) {
        // Transform and set mentions data
        const transformedMentions = mentionsData.map(mention => {
          const platform = platforms.find(p => p.id === mention.platform_id);
          return {
            id: mention.id,
            platform: platform?.name.toLowerCase() || 'unknown',
            platform_logo: `/icons/${platform?.platform_id || 'generic'}.svg`,
            username: mention.username,
            content: mention.content,
            created_at: mention.created_at,
            is_read: mention.is_read,
            is_important: mention.is_important || false,
            type: mention.type || 'mention'
          };
        });
        
        setMentions(transformedMentions);
      }
    } catch (error) {
      console.error('Error fetching mentions:', error);
      toast.error('Failed to load mentions');
    } finally {
      setIsLoading(false);
    }
  };
  
  const refreshMentions = async () => {
    setIsRefreshing(true);
    await fetchMentions();
    setIsRefreshing(false);
    toast.success('Mentions refreshed');
  };
  
  const handleMarkAsRead = async (mentionId: string) => {
    try {
      const { error } = await supabase
        .from('mentions')
        .update({ is_read: true })
        .eq('id', mentionId);
        
      if (error) throw error;
      
      // Update local state
      setMentions(mentions.map(mention => 
        mention.id === mentionId ? { ...mention, is_read: true } : mention
      ));
      
      toast.success('Marked as read');
    } catch (error) {
      console.error('Error marking mention as read:', error);
      toast.error('Failed to update status');
    }
  };
  
  const handleMarkAsImportant = async (mentionId: string, isImportant: boolean) => {
    try {
      const { error } = await supabase
        .from('mentions')
        .update({ is_important: isImportant })
        .eq('id', mentionId);
        
      if (error) throw error;
      
      // Update local state
      setMentions(mentions.map(mention => 
        mention.id === mentionId ? { ...mention, is_important: isImportant } : mention
      ));
      
      toast.success(isImportant ? 'Marked as important' : 'Removed from important');
    } catch (error) {
      console.error('Error updating mention importance:', error);
      toast.error('Failed to update status');
    }
  };
  
  const handleReply = (mentionId: string) => {
    // Open reply dialog (would be implemented in a real app)
    toast.info('Reply feature coming soon');
  };
  
  // Filter mentions based on selected platform and type
  const filteredMentions = mentions.filter(mention => {
    if (selectedPlatform && mention.platform !== selectedPlatform) {
      return false;
    }
    if (selectedType && mention.type !== selectedType) {
      return false;
    }
    return true;
  });
  
  // Get counts for each type
  const mentionCounts = {
    all: mentions.length,
    unread: mentions.filter(m => !m.is_read).length,
    important: mentions.filter(m => m.is_important).length,
  };
  
  const typeIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="h-4 w-4 mr-1" />;
      case 'like':
        return <Heart className="h-4 w-4 mr-1" />;
      case 'share':
        return <BarChart2 className="h-4 w-4 mr-1" />;
      default:
        return <span className="text-xs mr-1">@</span>;
    }
  };
  
  const platformColor = (platform: string) => {
    switch (platform) {
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
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Engagement Monitor</h2>
        <Button 
          onClick={refreshMentions} 
          variant="outline" 
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            All 
            {mentionCounts.all > 0 && (
              <Badge className="ml-2 bg-gray-200 text-gray-800">{mentionCounts.all}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {mentionCounts.unread > 0 && (
              <Badge className="ml-2 bg-blue-100 text-blue-800">{mentionCounts.unread}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="important">
            Important
            {mentionCounts.important > 0 && (
              <Badge className="ml-2 bg-amber-100 text-amber-800">{mentionCounts.important}</Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <div className="flex gap-4 mb-4">
          <select 
            className="border rounded-md px-2 py-1 text-sm"
            value={selectedPlatform || ''}
            onChange={(e) => setSelectedPlatform(e.target.value || null)}
          >
            <option value="">All Platforms</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
          </select>
          
          <select 
            className="border rounded-md px-2 py-1 text-sm"
            value={selectedType || ''}
            onChange={(e) => setSelectedType(e.target.value || null)}
          >
            <option value="">All Types</option>
            <option value="mention">Mentions</option>
            <option value="comment">Comments</option>
            <option value="like">Likes</option>
            <option value="share">Shares</option>
          </select>
        </div>
        
        <TabsContent value="all">
          {renderMentionsList(filteredMentions, false, false)}
        </TabsContent>
        
        <TabsContent value="unread">
          {renderMentionsList(filteredMentions.filter(m => !m.is_read), true, false)}
        </TabsContent>
        
        <TabsContent value="important">
          {renderMentionsList(filteredMentions.filter(m => m.is_important), false, true)}
        </TabsContent>
      </Tabs>
    </div>
  );
  
  function renderMentionsList(
    mentionsToRender: Mention[], 
    isUnreadTab: boolean, 
    isImportantTab: boolean
  ) {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      );
    }
    
    if (mentionsToRender.length === 0) {
      return (
        <div className="p-8 text-center">
          <p className="text-gray-500">No {isUnreadTab ? 'unread ' : isImportantTab ? 'important ' : ''}mentions found.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {mentionsToRender.map((mention) => (
          <Card key={mention.id} className={!mention.is_read ? 'border-l-4 border-l-blue-500' : ''}>
            <CardHeader className="p-4 pb-0 flex flex-row justify-between">
              <div className="flex items-center">
                <Badge className={`mr-2 ${platformColor(mention.platform)}`}>
                  {mention.platform.charAt(0).toUpperCase() + mention.platform.slice(1)}
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  {typeIcon(mention.type)}
                  {mention.type.charAt(0).toUpperCase() + mention.type.slice(1)}
                </Badge>
                <span className="ml-auto text-xs text-gray-500">
                  {formatDistanceToNow(new Date(mention.created_at), { addSuffix: true })}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleMarkAsImportant(mention.id, !mention.is_important)}
                className={mention.is_important ? 'text-yellow-500' : 'text-gray-400'}
              >
                <Star className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-2">
                  {mention.username[0].toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-medium">{mention.username}</h4>
                  <p className="text-xs text-gray-500">
                    {format(new Date(mention.created_at), 'PPP')}
                  </p>
                </div>
              </div>
              <p className="text-sm">{mention.content}</p>
            </CardContent>
            <CardFooter className="px-4 py-2 flex justify-end gap-2 bg-gray-50 rounded-b-lg">
              {!mention.is_read && (
                <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(mention.id)}>
                  Mark as Read
                </Button>
              )}
              <Button size="sm" onClick={() => handleReply(mention.id)}>
                Reply
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
};

export default MentionsMonitor;
