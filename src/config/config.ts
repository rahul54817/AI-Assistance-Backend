import dotenv from 'dotenv';

dotenv.config();

export const API_KEY = process.env.GOOGLE_GEMINI_API_KEY|| '';

if (!API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env file");
  process.exit(1);
}
