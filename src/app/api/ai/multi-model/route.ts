import { NextRequest, NextResponse } from 'next/server';
import { multiModelService } from '@/services/MultiModelService';

export async function POST(request: NextRequest) {
  try {
    const { message, context, model } = await request.json();
    
    console.log('🚀 Multi-Model AI request:', { message, context, model });
    
    // Nếu user chọn model cụ thể
    if (model && model !== 'auto') {
      multiModelService.setModelAvailability(model, true);
    }
    
    const aiResponse = await multiModelService.chat(message, context);
    
    if (aiResponse.success) {
      console.log(`✅ AI Response from ${aiResponse.provider} (${aiResponse.model}): ${aiResponse.responseTime}ms`);
      
      return NextResponse.json({
        success: true,
        response: aiResponse.response,
        model: aiResponse.model,
        provider: aiResponse.provider,
        responseTime: aiResponse.responseTime,
        source: 'multi_model_ai'
      });
    } else {
      console.error('❌ All AI models failed:', aiResponse.error);
      
      return NextResponse.json({
        success: false,
        message: aiResponse.response,
        error: aiResponse.error
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('💥 Multi-Model AI error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Không thể kết nối với bất kỳ AI model nào. Vui lòng thử lại sau.',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const status = multiModelService.getModelStatus();
    
    return NextResponse.json({
      success: true,
      models: status,
      total: status.length,
      available: status.filter(m => m.isAvailable).length
    });
    
  } catch (error) {
    console.error('💥 Error getting model status:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Không thể lấy trạng thái model',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
