import Link from 'next/link';
import { FaHeadphones, FaBook, FaChalkboardTeacher } from 'react-icons/fa';
import kaiwaLessons from '@/data/listening/kaiwa-lessons.json';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  // Get a few featured conversation lessons
  const featuredLessons = kaiwaLessons.filter(l => l.level === 'N5').slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Chinh phục ngoại ngữ toàn diện</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Nền tảng của bạn để thành thạo tiếng Nhật, Trung, Anh, Hàn và Việt một cách dễ dàng.</p>
          <Link href="/courses" passHref>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
              Bắt đầu học ngay
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Tính năng cốt lõi</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <FaHeadphones className="text-5xl text-green-500 mx-auto mb-5" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Luyện nghe chuyên sâu</h3>
              <p className="text-gray-600">Nghe các bài hội thoại N5, N4 với trình phát hiện đại, dễ dàng theo dõi.</p>
            </div>
            <Link href="/dictionary" passHref>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-blue-300 border border-gray-200">
                <FaBook className="text-5xl text-blue-500 mx-auto mb-5" />
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">Từ điển tích hợp</h3>
                <p className="text-gray-600">Tra cứu từ vựng, ngữ pháp và ví dụ một cách nhanh chóng và tiện lợi cho 5 ngôn ngữ khác nhau.</p>
              </div>
            </Link>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <FaChalkboardTeacher className="text-5xl text-purple-500 mx-auto mb-5" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Khóa học có lộ trình</h3>
              <p className="text-gray-600">Các khóa học được thiết kế bài bản theo từng cấp độ, giúp bạn học có hệ thống. <span className="text-gray-500">(Sắp ra mắt)</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Kaiwa Lessons Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Hội thoại nổi bật (N5)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLessons.map((lesson) => (
              <Link key={lesson.id} href={`/listening`} passHref>
                <div className="block p-6 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-green-300">
                  <h5 className="mb-2 text-xl font-bold text-gray-800">{lesson.title}</h5>
                  <p className="font-semibold text-green-600">{lesson.level}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/listening" passHref>
                <div className="text-green-600 font-semibold hover:underline cursor-pointer text-lg">Xem tất cả bài hội thoại →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="text-center py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Sẵn sàng để trở thành một bậc thầy ngoại ngữ?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Tạo tài khoản miễn phí để lưu tiến trình học và truy cập tất cả các tính năng.</p>
          <Link href="/auth/register" passHref>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-3">
              Đăng ký ngay
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
