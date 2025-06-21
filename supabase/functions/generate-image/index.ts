
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateImageRequest {
  prompt: string;
  imageType?: 'featured' | 'in-post' | 'thumbnail' | 'sidebar';
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2';
  quality?: 'high' | 'standard' | 'low';
}

const getImageDimensions = (imageType: string, aspectRatio: string) => {
  const dimensions = {
    'featured': {
      '16:9': '1200x675',
      '4:3': '1024x768', 
      '1:1': '600x600',
      '3:2': '600x400'
    },
    'in-post': {
      '16:9': '960x540',
      '4:3': '800x600',
      '1:1': '500x500', 
      '3:2': '450x300'
    },
    'thumbnail': {
      '16:9': '480x270',
      '4:3': '400x300',
      '1:1': '400x400',
      '3:2': '300x200'
    },
    'sidebar': {
      '16:9': '320x180',
      '4:3': '300x225',
      '1:1': '250x250',
      '3:2': '300x200'
    }
  };
  
  return dimensions[imageType]?.[aspectRatio] || '1024x1024';
};

const getQualityLevel = (quality: string) => {
  const levels = {
    'high': 'hd',
    'standard': 'standard', 
    'low': 'standard'
  };
  return levels[quality] || 'standard';
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      prompt, 
      imageType = 'featured', 
      aspectRatio = '16:9',
      quality = 'standard'
    }: GenerateImageRequest = await req.json();

    if (!prompt?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const size = getImageDimensions(imageType, aspectRatio);
    const qualityLevel = getQualityLevel(quality);
    
    console.log('Generating image with:', { prompt, imageType, aspectRatio, size, quality: qualityLevel });

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `${prompt}. Professional blog image, clean composition, web-optimized`,
        n: 1,
        size: size,
        quality: qualityLevel,
        response_format: 'url'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    console.log('Image generated successfully:', imageUrl);

    return new Response(
      JSON.stringify({ 
        imageUrl,
        metadata: {
          imageType,
          aspectRatio,
          size,
          quality: qualityLevel
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate image', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
