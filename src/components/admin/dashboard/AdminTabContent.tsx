
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import SystemHealth from "./SystemHealth";
import AIResources from "./AIResources";
import UsersTable from "@/components/admin/UsersTable";
import { toast } from "sonner";

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
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-medium mb-4">Analytics Dashboard</h3>
          <p className="text-gray-500">Analytics content will be displayed here.</p>
          <div className="mt-4">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => handleAction("Generate Analytics Report")}
            >
              Generate Report
            </button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-medium mb-4">Admin Settings</h3>
          <p className="text-gray-500">Settings content will be displayed here.</p>
          <div className="mt-4 space-x-2">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={() => handleAction("Save Settings")}
            >
              Save Settings
            </button>
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              onClick={() => handleAction("Reset Settings")}
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default AdminTabContent;
