import { NextRequest, NextResponse } from 'next/server';
import { callOpenAI, callGemini, callClaude, callGrokAI, callLocalAI } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const { question = 'Xin chào, bạn có thể giúp tôi học tiếng Nhật không?' } = await request.json();

    const testContext = {
      pageType: 'vocabulary' as const,
      currentItem: {
        japanese: 'こんにちは',
        meaning: 'Xin chào',
        pronunciation: 'konnichiwa',
        example: 'こんにちは、お元気ですか？'
      },
      category: 'Chào hỏi',
      userLevel: 'N5' as const
    };

    const results: {
      [key: string]: { 
        status: 'pending' | 'success' | 'error'; 
        response: any; 
        error: string | null; 
      }
    } = {
      openai: { status: 'pending', response: null, error: null },
      gemini: { status: 'pending', response: null, error: null },
      claude: { status: 'pending', response: null, error: null },
      grok: { status: 'pending', response: null, error: null },
      local: { status: 'pending', response: null, error: null }
    };

    // Test OpenAI
    try {
      console.log('Testing OpenAI...');
      const openaiResponse = await callOpenAI(question, testContext);
      results.openai = { status: 'success', response: openaiResponse, error: null };
    } catch (error) {
      console.error('OpenAI test failed:', error);
      results.openai = { status: 'error', response: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Test Gemini
    try {
      console.log('Testing Gemini...');
      const geminiResponse = await callGemini(question, testContext);
      results.gemini = { status: 'success', response: geminiResponse, error: null };
    } catch (error) {
      console.error('Gemini test failed:', error);
      results.gemini = { status: 'error', response: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Test Claude
    try {
      console.log('Testing Claude...');
      const claudeResponse = await callClaude(question, testContext);
      results.claude = { status: 'success', response: claudeResponse, error: null };
    } catch (error) {
      console.error('Claude test failed:', error);
      results.claude = { status: 'error', response: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Test Grok
    try {
      console.log('Testing Grok...');
      const grokResponse = await callGrokAI(question, testContext);
      results.grok = { status: 'success', response: grokResponse, error: null };
    } catch (error) {
      console.error('Grok test failed:', error);
      results.grok = { status: 'error', response: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Test Local
    try {
      console.log('Testing Local...');
      const localResponse = await callLocalAI(question, testContext);
      results.local = { status: 'success', response: localResponse, error: null };
    } catch (error) {
      console.error('Local test failed:', error);
      results.local = { status: 'error', response: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }

    return NextResponse.json({
      question,
      context: testContext,
      results,
      summary: {
        total: 5,
        success: Object.values(results).filter(r => r.status === 'success').length,
        error: Object.values(results).filter(r => r.status === 'error').length
      }
    });

  } catch (error) {
    console.error('AI Test error:', error);
    return NextResponse.json(
      { error: 'Failed to test AI providers' },
      { status: 500 }
    );
  }
}
