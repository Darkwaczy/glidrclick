
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface PostLengthSelectorProps {
  length: number;
  onLengthChange: (length: number) => void;
}

const PostLengthSelector: React.FC<PostLengthSelectorProps> = ({
  length,
  onLengthChange
}) => {
  const handleSliderChange = (value: number[]) => {
    onLengthChange(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 400 && value <= 1000) {
      onLengthChange(value);
    }
  };

  return (
    <div className="space-y-3">
      <Label>Post Length (words)</Label>
      <div className="space-y-2">
        <Slider
          value={[length]}
          onValueChange={handleSliderChange}
          max={1000}
          min={400}
          step={50}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>400 words</span>
          <span>1000 words</span>
        </div>
        <Input
          type="number"
          min={400}
          max={1000}
          value={length}
          onChange={handleInputChange}
          className="w-20"
        />
      </div>
      <p className="text-xs text-gray-500">
        Minimum 400 words, maximum 1000 words for optimal engagement.
      </p>
    </div>
  );
};

export default PostLengthSelector;
