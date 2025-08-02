'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  order: number;
}

interface Test {
  id: string;
  title: string;
  description?: string;
  level?: string;
  questions: Question[];
}

const TestDetailPage = memo(function TestDetailPage({ params }: { params: { level: string, testId: string } }) {
  const { level, testId } = params;
  
  // State management
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [detailedResults, setDetailedResults] = useState<any[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/test/${testId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch test details');
        }
        const data = await response.json();
        setTest(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = useCallback(async () => {
    if (!test) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/test/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testId: test.id, userAnswers: answers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();
      setScore(data.score);
      setDetailedResults(data.detailedResults);
      setAiAnalysis(data.aiAnalysis);
      setShowResults(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [test, answers]);

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Đang tải bài kiểm tra...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-12 text-center text-red-500">Lỗi: {error}</div>;
  }

  if (!test) {
    return <div className="container mx-auto px-4 py-12 text-center">Không tìm thấy bài kiểm tra.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">{test.title}</CardTitle>
          {test.description && <CardDescription className="mt-2 text-lg text-muted-foreground">{test.description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              {test.questions.map((question) => (
                <div key={question.id} className="mb-6 p-4 border rounded-lg bg-card-foreground">
                  <p className="text-lg font-semibold mb-3">{question.order}. {question.text}</p>
                  <RadioGroup
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                    value={answers[question.id] || ''}
                  >
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                        <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              <Button type="submit" className="mt-6" disabled={isSubmitting}>
                {isSubmitting ? 'Đang nộp...' : 'Nộp bài'}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Kết quả của bạn</h2>
              <p className="text-2xl text-primary mb-6">Bạn đã trả lời đúng {score} trên {test.questions.length} câu.</p>
              <div className="mt-8 text-left">
                {detailedResults.map((result) => (
                  <div key={result.questionId} className="mb-6 p-4 border rounded-lg bg-card-foreground">
                    <p className="text-lg font-semibold mb-3">Câu {result.order}. {test.questions.find(q => q.id === result.questionId)?.text}</p>
                    <p className="text-base mb-2">
                      Câu trả lời của bạn: <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {result.userAnswer || 'Chưa trả lời'}
                      </span>
                    </p>
                    <p className="text-base mb-2">
                      Đáp án đúng: <span className="text-green-600">{result.correctAnswer}</span>
                    </p>
                    {result.explanation && (
                      <p className="text-sm text-muted-foreground mt-2">Giải thích: {result.explanation}</p>
                    )}
                  </div>
                ))}
              </div>

              {aiAnalysis && (
                <div className="mt-8 p-6 bg-card rounded-lg shadow-md text-left">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Phân tích từ AI</h3>
                  <p className="text-base mb-3"><strong>Đánh giá tổng quan:</strong> {aiAnalysis.overallAssessment}</p>
                  {aiAnalysis.strengths && aiAnalysis.strengths.length > 0 && (
                    <div className="mb-3">
                      <p className="font-semibold">Điểm mạnh:</p>
                      <ul className="list-disc pl-5">
                        {aiAnalysis.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  )}
                  {aiAnalysis.weaknesses && aiAnalysis.weaknesses.length > 0 && (
                    <div className="mb-3">
                      <p className="font-semibold">Điểm yếu:</p>
                      <ul className="list-disc pl-5">
                        {aiAnalysis.weaknesses.map((w: string, i: number) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>
                  )}
                  {aiAnalysis.recommendations && aiAnalysis.recommendations.length > 0 && (
                    <div className="mb-3">
                      <p className="font-semibold">Đề xuất cải thiện:</p>
                      <ul className="list-disc pl-5">
                        {aiAnalysis.recommendations.map((r: string, i: number) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  )}
                  {aiAnalysis.generalAdvice && (
                    <p className="text-base mt-3"><strong>Lời khuyên chung:</strong> {aiAnalysis.generalAdvice}</p>
                  )}
                </div>
              )}

              <Button onClick={() => setShowResults(false)} className="mt-6">Làm lại</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
});

export default TestDetailPage;
