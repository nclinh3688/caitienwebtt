'use client';

import React, { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
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
  FaFacebook, 
  FaEnvelope, 
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight
} from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email hoặc mật khẩu không đúng');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false,
      });

      if (result?.error) {
        setError('Đăng nhập Google thất bại');
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      setError('Có lỗi xảy ra với Google login');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signIn('github', {
        callbackUrl: '/dashboard',
        redirect: false,
      });

      if (result?.error) {
        setError('Đăng nhập GitHub thất bại');
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      setError('Có lỗi xảy ra với GitHub login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in-up">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Đăng nhập
          </CardTitle>
          <p className="text-gray-600">
            Chào mừng bạn quay trở lại PHÚC KHIÊM EDU
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <ModernButton
              variant="outline"
              size="lg"
              onClick={handleGoogleLogin}
              disabled={loading}
              icon={<FaGoogle />}
              className="w-full"
            >
              Tiếp tục với Google
            </ModernButton>
            
            <ModernButton
              variant="outline"
              size="lg"
              onClick={handleGithubLogin}
              disabled={loading}
              icon={<FaGithub />}
              className="w-full"
            >
              Tiếp tục với GitHub
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

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          {/* Links */}
          <div className="text-center space-y-2">
            <Link 
              href="/auth/forgot-password" 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Quên mật khẩu?
            </Link>
            
            <div className="text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <Link 
                href="/auth/register" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
