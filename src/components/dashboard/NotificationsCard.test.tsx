import { render, screen } from '@testing-library/react';
import { NotificationsCard } from './NotificationsCard';

describe('NotificationsCard', () => {
  const mockNotifications = [
    {
      id: '1',
      message: 'Welcome to Japanese learning platform!',
      createdAt: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: '2',
      message: 'You completed lesson 5 successfully!',
      createdAt: '2024-01-14T15:45:00Z',
      read: true
    },
    {
      id: '3',
      message: 'New N5 vocabulary quiz available',
      createdAt: '2024-01-13T09:15:00Z',
      read: false
    }
  ];

  it('renders main title correctly', () => {
    render(<NotificationsCard notifications={[]} />);
    
    expect(screen.getByText('Thông báo')).toBeInTheDocument();
  });

  it('shows fallback message when no notifications', () => {
    render(<NotificationsCard notifications={[]} />);
    
    expect(screen.getByText('Chưa có thông báo mới')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
    
    // Should show gray indicator for empty state
    const indicator = document.querySelector('.bg-gray-400');
    expect(indicator).toBeInTheDocument();
  });

  it('renders notifications with correct content', () => {
    render(<NotificationsCard notifications={mockNotifications} />);
    
    // Check all notification messages are displayed
    expect(screen.getByText('Welcome to Japanese learning platform!')).toBeInTheDocument();
    expect(screen.getByText('You completed lesson 5 successfully!')).toBeInTheDocument();
    expect(screen.getByText('New N5 vocabulary quiz available')).toBeInTheDocument();
    
    // Should not show fallback message
    expect(screen.queryByText('Chưa có thông báo mới')).not.toBeInTheDocument();
  });

  it('shows correct read/unread indicators', () => {
    render(<NotificationsCard notifications={mockNotifications} />);
    
    // Should have indicators for read and unread notifications
    const unreadIndicators = document.querySelectorAll('.bg-red-500');
    const readIndicators = document.querySelectorAll('.bg-gray-400');
    
    expect(unreadIndicators).toHaveLength(2); // notifications 1 and 3 are unread
    expect(readIndicators).toHaveLength(1); // notification 2 is read
  });

  it('formats timestamps correctly', () => {
    render(<NotificationsCard notifications={mockNotifications} />);
    
    // Check that timestamps are displayed (exact format depends on locale)
    // Just verify that some timestamp format exists
    const timestampElements = screen.getAllByText(/2024/);
    expect(timestampElements.length).toBeGreaterThan(0);
  });

  it('renders single notification correctly', () => {
    const singleNotification = [mockNotifications[0]];
    render(<NotificationsCard notifications={singleNotification} />);
    
    expect(screen.getByText('Welcome to Japanese learning platform!')).toBeInTheDocument();
    
    // Should show unread indicator
    const unreadIndicator = document.querySelector('.bg-red-500');
    expect(unreadIndicator).toBeInTheDocument();
    
    // Should not show fallback
    expect(screen.queryByText('Chưa có thông báo mới')).not.toBeInTheDocument();
  });

  it('handles all read notifications', () => {
    const allReadNotifications = mockNotifications.map(n => ({ ...n, read: true }));
    render(<NotificationsCard notifications={allReadNotifications} />);
    
    // All indicators should be gray (read)
    const readIndicators = document.querySelectorAll('.bg-gray-400');
    const unreadIndicators = document.querySelectorAll('.bg-red-500');
    
    expect(readIndicators).toHaveLength(3);
    expect(unreadIndicators).toHaveLength(0);
  });

  it('handles all unread notifications', () => {
    const allUnreadNotifications = mockNotifications.map(n => ({ ...n, read: false }));
    render(<NotificationsCard notifications={allUnreadNotifications} />);
    
    // All indicators should be red (unread)
    const unreadIndicators = document.querySelectorAll('.bg-red-500');
    const readIndicators = document.querySelectorAll('.bg-gray-400');
    
    expect(unreadIndicators).toHaveLength(3);
    expect(readIndicators).toHaveLength(0);
  });

  it('handles notifications without read property', () => {
    const notificationsWithoutRead = [
      {
        id: '1',
        message: 'Test notification',
        createdAt: '2024-01-15T10:30:00Z'
        // missing read property
      }
    ];
    
    render(<NotificationsCard notifications={notificationsWithoutRead} />);
    
    expect(screen.getByText('Test notification')).toBeInTheDocument();
    
    // Should default to unread (red) when read property is missing/undefined
    const unreadIndicator = document.querySelector('.bg-red-500');
    expect(unreadIndicator).toBeInTheDocument();
  });

  it('handles different date formats', () => {
    const differentDateFormats = [
      {
        id: '1',
        message: 'ISO date notification',
        createdAt: '2024-03-15T14:30:00.000Z',
        read: false
      },
      {
        id: '2',
        message: 'Another date format',
        createdAt: '2024-12-25T23:59:59Z',
        read: true
      }
    ];
    
    render(<NotificationsCard notifications={differentDateFormats} />);
    
    expect(screen.getByText('ISO date notification')).toBeInTheDocument();
    expect(screen.getByText('Another date format')).toBeInTheDocument();
    
    // Check that dates are rendered (specific format depends on locale)
    const dateElements = screen.getAllByText(/2024/);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it('handles notifications with long messages', () => {
    const longMessageNotification = [
      {
        id: '1',
        message: 'This is a very long notification message that might wrap to multiple lines and should still be displayed correctly in the notification card component without breaking the layout or causing any issues with the user interface design.',
        createdAt: '2024-01-15T10:30:00Z',
        read: false
      }
    ];
    
    render(<NotificationsCard notifications={longMessageNotification} />);
    
    expect(screen.getByText(/This is a very long notification message/)).toBeInTheDocument();
  });

  it('handles notifications with special characters', () => {
    const specialCharNotifications = [
      {
        id: '1',
        message: 'おめでとうございます！ N5レベルを完了しました 🎉',
        createdAt: '2024-01-15T10:30:00Z',
        read: false
      },
      {
        id: '2',
        message: 'Achievement unlocked: "Grammar Master" ★★★',
        createdAt: '2024-01-14T10:30:00Z',
        read: true
      }
    ];
    
    render(<NotificationsCard notifications={specialCharNotifications} />);
    
    expect(screen.getByText('おめでとうございます！ N5レベルを完了しました 🎉')).toBeInTheDocument();
    expect(screen.getByText('Achievement unlocked: "Grammar Master" ★★★')).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<NotificationsCard notifications={mockNotifications} />);
    
    // Check main heading
    expect(screen.getByText('Thông báo')).toBeInTheDocument();
    
    // All notification messages should be accessible
    mockNotifications.forEach(notification => {
      expect(screen.getByText(notification.message)).toBeInTheDocument();
    });
    
    // Visual indicators should be present (though not directly accessible)
    const indicators = document.querySelectorAll('.w-2.h-2.rounded-full');
    expect(indicators.length).toBeGreaterThan(0);
  });
});