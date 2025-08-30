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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Về PHÚC KHIÊM</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          PHÚC KHIÊM là nền tảng học ngoại ngữ thông minh với AI tutor, 
          cung cấp giải pháp học tập toàn diện cho 5 ngôn ngữ phổ biến.
        </p>
      </div>
    </div>
  );
}