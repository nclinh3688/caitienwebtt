'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LessonAIExplanation() {
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async () => {
    setIsLoading(true);
    setError(null);
    setAiExplanation(null);

    try {
      const response = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();
      setAiExplanation(data.explanation);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-12 p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-foreground mb-4">AI Giải thích/Giải đáp</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Nhập từ hoặc cụm từ cần giải thích..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleExplain} disabled={isLoading || !inputText.trim()}>
          {isLoading ? 'Đang giải thích...' : 'Giải thích'}
        </Button>
      </div>
      {error && <p className="text-red-500 mt-2">Lỗi: {error}</p>}
      {aiExplanation && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold text-foreground">Giải thích từ AI:</h3>
          <p className="mt-2 text-muted-foreground">{aiExplanation}</p>
        </div>
      )}
    </section>
  );
}
