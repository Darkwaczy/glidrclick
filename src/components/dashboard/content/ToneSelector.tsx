
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ToneSelectorProps {
  selectedTone: string;
  onSelectTone: (tone: string) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({
  selectedTone,
  onSelectTone
}) => {
  const tones = [
    { id: "professional", name: "Professional" },
    { id: "casual", name: "Casual" },
    { id: "business", name: "Business" },
    { id: "motivational", name: "Motivational" },
    { id: "informative", name: "Informative" }
  ];

  return (
    <div className="space-y-2">
      <Select value={selectedTone} onValueChange={onSelectTone}>
        <SelectTrigger className="bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Select a tone" />
        </SelectTrigger>
        <SelectContent className="bg-dark-primary border-white/20">
          {tones.map(tone => (
            <SelectItem 
              key={tone.id} 
              value={tone.id}
              className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
            >
              {tone.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-400 mt-1">
        The tone affects how your content will be perceived by your audience.
      </p>
    </div>
  );
};

export default ToneSelector;
