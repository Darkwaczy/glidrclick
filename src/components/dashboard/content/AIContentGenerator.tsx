
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Info, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AIContentGeneratorProps {
  selectedModel: string;
  onSelectModel: (model: string) => void;
  onRequestAdvancedAnalysis?: () => void;
  onToggleCollaboration?: () => void;
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ 
  selectedModel, 
  onSelectModel,
  onRequestAdvancedAnalysis,
  onToggleCollaboration
}) => {
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const [showCollaborationFeatures, setShowCollaborationFeatures] = useState(false);
  
  const aiModels = [
    { id: "llama", name: "LLaMA 3", description: "Meta's powerful 70B language model" },
    { id: "claude", name: "Claude", description: "Anthropic's advanced AI assistant" },
    { id: "groq", name: "Groq", description: "Ultra-fast inference engine" },
    { id: "gemini", name: "Gemini", description: "Google's multimodal AI model" }
  ];

  const toggleAdvancedFeatures = () => {
    setShowAdvancedFeatures(!showAdvancedFeatures);
  };

  const toggleCollaborationFeatures = () => {
    setShowCollaborationFeatures(!showCollaborationFeatures);
    if (onToggleCollaboration) {
      onToggleCollaboration();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Choose AI Model</Label>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleAdvancedFeatures}
            className="text-xs"
          >
            {showAdvancedFeatures ? "Hide" : "Show"} Advanced Features
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleCollaborationFeatures}
            className="text-xs flex items-center gap-1"
          >
            <Users size={14} />
            {showCollaborationFeatures ? "Hide" : "Show"} Collaboration
          </Button>
        </div>
      </div>
      
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
      
      {showAdvancedFeatures && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <h3 className="font-medium flex items-center gap-2">
            Advanced AI Analysis
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Using audience data and platform analytics to provide intelligent recommendations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={onRequestAdvancedAnalysis}
            >
              <div className="text-left">
                <div className="font-medium">Audience Analysis</div>
                <p className="text-xs text-gray-500">Recommend optimal posting times</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={onRequestAdvancedAnalysis}
            >
              <div className="text-left">
                <div className="font-medium">Content Personalization</div>
                <p className="text-xs text-gray-500">Adapt to platform analytics</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={onRequestAdvancedAnalysis}
            >
              <div className="text-left">
                <div className="font-medium">A/B Testing</div>
                <p className="text-xs text-gray-500">Test headlines and content variations</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={onRequestAdvancedAnalysis}
            >
              <div className="text-left">
                <div className="font-medium">SEO Optimization</div>
                <p className="text-xs text-gray-500">Improve content for search engines</p>
              </div>
            </Button>
          </div>
        </div>
      )}

      {showCollaborationFeatures && (
        <div className="mt-4 space-y-3 border-t pt-4">
          <h3 className="font-medium flex items-center gap-2">
            Team Collaboration
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Enable team members to collaborate on content creation and approval</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={onToggleCollaboration}
            >
              <div className="text-left">
                <div className="font-medium">Content Approval</div>
                <p className="text-xs text-gray-500">Route content for team review</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={onToggleCollaboration}
            >
              <div className="text-left">
                <div className="font-medium">Team Management</div>
                <p className="text-xs text-gray-500">Invite and manage team members</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={onToggleCollaboration}
            >
              <div className="text-left">
                <div className="font-medium">Role Assignment</div>
                <p className="text-xs text-gray-500">Configure user permissions</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start h-auto py-3"
              onClick={onToggleCollaboration}
            >
              <div className="text-left">
                <div className="font-medium">Activity Logs</div>
                <p className="text-xs text-gray-500">View team activity history</p>
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIContentGenerator;
