
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
    { id: "friendly", name: "Friendly" },
    { id: "authoritative", name: "Authoritative" },
    { id: "persuasive", name: "Persuasive" },
    { id: "humorous", name: "Humorous" },
    { id: "inspirational", name: "Inspirational" },
    { id: "formal", name: "Formal" }
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="tone">Select Content Tone</Label>
      <Select value={selectedTone} onValueChange={onSelectTone}>
        <SelectTrigger>
          <SelectValue placeholder="Select a tone" />
        </SelectTrigger>
        <SelectContent>
          {tones.map(tone => (
            <SelectItem key={tone.id} value={tone.id}>
              {tone.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-gray-500 mt-1">
        The tone affects how your content will be perceived by your audience.
      </p>
    </div>
  );
};

export default ToneSelector;
