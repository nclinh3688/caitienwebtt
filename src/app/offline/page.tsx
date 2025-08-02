'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  FaWifi, 
  FaBook, 
  FaHeadphones, 
  FaMobile,
  FaRedo,
  FaHome,
  FaDownload
} from 'react-icons/fa';

function ConnectionStatus() {
  const [isOnline, setIsOnline] = React.useState(true);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    updateStatus();

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  return (
    <div className="text-center">
      <p className={`text-sm ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
        {isOnline ? '✅ Đã kết nối internet' : '❌ Không có kết nối internet'}
      </p>
    </div>
  );
}

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Main Offline Card */}
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaWifi className="text-4xl text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-gray-800">
              Bạn đang offline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Không có kết nối internet. Một số tính năng có thể không khả dụng.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                <FaRedo className="mr-2" />
                Thử lại
              </Button>
              
              <Button asChild variant="outline">
                <Link href="/">
                  <FaHome className="mr-2" />
                  Về trang chủ
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Offline Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FaMobile className="text-green-600" />
              Tính năng offline có sẵn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FaBook className="text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Bài học đã tải</h4>
                  <p className="text-sm text-gray-600">
                    Truy cập các bài học đã xem trước đó
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FaHeadphones className="text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Audio đã cache</h4>
                  <p className="text-sm text-gray-600">
                    Nghe lại các file âm thanh đã tải
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PWA Install Prompt */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <FaDownload className="text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">
                  Cài đặt ứng dụng để học offline
                </h3>
                <p className="text-sm text-green-800 mb-3">
                  Cài đặt PHÚC KHIÊM EDU trên thiết bị để:
                </p>
                <ul className="text-sm text-green-800 space-y-1 mb-3">
                  <li>• Truy cập nhanh từ màn hình chính</li>
                  <li>• Học offline với bài học đã tải</li>
                  <li>• Nhận thông báo nhắc nhở học tập</li>
                  <li>• Trải nghiệm như ứng dụng native</li>
                </ul>
                <p className="text-xs text-green-700">
                  Sử dụng menu trình duyệt để "Thêm vào Màn hình chính" hoặc "Cài đặt ứng dụng"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection Status */}
        <ConnectionStatus />
      </div>
    </div>
  );
}