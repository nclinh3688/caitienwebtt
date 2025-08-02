'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export default function GenerateTestPage() {
  const [level, setLevel] = useState<string>('n5');
  const [skill, setSkill] = useState<string>('');
  const [numQuestions, setNumQuestions] = useState<number>(3);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTest = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedQuestions(null);

    try {
      const response = await fetch('/api/ai/generate-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, skill, numQuestions }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();
      setGeneratedQuestions(data.questions || data); // AI might return { questions: [...] } or just [...] 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">AI Tạo Đề Kiểm Tra Cá Nhân Hóa</CardTitle>
          <p className="text-muted-foreground">Tạo bài kiểm tra dựa trên cấp độ và kỹ năng bạn muốn.</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="level">Cấp độ</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger id="level">
                  <SelectValue placeholder="Chọn cấp độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="n5">N5</SelectItem>
                  <SelectItem value="n4">N4</SelectItem>
                  <SelectItem value="n3">N3</SelectItem>
                  <SelectItem value="hsk1">HSK1</SelectItem>
                  <SelectItem value="hsk2">HSK2</SelectItem>
                  {/* Add more levels as needed */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="skill">Kỹ năng (Tùy chọn)</Label>
              <Input
                id="skill"
                type="text"
                placeholder="Ví dụ: Ngữ pháp, Từ vựng, Kanji..."
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="numQuestions">Số lượng câu hỏi</Label>
              <Input
                id="numQuestions"
                type="number"
                min="1"
                max="10"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          <Button onClick={handleGenerateTest} disabled={isLoading || !level || numQuestions < 1}>
            {isLoading ? 'Đang tạo...' : 'Tạo đề kiểm tra'}
          </Button>

          {error && <p className="text-red-500 mt-4">Lỗi: {error}</p>}

          {generatedQuestions && generatedQuestions.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Câu hỏi được tạo:</h2>
              {generatedQuestions.map((q, index) => (
                <Card key={index} className="mb-4 p-4">
                  <CardTitle className="text-lg font-semibold mb-2">Câu {index + 1}: {q.text}</CardTitle>
                  <CardContent>
                    <ul className="list-disc pl-5">
                      {q.options.map((option, optIndex) => (
                        <li key={optIndex} className={option === q.correctAnswer ? 'text-green-600 font-medium' : ''}>
                          {option}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-sm text-muted-foreground"><strong>Đáp án đúng:</strong> {q.correctAnswer}</p>
                    {q.explanation && <p className="text-sm text-muted-foreground"><strong>Giải thích:</strong> {q.explanation}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
