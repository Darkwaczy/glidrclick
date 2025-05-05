
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ConnectAccountDialog from '@/components/social/ConnectAccountDialog';
import SocialAccountsList from '@/components/social/SocialAccountsList';

const SocialPage = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Social Media Integration</h1>
            <p className="text-gray-500">Connect and manage your social media accounts</p>
          </div>
          
          <ConnectAccountDialog />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Connected Accounts */}
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Manage your connected social media accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SocialAccountsList />
            </CardContent>
          </Card>
          
          {/* Posting Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Posting Settings</CardTitle>
              <CardDescription>
                Configure how your content is shared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Post Format</label>
                <Input 
                  placeholder='Check out my new blog post: {"{title}"} - {"{url}"}'
                  defaultValue='Check out my new blog post: {"{title}"} - {"{url}"}'
                />
                <p className="text-xs text-gray-500">
                  Use {"{title}"}, {"{url}"}, {"{excerpt}"} as placeholders
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Hashtags</label>
                <Input 
                  placeholder="#blogging #content #writing"
                  defaultValue="#blogging #content #writing"
                />
              </div>
              
              <div className="pt-4">
                <Button className="w-full">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Posting Schedule</CardTitle>
            <CardDescription>
              Configure when your content is automatically shared
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((platform) => (
                <div key={platform} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">{platform}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Auto-post</span>
                      <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                        <div className={`absolute w-4 h-4 ${platform === "Facebook" || platform === "Twitter" ? "bg-green-500 right-1" : "bg-gray-400 left-1"} top-0.5 rounded-full transition-all`}></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Best time</span>
                      <span className="font-medium">{platform === "Facebook" ? "6:30 PM" : platform === "Twitter" ? "8:15 AM" : "Not set"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SocialPage;
