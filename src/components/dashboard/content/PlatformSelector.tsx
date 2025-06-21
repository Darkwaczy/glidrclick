
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Twitter, Instagram, Linkedin, FileText } from "lucide-react";
import { useSocialPlatforms } from "@/hooks/useSocialPlatforms";

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onSelectPlatforms: (platforms: string[]) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onSelectPlatforms
}) => {
  const { platforms, isLoading } = useSocialPlatforms();

  const availablePlatforms = [
    { id: "blog", name: "Blog", icon: FileText, requiresConnection: false },
    { id: "facebook", name: "Facebook", icon: Facebook, requiresConnection: true },
    { id: "twitter", name: "Twitter", icon: Twitter, requiresConnection: true },
    { id: "instagram", name: "Instagram", icon: Instagram, requiresConnection: true },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, requiresConnection: true }
  ];

  const handleSelectPlatform = (platformId: string, isChecked: boolean) => {
    if (platformId === "all" && isChecked) {
      // Select all connected platforms
      const connectedPlatformIds = availablePlatforms
        .filter(p => !p.requiresConnection || platforms.some(cp => cp.platform_id === p.id && cp.is_connected))
        .map(p => p.id);
      onSelectPlatforms(connectedPlatformIds);
    } else if (platformId === "all" && !isChecked) {
      onSelectPlatforms([]);
    } else {
      const newSelection = isChecked
        ? [...selectedPlatforms.filter(id => id !== "all"), platformId]
        : selectedPlatforms.filter(id => id !== platformId && id !== "all");
      onSelectPlatforms(newSelection);
    }
  };

  const getConnectionStatus = (platformId: string) => {
    if (platformId === "blog") return { connected: true, account: null };
    
    const platform = platforms.find(p => p.platform_id === platformId);
    return {
      connected: platform?.is_connected || false,
      account: platform?.account_name || null
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-3 border rounded-md p-4">
        <div className="text-sm text-gray-500">Loading platforms...</div>
      </div>
    );
  }

  return (
    <div className="space-y-3 border rounded-md p-4">
      <div className="mb-3">
        <div className="flex items-center space-x-2 mb-2">
          <Checkbox
            id="platform-all"
            checked={selectedPlatforms.includes("all") || 
              (selectedPlatforms.length > 0 && selectedPlatforms.length === availablePlatforms.filter(p => 
                !p.requiresConnection || getConnectionStatus(p.id).connected
              ).length)}
            onCheckedChange={(checked) => 
              handleSelectPlatform("all", checked === true)
            }
          />
          <Label htmlFor="platform-all" className="font-medium cursor-pointer">
            Select All Connected Platforms
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {availablePlatforms.map(platform => {
          const Icon = platform.icon;
          const connectionStatus = getConnectionStatus(platform.id);
          const isDisabled = platform.requiresConnection && !connectionStatus.connected;
          
          return (
            <div key={platform.id} className={`flex items-center justify-between space-x-2 p-2 rounded border ${
              isDisabled ? 'bg-gray-50 opacity-60' : 'bg-white'
            }`}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform.id}`}
                  checked={selectedPlatforms.includes(platform.id)}
                  onCheckedChange={(checked) => 
                    handleSelectPlatform(platform.id, checked === true)
                  }
                  disabled={isDisabled}
                />
                <Label htmlFor={`platform-${platform.id}`} className={`flex items-center cursor-pointer ${
                  isDisabled ? 'text-gray-400' : ''
                }`}>
                  <Icon size={16} className={`mr-2 ${
                    platform.id === 'facebook' ? 'text-blue-600' :
                    platform.id === 'twitter' ? 'text-blue-400' :
                    platform.id === 'instagram' ? 'text-pink-600' :
                    platform.id === 'linkedin' ? 'text-blue-800' :
                    'text-gray-700'
                  }`} />
                  {platform.name}
                </Label>
              </div>
              
              <div className="text-xs">
                {platform.requiresConnection ? (
                  connectionStatus.connected ? (
                    <span className="text-green-600 font-medium">
                      Connected{connectionStatus.account ? ` (${connectionStatus.account})` : ''}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium">Not Connected</span>
                  )
                ) : (
                  <span className="text-green-600 font-medium">Available</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {availablePlatforms.some(p => p.requiresConnection && !getConnectionStatus(p.id).connected) && (
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-700">
          <p>Connect more platforms in the <strong>Social</strong> tab to publish to additional channels.</p>
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;
