'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaBuilding, 
  FaEye, 
  FaHeart, 
  FaUsers, 
  FaHistory, 
  FaTrophy,
  FaVideo,
  FaImage,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaRobot,
  FaLightbulb,
  FaStar,
  FaGraduationCap,
  FaGlobe,
  FaHandshake,
  FaPlay
} from 'react-icons/fa';

export default function AboutPage() {
  const aboutData = {
    // I1: Giới thiệu trung tâm
    introduction: {
      name: 'PHÚC KHIÊM EDU',
      tagline: 'Nền tảng học ngoại ngữ toàn diện',
      description: 'Chúng tôi là trung tâm đào tạo ngoại ngữ hàng đầu tại Việt Nam, chuyên cung cấp các khóa học chất lượng cao cho tiếng Nhật, Trung, Anh, Hàn và tiếng Việt cho người nước ngoài.',
      foundedYear: 2020,
      students: 5000,
      teachers: 50,
      courses: 200
    },

    // I2: Sứ mệnh, tầm nhìn, giá trị cốt lõi
    mission: {
      mission: 'Mang đến cơ hội học ngoại ngữ chất lượng cao cho mọi người, giúp học viên tự tin giao tiếp và thành công trong môi trường quốc tế.',
      vision: 'Trở thành nền tảng học ngoại ngữ số 1 tại Việt Nam và khu vực Đông Nam Á, ứng dụng công nghệ AI tiên tiến để cá nhân hóa trải nghiệm học tập.',
      values: [
        { name: 'Chất lượng', icon: '⭐', description: 'Cam kết chất lượng đào tạo cao nhất' },
        { name: 'Sáng tạo', icon: '💡', description: 'Áp dụng công nghệ mới trong giảng dạy' },
        { name: 'Tận tâm', icon: '❤️', description: 'Đặt lợi ích học viên lên hàng đầu' },
        { name: 'Hợp tác', icon: '🤝', description: 'Xây dựng cộng đồng học tập tích cực' }
      ]
    },

    // I3: Đội ngũ sáng lập, giáo viên
    team: {
      founders: [
        {
          name: 'Nguyễn Văn Phúc',
          position: 'CEO & Đồng sáng lập',
          avatar: '👨‍💼',
          experience: '15 năm kinh nghiệm giáo dục',
          education: 'Thạc sĩ Giáo dục - ĐH Sư phạm TP.HCM',
          description: 'Chuyên gia về phương pháp giảng dạy ngoại ngữ hiện đại'
        },
        {
          name: 'Trần Thị Khiêm',
          position: 'CTO & Đồng sáng lập',
          avatar: '👩‍💻',
          experience: '12 năm phát triển công nghệ',
          education: 'Thạc sĩ CNTT - ĐH Bách khoa TP.HCM',
          description: 'Chuyên gia về AI và EdTech'
        }
      ],
      teachers: [
        {
          name: 'Cô Nguyễn Thị Mai',
          specialization: 'Tiếng Nhật N5-N1',
          experience: '8 năm',
          students: 500,
          rating: 4.9
        },
        {
          name: 'Thầy Trần Văn Nam',
          specialization: 'Tiếng Trung HSK 1-6',
          experience: '6 năm',
          students: 300,
          rating: 4.8
        },
        {
          name: 'Cô Sarah Johnson',
          specialization: 'Tiếng Anh IELTS/TOEIC',
          experience: '10 năm',
          students: 800,
          rating: 4.9
        }
      ]
    },

    // I4: Lịch sử phát triển, thành tựu
    history: [
      {
        year: 2020,
        event: 'Thành lập PHÚC KHIÊM EDU',
        description: 'Bắt đầu với khóa học tiếng Nhật cơ bản'
      },
      {
        year: 2021,
        event: 'Mở rộng sang tiếng Trung và tiếng Anh',
        description: 'Đạt 1000 học viên đầu tiên'
      },
      {
        year: 2022,
        event: 'Ứng dụng công nghệ AI',
        description: 'Ra mắt nền tảng học trực tuyến với AI'
      },
      {
        year: 2023,
        event: 'Mở rộng toàn quốc',
        description: 'Có mặt tại 5 thành phố lớn'
      },
      {
        year: 2024,
        event: 'Chuẩn bị mở rộng quốc tế',
        description: 'Đạt 5000 học viên, chuẩn bị ra mắt tại Singapore'
      }
    ],

    // I5: Hình ảnh, video hoạt động
    media: {
      videos: [
        {
          id: 1,
          title: 'Giới thiệu PHÚC KHIÊM EDU',
          thumbnail: '🎥',
          duration: '3:45',
          views: 15000
        },
        {
          id: 2,
          title: 'Lớp học tiếng Nhật N5',
          thumbnail: '🎥',
          duration: '5:20',
          views: 8900
        },
        {
          id: 3,
          title: 'Testimonial học viên',
          thumbnail: '🎥',
          duration: '2:30',
          views: 12300
        }
      ],
      images: [
        { id: 1, title: 'Lớp học tiếng Nhật', description: 'Học viên đang thực hành giao tiếp' },
        { id: 2, title: 'Lễ tốt nghiệp', description: 'Học viên nhận chứng chỉ JLPT N5' },
        { id: 3, title: 'Hoạt động ngoại khóa', description: 'Giao lưu văn hóa Nhật Bản' },
        { id: 4, title: 'Đội ngũ giáo viên', description: 'Giáo viên chuyên nghiệp, tận tâm' }
      ]
    },

    // I6: Đối tác, chứng nhận, giải thưởng
    achievements: {
      certifications: [
        { name: 'ISO 9001:2015', description: 'Chứng nhận quản lý chất lượng' },
        { name: 'Chứng nhận JLPT', description: 'Trung tâm khảo thí chính thức' },
        { name: 'Chứng nhận HSK', description: 'Trung tâm khảo thí chính thức' }
      ],
      awards: [
        { name: 'Giải thưởng EdTech 2023', description: 'Nền tảng học ngoại ngữ xuất sắc' },
        { name: 'Top 10 EdTech Startup', description: 'Startup Việt Nam 2023' },
        { name: 'Giải thưởng Đổi mới sáng tạo', description: 'Bộ GD&ĐT 2023' }
      ],
      partners: [
        { name: 'Japan Foundation', logo: '🇯🇵', description: 'Tổ chức giao lưu văn hóa Nhật Bản' },
        { name: 'Confucius Institute', logo: '🇨🇳', description: 'Viện Khổng Tử' },
        { name: 'British Council', logo: '🇬🇧', description: 'Hội đồng Anh' },
        { name: 'Korean Cultural Center', logo: '🇰🇷', description: 'Trung tâm Văn hóa Hàn Quốc' }
      ]
    },

    // I7-I14: Thông tin liên hệ và AI features
    contact: {
      address: '123 Đường ABC, Quận 1, TP.HCM',
      phone: '+84 123 456 789',
      email: 'info@phuckhiem.edu.vn',
      website: 'www.phuckhiem.edu.vn',
      social: {
        facebook: 'facebook.com/phuckhiemedu',
        youtube: 'youtube.com/phuckhiemedu',
        instagram: 'instagram.com/phuckhiemedu'
      }
    },

    testimonials: [
      {
        name: 'Nguyễn Thị Lan',
        course: 'JLPT N5',
        content: 'Tôi đã học tiếng Nhật tại PHÚC KHIÊM EDU và đạt N5 chỉ sau 6 tháng. Giáo viên rất tận tâm và phương pháp học hiệu quả.',
        rating: 5
      },
      {
        name: 'Trần Văn Minh',
        course: 'HSK 2',
        content: 'Nền tảng học trực tuyến rất tiện lợi, AI giúp tôi học tập hiệu quả hơn rất nhiều.',
        rating: 5
      },
      {
        name: 'Sarah Johnson',
        course: 'IELTS 7.0',
        content: 'As a foreign student, I found PHÚC KHIÊM EDU very helpful in improving my Vietnamese. Great teachers and modern technology!',
        rating: 5
      }
    ],

    aiFeatures: [
      {
        name: 'AI Chatbot tư vấn',
        description: 'Hỗ trợ tư vấn 24/7 về khóa học và lộ trình học tập',
        icon: '🤖'
      },
      {
        name: 'AI Phân tích feedback',
        description: 'Phân tích và cải thiện chất lượng giảng dạy dựa trên phản hồi học viên',
        icon: '📊'
      },
      {
        name: 'AI Cá nhân hóa học tập',
        description: 'Tạo lộ trình học tập phù hợp với từng học viên',
        icon: '🎯'
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Về PHÚC KHIÊM EDU</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {aboutData.introduction.description}
        </p>
      </div>

      {/* I1: Giới thiệu trung tâm */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <FaBuilding className="text-blue-600" />
            I1: Giới thiệu trung tâm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{aboutData.introduction.foundedYear}</div>
              <div className="text-gray-600">Năm thành lập</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{aboutData.introduction.students}</div>
              <div className="text-gray-600">Học viên</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{aboutData.introduction.teachers}</div>
              <div className="text-gray-600">Giáo viên</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">{aboutData.introduction.courses}</div>
              <div className="text-gray-600">Khóa học</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* I2: Sứ mệnh, tầm nhìn, giá trị cốt lõi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaEye className="text-blue-600" />
              Sứ mệnh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{aboutData.mission.mission}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaGlobe className="text-green-600" />
              Tầm nhìn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{aboutData.mission.vision}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaHeart className="text-red-600" />
              Giá trị cốt lõi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aboutData.mission.values.map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-2xl">{value.icon}</span>
                  <div>
                    <div className="font-medium">{value.name}</div>
                    <div className="text-sm text-gray-600">{value.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* I3: Đội ngũ sáng lập, giáo viên */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaUsers className="text-purple-600" />
            I3: Đội ngũ sáng lập, giáo viên
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Founders */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Đội ngũ sáng lập</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutData.team.founders.map((founder, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="text-4xl">{founder.avatar}</div>
                      <div>
                        <h4 className="font-semibold">{founder.name}</h4>
                        <p className="text-blue-600">{founder.position}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>Kinh nghiệm: {founder.experience}</div>
                      <div>Học vấn: {founder.education}</div>
                      <p>{founder.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teachers */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Đội ngũ giáo viên</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aboutData.team.teachers.map((teacher, index) => (
                  <div key={index} className="p-4 border rounded-lg text-center">
                    <div className="text-3xl mb-2">👨‍🏫</div>
                    <h4 className="font-semibold">{teacher.name}</h4>
                    <p className="text-blue-600 text-sm mb-2">{teacher.specialization}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>Kinh nghiệm: {teacher.experience}</div>
                      <div>Học viên: {teacher.students}</div>
                      <div className="flex items-center justify-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span>{teacher.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* I4: Lịch sử phát triển, thành tựu */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaHistory className="text-orange-600" />
            I4: Lịch sử phát triển, thành tựu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aboutData.history.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
                  {item.year}
                </div>
                <div>
                  <h4 className="font-semibold">{item.event}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* I5: Hình ảnh, video hoạt động */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaVideo className="text-red-600" />
            I5: Hình ảnh, video hoạt động
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Videos */}
            <div>
              <h3 className="font-semibold mb-4">Video hoạt động</h3>
              <div className="space-y-3">
                {aboutData.media.videos.map((video) => (
                  <div key={video.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="text-2xl">{video.thumbnail}</div>
                    <div className="flex-1">
                      <div className="font-medium">{video.title}</div>
                      <div className="text-sm text-gray-600">
                        {video.duration} • {video.views.toLocaleString()} lượt xem
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <FaPlay className="mr-1" />
                      Xem
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <h3 className="font-semibold mb-4">Hình ảnh hoạt động</h3>
              <div className="grid grid-cols-2 gap-3">
                {aboutData.media.images.map((image) => (
                  <div key={image.id} className="p-3 border rounded-lg text-center">
                    <div className="text-3xl mb-2">📷</div>
                    <div className="font-medium text-sm">{image.title}</div>
                    <div className="text-xs text-gray-600">{image.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* I6: Đối tác, chứng nhận, giải thưởng */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaTrophy className="text-yellow-600" />
            I6: Đối tác, chứng nhận, giải thưởng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Certifications */}
            <div>
              <h3 className="font-semibold mb-4">Chứng nhận</h3>
              <div className="space-y-3">
                {aboutData.achievements.certifications.map((cert, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h3 className="font-semibold mb-4">Giải thưởng</h3>
              <div className="space-y-3">
                {aboutData.achievements.awards.map((award, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="font-medium">{award.name}</div>
                    <div className="text-sm text-gray-600">{award.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partners */}
            <div>
              <h3 className="font-semibold mb-4">Đối tác</h3>
              <div className="space-y-3">
                {aboutData.achievements.partners.map((partner, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{partner.logo}</span>
                      <div>
                        <div className="font-medium">{partner.name}</div>
                        <div className="text-sm text-gray-600">{partner.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* I7-I14: Thông tin liên hệ và AI features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaPhone className="text-green-600" />
              I7: Thông tin liên hệ nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-gray-400" />
                <span>{aboutData.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-gray-400" />
                <span>{aboutData.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400" />
                <span>{aboutData.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaGlobe className="text-gray-400" />
                <span>{aboutData.contact.website}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <Button size="sm" variant="outline">
                  <FaFacebook className="mr-2" />
                  Facebook
                </Button>
                <Button size="sm" variant="outline">
                  <FaYoutube className="mr-2" />
                  YouTube
                </Button>
                <Button size="sm" variant="outline">
                  <FaInstagram className="mr-2" />
                  Instagram
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaRobot className="text-purple-600" />
              I13 & I14: AI Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aboutData.aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <div className="font-medium">{feature.name}</div>
                    <div className="text-sm text-gray-600">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaStar className="text-yellow-600" />
            I9: Testimonial học viên
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-3">{testimonial.content}</p>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-blue-600">{testimonial.course}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="text-center">
        <CardContent className="py-8">
          <h3 className="text-2xl font-bold mb-4">Sẵn sàng bắt đầu hành trình học ngoại ngữ?</h3>
          <p className="text-gray-600 mb-6">Tham gia cùng chúng tôi và khám phá thế giới ngoại ngữ</p>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              <FaGraduationCap className="mr-2" />
              Đăng ký khóa học
            </Button>
            <Button size="lg" variant="outline">
              <FaPhone className="mr-2" />
              Liên hệ tư vấn
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}