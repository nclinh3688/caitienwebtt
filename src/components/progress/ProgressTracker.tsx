'use client';

import React from 'react';

interface ProgressTrackerProps {
  userId: string;
  courseId?: string;
}

export default function ProgressTracker({ userId, courseId }: ProgressTrackerProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Progress Tracker</h3>
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">User ID</p>
          <p className="text-lg font-semibold text-blue-900">{userId}</p>
        </div>
        
        {courseId && (
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Course ID</p>
            <p className="text-lg font-semibold text-green-900">{courseId}</p>
          </div>
        )}
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Status</p>
          <p className="text-lg font-semibold text-purple-900">Component Working!</p>
        </div>
      </div>
    </div>
  );
}
