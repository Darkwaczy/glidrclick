
import React, { useState } from "react";
import { Upload, Image as ImageIcon, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploaderProps {
  onImageUploaded: (imageUrl: string) => void;
}

const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `post-images/${fileName}`;
      
      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get the public URL for the file
      const { data: publicUrlData } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);
      
      if (!publicUrlData?.publicUrl) {
        throw new Error("Failed to get public URL for uploaded image");
      }
      
      // Set preview and call the callback with the image URL
      setPreview(publicUrlData.publicUrl);
      onImageUploaded(publicUrlData.publicUrl);
      toast.success("Image uploaded successfully!");
      
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Basic validation
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, GIF, WEBP)");
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should not exceed 5MB");
      return;
    }
    
    uploadImage(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label htmlFor="image-upload" className="cursor-pointer w-full">
          <div className="flex items-center gap-2 p-4 border border-dashed rounded-md hover:bg-gray-50 transition-colors">
            {isUploading ? (
              <Loader size={20} className="animate-spin text-gray-400" />
            ) : (
              <Upload size={20} className="text-gray-400" />
            )}
            <span className="text-sm text-gray-600">
              {isUploading ? "Uploading..." : "Upload your own image"}
            </span>
          </div>
          <input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
      
      {preview && (
        <div className="relative rounded-md overflow-hidden border">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-auto object-cover"
          />
          <Button 
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-80 hover:opacity-100"
            onClick={() => {
              setPreview(null);
              onImageUploaded("");
            }}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
