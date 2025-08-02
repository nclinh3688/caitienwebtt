'use client';

import React, { useState } from 'react';
import { SharedCard, ResponsiveGrid, cn, styles } from './SharedUtils';
import { ComponentLoader } from '../LazyComponents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaLanguage,
  FaGraduationCap,
  FaComments,
  FaHeart,
  FaCheck,
  FaArrowRight,
  FaFilter,
  FaSearch,
  FaPhone
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

// 👨‍🏫 TEACHER DIRECTORY
export function TeacherDirectory() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const teachers = [
    {
      id: 1,
      name: 'Yamada Sensei',
      avatar: '👨‍🏫',
      specialty: 'Japanese Grammar',
      languages: ['Japanese', 'English'],
      experience: '8 years',
      rating: 4.9,
      reviews: 324,
      hourlyRate: 25,
      availability: 'Available Today',
      badges: ['Certified', 'Native Speaker', 'JLPT Expert'],
      bio: 'Expert in Japanese grammar with 8+ years of teaching experience. Specializes in JLPT preparation.',
      nextAvailable: '2:00 PM Today',
      responseTime: '< 1 hour'
    },
    {
      id: 2,
      name: 'Sarah Kim',
      avatar: '👩‍🏫',
      specialty: 'Conversation Practice',
      languages: ['Korean', 'English'],
      experience: '5 years',
      rating: 4.8,
      reviews: 198,
      hourlyRate: 22,
      availability: 'Available Tomorrow',
      badges: ['Conversation Expert', 'Cultural Guide'],
      bio: 'Native Korean speaker specializing in conversation practice and cultural understanding.',
      nextAvailable: '10:00 AM Tomorrow',
      responseTime: '< 2 hours'
    },
    {
      id: 3,
      name: 'Zhang Wei',
      avatar: '👨‍🎓',
      specialty: 'Business Chinese',
      languages: ['Chinese', 'English'],
      experience: '6 years',
      rating: 4.7,
      reviews: 156,
      hourlyRate: 30,
      availability: 'Busy Until Friday',
      badges: ['Business Expert', 'HSK Specialist'],
      bio: 'Business Chinese specialist with corporate training experience.',
      nextAvailable: 'Friday 3:00 PM',
      responseTime: '< 4 hours'
    }
  ];

  const filters = [
    { id: 'japanese', label: 'Japanese', count: 12 },
    { id: 'korean', label: 'Korean', count: 8 },
    { id: 'chinese', label: 'Chinese', count: 6 },
    { id: 'conversation', label: 'Conversation', count: 15 },
    { id: 'grammar', label: 'Grammar', count: 9 },
    { id: 'business', label: 'Business', count: 5 },
    { id: 'certified', label: 'Certified', count: 18 },
    { id: 'native', label: 'Native Speaker', count: 14 }
  ];

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <TeacherFilters 
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={setSelectedFilters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Teacher Grid */}
      <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="gap-6">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </ResponsiveGrid>
    </div>
  );
}

// 🔍 TEACHER FILTERS
function TeacherFilters({ 
  filters, 
  selectedFilters, 
  onFilterChange, 
  searchQuery, 
  onSearchChange 
}: {
  filters: any[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) {
  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      onFilterChange(selectedFilters.filter(f => f !== filterId));
    } else {
      onFilterChange([...selectedFilters, filterId]);
    }
  };

  return (
    <SharedCard className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search teachers by name, specialty, or language..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>
      
      {/* Filter Tags */}
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => toggleFilter(filter.id)}
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-all",
              selectedFilters.includes(filter.id)
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>
    </SharedCard>
  );
}

