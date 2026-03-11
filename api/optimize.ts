import { GoogleGenerativeAI } from "@google/generative-ai";
import { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  maxDuration: 30, // Gemini can take a few seconds
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, payload } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let prompt = "";

    if (type === 'experience') {
      const { position, company, currentDesc } = payload;
      prompt = `You are a professional resume writer. Rewrite the following job description for a ${position} at ${company} to be more professional, high-impact, and ATS-friendly. 
      Rules:
      1. Use strong action verbs (e.g., Led, Orchestrated, Optimized, Architected).
      2. Quantify achievements where possible (e.g., "increased X by 20%").
      3. Use professional, concise English.
      4. Format as 3 clear bullet points (starting with "- ").
      
      Current Description: ${currentDesc || 'General responsibilities and achievements'}`;
    } else if (type === 'project') {
      const { name, description } = payload;
      prompt = `As a technical recruiter, rewrite this project description to sound more impressive and professional. 
      Project Name: ${name}
      Current Description: ${description || 'A technical project'}
      
      Rules:
      1. Strictly English.
      2. One or two powerful sentences.
      3. Focus on technologies and impact.`;
    } else {
      return res.status(400).json({ error: 'Invalid optimization type' });
    }

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json({ text: text.trim() });
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: 'Error calling Gemini API', details: errorMessage });
  }
}
