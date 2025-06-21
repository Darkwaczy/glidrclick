
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Image, Loader } from "lucide-react";
import { generateImage } from "@/services/aiService";

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string, metadata?: any) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  onImageGenerated
}) => {
  const [prompt, setPrompt] = useState("");
  const [imageType, setImageType] = useState("featured");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [quality, setQuality] = useState("standard");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const imageTypes = [
    { value: "featured", label: "Featured/Hero Image", description: "Main blog header image" },
    { value: "in-post", label: "In-post Image", description: "Content body image" },
    { value: "thumbnail", label: "Thumbnail", description: "Preview/grid image" },
    { value: "sidebar", label: "Sidebar Image", description: "Small accent image" }
  ];

  const aspectRatios = [
    { value: "16:9", label: "16:9 (Widescreen)", sizes: "1200×675, 960×540" },
    { value: "4:3", label: "4:3 (Standard)", sizes: "1024×768, 800×600" },
    { value: "1:1", label: "1:1 (Square)", sizes: "600×600, 400×400" },
    { value: "3:2", label: "3:2 (Portrait)", sizes: "600×400, 300×200" }
  ];

  const qualityOptions = [
    { value: "high", label: "High Quality", description: "Best for hero images" },
    { value: "standard", label: "Standard", description: "Balanced quality/size" },
    { value: "low", label: "Optimized", description: "Smaller file size" }
  ];
  
  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter an image description");
      return;
    }
    
    setIsGenerating(true);
    toast.info("Generating optimized image...");
    
    try {
      const result = await generateImage(prompt, {
        imageType,
        aspectRatio,
        quality
      });
      
      onImageGenerated(result.imageUrl, result.metadata);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-white text-sm">Image Type</Label>
          <Select value={imageType} onValueChange={setImageType}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark-primary border-white/20">
              {imageTypes.map(type => (
                <SelectItem key={type.value} value={type.value} className="text-white hover:bg-white/10 focus:bg-white/10">
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-gray-400">{type.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white text-sm">Aspect Ratio</Label>
          <Select value={aspectRatio} onValueChange={setAspectRatio}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark-primary border-white/20">
              {aspectRatios.map(ratio => (
                <SelectItem key={ratio.value} value={ratio.value} className="text-white hover:bg-white/10 focus:bg-white/10">
                  <div>
                    <div className="font-medium">{ratio.label}</div>
                    <div className="text-xs text-gray-400">{ratio.sizes}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white text-sm">Quality</Label>
        <Select value={quality} onValueChange={setQuality}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-dark-primary border-white/20">
            {qualityOptions.map(option => (
              <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10 focus:bg-white/10">
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-400">{option.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
              <Image size={16} className="mr-2" /> Generate Optimized Image
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-gray-400">
        Generate web-optimized images with proper aspect ratios for professional blog posts.
      </p>
    </div>
  );
};

export default ImageGenerator;
