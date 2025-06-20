
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChevronDown, Power, PowerOff, RefreshCw, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AIResourcesProps {
  onResourceAction: (action: string) => void;
}

const AIResources: React.FC<AIResourcesProps> = ({ onResourceAction }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          AI Resources
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Actions <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onResourceAction("refresh-stats")}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Stats
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onResourceAction("configure-ai")}>
                <Settings className="mr-2 h-4 w-4" />
                Configure AI
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Card className="p-2">
              <div className="text-xs text-gray-500">Content Gen Uses</div>
              <div className="text-2xl font-bold">2,432</div>
              <div className="text-xs text-green-600">+12% this week</div>
            </Card>
            
            <Card className="p-2">
              <div className="text-xs text-gray-500">Image Gen Uses</div>
              <div className="text-2xl font-bold">842</div>
              <div className="text-xs text-green-600">+8% this week</div>
            </Card>
            
            <Card className="p-2">
              <div className="text-xs text-gray-500">API Quota</div>
              <div className="text-2xl font-bold">68%</div>
              <div className="text-xs text-amber-600">Renews in 8 days</div>
            </Card>
            
            <Card className="p-2">
              <div className="text-xs text-gray-500">Avg. Response</div>
              <div className="text-2xl font-bold">1.2s</div>
              <div className="text-xs text-green-600">-0.3s this week</div>
            </Card>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">AI Services Status</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Content Generation</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Active</Badge>
                  </TableCell>
                  <TableCell>High</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onResourceAction("toggle-content-ai")}
                    >
                      <PowerOff className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium">Image Generation</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Active</Badge>
                  </TableCell>
                  <TableCell>Medium</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onResourceAction("toggle-image-ai")}
                    >
                      <PowerOff className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium">Title Optimization</TableCell>
                  <TableCell>
                    <Badge variant="outline">Inactive</Badge>
                  </TableCell>
                  <TableCell>Low</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onResourceAction("toggle-title-ai")}
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium">Tag Suggestions</TableCell>
                  <TableCell>
                    <Badge className="bg-green-500">Active</Badge>
                  </TableCell>
                  <TableCell>Low</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onResourceAction("toggle-tag-ai")}
                    >
                      <PowerOff className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIResources;
