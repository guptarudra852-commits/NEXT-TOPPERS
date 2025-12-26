
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeChat = async (messages: string[]) => {
  if (messages.length === 0) return "No messages to summarize.";
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize the following student discussion from a live class into 3 key takeaways: \n\n${messages.join('\n')}`,
    config: {
      temperature: 0.7,
      topP: 0.9,
    }
  });

  return response.text;
};

export const askAIExpert = async (question: string, context: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Context: ${context}\n\nStudent Question: ${question}\n\nAct as a professional educator. Provide a clear, concise, and helpful answer.`,
    config: {
      temperature: 0.3,
    }
  });

  return response.text;
};
