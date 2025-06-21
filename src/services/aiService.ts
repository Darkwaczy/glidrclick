
import { supabase } from "@/integrations/supabase/client";

// Generate structured blog content with sections using Supabase Edge Function
export const generateBlogContent = async (
  category: string,
  tone: string,
  targetLength: number,
  sectionTitles: string[],
  aiModel: string = 'openai'
): Promise<{ title: string; content: string; sections: { title: string; content: string }[] }> => {
  try {
    console.log('Generating content with:', { category, tone, targetLength, sectionTitles, aiModel });
    
    const { data, error } = await supabase.functions.invoke('generate-content', {
      body: {
        category,
        tone,
        targetLength,
        sectionTitles,
        aiModel
      }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Failed to generate content: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from content generation');
    }

    console.log('Content generated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in generateBlogContent:', error);
    throw error;
  }
};

// Legacy function for backward compatibility
export const generateContent = async (
  category: string,
  tone: string
): Promise<{ title: string; content: string }> => {
  const result = await generateBlogContent(category, tone, 600, ["Introduction", "Main Content", "Conclusion"]);
  return {
    title: result.title,
    content: result.sections.map(s => `## ${s.title}\n\n${s.content}`).join('\n\n')
  };
};

// Generate image using Supabase Edge Function with enhanced options
export const generateImage = async (
  prompt: string,
  options: { 
    imageType?: string; 
    aspectRatio?: string; 
    quality?: string;
    size?: string;
  } = {}
): Promise<{ imageUrl: string; metadata?: any }> => {
  try {
    console.log('Generating image with prompt:', prompt, 'options:', options);
    
    const { data, error } = await supabase.functions.invoke('generate-image', {
      body: {
        prompt,
        imageType: options.imageType || 'featured',
        aspectRatio: options.aspectRatio || '16:9',
        quality: options.quality || 'standard'
      }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Failed to generate image: ${error.message}`);
    }

    if (!data?.imageUrl) {
      throw new Error('No image URL returned from generation');
    }

    console.log('Image generated successfully:', data.imageUrl);
    return {
      imageUrl: data.imageUrl,
      metadata: data.metadata
    };
  } catch (error) {
    console.error('Error in generateImage:', error);
    throw error;
  }
};

// Generate just a title based on existing content (legacy function)
export const generateTitle = async (content: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-content', {
      body: {
        category: 'Content',
        tone: 'professional',
        targetLength: 100,
        sectionTitles: ['Title'],
        aiModel: 'openai'
      }
    });

    if (error || !data?.title) {
      return 'Generated Title';
    }

    return data.title;
  } catch (error) {
    console.error('Error generating title:', error);
    return 'Generated Title';
  }
};

export default {
  generateContent,
  generateBlogContent,
  generateImage,
  generateTitle
};
