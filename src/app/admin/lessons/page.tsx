'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FaBook, 
  FaPlus, 
  FaEdit, 
  FaEye, 
  FaTrash, 
  FaSearch,
  FaFilter,
  FaSort,
  FaDownload,
  FaUpload,
  FaCheck,
  FaTimes,
  FaClock,
  FaStar,
  FaGlobe,
  FaGraduationCap
} from 'react-icons/fa';

interface Lesson {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: string;
  difficulty: string;
  duration: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  author: string;
  tags: string[];
  viewCount: number;
  rating: number;
}

export default function AdminLessonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Quản lý bài học</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Trang quản lý bài học cho admin.
        </p>
      </div>
    </div>
  );
}
