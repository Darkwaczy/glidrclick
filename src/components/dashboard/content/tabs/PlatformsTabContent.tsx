
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Platform {
  id: string;
  name: string;
  icon: string;
  is_connected: boolean;
  platform_id: string;
}

const PlatformsTabContent: React.FC = () => {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const { data: user } = await supabase.auth.getUser();
        
        if (!user?.user?.id) {
          setPlatforms([]);
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('social_platforms')
          .select('*')
          .eq('user_id', user.user.id);

        if (error) {
          throw error;
        }

        setPlatforms(data || []);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlatforms();
  }, []);

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
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : platforms.length === 0 ? (
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
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <div 
                key={platform.id} 
                className="border rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate("/dashboard/social")}
              >
                <div className="font-medium">{platform.name}</div>
                <p className="text-xs text-gray-500">
                  {platform.is_connected ? "Connected" : "Not Connected"}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlatformsTabContent;
