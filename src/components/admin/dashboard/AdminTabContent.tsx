
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import SystemHealth from "./SystemHealth";
import AIResources from "./AIResources";
import UsersTable from "@/components/admin/UsersTable";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Settings, Shield, FileText } from "lucide-react";

interface AdminTabContentProps {
  activeTab: string;
}

const AdminTabContent = ({ activeTab }: AdminTabContentProps) => {
  const handleAction = (action: string) => {
    toast.success(`${action} action triggered!`);
  };

  return (
    <>
      <TabsContent value="users">
        <UsersTable onUserAction={(action, userId) => {
          toast.success(`${action} user ${userId}`);
        }} />
      </TabsContent>
      
      <TabsContent value="system">
        <div className="space-y-6">
          <SystemHealth onHealthAction={(action) => {
            handleAction(`System Health: ${action}`);
          }} />
          <AIResources onResourceAction={(action) => {
            handleAction(`AI Resources: ${action}`);
          }} />
        </div>
      </TabsContent>

      <TabsContent value="analytics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>System Usage</CardTitle>
              <CardDescription>Overall system resource utilization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">CPU Usage</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                </div>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Memory</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "68%" }}></div>
                </div>
                <span className="text-sm font-medium">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "34%" }}></div>
                </div>
                <span className="text-sm font-medium">34%</span>
              </div>
              <Button 
                className="mt-4 w-full" 
                variant="outline"
                onClick={() => handleAction("Generate System Usage Report")}
              >
                <BarChart3 size={16} className="mr-2" /> Generate Report
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Monthly active users and registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">User activity chart will be displayed here</p>
              </div>
              <Button 
                className="mt-4 w-full" 
                variant="outline"
                onClick={() => handleAction("Export User Activity Data")}
              >
                <FileText size={16} className="mr-2" /> Export Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Overview</CardTitle>
            <CardDescription>System security settings and monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <Shield size={20} className="text-green-600 mr-2" />
                  <h4 className="font-medium">Firewall Status</h4>
                </div>
                <p className="text-sm text-green-800 mt-1">Active and protecting</p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-center">
                  <Shield size={20} className="text-blue-600 mr-2" />
                  <h4 className="font-medium">Last Security Scan</h4>
                </div>
                <p className="text-sm text-blue-800 mt-1">Today, 04:30 AM</p>
              </div>
              
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex items-center">
                  <Shield size={20} className="text-amber-600 mr-2" />
                  <h4 className="font-medium">Security Updates</h4>
                </div>
                <p className="text-sm text-amber-800 mt-1">2 updates available</p>
              </div>
              
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <Shield size={20} className="text-red-600 mr-2" />
                  <h4 className="font-medium">Blocked Attempts</h4>
                </div>
                <p className="text-sm text-red-800 mt-1">43 in the last 24 hours</p>
              </div>
            </div>
            
            <Button 
              onClick={() => handleAction("Run Security Scan")}
              className="w-full mt-4"
            >
              Run Security Scan
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Admin Settings</CardTitle>
            <CardDescription>Configure system-wide preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">System Maintenance Mode</h4>
                  <p className="text-sm text-gray-500">Enable during maintenance periods</p>
                </div>
                <div className="flex items-center h-6 rounded-full bg-gray-200 w-12 px-1 cursor-pointer" onClick={() => handleAction("Toggle Maintenance Mode")}>
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">User Registrations</h4>
                  <p className="text-sm text-gray-500">Allow new account creation</p>
                </div>
                <div className="flex items-center justify-end h-6 rounded-full bg-blue-500 w-12 px-1 cursor-pointer" onClick={() => handleAction("Toggle User Registrations")}>
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">System Notifications</h4>
                  <p className="text-sm text-gray-500">Send alerts to admins</p>
                </div>
                <div className="flex items-center justify-end h-6 rounded-full bg-blue-500 w-12 px-1 cursor-pointer" onClick={() => handleAction("Toggle System Notifications")}>
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => handleAction("Save Settings")}
              >
                <Settings size={16} className="mr-2" /> Save Settings
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleAction("Reset to Defaults")}
              >
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};

export default AdminTabContent;
