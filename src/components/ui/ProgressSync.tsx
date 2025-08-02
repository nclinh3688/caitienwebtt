'use client';

import React, { useState, useEffect } from 'react';
import { SharedCard, cn } from './SharedUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaSync,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
  FaDatabase,
  FaWifi,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle
} from 'react-icons/fa';

// 🔄 PROGRESS SYNC MANAGER
export function ProgressSyncManager() {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [lastSync, setLastSync] = useState(new Date(Date.now() - 15 * 60 * 1000)); // 15 min ago
  const [pendingChanges, setPendingChanges] = useState(3);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Simulate network status
    const checkOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);
    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
    };
  }, []);

  const performSync = async () => {
    setSyncStatus('syncing');
    
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (Math.random() > 0.2) { // 80% success rate
      setSyncStatus('success');
      setLastSync(new Date());
      setPendingChanges(0);
      setTimeout(() => setSyncStatus('idle'), 3000);
    } else {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 5000);
    }
  };

  const getStatusColor = () => {
    switch (syncStatus) {
      case 'syncing': return 'text-blue-500';
      case 'success': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing': return <FaSync className="animate-spin" />;
      case 'success': return <FaCheckCircle />;
      case 'error': return <FaTimesCircle />;
      default: return <FaDatabase />;
    }
  };

  return (
    <SharedCard>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={getStatusColor()}>{getStatusIcon()}</span>
            Progress Sync
          </div>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <FaWifi className="text-green-500" />
            ) : (
              <FaWifi className="text-red-500" />
            )}
            <Button 
              size="sm" 
              onClick={performSync}
              disabled={syncStatus === 'syncing' || !isOnline}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Sync Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">
              {syncStatus === 'idle' && 'Ready to sync'}
              {syncStatus === 'syncing' && 'Syncing progress...'}
              {syncStatus === 'success' && 'Sync completed successfully'}
              {syncStatus === 'error' && 'Sync failed'}
            </p>
            <p className="text-sm text-gray-600">
              Last sync: {lastSync.toLocaleTimeString()}
            </p>
          </div>
          <Badge variant={
            syncStatus === 'success' ? 'default' :
            syncStatus === 'error' ? 'destructive' :
            'outline'
          }>
            {syncStatus}
          </Badge>
        </div>

        {/* Pending Changes */}
        {pendingChanges > 0 && (
          <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <FaExclamationTriangle className="text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">
                {pendingChanges} unsaved changes
              </p>
              <p className="text-sm text-yellow-700">
                Your progress will be saved on next sync
              </p>
            </div>
          </div>
        )}

        {/* Offline Notice */}
        {!isOnline && (
          <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <FaWifi className="text-red-600" />
            <div>
              <p className="font-medium text-red-800">Offline Mode</p>
              <p className="text-sm text-red-700">
                Progress will sync when connection is restored
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </SharedCard>
  );
}

// 📊 CROSS-MODULE PROGRESS
export function CrossModuleProgress() {
  const modules = [
    {
      id: 'lessons',
      name: 'Lessons',
      progress: 76,
      completed: 23,
      total: 30,
      lastActivity: '2 hours ago',
      status: 'active'
    },
    {
      id: 'tests',
      name: 'Tests',
      progress: 85,
      completed: 17,
      total: 20,
      lastActivity: '1 day ago',
      status: 'completed'
    },
    {
      id: 'listening',
      name: 'Listening',
      progress: 62,
      completed: 31,
      total: 50,
      lastActivity: '3 hours ago',
      status: 'active'
    },
    {
      id: 'community',
      name: 'Community',
      progress: 40,
      completed: 8,
      total: 20,
      lastActivity: '1 week ago',
      status: 'behind'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <FaCheckCircle />;
      case 'active': return <FaClock />;
      case 'behind': return <FaExclamationTriangle />;
      default: return <FaInfoCircle />;
    }
  };

  return (
    <SharedCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaDatabase className="text-purple-500" />
          Cross-Module Progress
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h4 className="font-medium text-gray-900">{module.name}</h4>
                <Badge className={cn('text-xs', getStatusColor(module.status))}>
                  {getStatusIcon(module.status)}
                  <span className="ml-1 capitalize">{module.status}</span>
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {module.completed}/{module.total}
              </div>
            </div>
            
            <div className="space-y-2">
              <Progress value={module.progress} className="h-2" />
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{module.progress}% complete</span>
                <span>Last activity: {module.lastActivity}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </SharedCard>
  );
}

