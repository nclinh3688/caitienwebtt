'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FaBell } from 'react-icons/fa';

interface NotificationsCardProps {
  notifications: any[]; // Consider defining a more specific interface for notifications
}

export function NotificationsCard({ notifications }: NotificationsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaBell className="text-red-500" />
          Thông báo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification: any) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.read ? 'bg-gray-400' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <div className="text-sm">{notification.message}</div>
                  <div className="text-xs text-gray-600">{new Date(notification.createdAt).toLocaleString()}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 rounded-full mt-2 bg-gray-400"></div>
              <div className="flex-1">
                <div className="text-sm">Chưa có thông báo mới</div>
                <div className="text-xs text-gray-600">N/A</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
