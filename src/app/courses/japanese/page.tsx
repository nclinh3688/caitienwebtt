import Link from 'next/link';

const levels = [
  { name: 'N5', description: 'Cấp độ sơ cấp, nền tảng cho người mới bắt đầu.', path: '/courses/japanese/n5' },
  { name: 'N4', description: 'Hiểu và sử dụng tiếng Nhật trong các tình huống hàng ngày.', path: '/courses/japanese/n4' },
  { name: 'N3', description: 'Giao tiếp tự nhiên và đọc hiểu các đoạn văn dài.', path: '/courses/japanese/n3' },
  { name: 'N2', description: 'Sử dụng thành thạo trong công việc và học thuật.', path: '/courses/japanese/n2' },
  { name: 'N1', description: 'Cấp độ cao nhất, sử dụng tiếng Nhật như người bản xứ.', path: '/courses/japanese/n1' },
];

export default function JapaneseCoursesPage() {
  return (
    <div className="py-12">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Khóa học Tiếng Nhật (JLPT)</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Chọn cấp độ phù hợp với trình độ của bạn để bắt đầu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {levels.map((level) => (
          <Link key={level.path} href={level.path} passHref>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col h-full">
              <h2 className="text-4xl font-bold text-center mb-4 text-red-500">{level.name}</h2>
              <p className="text-gray-600 text-center flex-grow">{level.description}</p>
               <div className="mt-6 text-center">
                <div className="inline-block bg-red-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Bắt đầu học
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
       <div className="text-center mt-16">
            <Link href="/courses">
                <div className="text-green-600 font-semibold hover:underline cursor-pointer">← Quay lại chọn ngôn ngữ</div>
            </Link>
        </div>
    </div>
  );
}
