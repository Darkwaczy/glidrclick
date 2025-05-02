
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  onImageGenerated
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Placeholder image URLs for demo purposes
  const placeholderImages = [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBtYXJrZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzaW5lc3MlMjBtYXJrZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnVzaW5lc3MlMjBtYXJrZXRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
  ];

  const handleGenerateImage = () => {
    if (!prompt.trim()) {
      toast.error("Please enter an image description");
      return;
    }
    
    setIsGenerating(true);
    toast.info("Generating image...");
    
    // Simulate image generation with a timeout
    setTimeout(() => {
      const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
      onImageGenerated(randomImage);
      setIsGenerating(false);
      toast.success("Image generated successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="image-prompt">Generate Featured Image</Label>
      <div className="space-y-2">
        <Input
          id="image-prompt"
          placeholder="Describe the image you want to generate"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button 
          type="button"
          onClick={handleGenerateImage} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? "Generating..." : "Generate Image"}
        </Button>
      </div>
      <p className="text-xs text-gray-500">
        Create a custom image based on your description using AI.
      </p>
    </div>
  );
};

export default ImageGenerator;
