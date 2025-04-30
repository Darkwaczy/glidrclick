
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PlatformsTabContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Platforms</CardTitle>
        <CardDescription>Manage your social media accounts</CardDescription>
        <Button variant="outline" className="mt-2" onClick={() => navigate("/dashboard/social")}>
          Manage Social Accounts
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
            <div 
              key={platform} 
              className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate("/dashboard/social")}
            >
              <div className="font-medium">{platform}</div>
              <p className="text-xs text-gray-500">Not Connected</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformsTabContent;
