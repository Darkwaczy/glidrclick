
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface SystemHealthProps {
  onHealthAction: (action: string) => void;
}

const SystemHealth = ({ onHealthAction }: SystemHealthProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          System Status
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onHealthAction("Refresh System Status")}
          >
            <RefreshCcw size={16} />
          </Button>
        </CardTitle>
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
          <div>
            <h4 className="font-medium mb-4">Infrastructure</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>CDN Status</span>
                <Badge variant="outline" className="text-green-600 bg-green-50">Operational</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Server Load</span>
                <Badge variant="outline" className="text-green-600 bg-green-50">Normal (24%)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Storage</span>
                <Badge variant="outline" className="text-green-600 bg-green-50">68% Available</Badge>
              </div>
            </div>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => onHealthAction("Run Diagnostics")}
        >
          Run System Diagnostics
        </Button>
      </CardContent>
    </Card>
  );
};

export default SystemHealth;
