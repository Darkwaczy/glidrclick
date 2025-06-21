
import axios from "axios";

// API configuration
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = "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";
const GROQ_MODEL = "llama3-70b-8192";

const TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions";
const TOGETHER_API_KEY = "4fa35f7eddf5983ccd68ed7c0afcdaa3d783a722db2aff43ebe290de6670a95f";
const TOGETHER_MODEL = "meta-llama/Llama-3-70b-chat-hf";

// Generate structured blog content with sections
export const generateBlogContent = async (
  category: string,
  tone: string,
  targetLength: number,
  sectionTitles: string[]
): Promise<{ title: string; content: string; sections: { title: string; content: string }[] }> => {
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

  try {
    // Try with Groq API first
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a professional content writer that specializes in creating engaging, well-structured blog posts. Focus on creating valuable, informative content that matches the requested tone and length."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return parseBlogResponse(response.data.choices[0].message.content, sectionTitles);
  } catch (error) {
    console.error("Error with Groq API:", error);
    
    try {
      // Fall back to Together AI
      const response = await axios.post(
        TOGETHER_API_URL,
        {
          model: TOGETHER_MODEL,
          messages: [
            {
              role: "system",
              content: "You are a professional content writer that specializes in creating engaging, well-structured blog posts."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        },
        {
          headers: {
            "Authorization": `Bearer ${TOGETHER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      return parseBlogResponse(response.data.choices[0].message.content, sectionTitles);
    } catch (fallbackError) {
      console.error("Error with Together AI fallback:", fallbackError);
      throw new Error("Failed to generate content with both primary and fallback APIs");
    }
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

// Generate just a title based on existing content
export const generateTitle = async (content: string): Promise<string> => {
  const prompt = `Based on the following content, generate a compelling and engaging title:
  
${content.substring(0, 1000)}`;

  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a professional headline writer that specializes in creating engaging, concise titles."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error with Groq API for title:", error);
    
    try {
      // Fall back to Together AI
      const response = await axios.post(
        TOGETHER_API_URL,
        {
          model: TOGETHER_MODEL,
          messages: [
            {
              role: "system",
              content: "You are a professional headline writer that specializes in creating engaging, concise titles."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            "Authorization": `Bearer ${TOGETHER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (fallbackError) {
      console.error("Error with Together AI fallback for title:", fallbackError);
      throw new Error("Failed to generate title with both primary and fallback APIs");
    }
  }
};

// Helper to parse structured blog response
const parseBlogResponse = (response: string, sectionTitles: string[]): { title: string; content: string; sections: { title: string; content: string }[] } => {
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
};

export default {
  generateContent,
  generateBlogContent,
  generateTitle
};
