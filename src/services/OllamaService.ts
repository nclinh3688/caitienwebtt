import { multiModelService } from '@/services/MultiModelService';

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_duration?: number;
  eval_duration?: number;
}

export interface OllamaRequest {
  message: string;
  context: string;
  model?: string;
}

export class OllamaService {
  private defaultModel: string = 'qwen2:0.5b';

  constructor(defaultModel?: string) {
    if (defaultModel) this.defaultModel = defaultModel;
  }

  // Kiểm tra Ollama có hoạt động không
  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch('/api/ai/ollama', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000)
      });
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.log('Ollama không khả dụng:', error);
      return false;
    }
  }

  // Lấy danh sách models có sẵn
  async getAvailableModels(): Promise<string[]> {
    try {
      const response = await fetch('/api/ai/ollama');
      const data = await response.json();
      if (data.success) {
        return data.models?.map((model: any) => model.name) || [];
      }
      return [];
    } catch (error) {
      console.error('Lỗi khi lấy danh sách models:', error);
      return [];
    }
  }

  // Chat với Ollama (không streaming)
  async chat(message: string, context: string = '', model?: string): Promise<string> {
    try {
      const response = await fetch('/api/ai/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          context,
          model: model || this.defaultModel
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Ollama error');
      }

      return data.response.trim();
    } catch (error) {
      console.error('Lỗi khi chat với Ollama:', error);
      throw new Error('Không thể kết nối với Ollama. Vui lòng kiểm tra Ollama đã chạy chưa.');
    }
  }

  // Streaming chat (sử dụng API route)
  async *streamChat(message: string, context: string = '', model?: string): AsyncGenerator<string> {
    try {
      // Sử dụng API route thay vì gọi trực tiếp Ollama
      const response = await fetch('/api/ai/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          context,
          model: model || this.defaultModel
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Ollama error');
      }

      // Trả về response từng từ một để tạo hiệu ứng streaming
      const words = data.response.split(' ');
      for (const word of words) {
        yield word + ' ';
        // Delay nhỏ để tạo hiệu ứng typewriter
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    } catch (error) {
      console.error('Lỗi khi streaming chat:', error);
      throw new Error('Không thể kết nối với Ollama.');
    }
  }

  // Test kết nối
  async testConnection(): Promise<{ success: boolean; message: string; model?: string }> {
    try {
      const response = await fetch('/api/ai/ollama');
      const data = await response.json();
      
      if (data.success) {
        return { 
          success: true, 
          message: 'Kết nối Ollama thành công!', 
          model: data.models?.[0]?.name || this.defaultModel 
        };
      } else {
        return { 
          success: false, 
          message: data.message || 'Ollama không khả dụng' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        message: `Lỗi kết nối: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
  }
}

// Export instance mặc định
export const ollamaService = new OllamaService();
