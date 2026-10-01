import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export function getAIClient() {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const provider = process.env.AI_PROVIDER || (geminiKey ? 'gemini' : openaiKey ? 'openai' : 'mock');

  if (provider === 'gemini' && geminiKey) {
    const genAI = new GoogleGenerativeAI(geminiKey);
    return {
      provider: 'gemini' as const,
      model: genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      }),
    };
  }

  if (provider === 'openai' && openaiKey) {
    const openai = new OpenAI({ apiKey: openaiKey });
    return {
      provider: 'openai' as const,
      client: openai,
    };
  }

  return {
    provider: 'mock' as const,
  };
}
