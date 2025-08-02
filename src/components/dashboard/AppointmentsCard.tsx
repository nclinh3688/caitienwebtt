'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

interface AppointmentsCardProps {
  appointments: any[]; // Consider defining a more specific interface for appointments
}

export function AppointmentsCard({ appointments }: AppointmentsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaCalendarAlt className="text-blue-600" />
          Lịch học
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments.length > 0 ? (
            appointments.map((item: any) => (
              <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.status === 'scheduled' ? 'bg-blue-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.notes}</div>
                  <div className="text-xs text-gray-600 flex items-center gap-1">
                    <FaClock className="text-gray-400" />
                    {new Date(item.startTime).toLocaleString()} - {new Date(item.endTime).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full mt-2 bg-gray-400"></div>
              <div className="flex-1">
                <div className="font-medium text-sm">Chưa có lịch học</div>
                <div className="text-xs text-gray-600 flex items-center gap-1">
                  <FaClock className="text-gray-400" />
                  N/A
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
