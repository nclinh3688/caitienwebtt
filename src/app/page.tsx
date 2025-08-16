'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  Brain, 
  Users, 
  Star, 
  ArrowRight,
  Play,
  Trophy,
  Clock,
  Target
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-800 bg-clip-text text-transparent mb-6">
              Học ngoại ngữ thông minh
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nền tảng học ngoại ngữ hiện đại với AI tutor, 5 ngôn ngữ phổ biến, 
              phương pháp học khoa học và trải nghiệm học tập tuyệt vời
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Play size={20} />
              Bắt đầu học miễn phí
            </button>
            <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-2xl font-semibold text-lg hover:bg-primary-600 hover:text-white transition-all duration-300 flex items-center gap-2">
              <BookOpen size={20} />
              Xem khóa học
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn PHÚC KHIÊM?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp giải pháp học ngoại ngữ toàn diện và hiện đại nhất
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Brain size={40} className="text-primary-600" />,
                title: "AI Tutor 24/7",
                description: "Trò chuyện với AI tutor thông minh, hỗ trợ học tập mọi lúc mọi nơi"
              },
              {
                icon: <GraduationCap size={40} className="text-secondary-600" />,
                title: "5 Ngôn ngữ",
                description: "Tiếng Nhật, Trung, Anh, Hàn, Việt với giáo trình chuẩn quốc tế"
              },
              {
                icon: <Target size={40} className="text-green-600" />,
                title: "Lộ trình cá nhân",
                description: "Học theo lộ trình được thiết kế riêng cho từng học viên"
              },
              {
                icon: <Trophy size={40} className="text-yellow-600" />,
                title: "Gamification",
                description: "Học tập thú vị với hệ thống điểm, huy hiệu và xếp hạng"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-orange-50 transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50,000+", label: "Học viên" },
              { number: "100+", label: "Khóa học" },
              { number: "99%", label: "Hài lòng" },
              { number: "24/7", label: "Hỗ trợ" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <div className="text-4xl sm:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Sẵn sàng bắt đầu hành trình học ngoại ngữ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Tham gia cùng 50,000+ học viên đang học tập và phát triển mỗi ngày
            </p>
            <button className="px-10 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
              Bắt đầu ngay hôm nay
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
