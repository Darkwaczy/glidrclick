
import { Json } from "@/integrations/supabase/types";

export type SocialPlatform = {
  id: string;
  name: string;
  icon: "facebook" | "twitter" | "instagram" | "linkedin" | "wordpress";
  isConnected: boolean;
  accountName?: string;
  lastSync?: string;
  syncFrequency?: "realtime" | "hourly" | "daily";
  notifications?: {
    mentions: boolean;
    messages: boolean;
  };
};

export type PostStatus = 'draft' | 'scheduled' | 'published';
