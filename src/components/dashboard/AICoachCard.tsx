'use client';

import { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FaRobot, FaLightbulb, FaChartLine, FaSpinner } from 'react-icons/fa';

interface AICoachCardProps {
  aiProgressAnalysis: any; // Consider defining a more specific interface for aiProgressAnalysis
}

export function AICoachCard({ aiProgressAnalysis }: AICoachCardProps) {
  const [userQuestion, setUserQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAskingAI, setIsAskingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleAskAICoach = useCallback(async () => {
    if (!userQuestion.trim()) {
      setAiError('Vui lòng nhập câu hỏi của bạn.');
      return;
    }

    setIsAskingAI(true);
    setAiError(null);
    setAiResponse('');

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userQuestion }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI response');
      }

      const data = await response.json();
      setAiResponse(data.response);
    } catch (err: any) {
      setAiError(err.message);
    } finally {
      setIsAskingAI(false);
    }
  }, [userQuestion]);

  return (
    <>
      {/* B5: Coach AI cá nhân */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaRobot className="text-purple-600" />
            Coach AI cá nhân
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {aiProgressAnalysis?.studySuggestions && aiProgressAnalysis.studySuggestions.length > 0 ? (
              aiProgressAnalysis.studySuggestions.map((suggestion: string, index: number) => (
                <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="flex items-start gap-2">
                    <FaLightbulb className="text-sm mt-0.5 text-blue-500" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{suggestion}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        Gợi ý học tập
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex items-start gap-2">
                  <FaLightbulb className="text-sm mt-0.5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Chưa có gợi ý từ AI Coach</div>
                    <div className="text-xs text-gray-600 mt-1">
                      N/A
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Input
                placeholder="Hỏi AI Coach của bạn..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                disabled={isAskingAI}
              />
              <Button onClick={handleAskAICoach} className="w-full" disabled={isAskingAI}>
                {isAskingAI ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaRobot className="mr-2" />
                )}
                {isAskingAI ? 'Đang hỏi...' : 'Hỏi AI Coach'}
              </Button>
              {aiError && <p className="text-red-500 text-sm mt-2">Lỗi: {aiError}</p>}
              {aiResponse && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h5 className="font-medium mb-2">Phản hồi từ AI Coach:</h5>
                  <Textarea value={aiResponse} readOnly className="w-full h-32 resize-none" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {aiProgressAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaChartLine className="text-purple-600" />
              Phân tích tiến trình AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-base mb-2"><strong>Đánh giá tổng quan:</strong> {aiProgressAnalysis.overallAssessment}</p>
              {aiProgressAnalysis.strengths && aiProgressAnalysis.strengths.length > 0 && (
                <div className="mb-2">
                  <p className="font-semibold">Điểm mạnh:</p>
                  <ul className="list-disc pl-5">
                    {aiProgressAnalysis.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
              {aiProgressAnalysis.weaknesses && aiProgressAnalysis.weaknesses.length > 0 && (
                <div className="mb-2">
                  <p className="font-semibold">Điểm yếu:</p>
                  <ul className="list-disc pl-5">
                    {aiProgressAnalysis.weaknesses.map((w: string, i: number) => <li key={i}>{w}</li>)}
                  </ul>
                </div>
              )}
              {aiProgressAnalysis.recommendations && aiProgressAnalysis.recommendations.length > 0 && (
                <div className="mb-2">
                  <p className="font-semibold">Đề xuất cải thiện:</p>
                  <ul className="list-disc pl-5">
                    {aiProgressAnalysis.recommendations.map((r: string, i: number) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}
              {aiProgressAnalysis.reviewReminders && aiProgressAnalysis.reviewReminders.length > 0 && (
                <div className="mb-2">
                  <p className="font-semibold">Nhắc nhở ôn tập:</p>
                  <ul className="list-disc pl-5">
                    {aiProgressAnalysis.reviewReminders.map((rr: string, i: number) => <li key={i}>{rr}</li>)}
                  </ul>
                </div>
              )}
              {aiProgressAnalysis.generalAdvice && (
                <p className="text-base mt-2"><strong>Lời khuyên chung:</strong> {aiProgressAnalysis.generalAdvice}</p>
              )}

              {aiProgressAnalysis.lessonRecommendations && aiProgressAnalysis.lessonRecommendations.length > 0 && (
                <div className="mb-2">
                  <p className="font-semibold">Đề xuất bài học:</p>
                  <ul className="list-disc pl-5">
                    {aiProgressAnalysis.lessonRecommendations.map((lesson: any, i: number) => (
                      <li key={i}>{lesson.title} (Khóa học: {lesson.course})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
