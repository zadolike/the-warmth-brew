import { GoogleGenAI, Type } from "@google/genai";
import { BrewResult, MoodType } from "../types";
import { FALLBACK_MESSAGE } from "../constants";

const getSystemInstruction = (mood: MoodType) => `
You are a master barista at a high-end, cozy coffee shop inspired by Starbucks but with a more poetic soul. 
Your customer is "Teacher Qian" (谦老师). 
Your task is to "brew" a text-based cup of coffee for him.
The user has selected the mood: ${mood}.

Generate a response in JSON format containing:
1. 'drinkName': A creative, fancy coffee name suitable for the mood (in Chinese).
2. 'message': A warm, encouraging, short paragraph specifically for Teacher Qian. Use coffee metaphors (temperature, aroma, beans, extraction, milk foam) to describe kindness, teaching, patience, or life. It should feel like a warm hug. (In Chinese).
3. 'ingredients': A list of 3 abstract "ingredients" that went into this cup (e.g., "30g of patience", "Extract of starlight"). (In Chinese).

Tone: Warm, Elegant, Encouraging, Respectful, Cozy.
`;

export const brewWarmth = async (mood: MoodType): Promise<BrewResult> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key missing, using fallback.");
      return FALLBACK_MESSAGE;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Brew a cup of ${mood} for Teacher Qian.`,
      config: {
        systemInstruction: getSystemInstruction(mood),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            drinkName: { type: Type.STRING },
            message: { type: Type.STRING },
            ingredients: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["drinkName", "message", "ingredients"]
        }
      }
    });

    const text = response.text;
    if (!text) return FALLBACK_MESSAGE;

    return JSON.parse(text) as BrewResult;
  } catch (error) {
    console.error("Error brewing warmth:", error);
    return FALLBACK_MESSAGE;
  }
};