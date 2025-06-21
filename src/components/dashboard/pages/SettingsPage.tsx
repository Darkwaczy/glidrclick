
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database,
  Key,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6 bg-transparent">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-300">Manage your account preferences and application settings</p>
        </div>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass-card border-white/20 bg-dark-secondary/50">
          <TabsTrigger value="general" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">General</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">Notifications</TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">Privacy</TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">Appearance</TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-neon-electric/20 data-[state=active]:text-white text-gray-300">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 bg-transparent">
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe size={20} className="text-neon-electric" />
                General Settings
              </CardTitle>
              <CardDescription className="text-gray-300">
                Configure your basic account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-white">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC-05:00 (EST)" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-white">Language</Label>
                  <Input id="language" defaultValue="English (US)" className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Auto-save drafts</Label>
                    <p className="text-sm text-gray-300">Automatically save your work as you type</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Show onboarding tips</Label>
                    <p className="text-sm text-gray-300">Display helpful tips for new features</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Button onClick={handleSaveSettings} className="btn-neon">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 bg-transparent">
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell size={20} className="text-neon-electric" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-gray-300">
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Post performance updates</Label>
                      <p className="text-sm text-gray-300">Weekly summaries of your content performance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">New follower alerts</Label>
                      <p className="text-sm text-gray-300">Get notified when you gain new followers</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Scheduled post reminders</Label>
                      <p className="text-sm text-gray-300">Reminders about upcoming scheduled posts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Separator className="bg-white/20" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Push Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Mentions and replies</Label>
                      <p className="text-sm text-gray-300">When someone mentions or replies to you</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Publishing confirmations</Label>
                      <p className="text-sm text-gray-300">Confirm when posts are successfully published</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveSettings} className="btn-neon">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6 bg-transparent">
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield size={20} className="text-neon-electric" />
                Privacy & Security
              </CardTitle>
              <CardDescription className="text-gray-300">
                Manage your privacy settings and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Make profile public</Label>
                    <p className="text-sm text-gray-300">Allow others to view your profile information</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Analytics data sharing</Label>
                    <p className="text-sm text-gray-300">Share anonymized data to improve our services</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator className="bg-white/20" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Account Security</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Key size={16} className="mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Shield size={16} className="mr-2" />
                    Enable Two-Factor Authentication
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6 bg-transparent">
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette size={20} className="text-neon-electric" />
                Appearance Settings
              </CardTitle>
              <CardDescription className="text-gray-300">
                Customize how the application looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-white">Theme</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <div className="p-3 border border-neon-electric/50 bg-neon-electric/10 rounded-lg text-center">
                      <Badge className="bg-neon-electric/20 text-neon-electric border-neon-electric/50">Dark (Current)</Badge>
                    </div>
                    <div className="p-3 border border-white/20 rounded-lg text-center opacity-50">
                      <Badge variant="secondary" className="bg-white/20 text-gray-300">Light</Badge>
                    </div>
                    <div className="p-3 border border-white/20 rounded-lg text-center opacity-50">
                      <Badge variant="secondary" className="bg-white/20 text-gray-300">Auto</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Compact mode</Label>
                    <p className="text-sm text-gray-300">Reduce spacing and padding throughout the app</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Animation effects</Label>
                    <p className="text-sm text-gray-300">Enable smooth transitions and animations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Button onClick={handleSaveSettings} className="btn-neon">
                Apply Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6 bg-transparent">
          <Card className="glass-card border-white/20 bg-dark-secondary/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database size={20} className="text-neon-electric" />
                Advanced Settings
              </CardTitle>
              <CardDescription className="text-gray-300">
                Advanced configuration options and data management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Data Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Download size={16} className="mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Upload size={16} className="mr-2" />
                    Import Data
                  </Button>
                </div>
              </div>
              
              <Separator className="bg-white/20" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-red-400">Danger Zone</h3>
                <div className="p-4 border border-red-500/50 bg-red-500/10 rounded-lg">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-red-300">Delete Account</h4>
                      <p className="text-sm text-red-200/80">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" className="bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30">
                      <Trash2 size={16} className="mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
