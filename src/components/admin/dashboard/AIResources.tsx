
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AIResourcesProps {
  onResourceAction: (action: string) => void;
}

const AIResources = ({ onResourceAction }: AIResourcesProps) => {
  return (
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
        </div>
        <Button 
          className="w-full" 
          onClick={() => onResourceAction("Adjust AI Resource Allocation")}
        >
          Adjust AI Resource Allocation
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIResources;
