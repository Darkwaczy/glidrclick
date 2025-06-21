
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AIContentGeneratorProps {
  selectedModel: string;
  onSelectModel: (model: string) => void;
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ 
  selectedModel, 
  onSelectModel 
}) => {
  const aiModels = [
    { id: "openai", name: "OpenAI", description: "GPT-4 and other OpenAI models" },
    { id: "gemini", name: "Gemini", description: "Google's multimodal AI model" },
    { id: "deepseek", name: "DeepSeek", description: "Advanced reasoning capabilities" },
    { id: "grok", name: "Grok", description: "X's conversational AI model" },
    { id: "together", name: "Together AI", description: "Open-source model platform" }
  ];

  return (
    <div className="space-y-3">
      <RadioGroup 
        value={selectedModel} 
        onValueChange={onSelectModel}
        className="gap-2"
      >
        {aiModels.map(model => (
          <div key={model.id} className="flex items-center space-x-2 border border-white/20 rounded-md p-3 hover:bg-white/5">
            <RadioGroupItem value={model.id} id={model.id} className="border-white/20 text-white" />
            <Label htmlFor={model.id} className="flex-1 cursor-pointer text-white">
              <div className="font-medium">{model.name}</div>
              <p className="text-sm text-gray-400">{model.description}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default AIContentGenerator;
