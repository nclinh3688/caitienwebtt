import Link from 'next/link';
import { FaFacebook, FaYoutube, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-lg">
                <span className="text-white">P</span>
              </div>
              <span className="font-bold text-xl">PHÚC KHIÊM EDU</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nền tảng học ngoại ngữ toàn diện, giúp bạn chinh phục tiếng Nhật, Trung, Anh, Hàn và Việt một cách hiệu quả.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-gray-300 hover:text-white transition-colors">Khóa học</Link></li>
              <li><Link href="/test" className="text-gray-300 hover:text-white transition-colors">Bài kiểm tra</Link></li>
              <li><Link href="/community" className="text-gray-300 hover:text-white transition-colors">Cộng đồng</Link></li>
              <li><Link href="/teachers" className="text-gray-300 hover:text-white transition-colors">Giáo viên</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">Về chúng tôi</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li><Link href="/support" className="text-gray-300 hover:text-white transition-colors">Trung tâm trợ giúp</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Liên hệ</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Điều khoản sử dụng</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="text-green-500" />
                <span className="text-gray-300 text-sm">+84 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" />
                <span className="text-gray-300 text-sm">info@phuckhiem.edu.vn</span>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-green-500 mt-1" />
                <span className="text-gray-300 text-sm">123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PHÚC KHIÊM EDU. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
