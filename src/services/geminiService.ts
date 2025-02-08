import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from "../config/config";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateText(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    return "⚠️ An error occurred while generating text.";
  }
}
