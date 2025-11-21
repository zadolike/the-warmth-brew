import { GoogleGenAI, Type } from "@google/genai";
import { BrewResult, MoodType } from "../types";
import { FALLBACK_MESSAGE } from "../constants";

const getSystemInstruction = (mood: MoodType) => `
You are a master barista at a high-end, cozy coffee shop inspired by Starbucks.
Your customer is "Teacher Qian" (谦老师). 
IMPORTANT: Despite the nickname "Teacher" (老师), she is NOT a school teacher. 
She is a cute, ambitious, and hardworking young woman who is striving for her career.
Your task is to "brew" a text-based cup of coffee for her.
The user has selected the mood: ${mood}.

Generate a response in JSON format containing:
1. 'drinkName': A creative, cute, and fancy coffee name suitable for the mood (in Chinese).
2. 'message': A warm, encouraging, short paragraph specifically for her. 
   - Acknowledge her hard work, hustle, and career challenges.
   - Encourage her to keep shining, validate her efforts, but also remind her to take care of her cute self.
   - Use coffee metaphors (warmth, sweetness after bitterness, energy boost).
   - Tone should be cute, supportive, gentle, and empowering (like a warm hug from a supporter).
   - DO NOT mention students, classrooms, or teaching.
   - (In Chinese).
3. 'ingredients': A list of 3 abstract "ingredients" that went into this cup (e.g., "A spoonful of courage", "Girl power", "Starlight"). (In Chinese).

Tone: Cute, Warm, Empowering, Cozy.
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
      contents: `Brew a cup of ${mood} for Qian Laoshi (the ambitious career girl).`,
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