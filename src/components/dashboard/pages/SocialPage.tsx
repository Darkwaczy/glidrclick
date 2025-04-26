
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Share2, 
  RefreshCw, 
  Plus, 
  X, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2,
  CheckCircle
} from "lucide-react";

const SocialPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Social Media Management</h1>
          <p className="text-gray-600">Connect and manage your social media accounts</p>
        </div>
        
        <Button onClick={() => toast.success("Refreshing connection status...")}>
          <RefreshCw size={16} className="mr-2" /> Refresh Connections
        </Button>
      </div>
      
      <Tabs defaultValue="connected">
        <TabsList>
          <TabsTrigger value="connected">Connected Accounts</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
          <TabsTrigger value="schedule">Post Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connected" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ConnectedPlatform 
              name="Facebook"
              icon={Facebook}
              status="connected"
              accountName="Glidrclick"
              lastSync="2 hours ago"
            />
            
            <ConnectedPlatform 
              name="Twitter"
              icon={Twitter}
              status="connected"
              accountName="@glidrclick"
              lastSync="4 hours ago"
            />
            
            <ConnectedPlatform 
              name="Instagram"
              icon={Instagram}
              status="connected"
              accountName="@glidrclick"
              lastSync="1 day ago"
            />
            
            <ConnectedPlatform 
              name="LinkedIn"
              icon={Linkedin}
              status="connected"
              accountName="Glidrclick"
              lastSync="3 hours ago"
            />
            
            <Card className="border-dashed border-2">
              <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                  <Plus size={24} className="text-gray-500" />
                </div>
                <h3 className="font-medium text-lg mb-2">Connect New Platform</h3>
                <p className="text-sm text-gray-500 text-center mb-4">Add more social media accounts to manage</p>
                <Button onClick={() => toast.success("Opening connection wizard...")}>
                  Connect Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="mentions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Mentions</CardTitle>
              <CardDescription>Track mentions of your brand across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentions.map((mention) => (
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
                        <Button size="sm" variant="outline" onClick={() => toast.success("Responding to mention...")}>
                          Reply
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toast.success("Mention marked as read")}>
                          Mark as Read
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Scheduled Posts</CardTitle>
                <CardDescription>Your upcoming social media posts</CardDescription>
              </div>
              <Button onClick={() => toast.success("Creating new post...")}>
                <Plus size={16} className="mr-2" /> Create Post
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{post.title}</h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => toast.success(`Editing post "${post.title}"`)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600" onClick={() => toast.success(`Cancelling post "${post.title}"`)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.platforms.map((platform) => (
                        <div key={platform} className="flex items-center bg-gray-100 rounded px-2 py-1 text-xs">
                          {getPlatformIcon(platform, 12)}
                          <span className="ml-1">{platform}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-500">
                      Scheduled for: {post.scheduledFor}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ConnectedPlatformProps {
  name: string;
  icon: React.FC<{ size?: number; className?: string }>;
  status: "connected" | "disconnected" | "error";
  accountName: string;
  lastSync?: string;
}

const ConnectedPlatform = ({ name, icon: Icon, status, accountName, lastSync }: ConnectedPlatformProps) => {
  const getStatusClass = () => {
    switch (status) {
      case "connected": return "text-green-600";
      case "disconnected": return "text-gray-600";
      case "error": return "text-red-600";
      default: return "text-gray-600";
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case "connected": return <CheckCircle size={14} className="text-green-600 mr-1" />;
      case "disconnected": return <X size={14} className="text-gray-600 mr-1" />;
      case "error": return <X size={14} className="text-red-600 mr-1" />;
      default: return null;
    }
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Icon size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <div className={`flex items-center text-sm ${getStatusClass()}`}>
              {getStatusIcon()}
              <span className="capitalize">{status}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Account</span>
            <span className="font-medium">{accountName}</span>
          </div>
          {lastSync && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Last synced</span>
              <span>{lastSync}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" size="sm" onClick={() => toast.success(`Opening ${name} settings...`)}>
            Settings
          </Button>
          <Button variant="outline" size="sm" className="text-red-600" onClick={() => toast.success(`Disconnecting ${name}...`)}>
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get platform icon
const getPlatformIcon = (platform: string, size: number = 16) => {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return <Facebook size={size} className="text-blue-600" />;
    case 'twitter':
      return <Twitter size={size} className="text-blue-400" />;
    case 'instagram':
      return <Instagram size={size} className="text-pink-600" />;
    case 'linkedin':
      return <Linkedin size={size} className="text-blue-700" />;
    default:
      return <Link2 size={size} />;
  }
};

// Mock data
const mentions = [
  {
    id: 1,
    platform: 'twitter',
    username: '@customer123',
    timeAgo: '30 minutes ago',
    content: 'Just tried @glidrclick for the first time and I'm impressed! #contentmarketing'
  },
  {
    id: 2,
    platform: 'instagram',
    username: '@socialmediaguru',
    timeAgo: '2 hours ago',
    content: 'Check out this amazing content scheduling tool @glidrclick'
  },
  {
    id: 3,
    platform: 'facebook',
    username: 'Marketing Group',
    timeAgo: '1 day ago',
    content: 'Has anyone used Glidrclick for managing their social media? Looking for reviews.'
  }
];

const scheduledPosts = [
  {
    id: 1,
    title: '10 Ways to Improve Your Social Media Strategy',
    content: 'Check out our latest blog post on improving your social media presence in 2025!',
    platforms: ['Facebook', 'Twitter', 'LinkedIn'],
    scheduledFor: 'Tomorrow, 09:00 AM'
  },
  {
    id: 2,
    title: 'New Product Announcement',
    content: 'We're excited to announce our latest feature: AI-powered content suggestions!',
    platforms: ['Facebook', 'Instagram', 'LinkedIn'],
    scheduledFor: 'Apr 28, 2025, 10:30 AM'
  },
  {
    id: 3,
    title: 'Monthly Newsletter',
    content: 'Our April newsletter is ready! Discover the latest trends in digital marketing.',
    platforms: ['Twitter', 'LinkedIn'],
    scheduledFor: 'May 1, 2025, 08:00 AM'
  }
];

export default SocialPage;
