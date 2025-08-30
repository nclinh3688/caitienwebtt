export interface AIModel {
  id: string;
  name: string;
  provider: string;
  apiKey?: string;
  baseUrl?: string;
  maxTokens: number;
  temperature: number;
  priority: number;
  isAvailable: boolean;
  lastUsed: number;
  successRate: number;
  avgResponseTime: number;
}

export interface ModelResponse {
  success: boolean;
  response: string;
  model: string;
  provider: string;
  responseTime: number;
  tokensUsed?: number;
  error?: string;
}

export class MultiModelService {
  private models: AIModel[] = [
    {
      id: 'gemini-1.5-flash',
      name: 'Gemini 1.5 Flash',
      provider: 'google',
      maxTokens: 2048, // Giảm từ 8192 xuống 2048 để nhanh hơn
      temperature: 0.1,
      priority: 1, // Ưu tiên cao nhất vì nhanh nhất
      isAvailable: true,
      lastUsed: 0,
      successRate: 0.88,
      avgResponseTime: 1200
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'openai',
      maxTokens: 2048, // Giảm từ 4096 xuống 2048 để nhanh hơn
      temperature: 0.1,
      priority: 2, // Ưu tiên thứ 2 vì nhanh
      isAvailable: true,
      lastUsed: 0,
      successRate: 0.90,
      avgResponseTime: 1500
    },
    {
      id: 'deepseek-chat',
      name: 'DeepSeek Chat',
      provider: 'deepseek',
      maxTokens: 4096,
      temperature: 0.1,
      priority: 3, // Ưu tiên thứ 3 - chất lượng cao
      isAvailable: true,
      lastUsed: 0,
      successRate: 0.93,
      avgResponseTime: 1800
    },
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini',
      provider: 'openai',
      maxTokens: 2048, // Giảm từ 4096 xuống 2048 để nhanh hơn
      temperature: 0.1,
      priority: 4, // Ưu tiên thứ 4 vì chậm hơn
      isAvailable: true,
      lastUsed: 0,
      successRate: 0.95,
      avgResponseTime: 2000
    },
    {
      id: 'gemini-1.5-pro',
      name: 'Gemini 1.5 Pro',
      provider: 'google',
      maxTokens: 4096, // Giảm từ 32768 xuống 4096 để nhanh hơn
      temperature: 0.1,
      priority: 5, // Ưu tiên thứ 5 vì chậm nhất
      isAvailable: true,
      lastUsed: 0,
      successRate: 0.92,
      avgResponseTime: 3000
    },
    {
      id: 'grok',
      name: 'Grok (xAI)',
      provider: 'xai',
      maxTokens: 8192,
      temperature: 0.1,
      priority: 6, // Ưu tiên thấp nhất - real-time updates
      isAvailable: true,
      lastUsed: 0,
      successRate: 0.89,
      avgResponseTime: 2500
    }
  ];

  private currentModelIndex = 0;
  private retryCount = 0;
  private maxRetries = 3;

  constructor() {
    this.loadModelConfigs();
  }

  private loadModelConfigs() {
    const openaiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;
    
    console.log('🔍 Checking API Keys...');
    console.log('OpenAI Key available:', !!openaiKey);
    console.log('Google Key available:', !!googleKey);
    
    if (!openaiKey) {
      console.warn('⚠️ OPENAI_API_KEY không được cấu hình. GPT-4o Mini và GPT-3.5 Turbo sẽ không hoạt động.');
      this.models.filter(m => m.provider === 'openai').forEach(m => {
        m.isAvailable = false;
        m.apiKey = undefined;
      });
    } else {
      console.log('✅ OpenAI API Key đã được cấu hình');
      this.models.filter(m => m.provider === 'openai').forEach(m => {
        m.apiKey = openaiKey;
        m.isAvailable = true;
      });
    }
    
    if (!googleKey) {
      console.warn('⚠️ GOOGLE_API_KEY không được cấu hình. Gemini 1.5 Flash và Gemini 1.5 Pro sẽ không hoạt động.');
      this.models.filter(m => m.provider === 'google').forEach(m => {
        m.isAvailable = false;
        m.apiKey = undefined;
      });
    } else {
      console.log('✅ Google API Key đã được cấu hình');
      this.models.filter(m => m.provider === 'google').forEach(m => {
        m.apiKey = googleKey;
        m.isAvailable = true;
      });
    }
    
    // Log available models
    const availableModels = this.models.filter(m => m.isAvailable);
    console.log('🚀 Available models:', availableModels.map(m => `${m.name} (${m.provider})`));
  }

  private getBestModel(): AIModel | null {
    const availableModels = this.models
      .filter(m => m.isAvailable)
      .sort((a, b) => a.priority - b.priority);
    
    return availableModels[0] || null;
  }

  private async tryNextModel(): Promise<AIModel | null> {
    this.retryCount++;
    
    if (this.retryCount >= this.maxRetries) {
      return null;
    }

    const availableModels = this.models
      .filter(m => m.isAvailable)
      .sort((a, b) => a.priority - b.priority);
    
    if (this.retryCount < availableModels.length) {
      return availableModels[this.retryCount];
    }

    return null;
  }

  async chat(message: string, context: string = ''): Promise<ModelResponse> {
    const startTime = Date.now();
    let currentModel = this.getBestModel();
    
    console.log('🔍 Starting chat with message:', message);
    console.log('🎯 Best model selected:', currentModel?.name, currentModel?.provider);
    console.log('🔑 API Keys status:');
    console.log('  - OpenAI:', process.env.NEXT_PUBLIC_OPENAI_API_KEY ? '✅ Available' : '❌ Missing');
    console.log('  - Google:', process.env.NEXT_PUBLIC_GOOGLE_API_KEY ? '✅ Available' : '❌ Missing');
    console.log('  - DeepSeek:', process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY ? '✅ Available' : '❌ Missing');
    console.log('  - Grok:', process.env.NEXT_PUBLIC_GROK_API_KEY ? '✅ Available' : '❌ Missing');
    
    while (currentModel && this.retryCount < this.maxRetries) {
      try {
        console.log(`🤖 Trying model: ${currentModel.name} (${currentModel.provider})`);
        
        const response = await this.callModel(currentModel, message, context);
        const responseTime = Date.now() - startTime;
        
        console.log(`✅ Model ${currentModel.name} succeeded with response:`, response.substring(0, 100) + '...');
        
        this.updateModelStats(currentModel, true, responseTime);
        
        return {
          success: true,
          response: response,
          model: currentModel.name,
          provider: currentModel.provider,
          responseTime: responseTime
        };
        
      } catch (error) {
        console.error(`❌ Model ${currentModel.name} failed:`, error);
        
        this.updateModelStats(currentModel, false, 0);
        currentModel.isAvailable = false;
        currentModel = await this.tryNextModel();
      }
    }

    console.log('❌ All models failed');
    return {
      success: false,
      response: 'Tất cả các model AI đều không khả dụng. Vui lòng thử lại sau.',
      model: 'none',
      provider: 'none',
      responseTime: Date.now() - startTime,
      error: 'All models failed'
    };
  }

  private async callModel(model: AIModel, message: string, context: string): Promise<string> {
    switch (model.provider) {
      case 'openai':
        return await this.callOpenAI(model, message, context);
      case 'google':
        return await this.callGoogle(model, message, context);
      case 'ollama':
        return await this.callOllama(model, message, context);
      case 'deepseek':
        return await this.chatWithDeepSeek([{ role: 'user', content: message }], model.maxTokens, model.temperature).then(res => res.response);
      case 'xai': // Added Grok provider
        return await this.chatWithGrok([{ role: 'user', content: message }], model.maxTokens, model.temperature).then(res => res.response);
      default:
        throw new Error(`Unknown provider: ${model.provider}`);
    }
  }

  private async callOpenAI(model: AIModel, message: string, context: string): Promise<string> {
    if (!model.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `Bạn là AI Assistant chuyên gia ngôn ngữ của PHÚC KHIÊM Education. 

**QUY TẮC TRẢ LỜI THÔNG MINH:**
- Trả lời ĐÚNG NGAY LẦN ĐẦU, không cần hỏi lại
- LUÔN tương tác với người dùng trước khi đưa nội dung
- Hỏi người dùng muốn gì thêm sau khi trả lời chính

**FORMAT TƯƠNG TÁC:**
1. Trả lời chính xác câu hỏi của người dùng
2. Hỏi người dùng có muốn thêm gì không
3. Đưa ra các lựa chọn cụ thể

**VÍ DỤ TƯƠNG TÁC:**
- "Đây là 20 từ vựng N1 bạn cần. Bạn có muốn tôi lấy ví dụ câu cho từng từ không?"
- "Tôi đã chuẩn bị 20 từ vựng N1. Bạn muốn: 1) Chỉ xem từ vựng, 2) Có thêm ví dụ câu, 3) Có thêm audio đọc?"

**FORMAT TỪ VỰNG TIẾNG NHẬT:**
- Sử dụng format: "1. 漢字 (ひらがな) - Nghĩa tiếng Việt"
- KHÔNG có romaji, KHÔNG có phần mở đầu dài
- KHÔNG có bảng markdown phức tạp

**FORMAT NGỮ PHÁP:**
- Liệt kê đơn giản: "1. [Cấu trúc] - [Giải thích]"

**LUÔN NHỚ:** Tương tác thông minh, trả lời đúng ngay lần đầu, hỏi người dùng muốn gì thêm!`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${model.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model.id,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: model.maxTokens,
        temperature: model.temperature
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async callGoogle(model: AIModel, message: string, context: string): Promise<string> {
    if (!model.apiKey) {
      throw new Error('Google API key not configured');
    }

    const systemPrompt = `Bạn là AI Assistant chuyên gia ngôn ngữ của PHÚC KHIÊM Education. 

**QUY TẮC TRẢ LỜI THÔNG MINH:**
- Trả lời ĐÚNG NGAY LẦN ĐẦU, không cần hỏi lại
- LUÔN tương tác với người dùng trước khi đưa nội dung
- Hỏi người dùng muốn gì thêm sau khi trả lời chính

**FORMAT TƯƠNG TÁC:**
1. Trả lời chính xác câu hỏi của người dùng
2. Hỏi người dùng có muốn thêm gì không
3. Đưa ra các lựa chọn cụ thể

**VÍ DỤ TƯƠNG TÁC:**
- "Đây là 20 từ vựng N1 bạn cần. Bạn có muốn tôi lấy ví dụ câu cho từng từ không?"
- "Tôi đã chuẩn bị 20 từ vựng N1. Bạn muốn: 1) Chỉ xem từ vựng, 2) Có thêm ví dụ câu, 3) Có thêm audio đọc?"

**FORMAT TỪ VỰNG TIẾNG NHẬT:**
- Sử dụng format: "1. 漢字 (ひらがな) - Nghĩa tiếng Việt"
- KHÔNG có romaji, KHÔNG có phần mở đầu dài
- KHÔNG có bảng markdown phức tạp

**FORMAT NGỮ PHÁP:**
- Liệt kê đơn giản: "1. [Cấu trúc] - [Giải thích]"

**LUÔN NHỚ:** Tương tác thông minh, trả lời đúng ngay lần đầu, hỏi người dùng muốn gì thêm!`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model.id}:generateContent?key=${model.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemPrompt + '\n\n' + message }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: model.maxTokens,
          temperature: model.temperature
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  private async callOllama(model: AIModel, message: string, context: string): Promise<string> {
    const systemPrompt = `Bạn là AI Assistant chuyên gia ngôn ngữ của PHÚC KHIÊM Education. 

**QUY TẮC TRẢ LỜI THÔNG MINH:**
- Trả lời ĐÚNG NGAY LẦN ĐẦU, không cần hỏi lại
- LUÔN tương tác với người dùng trước khi đưa nội dung
- Hỏi người dùng muốn gì thêm sau khi trả lời chính

**FORMAT TƯƠNG TÁC:**
1. Trả lời chính xác câu hỏi của người dùng
2. Hỏi người dùng có muốn thêm gì không
3. Đưa ra các lựa chọn cụ thể

**VÍ DỤ TƯƠNG TÁC:**
- "Đây là 20 từ vựng N1 bạn cần. Bạn có muốn tôi lấy ví dụ câu cho từng từ không?"
- "Tôi đã chuẩn bị 20 từ vựng N1. Bạn muốn: 1) Chỉ xem từ vựng, 2) Có thêm ví dụ câu, 3) Có thêm audio đọc?"

**FORMAT TỪ VỰNG TIẾNG NHẬT:**
- Sử dụng format: "1. 漢字 (ひらがな) - Nghĩa tiếng Việt"
- KHÔNG có romaji, KHÔNG có phần mở đầu dài
- KHÔNG có bảng markdown phức tạp

**FORMAT NGỮ PHÁP:**
- Liệt kê đơn giản: "1. [Cấu trúc] - [Giải thích]"

**LUÔN NHỚ:** Tương tác thông minh, trả lời đúng ngay lần đầu, hỏi người dùng muốn gì thêm!`;

    const response = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model.id,
        prompt: systemPrompt,
        stream: false,
        options: {
          temperature: model.temperature,
          num_predict: model.maxTokens
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  }

  private async chatWithDeepSeek(messages: any[], maxTokens: number, temperature: number): Promise<ModelResponse> {
    try {
      const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
      if (!apiKey) {
        return {
          success: false,
          response: '',
          model: 'deepseek-chat',
          provider: 'deepseek',
          responseTime: 0,
          error: 'DeepSeek API key not configured'
        };
      }

      // Thêm system prompt thông minh
      const systemMessage = {
        role: 'system',
        content: `Bạn là AI Assistant chuyên gia ngôn ngữ của PHÚC KHIÊM Education. 

**QUY TẮC TRẢ LỜI THÔNG MINH:**
- Trả lời ĐÚNG NGAY LẦN ĐẦU, không cần hỏi lại
- LUÔN tương tác với người dùng sau khi trả lời chính
- Hỏi người dùng muốn gì thêm

**FORMAT TƯƠNG TÁC:**
1. Trả lời chính xác câu hỏi của người dùng
2. Hỏi người dùng có muốn thêm gì không
3. Đưa ra các lựa chọn cụ thể

**VÍ DỤ TƯƠNG TÁC:**
- "Đây là 20 từ vựng N1 bạn cần. Bạn có muốn tôi lấy ví dụ câu cho từng từ không?"
- "Tôi đã chuẩn bị 20 từ vựng N1. Bạn muốn: 1) Chỉ xem từ vựng, 2) Có thêm ví dụ câu, 3) Có thêm audio đọc?"

**FORMAT TỪ VỰNG TIẾNG NHẬT:**
- Sử dụng format: "1. 漢字 (ひらがな) - Nghĩa tiếng Việt"
- KHÔNG có romaji, KHÔNG có phần mở đầu dài

**LUÔN NHỚ:** Tương tác thông minh, trả lời đúng ngay lần đầu, hỏi người dùng muốn gì thêm!`
      };

      const enhancedMessages = [systemMessage, ...messages];

      const startTime = Date.now();
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: enhancedMessages,
          max_tokens: maxTokens,
          temperature: temperature,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const data = await response.json();
      const responseTime = Date.now() - startTime;
      
      return {
        success: true,
        response: data.choices[0]?.message?.content || 'No response from DeepSeek',
        model: 'deepseek-chat',
        provider: 'deepseek',
        responseTime: responseTime,
        error: undefined
      };
    } catch (error) {
      return {
        success: false,
        response: '',
        model: 'deepseek-chat',
        provider: 'deepseek',
        responseTime: 0,
        error: `DeepSeek API error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  private async chatWithGrok(messages: any[], maxTokens: number, temperature: number): Promise<ModelResponse> {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GROK_API_KEY;
      if (!apiKey) {
        return {
          success: false,
          response: '',
          model: 'grok',
          provider: 'xai',
          responseTime: 0,
          error: 'Grok API key not configured'
        };
      }

      // Thêm system prompt thông minh
      const systemMessage = {
        role: 'system',
        content: `Bạn là AI Assistant chuyên gia ngôn ngữ của PHÚC KHIÊM Education. 

**QUY TẮC TRẢ LỜI THÔNG MINH:**
- Trả lời ĐÚNG NGAY LẦN ĐẦU, không cần hỏi lại
- LUÔN tương tác với người dùng sau khi trả lời chính
- Hỏi người dùng muốn gì thêm

**FORMAT TƯƠNG TÁC:**
1. Trả lời chính xác câu hỏi của người dùng
2. Hỏi người dùng có muốn thêm gì không
3. Đưa ra các lựa chọn cụ thể

**VÍ DỤ TƯƠNG TÁC:**
- "Đây là 20 từ vựng N1 bạn cần. Bạn có muốn tôi lấy ví dụ câu cho từng từ không?"
- "Tôi đã chuẩn bị 20 từ vựng N1. Bạn muốn: 1) Chỉ xem từ vựng, 2) Có thêm ví dụ câu, 3) Có thêm audio đọc?"

**FORMAT TỪ VỰNG TIẾNG NHẬT:**
- Sử dụng format: "1. 漢字 (ひらがな) - Nghĩa tiếng Việt"
- KHÔNG có romaji, KHÔNG có phần mở đầu dài

**LUÔN NHỚ:** Tương tác thông minh, trả lời đúng ngay lần đầu, hỏi người dùng muốn gì thêm!`
      };

      const enhancedMessages = [systemMessage, ...messages];

      const startTime = Date.now();
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'grok-beta',
          messages: enhancedMessages,
          max_tokens: maxTokens,
          temperature: temperature,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Grok API error: ${response.status}`);
      }

      const data = await response.json();
      const responseTime = Date.now() - startTime;
      
      return {
        success: true,
        response: data.choices[0]?.message?.content || 'No response from Grok',
        model: 'grok',
        provider: 'xai',
        responseTime: responseTime,
        error: undefined
      };
    } catch (error) {
      return {
        success: false,
        response: '',
        model: 'grok',
        provider: 'xai',
        responseTime: 0,
        error: `Grok API error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  private updateModelStats(model: AIModel, success: boolean, responseTime: number) {
    model.lastUsed = Date.now();
    
    if (success) {
      model.successRate = (model.successRate * 0.9) + 0.1;
      model.avgResponseTime = (model.avgResponseTime * 0.9) + (responseTime * 0.1);
    } else {
      model.successRate = model.successRate * 0.9;
    }
  }

  getModelStatus(): AIModel[] {
    return this.models.map(m => ({ ...m }));
  }

  resetRetryCount() {
    this.retryCount = 0;
  }

  setModelAvailability(modelId: string, available: boolean) {
    const model = this.models.find(m => m.id === modelId);
    if (model) {
      model.isAvailable = available;
    }
  }
}

export const multiModelService = new MultiModelService();
