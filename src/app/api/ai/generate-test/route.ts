import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// Initialize AI clients only when needed
let genAI: GoogleGenerativeAI | null = null;
let openai: OpenAI | null = null;

export async function POST(request: Request) {
  try {
    const { level, skill, numQuestions } = await request.json();
    const aiProvider = process.env.AI_PROVIDER || 'GEMINI';

    if (!level || !numQuestions) {
      return NextResponse.json({ error: 'Level and number of questions are required' }, { status: 400 });
    }

    let prompt = `Tạo ${numQuestions} câu hỏi trắc nghiệm về ${skill ? skill + ' của ' : ''}cấp độ ${level}. Mỗi câu hỏi phải có 4 lựa chọn, một đáp án đúng và một giải thích ngắn gọn. Trả về kết quả dưới dạng một mảng JSON, mỗi đối tượng trong mảng là một câu hỏi với các trường: text (nội dung câu hỏi), options (mảng các lựa chọn), correctAnswer (đáp án đúng), explanation (giải thích).`;

    let generatedContent = '';

    if (aiProvider === 'OPENAI') {
      if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
        return NextResponse.json(
          { error: 'OpenAI API key not configured' },
          { status: 500 }
        );
      }
      if (!openai) {
        openai = new OpenAI({
          apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
        });
      }
      const completion = await openai.chat.completions.create({
        messages: [{
          role: "user",
          content: prompt,
        }],
        model: "gpt-3.5-turbo-1106", // Using a model that supports JSON mode
        response_format: { type: "json_object" },
      });
      generatedContent = completion.choices[0].message.content || '';
    } else { // Default to GEMINI
      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
      }
      if (!genAI) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      }
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      generatedContent = response.text();
    }

    try {
      const parsedQuestions = JSON.parse(generatedContent);
      return NextResponse.json(parsedQuestions);
    } catch (parseError) {
      if (process.env.NODE_ENV === 'development') console.error('Error parsing AI response:', parseError);
      if (process.env.NODE_ENV === 'development') console.error('AI raw response:', generatedContent);
      return NextResponse.json({ error: 'Failed to parse AI response', rawResponse: generatedContent }, { status: 500 });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error generating test with AI:', error);
    return NextResponse.json({ error: 'Failed to generate test from AI' }, { status: 500 });
  }
}
