import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * AI Service for Resume Optimization
 * 
 * Using Google Gemini 1.5 Flash for high-speed, high-quality professional content.
 */

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const hasApiKey = !!import.meta.env.VITE_GEMINI_API_KEY;

export const optimizeExperienceDescription = async (position: string, company: string, currentDesc: string): Promise<string> => {
  if (!hasApiKey) {
    // Fallback to simulated "premium" English content if no API Key
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `- Led digital transformation initiatives at ${company || 'the organization'}, resulting in a 25% increase in operational efficiency.\n- Orchestrated cross-functional teams as a ${position} to deliver high-impact projects on tight deadlines.\n- Optimized core system architectures using modern industry standards to ensure high scalability and performance.`;
  }

  try {
    const prompt = `You are a professional resume writer. Rewrite the following job description for a ${position} at ${company} to be more professional, high-impact, and ATS-friendly. 
    Rules:
    1. Use strong action verbs (e.g., Led, Orchestrated, Optimized, Architected).
    2. Quantify achievements where possible (e.g., "increased X by 20%").
    3. Use professional, concise English.
    4. Format as 3 clear bullet points (starting with "- ").
    
    Current Description: ${currentDesc || 'General responsibilities and achievements'}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.trim();
  } catch (error) {
    console.error("Gemini Optimization Error:", error);
    return "- Successfully led key projects and initiatives, ensuring high-quality delivery.\n- Improved system performance and team productivity through strategic optimizations.\n- Collaborated with stakeholders to define and execute complex product roadmaps.";
  }
};

export const optimizeProjectDescription = async (name: string, description: string): Promise<string> => {
  if (!hasApiKey) {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return `Developed ${name || 'a high-performance system'} using industry-standard architectures, focusing on scalability and user-centric design principles.`;
  }

  try {
    const prompt = `As a technical recruiter, rewrite this project description to sound more impressive and professional. 
    Project Name: ${name}
    Current Description: ${description || 'A technical project'}
    
    Rules:
    1. Strictly English.
    2. One or two powerful sentences.
    3. Focus on technologies and impact.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.trim();
  } catch (error) {
    console.error("Gemini Project Optimization Error:", error);
    return `Engineered ${name || 'this project'} with a focus on high-performance architecture and seamless user experience.`;
  }
};
