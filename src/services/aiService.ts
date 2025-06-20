
import axios from "axios";

// API configuration
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = "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";
const GROQ_MODEL = "llama3-70b-8192";

const TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions";
const TOGETHER_API_KEY = "4fa35f7eddf5983ccd68ed7c0afcdaa3d783a722db2aff43ebe290de6670a95f";
const TOGETHER_MODEL = "meta-llama/Llama-3-70b-chat-hf";

// Generate content using AI
export const generateContent = async (
  category: string,
  tone: string
): Promise<{ title: string; content: string }> => {
  const prompt = `Write a well-structured blog post about ${category} using a ${tone} tone. Include a compelling title, an introduction, 3-4 main points with supporting details, and a conclusion. The post should be informative, engaging, and maintain the ${tone} tone throughout. Please format the response as follows:

TITLE: [Your Generated Title]

CONTENT:
[Your Generated Content]`;

  try {
    // Try with Groq API first
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a professional content writer that specializes in creating engaging blog posts."
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

    return parseAIResponse(response.data.choices[0].message.content);
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
              content: "You are a professional content writer that specializes in creating engaging blog posts."
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

      return parseAIResponse(response.data.choices[0].message.content);
    } catch (fallbackError) {
      console.error("Error with Together AI fallback:", fallbackError);
      throw new Error("Failed to generate content with both primary and fallback APIs");
    }
  }
};

// Generate just a title based on existing content
export const generateTitle = async (content: string): Promise<string> => {
  const prompt = `Based on the following content, generate a compelling and engaging title:
  
${content.substring(0, 1000)}`;

  try {
    // Try with Groq API first
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

// Helper to parse AI response into title and content
const parseAIResponse = (response: string): { title: string; content: string } => {
  try {
    // Extract title
    let title = "";
    let content = "";
    
    if (response.includes("TITLE:")) {
      const titleMatch = response.match(/TITLE:\s*(.*?)(?:\n\n|\n(?:CONTENT:|$))/s);
      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1].trim();
      }
    }
    
    // Extract content
    if (response.includes("CONTENT:")) {
      const contentMatch = response.match(/CONTENT:\s*([\s\S]*?)$/);
      if (contentMatch && contentMatch[1]) {
        content = contentMatch[1].trim();
      }
    }
    
    // If structured format not found, make best guess
    if (!title || !content) {
      const lines = response.split("\n");
      if (!title && lines.length > 0) {
        title = lines[0].trim().replace(/^#\s*/, ""); // Remove markdown heading if present
      }
      
      if (!content && lines.length > 1) {
        content = lines.slice(1).join("\n").trim();
      }
    }
    
    return { title, content };
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return { 
      title: "Generated Article", 
      content: response.trim() 
    };
  }
};

export default {
  generateContent,
  generateTitle
};
