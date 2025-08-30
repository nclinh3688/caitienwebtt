// AI Service for integrating with real AI APIs
export interface AIResponse {
  content: string;
  confidence: number;
  sources?: string[];
  suggestions?: string[];
}

export interface AIContext {
  pageType: 'vocabulary' | 'grammar' | 'kanji' | 'listening';
  currentItem?: any;
  category?: string;
  userLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  previousMessages?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

// Option 1: OpenAI GPT-4 (Recommended for best quality)
export async function callOpenAI(question: string, context: AIContext): Promise<AIResponse> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/ai/openai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        context,
        model: 'gpt-3.5-turbo', // Changed from gpt-4 to gpt-3.5-turbo
        maxTokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API call failed');
    }

    const data = await response.json();
    return {
      content: data.content,
      confidence: data.confidence || 0.9,
      suggestions: data.suggestions,
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

// Option 2: Google Gemini (Good alternative)
export async function callGemini(question: string, context: AIContext): Promise<AIResponse> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/ai/gemini`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        context,
        model: 'gemini-pro',
        maxTokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Gemini API call failed');
    }

    const data = await response.json();
    return {
      content: data.content,
      confidence: data.confidence || 0.85,
      suggestions: data.suggestions,
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

// Option 3: Anthropic Claude (High quality, good for education)
export async function callClaude(question: string, context: AIContext): Promise<AIResponse> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/ai/claude`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        context,
        model: 'claude-3-haiku-20240307',
        maxTokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Claude API call failed');
    }

    const data = await response.json();
    return {
      content: data.content,
      confidence: data.confidence || 0.9,
      suggestions: data.suggestions,
    };
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}

// Option 4: xAI Grok (Elon Musk's AI - Real-time, Humorous)
export async function callGrokAI(question: string, context: AIContext): Promise<AIResponse> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/ai/grok`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        context,
        model: 'grok-beta', // or 'grok-pro' for premium
        maxTokens: 500,
        temperature: 0.8, // Slightly higher for more creative responses
      }),
    });

    if (!response.ok) {
      throw new Error('Grok AI API call failed');
    }

    const data = await response.json();
    return {
      content: data.content,
      confidence: data.confidence || 0.85,
      suggestions: data.suggestions,
    };
  } catch (error) {
    console.error('Grok AI API error:', error);
    throw error;
  }
}

// Option 5: Local AI Model (For privacy/offline use)
export async function callLocalAI(question: string, context: AIContext): Promise<AIResponse> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/ai/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        context,
        model: 'llama-2-7b-chat', // or other local models
        maxTokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Local AI API call failed');
    }

    const data = await response.json();
    return {
      content: data.content,
      confidence: data.confidence || 0.8,
      suggestions: data.suggestions,
    };
  } catch (error) {
    console.error('Local AI API error:', error);
    throw error;
  }
}

// Main AI function with fallback strategy
export async function getAIResponse(question: string, context: AIContext): Promise<AIResponse> {
  const aiProviders = [
    { name: 'Gemini', func: callGemini }, // Gemini thường miễn phí và ổn định
    { name: 'OpenAI', func: callOpenAI },
    { name: 'Claude', func: callClaude },
    { name: 'Grok', func: callGrokAI },
    { name: 'Local', func: callLocalAI },
  ];

  // Try each provider in order until one works
  for (const provider of aiProviders) {
    try {
      console.log(`Trying ${provider.name} AI...`);
      const response = await provider.func(question, context);
      console.log(`${provider.name} AI response received`);
      return response;
    } catch (error) {
      console.warn(`${provider.name} AI failed:`, error);
      continue;
    }
  }

  // Fallback to smart template responses
  return getFallbackResponse(question, context);
}

// Smart fallback responses based on context
function getFallbackResponse(question: string, context: AIContext): AIResponse {
  const { pageType, currentItem } = context;
  
  const responses = {
    vocabulary: [
      `Từ "${currentItem?.japanese || 'này'}" có nghĩa là "${currentItem?.meaning || '...'}" trong tiếng Việt.`,
      `Đây là một từ rất quan trọng trong ${context.userLevel}. Bạn có thể dùng nó trong các tình huống hàng ngày.`,
      `Mẹo ghi nhớ: Hãy liên tưởng đến hình ảnh hoặc âm thanh tương tự.`,
      `Ví dụ câu: "${currentItem?.example || 'Tôi sẽ tạo ví dụ cho bạn.'}"`
    ],
    grammar: [
      `Ngữ pháp này dùng để ${currentItem?.meaning || 'biểu đạt ý nghĩa cụ thể'}.`,
      `Cấu trúc: ${currentItem?.pattern || 'Danh từ + は + Tính từ/Động từ'}`,
      `Lưu ý: Đây là lỗi thường gặp khi học ngữ pháp này.`,
      `Ví dụ: "${currentItem?.examples?.[0]?.japanese || 'Tôi sẽ tạo ví dụ cho bạn.'}"`
    ],
    kanji: [
      `Kanji "${currentItem?.character || 'này'}" có nghĩa là "${currentItem?.meaning || '...'}"`,
      `Cách đọc: Onyomi "${currentItem?.onyomi || '...'}", Kunyomi "${currentItem?.kunyomi || '...'}"`,
      `Bộ thủ: ${currentItem?.radicals?.join(', ') || 'Tôi sẽ giải thích bộ thủ cho bạn.'}`,
      `Thứ tự nét: ${currentItem?.strokeCount || '2'} nét. Hãy viết theo thứ tự từ trên xuống dưới, từ trái sang phải.`
    ]
  };

  const typeResponses = responses[pageType as keyof typeof responses] || responses.vocabulary;
  const randomResponse = typeResponses[Math.floor(Math.random() * typeResponses.length)];

  return {
    content: randomResponse,
    confidence: 0.6, // Lower confidence for fallback
    suggestions: [
      'Hãy thử hỏi cụ thể hơn',
      'Bạn có thể hỏi về ví dụ sử dụng',
      'Thử hỏi về mẹo ghi nhớ'
    ]
  };
}

// AI Configuration
export const AI_CONFIG = {
  // API Keys (should be in environment variables)
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  ANTHROPIC_API_KEY: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
  GROK_API_KEY: process.env.NEXT_PUBLIC_GROK_API_KEY,
  
  // Default settings
  DEFAULT_MODEL: 'gpt-3.5-turbo', // Changed from gpt-4 to gpt-3.5-turbo
  MAX_TOKENS: 500,
  TEMPERATURE: 0.7,
  
  // Grok-specific settings
  GROK_TEMPERATURE: 0.8, // Slightly higher for more creative responses
  GROK_MODEL: 'grok-beta',
  
  // Fallback settings
  ENABLE_FALLBACK: true,
  FALLBACK_DELAY: 1000,
};
