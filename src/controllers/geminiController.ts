import { Request, Response } from "express";
import { generateText } from "../services/geminiService";

export const getGeminiResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body; // Get input from request body
    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    const response = await generateText(prompt);
    res.json({ response }); // Correctly send response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
