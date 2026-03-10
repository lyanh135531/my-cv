/**
 * AI Service for Resume Optimization
 * 
 * In a real production app, you would call Google Gemini API or OpenAI here.
 * For this demo, we use a smart simulation to show the "Wow" effect.
 */

export const optimizeExperienceDescription = async (position: string, company: string, currentDesc: string): Promise<string> => {
  // Simulate network delay for "Wow" loading effect
  await new Promise(resolve => setTimeout(resolve, 2000));

  // If no content, provide a premium template based on position
  if (!currentDesc.trim()) {
    return `- Dẫn dắt các dự án phát triển tại ${company || 'quý công ty'} đạt hiệu quả cao.
- Tối ưu hóa quy trình làm việc giúp giảm 30% thời gian triển khai.
- Phối hợp chặt chẽ với các phòng ban để đảm bảo chất lượng sản phẩm chuẩn Big Tech.`;
  }

  // Simulate "Enhancing" existing content
  return `- Cải thiện cấu trúc mã nguồn cho vị trí ${position} tại ${company}, giúp tăng hiệu năng hệ thống lên 25%.
- Áp dụng các công nghệ hiện đại nhất để giải quyết các vấn đề phức tạp trong vận hành.
- Được đánh giá cao về khả năng tư duy logic và tối ưu hóa trải nghiệm người dùng ("Wow" factor).`;
};

/**
 * Tutorial for Real API Integration:
 * 
 * 1. Get Google Gemini API Key from: https://aistudio.google.com/
 * 2. Install: npm install @google/generative-ai
 * 3. Use the following code:
 * 
 * import { GoogleGenerativeAI } from "@google/generative-ai";
 * const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
 * const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
 * 
 * const prompt = `Hãy viết lại mô tả công việc cho vị trí ${position} tại ${company} chuẩn ATS, dùng action verbs mạnh: ${currentDesc}`;
 * const result = await model.generateContent(prompt);
 * return result.response.text();
 */
