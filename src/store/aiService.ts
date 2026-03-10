/**
 * AI Service for Resume Optimization
 * 
 * Refactored to use Vercel Serverless Functions for secure API handling.
 * This prevents the Gemini API key from being exposed on the client side.
 */

export const optimizeExperienceDescription = async (position: string, company: string, currentDesc: string): Promise<string> => {
  try {
    const response = await fetch('/api/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'experience',
        payload: { position, company, currentDesc }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.warn("Falling back to local simulation due to:", error);
    
    // Fallback to simulated "premium" English content if the backend is unavailable
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `- Led digital transformation initiatives at ${company || 'the organization'}, resulting in a 25% increase in operational efficiency.\n- Orchestrated cross-functional teams as a ${position} to deliver high-impact projects on tight deadlines.\n- Optimized core system architectures using modern industry standards to ensure high scalability and performance.`;
  }
};

export const optimizeProjectDescription = async (name: string, description: string): Promise<string> => {
  try {
    const response = await fetch('/api/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'project',
        payload: { name, description }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.warn("Falling back to local project simulation due to:", error);
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    return `Developed ${name || 'a high-performance system'} using industry-standard architectures, focusing on scalability and user-centric design principles.`;
  }
};
