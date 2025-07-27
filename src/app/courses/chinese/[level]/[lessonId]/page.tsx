interface PageProps {
  params: {
    level: string;
    lessonId: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <div>
      <h1>Chinese Lesson: Level {params.level}, Lesson {params.lessonId}</h1>
      {/* Add your lesson content here */}
    </div>
  );
}