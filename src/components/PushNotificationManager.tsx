'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaBell, FaBellSlash, FaCheck, FaTimes } from 'react-icons/fa';

interface NotificationPermissionState {
  permission: NotificationPermission;
  subscription: PushSubscription | null;
}

export function PushNotificationManager() {
  const [notificationState, setNotificationState] = useState<NotificationPermissionState>({
    permission: 'default',
    subscription: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check notification support and current permission
    if ('Notification' in window && 'serviceWorker' in navigator) {
      setNotificationState(prev => ({
        ...prev,
        permission: Notification.permission
      }));

      // Show prompt if permission is default and user hasn't dismissed it recently
      const lastDismissed = localStorage.getItem('notification-prompt-dismissed');
      const now = Date.now();
      
      if (Notification.permission === 'default' && 
          (!lastDismissed || (now - parseInt(lastDismissed)) > 3 * 24 * 60 * 60 * 1000)) { // 3 days
        setTimeout(() => setShowPrompt(true), 5000); // Show after 5 seconds
      }

      // Check for existing subscription
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(subscription => {
          setNotificationState(prev => ({
            ...prev,
            subscription
          }));
        });
      });
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      alert('Trình duyệt của bạn không hỗ trợ thông báo');
      return;
    }

    setIsLoading(true);

    try {
      const permission = await Notification.requestPermission();
      setNotificationState(prev => ({ ...prev, permission }));

      if (permission === 'granted') {
        await subscribeToNotifications();
        setShowPrompt(false);
        
        // Show success notification
        new Notification('PHÚC KHIÊM EDU', {
          body: '🎉 Thông báo đã được bật! Bạn sẽ nhận được nhắc nhở học tập.',
          icon: '/icons/icon-192x192.svg',
          tag: 'welcome'
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.error('Error requesting notification permission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // VAPID public key (in production, get this from your push service)
      const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI80xOzSL0gmgVOjMLvVKYvZoKLJv8bhvFEgbSMPNvO8h0w6lJWP-8VQFA'; // Replace with your VAPID key
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      setNotificationState(prev => ({ ...prev, subscription }));

      // Send subscription to your server
      await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
          userAgent: navigator.userAgent
        }),
      });

      console.log('✅ Push subscription successful:', subscription);
    } catch (error) {
      console.error('❌ Push subscription failed:', error);
    }
  };

  const unsubscribeFromNotifications = async () => {
    if (!notificationState.subscription) return;

    setIsLoading(true);

    try {
      await notificationState.subscription.unsubscribe();
      
      // Notify server
      await fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: notificationState.subscription.endpoint
        }),
      });

      setNotificationState(prev => ({ ...prev, subscription: null }));
    } catch (error) {
      console.error('Error unsubscribing:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('notification-prompt-dismissed', Date.now().toString());
  };

  // Convert VAPID key
  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Notification prompt banner
  if (showPrompt && notificationState.permission === 'default') {
    return (
      <Card className="fixed bottom-4 left-4 right-4 z-50 border-blue-200 bg-blue-50 shadow-lg md:left-auto md:right-4 md:w-96">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FaBell className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-blue-900 mb-1">
                Nhắc nhở học tập
              </h3>
              <p className="text-sm text-blue-800 mb-3">
                Bật thông báo để nhận nhắc nhở bài học và cập nhật mới
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={requestNotificationPermission}
                  disabled={isLoading}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FaBell className="mr-2" size={14} />
                  {isLoading ? 'Đang xử lý...' : 'Bật thông báo'}
                </Button>
                <Button 
                  onClick={dismissPrompt}
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  Để sau
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Notification settings (can be used in settings page)
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaBell className="text-blue-600" />
          Thông báo Push
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Trạng thái thông báo</p>
            <p className="text-sm text-gray-600">
              {notificationState.permission === 'granted' ? '✅ Đã bật' :
               notificationState.permission === 'denied' ? '❌ Đã tắt' : '⏳ Chưa cài đặt'}
            </p>
          </div>
          
          {notificationState.permission === 'granted' ? (
            notificationState.subscription ? (
              <Button 
                onClick={unsubscribeFromNotifications}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                <FaBellSlash className="mr-2" size={14} />
                Tắt
              </Button>
            ) : (
              <Button 
                onClick={subscribeToNotifications}
                disabled={isLoading}
                size="sm"
              >
                <FaBell className="mr-2" size={14} />
                Bật
              </Button>
            )
          ) : notificationState.permission === 'default' ? (
            <Button 
              onClick={requestNotificationPermission}
              disabled={isLoading}
              size="sm"
            >
              <FaBell className="mr-2" size={14} />
              Xin quyền
            </Button>
          ) : (
            <p className="text-xs text-gray-500">
              Bật trong cài đặt trình duyệt
            </p>
          )}
        </div>

        {notificationState.subscription && (
          <div className="text-xs text-gray-500">
            <p>✅ Đã đăng ký nhận thông báo</p>
            <p>Bạn sẽ nhận được nhắc nhở học tập và cập nhật mới</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PushNotificationManager;