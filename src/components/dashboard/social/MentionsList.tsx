
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { getPlatformIcon } from "./utils/platformUtils";
import { MessageSquare, Plus } from "lucide-react";

interface Mention {
  id: string;
  platform: string;
  username: string;
  timeAgo: string;
  content: string;
}

interface MentionsListProps {
  mentions: Mention[];
  onReply: (mentionId: string) => void;
  onMarkAsRead: (mentionId: string) => void;
}

const MentionsList = ({ mentions, onReply, onMarkAsRead }: MentionsListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Social Mentions</CardTitle>
          <CardDescription>Track and respond to mentions across all your connected platforms</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-600">
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mentions.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={24} className="text-gray-500" />
              </div>
              <p className="text-gray-500 mb-2">No new mentions to display</p>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                When people mention or comment on your social media accounts, they'll appear here for you to respond directly
              </p>
            </div>
          ) : (
            mentions.map((mention) => (
              <div key={mention.id} className="flex border-b pb-4">
                <div className="mr-4 flex-shrink-0">
                  {getPlatformIcon(mention.platform, 24)}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{mention.username}</h4>
                    <span className="text-sm text-gray-500">{mention.timeAgo}</span>
                  </div>
                  <p className="text-sm my-1">{mention.content}</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="default" onClick={() => onReply(mention.id)} className="flex items-center">
                      <MessageSquare size={14} className="mr-1" /> Reply
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onMarkAsRead(mention.id)}>
                      Mark as Read
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-gray-500">
          Manage all your social interactions in one place, just like Hootsuite.
        </p>
      </CardFooter>
    </Card>
  );
};

export default MentionsList;
