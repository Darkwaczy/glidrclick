
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
    </>
  );
};

export default AdminTabContent;
