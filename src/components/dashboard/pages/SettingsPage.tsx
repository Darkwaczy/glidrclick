
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoPublishing, setAutoPublishing] = useState(true);
  const [weekendsPublishing, setWeekendsPublishing] = useState(false);
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("america-new-york");
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [dataCollection, setDataCollection] = useState(true);
  const [personalization, setPersonalization] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [autoHashtagging, setAutoHashtagging] = useState(true);
  const [linkShortening, setLinkShortening] = useState(true);
  const [showMarketplaceDialog, setShowMarketplaceDialog] = useState(false);
  
  const handleSaveGeneralSettings = () => {
    toast.success("General settings saved successfully!");
  };
  
  const handleSaveNotificationSettings = () => {
    toast.success("Notification settings saved successfully!");
  };
  
  const handleSavePublishingSettings = () => {
    toast.success("Publishing settings saved successfully!");
  };
  
  const handleConnectIntegration = (integration: string, connected: boolean) => {
    if (connected) {
      toast.success(`Disconnected from ${integration}`);
    } else {
      toast.success(`Connected to ${integration}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="publishing">Publishing</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-new-york">America/New York (GMT-4)</SelectItem>
                        <SelectItem value="america-chicago">America/Chicago (GMT-5)</SelectItem>
                        <SelectItem value="america-denver">America/Denver (GMT-6)</SelectItem>
                        <SelectItem value="america-los-angeles">America/Los Angeles (GMT-7)</SelectItem>
                        <SelectItem value="europe-london">Europe/London (GMT+1)</SelectItem>
                        <SelectItem value="europe-paris">Europe/Paris (GMT+2)</SelectItem>
                        <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="dark-mode" className="font-normal flex-grow">
                    <div>Dark Mode</div>
                    <p className="text-sm font-normal text-gray-500">Enable dark mode for the dashboard</p>
                  </Label>
                  <Switch 
                    id="dark-mode" 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="compact-view" className="font-normal flex-grow">
                    <div>Compact View</div>
                    <p className="text-sm font-normal text-gray-500">Use compact layout for lists and tables</p>
                  </Label>
                  <Switch 
                    id="compact-view"
                    checked={compactView}
                    onCheckedChange={setCompactView}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage how your data is used</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="data-collection" className="font-normal flex-grow">
                    <div>Data Collection</div>
                    <p className="text-sm font-normal text-gray-500">Allow anonymous usage data collection to improve our service</p>
                  </Label>
                  <Switch 
                    id="data-collection" 
                    checked={dataCollection}
                    onCheckedChange={setDataCollection}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="personalization" className="font-normal flex-grow">
                    <div>Content Personalization</div>
                    <p className="text-sm font-normal text-gray-500">Allow us to personalize content and suggestions for you</p>
                  </Label>
                  <Switch 
                    id="personalization" 
                    checked={personalization}
                    onCheckedChange={setPersonalization}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" onClick={() => toast.info("Exporting data...")}>
                    Export My Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Control how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="email-notifications" className="font-normal flex-grow">
                      <div>Enable Email Notifications</div>
                      <p className="text-sm font-normal text-gray-500">Master toggle for all email notifications</p>
                    </Label>
                    <Switch 
                      id="email-notifications" 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 pl-6">
                    <Label htmlFor="email-post-published" className="font-normal flex-grow">
                      <div>Post Published</div>
                      <p className="text-sm font-normal text-gray-500">When your scheduled content is published</p>
                    </Label>
                    <Switch 
                      id="email-post-published" 
                      disabled={!emailNotifications} 
                      defaultChecked={emailNotifications} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 pl-6">
                    <Label htmlFor="email-mentions" className="font-normal flex-grow">
                      <div>Social Mentions</div>
                      <p className="text-sm font-normal text-gray-500">When someone mentions your brand</p>
                    </Label>
                    <Switch 
                      id="email-mentions" 
                      disabled={!emailNotifications}
                      defaultChecked={emailNotifications} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 pl-6">
                    <Label htmlFor="email-analytics" className="font-normal flex-grow">
                      <div>Weekly Analytics</div>
                      <p className="text-sm font-normal text-gray-500">Weekly summary of your content performance</p>
                    </Label>
                    <Switch 
                      id="email-analytics" 
                      disabled={!emailNotifications} 
                      defaultChecked={emailNotifications} 
                    />
                  </div>
                </div>
                
                <h3 className="text-lg font-medium pt-4 border-t">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="push-notifications" className="font-normal flex-grow">
                      <div>Enable Push Notifications</div>
                      <p className="text-sm font-normal text-gray-500">Master toggle for all push notifications</p>
                    </Label>
                    <Switch 
                      id="push-notifications" 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 pl-6">
                    <Label htmlFor="push-post-published" className="font-normal flex-grow">
                      <div>Post Published</div>
                      <p className="text-sm font-normal text-gray-500">When your scheduled content is published</p>
                    </Label>
                    <Switch 
                      id="push-post-published" 
                      disabled={!pushNotifications}
                      defaultChecked={pushNotifications} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 pl-6">
                    <Label htmlFor="push-mentions" className="font-normal flex-grow">
                      <div>Social Mentions</div>
                      <p className="text-sm font-normal text-gray-500">When someone mentions your brand</p>
                    </Label>
                    <Switch 
                      id="push-mentions" 
                      disabled={!pushNotifications}
                      defaultChecked={pushNotifications} 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveNotificationSettings}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="publishing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
              <CardDescription>Configure your content publishing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="auto-publishing" className="font-normal flex-grow">
                      <div>Auto Publishing</div>
                      <p className="text-sm font-normal text-gray-500">Automatically publish scheduled content</p>
                    </Label>
                    <Switch 
                      id="auto-publishing" 
                      checked={autoPublishing} 
                      onCheckedChange={setAutoPublishing} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="weekends-publishing" className="font-normal flex-grow">
                      <div>Weekend Publishing</div>
                      <p className="text-sm font-normal text-gray-500">Allow content to be published on weekends</p>
                    </Label>
                    <Switch 
                      id="weekends-publishing" 
                      checked={weekendsPublishing}
                      onCheckedChange={setWeekendsPublishing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-platform">Default Publishing Platform</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select default platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Connected Platforms</SelectItem>
                        <SelectItem value="facebook">Facebook Only</SelectItem>
                        <SelectItem value="twitter">Twitter Only</SelectItem>
                        <SelectItem value="instagram">Instagram Only</SelectItem>
                        <SelectItem value="linkedin">LinkedIn Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="optimal-times">Optimal Publishing Times</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger>
                        <SelectValue placeholder="Select publishing time strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-optimize (AI-recommended)</SelectItem>
                        <SelectItem value="morning">Morning (8am - 11am)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
                        <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                        <SelectItem value="manual">Manual (Set your own times)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content-format">Default Content Format</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select content format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="carousel">Carousel</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium pt-4 border-t">Content Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="ai-suggestions" className="font-normal flex-grow">
                      <div>AI Content Suggestions</div>
                      <p className="text-sm font-normal text-gray-500">Get AI-powered content recommendations</p>
                    </Label>
                    <Switch 
                      id="ai-suggestions" 
                      checked={aiSuggestions}
                      onCheckedChange={setAiSuggestions}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="auto-hashtagging" className="font-normal flex-grow">
                      <div>Auto Hashtagging</div>
                      <p className="text-sm font-normal text-gray-500">Automatically add relevant hashtags to posts</p>
                    </Label>
                    <Switch 
                      id="auto-hashtagging" 
                      checked={autoHashtagging}
                      onCheckedChange={setAutoHashtagging}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="link-shortening" className="font-normal flex-grow">
                      <div>Automatic Link Shortening</div>
                      <p className="text-sm font-normal text-gray-500">Shorten links in posts automatically</p>
                    </Label>
                    <Switch 
                      id="link-shortening" 
                      checked={linkShortening}
                      onCheckedChange={setLinkShortening}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSavePublishingSettings}>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Integrations</CardTitle>
              <CardDescription>Manage third-party services and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg divide-y">
                  {integrations.map((integration, index) => (
                    <div key={index} className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full ${integration.bgColor} flex items-center justify-center mr-4`}>
                          <span className={`text-xl font-bold ${integration.textColor}`}>
                            {integration.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{integration.name}</h3>
                          <p className="text-sm text-gray-500">{integration.status}</p>
                        </div>
                      </div>
                      <Button 
                        variant={integration.connected ? "outline" : "default"}
                        onClick={() => handleConnectIntegration(integration.name, integration.connected)}
                      >
                        {integration.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="text-center">
                  <Button variant="outline" onClick={() => setShowMarketplaceDialog(true)}>
                    Browse Integration Marketplace
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={showMarketplaceDialog} onOpenChange={setShowMarketplaceDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Integration Marketplace</DialogTitle>
                <DialogDescription>
                  Browse available integrations for your account
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {marketplaceIntegrations.map((integration, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${integration.bgColor} flex items-center justify-center`}>
                        <span className={`text-lg font-bold ${integration.textColor}`}>
                          {integration.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-xs text-gray-500">{integration.description}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3 w-full"
                      onClick={() => {
                        toast.success(`Connected to ${integration.name}`);
                        setShowMarketplaceDialog(false);
                      }}
                    >
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowMarketplaceDialog(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Mock data for integrations
const integrations = [
  { 
    name: "Google Analytics", 
    status: "Connected on Apr 10, 2025", 
    connected: true,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600" 
  },
  { 
    name: "Mailchimp", 
    status: "Email marketing platform", 
    connected: true,
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-600" 
  },
  { 
    name: "Shopify", 
    status: "E-commerce platform", 
    connected: false,
    bgColor: "bg-green-100",
    textColor: "text-green-600" 
  },
  { 
    name: "Zapier", 
    status: "Automation tool", 
    connected: false,
    bgColor: "bg-orange-100",
    textColor: "text-orange-600" 
  },
  { 
    name: "WordPress", 
    status: "Content management system", 
    connected: true,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600" 
  }
];

// Mock data for marketplace integrations
const marketplaceIntegrations = [
  {
    name: "HubSpot",
    description: "CRM and marketing automation",
    bgColor: "bg-orange-100",
    textColor: "text-orange-600"
  },
  {
    name: "Slack",
    description: "Team communication tool",
    bgColor: "bg-purple-100",
    textColor: "text-purple-600"
  },
  {
    name: "Canva",
    description: "Graphic design platform",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600"
  },
  {
    name: "Asana",
    description: "Project management tool",
    bgColor: "bg-red-100",
    textColor: "text-red-600"
  },
  {
    name: "Buffer",
    description: "Social media scheduling",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600"
  },
  {
    name: "Google Drive",
    description: "File storage and sharing",
    bgColor: "bg-green-100",
    textColor: "text-green-600"
  }
];

export default SettingsPage;
