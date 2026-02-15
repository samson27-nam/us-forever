
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRomanticContent = async (context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a deeply romantic love letter and a short sweet poem for a girlfriend. 
      Context to include: ${context}. 
      The tone should be sincere, poetic, and modern. 
      Specifically mention her beauty, her dedication to her work as a nurse, and how stunning she looks in every setting.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            letter: { type: Type.STRING, description: "The full love letter text." },
            poem: { type: Type.STRING, description: "A short 4-8 line poem." }
          },
          required: ["letter", "poem"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Error generating romantic content:", error);
    return {
      letter: "My dearest, words often fail to capture the depth of my love for you. You are my sunshine, my anchor, and my greatest joy. Every moment with you is a gift I cherish deeply.",
      poem: "Your eyes hold the stars,\nYour smile lights the day,\nWith you in my arms,\nMy heart finds its way."
    };
  }
};