// 🎯 LEARNING STREAK TRACKER
export function LearningStreakTracker() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [longestStreak, setLongestStreak] = useState(15);
  const [weekActivity, setWeekActivity] = useState([
    { day: 'Mon', active: true, minutes: 45 },
    { day: 'Tue', active: true, minutes: 30 },
    { day: 'Wed', active: true, minutes: 60 },
    { day: 'Thu', active: true, minutes: 25 },
    { day: 'Fri', active: true, minutes: 40 },
    { day: 'Sat', active: true, minutes: 50 },
    { day: 'Sun', active: true, minutes: 35 }
  ]);

  const totalMinutes = weekActivity.reduce((sum, day) => sum + day.minutes, 0);
  const avgMinutes = Math.round(totalMinutes / 7);

  return (
    <SharedCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaCheckCircle className="text-green-500" />
          Learning Streak
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Streak Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {currentStreak}
            </div>
            <div className="text-sm text-green-700">Current Streak</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {longestStreak}
            </div>
            <div className="text-sm text-blue-700">Longest Streak</div>
          </div>
        </div>

        {/* Week Activity */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">This Week</h4>
          <div className="grid grid-cols-7 gap-2">
            {weekActivity.map((day, index) => (
              <div key={index} className="text-center">
                <div className={cn(
                  "w-8 h-8 rounded-full mb-2 flex items-center justify-center text-xs font-bold",
                  day.active 
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                )}>
                  {day.active ? '✓' : '—'}
                </div>
                <div className="text-xs text-gray-600">{day.day}</div>
                <div className="text-xs text-gray-500">{day.minutes}m</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-900">{totalMinutes}m</div>
              <div className="text-sm text-gray-600">Total this week</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{avgMinutes}m</div>
              <div className="text-sm text-gray-600">Daily average</div>
            </div>
          </div>
        </div>
      </CardContent>
    </SharedCard>
  );
}

// 🔄 AUTO-SYNC SETTINGS
export function AutoSyncSettings() {
  const [autoSync, setAutoSync] = useState(true);
  const [syncInterval, setSyncInterval] = useState(5); // minutes
  const [wifiOnly, setWifiOnly] = useState(false);
  const [backgroundSync, setBackgroundSync] = useState(true);

  return (
    <SharedCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaSync className="text-blue-500" />
          Sync Settings
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Auto Sync Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Auto Sync</h4>
            <p className="text-sm text-gray-600">Automatically sync progress</p>
          </div>
          <button
            onClick={() => setAutoSync(!autoSync)}
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative",
              autoSync ? "bg-blue-500" : "bg-gray-300"
            )}
          >
            <div className={cn(
              "w-5 h-5 bg-white rounded-full shadow transition-transform absolute top-0.5",
              autoSync ? "translate-x-6" : "translate-x-0.5"
            )} />
          </button>
        </div>

        {/* Sync Interval */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Sync Interval</h4>
          <select 
            value={syncInterval}
            onChange={(e) => setSyncInterval(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>Every minute</option>
            <option value={5}>Every 5 minutes</option>
            <option value={15}>Every 15 minutes</option>
            <option value={30}>Every 30 minutes</option>
            <option value={60}>Every hour</option>
          </select>
        </div>

        {/* WiFi Only */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">WiFi Only</h4>
            <p className="text-sm text-gray-600">Only sync on WiFi connection</p>
          </div>
          <button
            onClick={() => setWifiOnly(!wifiOnly)}
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative",
              wifiOnly ? "bg-blue-500" : "bg-gray-300"
            )}
          >
            <div className={cn(
              "w-5 h-5 bg-white rounded-full shadow transition-transform absolute top-0.5",
              wifiOnly ? "translate-x-6" : "translate-x-0.5"
            )} />
          </button>
        </div>

        {/* Background Sync */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Background Sync</h4>
            <p className="text-sm text-gray-600">Sync when app is in background</p>
          </div>
          <button
            onClick={() => setBackgroundSync(!backgroundSync)}
            className={cn(
              "w-12 h-6 rounded-full transition-colors relative",
              backgroundSync ? "bg-blue-500" : "bg-gray-300"
            )}
          >
            <div className={cn(
              "w-5 h-5 bg-white rounded-full shadow transition-transform absolute top-0.5",
              backgroundSync ? "translate-x-6" : "translate-x-0.5"
            )} />
          </button>
        </div>
      </CardContent>
    </SharedCard>
  );
}