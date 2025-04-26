
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Twitter, Instagram, Linkedin, Blog } from "lucide-react";

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onSelectPlatforms: (platforms: string[]) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onSelectPlatforms
}) => {
  const platforms = [
    { id: "all", name: "All Platforms", icon: null },
    { id: "blog", name: "Blog", icon: Blog },
    { id: "facebook", name: "Facebook", icon: Facebook },
    { id: "twitter", name: "Twitter", icon: Twitter },
    { id: "instagram", name: "Instagram", icon: Instagram },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin }
  ];

  const handleSelectPlatform = (platformId: string, isChecked: boolean) => {
    if (platformId === "all" && isChecked) {
      onSelectPlatforms(["all"]);
    } else if (platformId === "all" && !isChecked) {
      onSelectPlatforms([]);
    } else {
      const newSelection = isChecked
        ? [...selectedPlatforms.filter(id => id !== "all"), platformId]
        : selectedPlatforms.filter(id => id !== platformId && id !== "all");
      onSelectPlatforms(newSelection);
    }
  };

  return (
    <div className="space-y-3 border rounded-md p-4">
      <div className="grid grid-cols-2 gap-3">
        {platforms.map(platform => {
          const Icon = platform.icon;
          return (
            <div key={platform.id} className="flex items-center space-x-2">
              <Checkbox
                id={`platform-${platform.id}`}
                checked={selectedPlatforms.includes(platform.id)}
                onCheckedChange={(checked) => 
                  handleSelectPlatform(platform.id, checked === true)
                }
              />
              <Label htmlFor={`platform-${platform.id}`} className="flex items-center gap-2 cursor-pointer">
                {Icon && <Icon size={16} />}
                {platform.name}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformSelector;
