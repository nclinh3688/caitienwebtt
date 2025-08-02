'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaCalendarAlt, 
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBook,
  FaPen,
  FaHeadphones,
  FaMicrophone,
  FaPlus,
  FaBell,
  FaFire,
  FaBullseye
} from 'react-icons/fa';

interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'practice' | 'test' | 'review';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  estimatedTime: number; // minutes
  progress: number; // 0-100
  isCompleted: boolean;
  lessonId?: string;
  createdAt: Date;
}

interface StudyReminder {
  id: string;
  title: string;
  message: string;
  scheduledFor: Date;
  type: 'daily' | 'weekly' | 'custom';
  isActive: boolean;
}

interface AssignmentTrackerProps {
  userId: string;
}

export function AssignmentTrackerCard({ userId }: AssignmentTrackerProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [reminders, setReminders] = useState<StudyReminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'assignments' | 'reminders'>('assignments');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchAssignments();
  }, [userId]);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setAssignments(data.assignments);
        setReminders(data.reminders);
      }
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
      // Mock data for demo
      setAssignments([
        {
          id: '1',
          title: 'Hoàn thành bài 5: N5 Vocabulary',
          description: 'Học thuộc 30 từ vựng mới về gia đình',
          type: 'lesson',
          priority: 'high',
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
          estimatedTime: 45,
          progress: 60,
          isCompleted: false,
          lessonId: 'N5-B05',
          createdAt: new Date()
        },
        {
          id: '2',
          title: 'Luyện phát âm bài 3',
          description: 'Đạt điểm >=80 trong pronunciation trainer',
          type: 'practice',
          priority: 'medium',
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
          estimatedTime: 30,
          progress: 25,
          isCompleted: false,
          createdAt: new Date()
        },
        {
          id: '3',
          title: 'Ôn tập Kanji đã học',
          description: 'Review tất cả Kanji từ bài 1-4',
          type: 'review',
          priority: 'medium',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
          estimatedTime: 60,
          progress: 0,
          isCompleted: false,
          createdAt: new Date()
        }
      ]);
      
      setReminders([
        {
          id: '1',
          title: 'Học từ vựng hàng ngày',
          message: 'Đã đến giờ học 15 từ vựng mới!',
          scheduledFor: new Date(),
          type: 'daily',
          isActive: true
        },
        {
          id: '2',
          title: 'Ôn tập cuối tuần',
          message: 'Thời gian ôn tập những gì đã học trong tuần',
          scheduledFor: new Date(),
          type: 'weekly',
          isActive: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 text-red-700';
      case 'medium': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'low': return 'border-green-500 bg-green-50 text-green-700';
      default: return 'border-gray-500 bg-gray-50 text-gray-700';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <FaExclamationTriangle className="text-red-500" />;
      case 'medium': return <FaClock className="text-yellow-500" />;
      case 'low': return <FaCheckCircle className="text-green-500" />;
      default: return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <FaBook className="text-blue-500" />;
      case 'practice': return <FaMicrophone className="text-purple-500" />;
      case 'test': return <FaPen className="text-red-500" />;
      case 'review': return <FaBullseye className="text-orange-500" />;
      default: return <FaBook className="text-gray-500" />;
    }
  };

  const getDueDateColor = (dueDate: Date) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return 'text-red-600'; // Overdue
    if (days <= 1) return 'text-red-500'; // Due soon
    if (days <= 3) return 'text-yellow-500'; // Due this week
    return 'text-gray-600'; // Normal
  };

  const markAsCompleted = async (assignmentId: string) => {
    try {
      await fetch('/api/assignments/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assignmentId }),
      });
      
      // Update local state
      setAssignments(prev => 
        prev.map(a => 
          a.id === assignmentId 
            ? { ...a, isCompleted: true, progress: 100 } 
            : a
        )
      );
    } catch (error) {
      console.error('Failed to mark assignment as completed:', error);
    }
  };

  const createCustomAssignment = () => {
    setShowCreateForm(true);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" />
            Quản lý bài tập
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin text-blue-500 text-2xl mb-2">📚</div>
            <p>Đang tải danh sách bài tập...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const overdueAssignments = assignments.filter(a => !a.isCompleted && getDaysUntilDue(a.dueDate) < 0);
  const dueSoonAssignments = assignments.filter(a => !a.isCompleted && getDaysUntilDue(a.dueDate) >= 0 && getDaysUntilDue(a.dueDate) <= 3);
  const upcomingAssignments = assignments.filter(a => !a.isCompleted && getDaysUntilDue(a.dueDate) > 3);
  const completedAssignments = assignments.filter(a => a.isCompleted);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" />
            Quản lý bài tập & nhắc nhở
          </CardTitle>
          
          <Button
            onClick={createCustomAssignment}
            size="sm"
            className="flex items-center gap-2"
          >
            <FaPlus />
            Tạo bài tập
          </Button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => setActiveTab('assignments')}
            variant={activeTab === 'assignments' ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2"
          >
            <FaCalendarAlt />
            Bài tập ({assignments.filter(a => !a.isCompleted).length})
          </Button>
          <Button
            onClick={() => setActiveTab('reminders')}
            variant={activeTab === 'reminders' ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2"
          >
            <FaBell />
            Nhắc nhở ({reminders.filter(r => r.isActive).length})
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{overdueAssignments.length}</div>
            <div className="text-sm text-red-700">Quá hạn</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{dueSoonAssignments.length}</div>
            <div className="text-sm text-yellow-700">Sắp hết hạn</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedAssignments.length}</div>
            <div className="text-sm text-green-700">Hoàn thành</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            {/* Overdue Assignments */}
            {overdueAssignments.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                  <FaExclamationTriangle />
                  Quá hạn ({overdueAssignments.length})
                </h4>
                <div className="space-y-3">
                  {overdueAssignments.map(assignment => (
                    <AssignmentCard 
                      key={assignment.id} 
                      assignment={assignment} 
                      onMarkCompleted={markAsCompleted}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Due Soon Assignments */}
            {dueSoonAssignments.length > 0 && (
              <div>
                <h4 className="font-semibold text-yellow-600 mb-3 flex items-center gap-2">
                  <FaClock />
                  Sắp hết hạn ({dueSoonAssignments.length})
                </h4>
                <div className="space-y-3">
                  {dueSoonAssignments.map(assignment => (
                    <AssignmentCard 
                      key={assignment.id} 
                      assignment={assignment} 
                      onMarkCompleted={markAsCompleted}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Assignments */}
            {upcomingAssignments.length > 0 && (
              <div>
                <h4 className="font-semibold text-blue-600 mb-3 flex items-center gap-2">
                  <FaCalendarAlt />
                  Sắp tới ({upcomingAssignments.length})
                </h4>
                <div className="space-y-3">
                  {upcomingAssignments.slice(0, 3).map(assignment => (
                    <AssignmentCard 
                      key={assignment.id} 
                      assignment={assignment} 
                      onMarkCompleted={markAsCompleted}
                    />
                  ))}
                </div>
              </div>
            )}

            {assignments.filter(a => !a.isCompleted).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FaCheckCircle className="text-4xl mx-auto mb-4 text-green-500" />
                <p>Tuyệt vời! Bạn đã hoàn thành hết bài tập!</p>
              </div>
            )}
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <FaBell className="text-blue-500" />
              Nhắc nhở đang hoạt động
            </h4>
            
            <div className="space-y-3">
              {reminders.filter(r => r.isActive).map(reminder => (
                <div 
                  key={reminder.id}
                  className="p-4 border rounded-lg bg-blue-50 border-blue-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-800">{reminder.title}</span>
                    <Badge variant="outline" className="text-blue-600">
                      {reminder.type === 'daily' ? 'Hàng ngày' : 
                       reminder.type === 'weekly' ? 'Hàng tuần' : 'Tùy chỉnh'}
                    </Badge>
                  </div>
                  <p className="text-blue-700 text-sm">{reminder.message}</p>
                </div>
              ))}
            </div>

            <Button 
              className="w-full flex items-center gap-2"
              variant="outline"
            >
              <FaPlus />
              Tạo nhắc nhở mới
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Assignment Card Component
function AssignmentCard({ 
  assignment, 
  onMarkCompleted 
}: { 
  assignment: Assignment;
  onMarkCompleted: (id: string) => void;
}) {
  const daysUntilDue = Math.ceil((assignment.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 1;

  return (
    <div className={`p-4 border rounded-lg ${
      isOverdue ? 'border-red-200 bg-red-50' :
      isDueSoon ? 'border-yellow-200 bg-yellow-50' :
      'border-gray-200 bg-white'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-1">
            {assignment.type === 'lesson' && <FaBook className="text-blue-500" />}
            {assignment.type === 'practice' && <FaMicrophone className="text-purple-500" />}
            {assignment.type === 'test' && <FaPen className="text-red-500" />}
            {assignment.type === 'review' && <FaBullseye className="text-orange-500" />}
          </div>
          
          <div className="flex-1">
            <h5 className="font-medium text-gray-900 mb-1">{assignment.title}</h5>
            <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <FaClock className="text-gray-400" />
                {assignment.estimatedTime} phút
              </span>
              
              <span className={`flex items-center gap-1 ${
                isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-gray-600'
              }`}>
                <FaCalendarAlt className="text-gray-400" />
                {isOverdue 
                  ? `Quá hạn ${Math.abs(daysUntilDue)} ngày`
                  : daysUntilDue === 0 
                  ? 'Hôm nay'
                  : daysUntilDue === 1
                  ? 'Ngày mai'
                  : `${daysUntilDue} ngày nữa`
                }
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className={assignment.priority === 'high' ? 'border-red-500 text-red-600' :
                      assignment.priority === 'medium' ? 'border-yellow-500 text-yellow-600' :
                      'border-green-500 text-green-600'}
          >
            {assignment.priority === 'high' ? 'Cao' :
             assignment.priority === 'medium' ? 'Trung bình' : 'Thấp'}
          </Badge>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Tiến độ</span>
          <span className="text-sm font-medium">{assignment.progress}%</span>
        </div>
        <Progress value={assignment.progress} className="h-2" />
      </div>
      
      {/* Action Button */}
      <div className="flex gap-2">
        <Button
          onClick={() => onMarkCompleted(assignment.id)}
          size="sm"
          className="flex items-center gap-2"
          disabled={assignment.isCompleted}
        >
          <FaCheckCircle />
          {assignment.isCompleted ? 'Đã hoàn thành' : 'Hoàn thành'}
        </Button>
        
        {assignment.lessonId && (
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2"
          >
            <FaBook />
            Xem bài học
          </Button>
        )}
      </div>
    </div>
  );
}