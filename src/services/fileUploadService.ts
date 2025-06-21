
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface FileUploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const fileUploadService = {
  async uploadAvatar(file: File, userId: string): Promise<FileUploadResult> {
    try {
      // Validate file
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        return {
          success: false,
          error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.',
        };
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return {
          success: false,
          error: 'File size too large. Please upload an image smaller than 5MB.',
        };
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/avatar.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      return {
        success: true,
        url: data.publicUrl,
      };
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  },

  async uploadContent(file: File, userId: string): Promise<FileUploadResult> {
    try {
      // Validate file
      const validTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/quicktime', 'video/x-msvideo'
      ];
      
      if (!validTypes.includes(file.type)) {
        return {
          success: false,
          error: 'Invalid file type. Please upload an image or video file.',
        };
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        return {
          success: false,
          error: 'File size too large. Please upload a file smaller than 10MB.',
        };
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('content')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('content')
        .getPublicUrl(fileName);

      return {
        success: true,
        url: data.publicUrl,
      };
    } catch (error) {
      console.error('Error uploading content:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  },

  async deleteFile(bucket: string, path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  },
};
