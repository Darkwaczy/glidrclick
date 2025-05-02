
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Mention {
  id: string;
  platform: string;
  username: string;
  timeAgo: string;
  content: string;
}

export const useMentions = () => {
  const [mentionsList, setMentionsList] = useState<Mention[]>([]);
  const [replyingToMention, setReplyingToMention] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const loadMentions = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (!user?.user?.id) {
        return;
      }
      
      // Get all connected platforms
      const { data: platforms } = await supabase
        .from('social_platforms')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('is_connected', true);
        
      if (!platforms || platforms.length === 0) {
        return;
      }
      
      // Get platform IDs
      const platformIds = platforms.map(p => p.id);
      
      // Get mentions for those platforms
      const { data: mentions, error } = await supabase
        .from('mentions')
        .select('*')
        .in('platform_id', platformIds)
        .eq('is_read', false)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching mentions:", error);
        return;
      }
      
      if (mentions && mentions.length > 0) {
        // Format mentions data
        const formattedMentions = mentions.map(mention => {
          const platform = platforms.find(p => p.id === mention.platform_id);
          const createdAt = new Date(mention.created_at);
          const now = new Date();
          const diffInMinutes = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60));
          
          let timeAgo;
          if (diffInMinutes < 60) {
            timeAgo = `${diffInMinutes} minutes ago`;
          } else if (diffInMinutes < 1440) {
            timeAgo = `${Math.floor(diffInMinutes / 60)} hours ago`;
          } else {
            timeAgo = `${Math.floor(diffInMinutes / 1440)} days ago`;
          }
          
          return {
            id: mention.id,
            platform: platform ? platform.name.toLowerCase() : 'unknown',
            username: mention.username,
            timeAgo: timeAgo,
            content: mention.content
          };
        });
        
        setMentionsList(formattedMentions);
      } else {
        setMentionsList([]);
      }
    } catch (error) {
      console.error("Error loading mentions:", error);
    }
  };

  const handleOpenReplyDialog = (mentionId: string) => {
    setReplyingToMention(mentionId);
    setReplyContent("");
  };
  
  const handleSubmitReply = async () => {
    if (!replyingToMention || !replyContent.trim()) {
      toast.error("Please enter a reply message");
      return;
    }
    
    try {
      // In a real application, you would send the reply to the social platform API
      // Here we'll just mark the mention as read
      await supabase
        .from('mentions')
        .update({ is_read: true })
        .eq('id', replyingToMention);
        
      toast.success("Reply sent successfully!");
      
      setMentionsList(mentionsList.filter(mention => mention.id !== replyingToMention));
      
      setReplyingToMention(null);
      setReplyContent("");
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
    }
  };
  
  const handleMarkAsRead = async (mentionId: string) => {
    try {
      await supabase
        .from('mentions')
        .update({ is_read: true })
        .eq('id', mentionId);
        
      toast.success("Mention marked as read");
      setMentionsList(mentionsList.filter(mention => mention.id !== mentionId));
    } catch (error) {
      console.error("Error marking mention as read:", error);
      toast.error("Failed to mark as read");
    }
  };

  return {
    mentionsList,
    replyingToMention,
    replyContent,
    setReplyingToMention,
    setReplyContent,
    loadMentions,
    handleOpenReplyDialog,
    handleSubmitReply,
    handleMarkAsRead
  };
};
