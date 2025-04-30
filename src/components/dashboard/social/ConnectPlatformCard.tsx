
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface ConnectPlatformCardProps {
  onClick: () => void;
}

const ConnectPlatformCard = ({ onClick }: ConnectPlatformCardProps) => {
  return (
    <Card className="border-dashed border-2">
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
        <div className="rounded-full bg-gray-100 p-4 mb-4">
          <Plus size={24} className="text-gray-500" />
        </div>
        <h3 className="font-medium text-lg mb-2">Connect New Platform</h3>
        <p className="text-sm text-gray-500 text-center mb-4">
          Add more social media accounts to manage
        </p>
        <Button variant="outline" onClick={onClick}>
          Connect Platform
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectPlatformCard;
