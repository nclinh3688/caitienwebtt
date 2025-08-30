import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔍 Testing Ollama connection from server...');
    
    // Test 1: Check if Ollama is running
    const tagsResponse = await fetch('http://127.0.0.1:11434/api/tags', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(15000)
    });

    if (!tagsResponse.ok) {
      return NextResponse.json({
        success: false,
        message: `Ollama tags API failed: ${tagsResponse.status}`,
        step: 'tags_check'
      });
    }

    const tagsData = await tagsResponse.json();
    console.log('✅ Ollama tags response:', tagsData);

    if (!tagsData.models || tagsData.models.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No models found in Ollama',
        step: 'models_check',
        tagsData
      });
    }

    // Test 2: Try a simple chat
    const chatResponse = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: tagsData.models[0].name,
        prompt: 'Xin chào, hãy trả lời ngắn gọn',
        stream: false
      }),
      signal: AbortSignal.timeout(10000)
    });

    if (!chatResponse.ok) {
      return NextResponse.json({
        success: false,
        message: `Ollama chat API failed: ${chatResponse.status}`,
        step: 'chat_test',
        models: tagsData.models
      });
    }

    const chatData = await chatResponse.json();
    console.log('✅ Ollama chat response:', chatData);

    return NextResponse.json({
      success: true,
      message: 'Ollama connection successful!',
      models: tagsData.models,
      testResponse: chatData.response,
      model: tagsData.models[0].name
    });

  } catch (error) {
    console.error('💥 Ollama test error:', error);
    return NextResponse.json({
      success: false,
      message: `Ollama test failed: ${error instanceof Error ? error.message : String(error)}`,
      step: 'error',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
