
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

interface SystemHealthProps {
  onHealthAction: (action: string) => void;
}

const SystemHealth: React.FC<SystemHealthProps> = ({ onHealthAction }) => {
  // This would normally fetch real-time system health data
  const systemStatus = {
    cpu: 32,
    memory: 64,
    disk: 45,
    api: {
      facebook: { status: "healthy", latency: 120 },
      twitter: { status: "degraded", latency: 750 },
      instagram: { status: "healthy", latency: 180 },
      wordpress: { status: "healthy", latency: 210 }
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "healthy" ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <AlertCircle className="h-5 w-5 text-amber-500" />
    );
  };

  const getLatencyClass = (latency: number) => {
    if (latency < 200) return "text-green-600";
    if (latency < 500) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          System Health
          <Button variant="ghost" size="icon" onClick={() => onHealthAction("refresh")}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>CPU Usage</span>
              <span>{systemStatus.cpu}%</span>
            </div>
            <Progress value={systemStatus.cpu} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Memory Usage</span>
              <span>{systemStatus.memory}%</span>
            </div>
            <Progress value={systemStatus.memory} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Disk Usage</span>
              <span>{systemStatus.disk}%</span>
            </div>
            <Progress value={systemStatus.disk} className="h-2" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">API Status</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(systemStatus.api).map(([service, data]) => (
              <div key={service} className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-2">
                  {getStatusIcon(data.status)}
                  <span className="capitalize">{service}</span>
                </div>
                <span className={`text-xs ${getLatencyClass(data.latency)}`}>
                  {data.latency}ms
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {systemStatus.api.twitter.status === "degraded" && (
          <Alert variant="destructive" className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle>Performance Warning</AlertTitle>
            <AlertDescription>
              Twitter API is experiencing higher than normal latency.
              <Button 
                variant="link" 
                className="p-0 h-auto text-amber-600 pl-1"
                onClick={() => onHealthAction("diagnose-twitter")}
              >
                Run diagnostics
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemHealth;
