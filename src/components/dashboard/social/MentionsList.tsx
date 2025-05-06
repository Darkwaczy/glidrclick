
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getPlatformIcon } from "./utils/platformUtils";

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
      <CardHeader>
        <CardTitle>Social Mentions</CardTitle>
        <CardDescription>Track mentions of your brand across platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mentions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No new mentions to display</p>
              <p className="text-sm text-gray-400">
                When people mention you on social media, they'll appear here
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
                    <Button size="sm" variant="outline" onClick={() => onReply(mention.id)}>
                      Reply
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
    </Card>
  );
};

export default MentionsList;
