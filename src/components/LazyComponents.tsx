// Lazy loading components for better performance
import { Suspense, ReactElement } from 'react';

// Component loader with fallback
export const ComponentLoader: React.FC<{ children: React.ReactNode; loadingText?: string }> = ({ 
  children, 
  loadingText = 'Loading...' 
}) => (
  <Suspense fallback={
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span className="ml-2 text-muted-foreground">{loadingText}</span>
    </div>
  }>
    {children}
  </Suspense>
);

// Responsive grid component
export const ResponsiveGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
    {children}
  </div>
);

// Simple placeholder components
export const LazyAuthSystem = () => (
  <div className="p-6 bg-card rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">Authentication System</h3>
    <p className="text-muted-foreground">Advanced authentication features will be implemented here</p>
  </div>
);

export const LazyCommunitySystem = () => (
  <div className="p-6 bg-card rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4">Community System</h3>
    <p className="text-muted-foreground">Community features will be implemented here</p>
  </div>
);

// Dashboard components - simple placeholders
export const LazyLearningProgressCard = () => (
  <div className="p-6 bg-card rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
    <p className="text-muted-foreground">Progress tracking will be implemented here</p>
  </div>
);

export const LazyAICoachCard = () => (
  <div className="p-6 bg-card rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">AI Coach</h3>
    <p className="text-muted-foreground">AI coaching features will be implemented here</p>
  </div>
);

export const LazyAchievementsCard = () => (
  <div className="p-6 bg-card rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Achievements</h3>
    <p className="text-muted-foreground">Achievement system will be implemented here</p>
  </div>
);

export const LazyNotificationsCard = () => (
  <div className="p-6 bg-card rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Notifications</h3>
    <p className="text-muted-foreground">Notification system will be implemented here</p>
  </div>
);

// UI components - simple placeholders
export const LazyAudioPlayer = () => (
  <div className="p-4 bg-card rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Audio Player</h3>
    <p className="text-muted-foreground">Audio player will be implemented here</p>
  </div>
);

export const LazyAdvancedCharts = () => (
  <div className="p-4 bg-card rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Advanced Charts</h3>
    <p className="text-muted-foreground">Advanced charts will be implemented here</p>
  </div>
);

export const LazyMagicEffects = () => (
  <div className="p-4 bg-card rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Magic Effects</h3>
    <p className="text-muted-foreground">Magic effects will be implemented here</p>
  </div>
);

// AI components - simple placeholders
export const LazyAIContentGenerator = () => (
  <div className="p-4 bg-card rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">AI Content Generator</h3>
    <p className="text-muted-foreground">AI content generation will be implemented here</p>
  </div>
);

// Loading components
export const DashboardCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="space-y-3">
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="flex-1 h-6 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);