
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface SectionTitlesInputProps {
  sections: string[];
  onSectionsChange: (sections: string[]) => void;
}

const SectionTitlesInput: React.FC<SectionTitlesInputProps> = ({
  sections,
  onSectionsChange
}) => {
  const handleSectionChange = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index] = value;
    onSectionsChange(newSections);
  };

  const addSection = () => {
    if (sections.length < 5) {
      onSectionsChange([...sections, ""]);
    }
  };

  const removeSection = (index: number) => {
    if (sections.length > 3) {
      const newSections = sections.filter((_, i) => i !== index);
      onSectionsChange(newSections);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-white">Section Titles (3-5 sections)</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSection}
          disabled={sections.length >= 5}
          className="flex items-center gap-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Plus size={14} />
          Add Section
        </Button>
      </div>
      
      <div className="space-y-2">
        {sections.map((section, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              placeholder={
                index === 0 
                  ? "Introduction" 
                  : index === sections.length - 1 
                    ? "Conclusion" 
                    : `Section ${index + 1}`
              }
              value={section}
              onChange={(e) => handleSectionChange(index, e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            {sections.length > 3 && index !== 0 && index !== sections.length - 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeSection(index)}
                className="flex-shrink-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <X size={14} />
              </Button>
            )}
          </div>
        ))}
      </div>
      
      <p className="text-xs text-gray-400">
        First section will be the Introduction, last section will be the Conclusion.
      </p>
    </div>
  );
};

export default SectionTitlesInput;
