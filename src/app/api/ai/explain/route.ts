import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const aiProvider = process.env.AI_PROVIDER || 'GEMINI'; // Default to GEMINI

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    let explanation = '';

    if (aiProvider === 'OPENAI') {
      if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: 'OPENAI_API_KEY is not set' }, { status: 500 });
      }
      const completion = await openai.chat.completions.create({
        messages: [{
          role: "user",
          content: `Giải thích khái niệm hoặc từ sau một cách ngắn gọn và dễ hiểu: "${text}"`, 
        }],
        model: "gpt-3.5-turbo", // You can choose other models like "gpt-4"
      });
      explanation = completion.choices[0].message.content || '';
    } else { // Default to GEMINI
      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
      }
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Giải thích khái niệm hoặc từ sau một cách ngắn gọn và dễ hiểu: "${text}"`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      explanation = response.text();
    }

    return NextResponse.json({ explanation });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error explaining text with AI:', error);
    return NextResponse.json({ error: 'Failed to get explanation from AI' }, { status: 500 });
  }
}
