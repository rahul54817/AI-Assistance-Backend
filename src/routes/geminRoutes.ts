import express from "express";
import { getGeminiResponse } from "../controllers/geminiController";

const router = express.Router();

router.post("/generate", getGeminiResponse);

export default router;
