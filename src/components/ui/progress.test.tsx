import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress } from './progress';

describe('Progress', () => {
  it('renders with default styling', () => {
    render(<Progress value={50} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveClass(
      'relative',
      'h-4',
      'w-full',
      'overflow-hidden',
      'rounded-full',
      'bg-secondary'
    );
  });

  it('renders progress indicator with correct transform', () => {
    render(<Progress value={75} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    const indicator = progress.querySelector('[style*="translateX"]');
    
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveStyle('transform: translateX(-25%)'); // 100 - 75 = 25
    expect(indicator).toHaveClass(
      'h-full',
      'w-full',
      'flex-1',
      'bg-primary',
      'transition-all'
    );
  });

  it('handles 0% progress correctly', () => {
    render(<Progress value={0} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    const indicator = progress.querySelector('[style*="translateX"]');
    
    expect(indicator).toHaveStyle('transform: translateX(-100%)'); // Fully hidden
  });

  it('handles 100% progress correctly', () => {
    render(<Progress value={100} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    const indicator = progress.querySelector('[style*="translateX"]');
    
    expect(indicator).toHaveStyle('transform: translateX(-0%)'); // Fully visible
  });

  it('handles undefined value (defaults to 0)', () => {
    render(<Progress data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    const indicator = progress.querySelector('[style*="translateX"]');
    
    expect(indicator).toHaveStyle('transform: translateX(-100%)'); // value || 0
  });

  it('handles null value (defaults to 0)', () => {
    render(<Progress value={null as any} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    const indicator = progress.querySelector('[style*="translateX"]');
    
    expect(indicator).toHaveStyle('transform: translateX(-100%)'); // value || 0
  });

  it('applies custom className', () => {
    render(<Progress value={50} className="custom-progress" data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    expect(progress).toHaveClass('custom-progress');
    expect(progress).toHaveClass('relative', 'h-4'); // Still has default classes
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveClass('relative', 'h-4');
  });

  it('supports Radix UI progress props', () => {
    render(
      <Progress
        value={60}
        max={100}
        data-testid="progress"
        aria-label="Loading progress"
        aria-describedby="progress-description"
      />
    );
    
    const progress = screen.getByTestId('progress');
    expect(progress).toHaveAttribute('aria-label', 'Loading progress');
    expect(progress).toHaveAttribute('aria-describedby', 'progress-description');
    // Radix UI handles ARIA attributes internally, they may not be visible on the root element
  });

  it('has proper ARIA attributes for accessibility', () => {
    render(<Progress value={40} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    expect(progress).toHaveAttribute('role', 'progressbar');
    // Radix UI Progress may manage ARIA attributes differently
    expect(progress).toBeInTheDocument();
  });

  it('handles decimal values correctly', () => {
    render(<Progress value={33.33} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    const indicator = progress.querySelector('[style*="translateX"]');
    
    expect(indicator).toHaveStyle('transform: translateX(-66.67%)');
    // Check the component renders with decimal value
    expect(progress).toBeInTheDocument();
  });

  it('handles values greater than 100', () => {
    render(<Progress value={150} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    const indicator = progress.querySelector('[style*="translateX"]');
    
    // The component doesn't clamp values, so 150% would result in translateX(--50%)
    expect(indicator).toHaveStyle('transform: translateX(--50%)');
    expect(progress).toBeInTheDocument();
  });

  it('handles negative values', () => {
    render(<Progress value={-10} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    const indicator = progress.querySelector('[style*="translateX"]');
    
    expect(indicator).toHaveStyle('transform: translateX(-110%)');
    expect(progress).toBeInTheDocument();
  });

  it('supports custom max value', () => {
    render(<Progress value={50} max={200} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    // Transform calculation is still based on value directly, not percentage of max
    const indicator = progress.querySelector('[style*="translateX"]');
    expect(indicator).toHaveStyle('transform: translateX(-50%)');
    expect(progress).toBeInTheDocument();
  });

  it('can be used without value prop', () => {
    render(<Progress data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    expect(progress).toBeInTheDocument();
    // Without value, it defaults to 0 (100% hidden)
    const indicator = progress.querySelector('[style*="translateX"]');
    expect(indicator).toHaveStyle('transform: translateX(-100%)');
  });

  it('supports additional HTML attributes', () => {
    render(
      <Progress
        value={75}
        id="loading-progress"
        data-testid="progress"
        style={{ width: '200px' }}
        title="Loading..."
      />
    );
    
    const progress = screen.getByTestId('progress');
    expect(progress).toHaveAttribute('id', 'loading-progress');
    expect(progress).toHaveAttribute('title', 'Loading...');
    expect(progress).toHaveStyle('width: 200px');
  });

  it('renders indicator with transition class for smooth animations', () => {
    render(<Progress value={50} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    const indicator = progress.querySelector('.transition-all');
    
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass('transition-all');
  });

  it('maintains proper element hierarchy', () => {
    render(<Progress value={50} data-testid="progress" />);
    
    const progress = screen.getByTestId('progress');
    const indicator = progress.firstChild;
    
    expect(indicator).toBeInTheDocument();
    expect(progress.children).toHaveLength(1);
    expect(indicator).toHaveClass('bg-primary'); // Indicator class
  });
});