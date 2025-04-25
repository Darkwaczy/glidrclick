import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import UsersTable from "@/components/admin/UsersTable";
import DashboardStats from "@/components/admin/DashboardStats";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && ["users", "analytics", "system", "settings"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />

        {/* Main dashboard content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600">System overview and user management</p>
            </div>
          </div>

          <DashboardStats />

          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Users Tab Content */}
            <TabsContent value="users">
              <UsersTable />
            </TabsContent>
            
            {/* Analytics Tab Content */}
            <TabsContent value="analytics">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Monthly Revenue</CardTitle>
                      <CardDescription>Revenue trends for 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                        <p className="text-gray-500">Revenue Chart Would Show Here</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Plan Distribution</CardTitle>
                      <CardDescription>Current user plans</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Free Trial</span>
                          <span>22%</span>
                        </div>
                        <Progress value={22} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Pro Plan</span>
                          <span>58%</span>
                        </div>
                        <Progress value={58} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Elite Plan</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Resource Usage</CardTitle>
                    <CardDescription>Current API and storage metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">API Usage</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Content Generation</span>
                            <span>68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Auto-Posting</span>
                            <span>42%</span>
                          </div>
                          <Progress value={42} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Social Sharing</span>
                            <span>76%</span>
                          </div>
                          <Progress value={76} className="h-2" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium">Storage Usage</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Images</span>
                            <span>32 GB</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Blog Content</span>
                            <span>12 GB</span>
                          </div>
                          <Progress value={25} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>User Data</span>
                            <span>4 GB</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* System Tab Content */}
            <TabsContent value="system">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Current operational status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-4">Services</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>API Services</span>
                            <Badge variant="outline" className="text-green-600 bg-green-50">Operational</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Content Generation</span>
                            <Badge variant="outline" className="text-green-600 bg-green-50">Operational</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Database</span>
                            <Badge variant="outline" className="text-green-600 bg-green-50">Operational</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>File Storage</span>
                            <Badge variant="outline" className="text-green-600 bg-green-50">Operational</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Social Media Integration</span>
                            <Badge variant="outline" className="text-yellow-600 bg-yellow-50">Partial Outage</Badge>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-4">Latest Incidents</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between">
                              <h5 className="font-medium">Social Media Integration Issue</h5>
                              <span className="text-sm text-gray-500">Apr 24, 2025</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Twitter API rate limiting causing delays in post scheduling.
                              Engineering team is implementing a fix.
                            </p>
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <h5 className="font-medium">Database Maintenance</h5>
                              <span className="text-sm text-gray-500">Apr 20, 2025</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Scheduled database optimization completed successfully.
                              No downtime reported.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>AI Resource Management</CardTitle>
                    <CardDescription>AI content generation settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Model Performance</h4>
                          <p className="text-sm text-gray-500">Current AI model efficiency</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">95.2%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Daily Quota</h4>
                          <p className="text-sm text-gray-500">AI requests per day</p>
                        </div>
                        <span>25,000 / 30,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Average Response Time</h4>
                          <p className="text-sm text-gray-500">Content generation speed</p>
                        </div>
                        <span>1.8s</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full" onClick={() => toast.success("AI Resources adjusted!")}>
                        Adjust AI Resource Allocation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Settings Tab Content */}
            <TabsContent value="settings">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Global configuration for all users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">API Rate Limiting</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-500 block mb-1">Free Plan Limits</label>
                          <Select defaultValue="10">
                            <SelectTrigger>
                              <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 requests/min</SelectItem>
                              <SelectItem value="10">10 requests/min</SelectItem>
                              <SelectItem value="20">20 requests/min</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500 block mb-1">Paid Plan Limits</label>
                          <Select defaultValue="60">
                            <SelectTrigger>
                              <SelectValue placeholder="Select limit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 requests/min</SelectItem>
                              <SelectItem value="60">60 requests/min</SelectItem>
                              <SelectItem value="100">100 requests/min</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Content Moderation</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-500 block mb-1">Sensitivity Level</label>
                          <Select defaultValue="medium">
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500 block mb-1">Auto-Flagging</label>
                          <Select defaultValue="enabled">
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="enabled">Enabled</SelectItem>
                              <SelectItem value="disabled">Disabled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Backup Settings</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-500 block mb-1">Frequency</label>
                          <Select defaultValue="daily">
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500 block mb-1">Retention Period</label>
                          <Select defaultValue="30">
                            <SelectTrigger>
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7">7 days</SelectItem>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full"
                        onClick={() => toast.success("System settings saved successfully!")}
                      >
                        Save System Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
