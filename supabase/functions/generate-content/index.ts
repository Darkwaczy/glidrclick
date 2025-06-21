
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

    const wordsPerSection = Math.floor(targetLength / sectionTitles.length);
    
    const prompt = `Write a comprehensive blog post about ${category} using a ${tone} tone. The post should be approximately ${targetLength} words long.

Create content for these specific sections:
${sectionTitles.map((title, index) => `${index + 1}. ${title}`).join('\n')}

Requirements:
- Generate an engaging title that captures the essence of the topic
- Write approximately ${wordsPerSection} words for each section
- Maintain the ${tone} tone throughout
- Include actionable insights and valuable information
- Make each section substantial and informative

Please format your response EXACTLY as follows:

TITLE: [Your Generated Title Here]

SECTION: ${sectionTitles[0]}
[Write ${wordsPerSection} words of content for this section]

SECTION: ${sectionTitles[1]}
[Write ${wordsPerSection} words of content for this section]

${sectionTitles.slice(2).map(title => `SECTION: ${title}\n[Write ${wordsPerSection} words of content for this section]`).join('\n\n')}

Make sure each section has substantial content and follows the word count guidelines.`;

    let generatedContent;

    if (aiModel === 'openai') {
      const openaiKey = Deno.env.get('OPENAI_API_KEY');
      if (!openaiKey) {
        throw new Error('OpenAI API key not configured');
      }

      console.log('Calling OpenAI with prompt:', prompt.substring(0, 200) + '...');

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
              content: 'You are a professional content writer that creates engaging, well-structured blog posts. Always follow the exact format requested and provide substantial content for each section.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      generatedContent = data.choices[0].message.content;
      console.log('Generated content length:', generatedContent?.length);
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
              content: 'You are a professional content writer that creates engaging, well-structured blog posts.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000
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
    console.log('Parsed result:', { title: result.title, sectionsCount: result.sections.length });

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
    console.log('Parsing response of length:', response.length);
    
    let title = "";
    const sections: { title: string; content: string }[] = [];
    
    // Extract title - try multiple patterns
    const titlePatterns = [
      /TITLE:\s*(.*?)(?:\n|$)/i,
      /Title:\s*(.*?)(?:\n|$)/i,
      /^#\s*(.*?)(?:\n|$)/m,
      /^\*\*(.*?)\*\*(?:\n|$)/m
    ];
    
    for (const pattern of titlePatterns) {
      const titleMatch = response.match(pattern);
      if (titleMatch && titleMatch[1]?.trim()) {
        title = titleMatch[1].trim().replace(/[*#"']/g, '');
        console.log('Found title:', title);
        break;
      }
    }
    
    // Extract sections - try multiple patterns
    const sectionPatterns = [
      /SECTION:\s*(.*?)\n([\s\S]*?)(?=SECTION:|$)/gi,
      /##\s*(.*?)\n([\s\S]*?)(?=##|$)/gi,
      /\*\*(.*?)\*\*\n([\s\S]*?)(?=\*\*|$)/gi
    ];
    
    let foundSections = false;
    
    for (const pattern of sectionPatterns) {
      const matches = [...response.matchAll(pattern)];
      if (matches.length > 0) {
        console.log(`Found ${matches.length} sections with pattern`);
        matches.forEach((match, index) => {
          if (match[1] && match[2]) {
            const sectionTitle = match[1].trim();
            const sectionContent = match[2].trim();
            if (sectionContent.length > 50) { // Only add substantial content
              sections.push({
                title: sectionTitle,
                content: sectionContent
              });
            }
          }
        });
        if (sections.length > 0) {
          foundSections = true;
          break;
        }
      }
    }
    
    // If no structured sections found, try to split by paragraphs
    if (!foundSections) {
      console.log('No structured sections found, trying paragraph split');
      const paragraphs = response.split('\n\n').filter(p => p.trim().length > 100);
      
      sectionTitles.forEach((sectionTitle, index) => {
        if (paragraphs[index]) {
          sections.push({
            title: sectionTitle,
            content: paragraphs[index].trim()
          });
        } else {
          // Generate some content if not enough paragraphs
          sections.push({
            title: sectionTitle,
            content: `This section covers important aspects of ${sectionTitle.toLowerCase()}. The content provides valuable insights and practical information that readers can apply to better understand this topic.`
          });
        }
      });
    }
    
    // Ensure we have at least the requested number of sections
    while (sections.length < sectionTitles.length) {
      const missingIndex = sections.length;
      sections.push({
        title: sectionTitles[missingIndex],
        content: `This section provides detailed information about ${sectionTitles[missingIndex].toLowerCase()}. The content includes practical insights and valuable information relevant to the topic.`
      });
    }
    
    // Combine all sections into full content
    const fullContent = sections.map(s => `## ${s.title}\n\n${s.content}`).join('\n\n');
    
    console.log('Final result:', { 
      title: title || "Generated Blog Post", 
      sectionsCount: sections.length,
      contentLength: fullContent.length 
    });
    
    return { 
      title: title || "Generated Blog Post", 
      content: fullContent,
      sections 
    };
  } catch (error) {
    console.error("Error parsing blog response:", error);
    
    // Fallback: create basic sections from the response
    const fallbackSections = sectionTitles.map((title, index) => ({
      title,
      content: `Content for ${title} section. This provides valuable information about the topic and includes practical insights that readers can benefit from.`
    }));
    
    return { 
      title: "Generated Blog Post", 
      content: fallbackSections.map(s => `## ${s.title}\n\n${s.content}`).join('\n\n'),
      sections: fallbackSections
    };
  }
}
