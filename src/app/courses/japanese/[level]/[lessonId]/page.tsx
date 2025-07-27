"use client";

import { notFound, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type PageProps = {
  params: {
    level: string;
    lessonId: string;
  };
};

const LessonPage = ({ params }: PageProps) => {
  const { level, lessonId } = params;
  const router = useRouter();
  const { data: session, status } = useSession();
  const [lessonData, setLessonData] = useState<any>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prevLessonId, setPrevLessonId] = useState<string | null>(null);
  const [nextLessonId, setNextLessonId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessonAndProgress = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/lesson/${lessonId}`);
        if (!response.ok) {
          notFound();
          return;
        }
        const data = await response.json();
        setLessonData(data.lesson);
        setIsCompleted(data.userProgress?.isCompleted || false);
        setPrevLessonId(data.prevLessonId);
        setNextLessonId(data.nextLessonId);
      } catch (error) {
        console.error('Error fetching lesson data:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchLessonAndProgress();
  }, [lessonId]);

  const handleMarkAsCompleted = async () => {
    if (!session || !session.user || loading) return;

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessonId: lessonId }),
      });

      if (response.ok) {
        setIsCompleted(true);
        alert('Bài học đã được đánh dấu hoàn thành!');
      } else {
        alert('Có lỗi xảy ra khi cập nhật tiến trình.');
      }
    } catch (error) {
      console.error('Error marking as completed:', error);
      alert('Có lỗi xảy ra khi cập nhật tiến trình.');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-12">Đang tải bài học...</div>;
  }

  if (!lessonData) {
    return <div className="container mx-auto px-4 py-12">Không tìm thấy bài học.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground">{lessonData.title}</h1>
      <div className="mt-8 text-foreground" dangerouslySetInnerHTML={{ __html: lessonData.content || '' }} />

      {status === "authenticated" && (
        <Button
          onClick={handleMarkAsCompleted}
          disabled={isCompleted}
          variant={isCompleted ? "outline" : "default"}
        >
          {isCompleted ? 'Đã hoàn thành' : 'Đánh dấu đã hoàn thành'}
        </Button>
      )}
      {status === "loading" && <p className="text-muted-foreground">Đang tải...</p>}
      {status === "unauthenticated" && <p className="mt-4 text-muted-foreground">Đăng nhập để lưu tiến trình học của bạn.</p>}

      <div className="mt-12 flex justify-between">
        {prevLessonId && (
          <Link href={`/courses/japanese/${level}/${prevLessonId}`} passHref>
            <Button variant="outline">
              &larr; Bài học trước
            </Button>
          </Link>
        )}
        {nextLessonId && (
          <Link href={`/courses/japanese/${level}/${nextLessonId}`} passHref>
            <Button variant="outline">
              Bài học tiếp theo &rarr;
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonPage;