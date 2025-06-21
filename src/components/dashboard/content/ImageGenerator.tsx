
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Image, Loader } from "lucide-react";
import { generateImage } from "@/services/aiService";

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  onImageGenerated
}) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter an image description");
      return;
    }
    
    setIsGenerating(true);
    toast.info("Generating image...");
    
    try {
      const imageUrl = await generateImage(prompt);
      onImageGenerated(imageUrl);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Input
          id="image-prompt"
          placeholder="Describe the image you want to generate"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
        />
        <Button 
          type="button"
          onClick={handleGenerateImage} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-neon-electric/20 border-neon-electric/50 text-neon-electric hover:bg-neon-electric/30"
        >
          {isGenerating ? (
            <>
              <Loader size={16} className="mr-2 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Image size={16} className="mr-2" /> Generate Image
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-gray-400">
        Create a custom image based on your description using AI.
      </p>
    </div>
  );
};

export default ImageGenerator;
