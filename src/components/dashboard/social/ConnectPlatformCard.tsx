
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface ConnectPlatformCardProps {
  onClick: () => void;
}

const ConnectPlatformCard = ({ onClick }: ConnectPlatformCardProps) => {
  return (
    <Card className="glass-card border-dashed border-2 border-white/30 hover:border-neon-electric/50 transition-all duration-300">
      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
        <div className="rounded-full bg-gradient-to-r from-neon-electric/20 to-neon-pink/20 p-4 mb-4">
          <Plus size={24} className="text-neon-electric" />
        </div>
        <h3 className="font-medium text-lg mb-2 text-white">Connect New Platform</h3>
        <p className="text-sm text-gray-300 text-center mb-4">
          Add more social media accounts to manage
        </p>
        <Button 
          variant="outline" 
          onClick={onClick}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-neon-electric/50"
        >
          Connect Platform
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectPlatformCard;