// 👨‍🏫 TEACHER CARD
function TeacherCard({ teacher }: { teacher: any }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <SharedCard variant="interactive" className="h-full">
      <CardContent className="p-6">
        {/* Teacher Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl">
              {teacher.avatar}
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{teacher.name}</h3>
              <p className="text-blue-600 font-medium">{teacher.specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <FaStar className="text-yellow-500 text-sm" />
                <span className="text-sm font-medium">{teacher.rating}</span>
                <span className="text-sm text-gray-500">({teacher.reviews} reviews)</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isBookmarked ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500 hover:bg-red-50"
            )}
          >
            <FaHeart />
          </button>
        </div>
        
        {/* Teacher Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaLanguage />
            <span>{teacher.languages.join(', ')}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaGraduationCap />
            <span>{teacher.experience} experience</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaClock />
            <span>Response time: {teacher.responseTime}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <FaCalendarAlt className="text-green-500" />
            <span className="text-green-600 font-medium">{teacher.nextAvailable}</span>
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {teacher.badges.map((badge: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>
        
        {/* Bio */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {teacher.bio}
        </p>
        
        {/* Pricing & Actions */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-gray-900">${teacher.hourlyRate}</span>
              <span className="text-sm text-gray-500">/hour</span>
            </div>
            <Badge className={cn(
              teacher.availability === 'Available Today' ? 'bg-green-500' :
              teacher.availability === 'Available Tomorrow' ? 'bg-yellow-500' :
              'bg-gray-500'
            )}>
              {teacher.availability}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
              <FaCalendarAlt className="mr-1" />
              Book
            </Button>
            <Button size="sm" variant="outline">
              <FaComments className="mr-1" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </SharedCard>
  );
}

// 📅 BOOKING CALENDAR
export function BookingCalendar({ 
  teacherId, 
  onTimeSelect 
}: { 
  teacherId: string; 
  onTimeSelect?: (time: string) => void; 
}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const availableSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '7:00 PM', '8:00 PM'
  ];

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <SharedCard className="p-6">
      <CardHeader className="px-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          Select Date & Time
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-0">
        {/* Date Selection */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {days.map((date, index) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  "p-3 text-center rounded-lg transition-all",
                  isSelected 
                    ? "bg-blue-500 text-white"
                    : isToday
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 hover:bg-gray-200"
                )}
              >
                <div className="text-xs font-medium">
                  {date.toLocaleDateString('en', { weekday: 'short' })}
                </div>
                <div className="text-lg font-bold">
                  {date.getDate()}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Time Selection */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Available Times</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {availableSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "p-3 text-sm font-medium rounded-lg transition-all",
                  selectedTime === time
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        
        {/* Booking Summary */}
        {selectedTime && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-blue-900 mb-2">Booking Summary</h4>
            <div className="space-y-1 text-sm text-blue-700">
              <div>Date: {selectedDate.toLocaleDateString()}</div>
              <div>Time: {selectedTime}</div>
              <div>Duration: 1 hour</div>
              <div className="font-bold">Total: $25</div>
            </div>
          </div>
        )}
        
        <Button 
          className="w-full bg-green-500 hover:bg-green-600"
          disabled={!selectedTime}
          onClick={() => onTimeSelect?.(selectedTime!)}
        >
          <FaCheck className="mr-2" />
          Confirm Booking
        </Button>
      </CardContent>
    </SharedCard>
  );
}

// 💬 TEACHER CHAT
export function TeacherChat({ teacherId }: { teacherId: string }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'teacher',
      text: 'Hello! How can I help you with your Japanese learning today?',
      time: '2:30 PM',
      avatar: '👨‍🏫'
    },
    {
      id: 2,
      sender: 'student',
      text: 'Hi! I need help with particle usage, especially は and が.',
      time: '2:32 PM',
      avatar: '👤'
    },
    {
      id: 3,
      sender: 'teacher',
      text: 'Great question! は is used for topics while が is used for subjects. Would you like to schedule a lesson to practice this?',
      time: '2:35 PM',
      avatar: '👨‍🏫'
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'student',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '👤'
      }]);
      setMessage('');
    }
  };

  return (
    <SharedCard className="h-[400px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <FaComments className="text-blue-500" />
          Chat with Teacher
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col px-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={cn(
              "flex gap-3",
              msg.sender === 'student' && "flex-row-reverse"
            )}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-sm">
                {msg.avatar}
              </div>
              <div className={cn(
                "max-w-xs p-3 rounded-lg",
                msg.sender === 'student' 
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              )}>
                <p className="text-sm">{msg.text}</p>
                <span className={cn(
                  "text-xs mt-1 block",
                  msg.sender === 'student' ? "text-blue-100" : "text-gray-500"
                )}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Message Input */}
        <div className="px-6 pt-3 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600">
              <FaArrowRight />
            </Button>
          </div>
        </div>
      </CardContent>
    </SharedCard>
  );
}