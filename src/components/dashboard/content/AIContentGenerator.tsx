
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
    { id: "chatgpt", name: "ChatGPT", description: "OpenAI's powerful language model" },
    { id: "grok", name: "Grok", description: "Conversational AI by xAI" },
    { id: "deepseek", name: "Deepseek", description: "Advanced reasoning capabilities" },
    { id: "gemini", name: "Gemini", description: "Google's multimodal AI model" }
  ];

  return (
    <div className="space-y-3">
      <Label>Choose AI Model</Label>
      <RadioGroup 
        value={selectedModel} 
        onValueChange={onSelectModel}
        className="gap-2"
      >
        {aiModels.map(model => (
          <div key={model.id} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-gray-50">
            <RadioGroupItem value={model.id} id={model.id} />
            <Label htmlFor={model.id} className="flex-1 cursor-pointer">
              <div className="font-medium">{model.name}</div>
              <p className="text-sm text-gray-500">{model.description}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default AIContentGenerator;
