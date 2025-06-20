
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SettingsTabContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Settings</CardTitle>
        <CardDescription>Common settings and preferences</CardDescription>
        <Button variant="outline" className="mt-2" onClick={() => navigate("/dashboard/settings")}>
          View All Settings
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Auto-Publishing</h3>
              <p className="text-sm text-gray-500">Automatically publish scheduled posts</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/settings")}>
              Configure
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-gray-500">Email and push notification settings</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/settings")}>
              Configure
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTabContent;
