
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GenerateContentRequest {
  category: string;
  tone: string;
  targetLength: number;
  sectionTitles: string[];
  aiModel?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, tone, targetLength, sectionTitles, aiModel = 'openai' }: GenerateContentRequest = await req.json();

    if (!category || !tone || !sectionTitles?.length) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: category, tone, and sectionTitles are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const sectionsText = sectionTitles.filter(s => s.trim()).map((title, index) => 
      `${index + 1}. ${title}`
    ).join('\n');

    const prompt = `Write a comprehensive blog post about ${category} using a ${tone} tone. The post should be approximately ${targetLength} words long.

Structure the post with these sections:
${sectionsText}

Requirements:
- Generate an engaging title that captures the essence of the topic
- Write compelling content for each section
- Maintain the ${tone} tone throughout
- Target approximately ${Math.floor(targetLength / sectionTitles.length)} words per section
- Include actionable insights and valuable information
- End with a strong conclusion that summarizes key takeaways

Format your response as follows:
TITLE: [Your Generated Title]

SECTION_1: ${sectionTitles[0] || 'Introduction'}
[Content for this section]

SECTION_2: ${sectionTitles[1] || 'Main Content'}
[Content for this section]

${sectionTitles.slice(2).map((title, index) => `SECTION_${index + 3}: ${title}\n[Content for this section]`).join('\n\n')}`;

    let generatedContent;

    if (aiModel === 'openai') {
      const openaiKey = Deno.env.get('OPENAI_API_KEY');
      if (!openaiKey) {
        throw new Error('OpenAI API key not configured');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a professional content writer that specializes in creating engaging, well-structured blog posts. Focus on creating valuable, informative content that matches the requested tone and length.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      generatedContent = data.choices[0].message.content;
    } else {
      // Fallback to Together AI
      const togetherKey = Deno.env.get('TOGETHER_API_KEY');
      if (!togetherKey) {
        throw new Error('Together AI API key not configured');
      }

      const response = await fetch('https://api.together.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${togetherKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/Llama-3-70b-chat-hf',
          messages: [
            {
              role: 'system',
              content: 'You are a professional content writer that specializes in creating engaging, well-structured blog posts.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`Together AI API error: ${response.statusText}`);
      }

      const data = await response.json();
      generatedContent = data.choices[0].message.content;
    }

    // Parse the generated content
    const result = parseBlogResponse(generatedContent, sectionTitles);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error generating content:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate content', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function parseBlogResponse(response: string, sectionTitles: string[]): { title: string; content: string; sections: { title: string; content: string }[] } {
  try {
    let title = "";
    const sections: { title: string; content: string }[] = [];
    
    // Extract title
    const titleMatch = response.match(/TITLE:\s*(.*?)(?:\n|$)/);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    }
    
    // Extract sections
    const sectionMatches = response.match(/SECTION_\d+:\s*(.*?)(?:\n(.*?)(?=SECTION_\d+:|$))?/gs);
    if (sectionMatches) {
      sectionMatches.forEach((match, index) => {
        const sectionMatch = match.match(/SECTION_\d+:\s*(.*?)(?:\n([\s\S]*))?/);
        if (sectionMatch) {
          const sectionTitle = sectionMatch[1]?.trim() || sectionTitles[index] || `Section ${index + 1}`;
          const sectionContent = sectionMatch[2]?.trim() || '';
          sections.push({
            title: sectionTitle,
            content: sectionContent
          });
        }
      });
    }
    
    // If no structured sections found, create basic structure
    if (sections.length === 0) {
      const parts = response.split('\n\n');
      sectionTitles.forEach((sectionTitle, index) => {
        sections.push({
          title: sectionTitle,
          content: parts[index + 1] || `Content for ${sectionTitle} will be generated here.`
        });
      });
    }
    
    // Combine all sections into full content
    const fullContent = sections.map(s => `## ${s.title}\n\n${s.content}`).join('\n\n');
    
    return { 
      title: title || "Generated Blog Post", 
      content: fullContent,
      sections 
    };
  } catch (error) {
    console.error("Error parsing blog response:", error);
    return { 
      title: "Generated Blog Post", 
      content: response.trim(),
      sections: sectionTitles.map((title, index) => ({
        title,
        content: `Content for ${title} section.`
      }))
    };
  }
}
