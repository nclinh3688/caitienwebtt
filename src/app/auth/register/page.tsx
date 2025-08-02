'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModernButton } from '@/components/ui/ModernButton';
import { 
  FaGoogle, 
  FaGithub, 
  FaEnvelope, 
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaArrowRight
} from 'react-icons/fa';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Đăng ký thành công! Đang chuyển hướng...');
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setError(data.error || 'Đăng ký thất bại');
      }
    } catch (error) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError('');

    try {
      // Redirect to Google OAuth
      window.location.href = '/api/auth/signin/google';
    } catch (error) {
      setError('Có lỗi xảy ra với Google registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Đăng ký
          </CardTitle>
          <p className="text-gray-600">
            Tạo tài khoản mới để bắt đầu học
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Social Register Buttons */}
          <div className="space-y-3">
            <ModernButton
              variant="outline"
              size="lg"
              onClick={handleGoogleRegister}
              disabled={loading}
              icon={<FaGoogle />}
              className="w-full"
            >
              Đăng ký với Google
            </ModernButton>
            
            <ModernButton
              variant="outline"
              size="lg"
              disabled={loading}
              icon={<FaGithub />}
              className="w-full"
            >
              Đăng ký với GitHub
            </ModernButton>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Hoặc</span>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="pl-10"
                />
                <FaUser className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10"
                />
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-10"
                />
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="pl-10 pr-10"
                />
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm text-center">
                {success}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
          </form>

          {/* Links */}
          <div className="text-center">
            <div className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <Link 
                href="/auth/login" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}