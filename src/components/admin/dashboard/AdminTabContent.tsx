
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import SystemHealth from "./SystemHealth";
import AIResources from "./AIResources";
import UsersTable from "@/components/admin/UsersTable";

interface AdminTabContentProps {
  activeTab: string;
}

const AdminTabContent = ({ activeTab }: AdminTabContentProps) => {
  return (
    <>
      <TabsContent value="users">
        <UsersTable />
      </TabsContent>
      
      <TabsContent value="system">
        <div className="space-y-6">
          <SystemHealth />
          <AIResources />
        </div>
      </TabsContent>

      <TabsContent value="analytics">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-medium mb-4">Analytics Dashboard</h3>
          <p className="text-gray-500">Analytics content will be displayed here.</p>
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-medium mb-4">Admin Settings</h3>
          <p className="text-gray-500">Settings content will be displayed here.</p>
        </div>
      </TabsContent>
    </>
  );
};

export default AdminTabContent;
