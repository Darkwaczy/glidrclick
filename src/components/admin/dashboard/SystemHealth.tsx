
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SystemHealth = () => {
  return (
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemHealth;
