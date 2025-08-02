import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge, badgeVariants } from './badge';

describe('Badge', () => {
  it('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe('DIV');
    expect(badge).toHaveClass(
      'inline-flex',
      'items-center',
      'rounded-full',
      'border',
      'px-2.5',
      'py-0.5',
      'text-xs',
      'font-semibold',
      'transition-colors',
      'border-transparent',
      'bg-primary',
      'text-primary-foreground'
    );
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Badge variant="default">Default</Badge>);
    let badge = screen.getByText('Default');
    expect(badge).toHaveClass('bg-primary', 'text-primary-foreground', 'hover:bg-primary/80');

    rerender(<Badge variant="secondary">Secondary</Badge>);
    badge = screen.getByText('Secondary');
    expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground', 'hover:bg-secondary/80');

    rerender(<Badge variant="destructive">Destructive</Badge>);
    badge = screen.getByText('Destructive');
    expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground', 'hover:bg-destructive/80');

    rerender(<Badge variant="outline">Outline</Badge>);
    badge = screen.getByText('Outline');
    expect(badge).toHaveClass('text-foreground');
    expect(badge).not.toHaveClass('bg-primary'); // Should not have default background
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Custom Badge</Badge>);
    
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-badge');
    expect(badge).toHaveClass('inline-flex', 'items-center'); // Still has default classes
  });

  it('supports all HTML div attributes', () => {
    render(
      <Badge
        id="test-badge"
        data-testid="badge-element"
        role="status"
        aria-label="Test badge"
        title="Badge tooltip"
        style={{ margin: '10px' }}
        onClick={() => {}}
        tabIndex={0}
      >
        Attributed Badge
      </Badge>
    );
    
    const badge = screen.getByTestId('badge-element');
    expect(badge).toHaveAttribute('id', 'test-badge');
    expect(badge).toHaveAttribute('role', 'status');
    expect(badge).toHaveAttribute('aria-label', 'Test badge');
    expect(badge).toHaveAttribute('title', 'Badge tooltip');
    expect(badge).toHaveAttribute('tabindex', '0');
    expect(badge).toHaveStyle('margin: 10px');
  });

  it('handles click events when used as interactive element', () => {
    const handleClick = jest.fn();
    render(<Badge onClick={handleClick}>Clickable Badge</Badge>);
    
    const badge = screen.getByText('Clickable Badge');
    badge.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has proper focus styles', () => {
    render(<Badge tabIndex={0}>Focusable Badge</Badge>);
    
    const badge = screen.getByText('Focusable Badge');
    expect(badge).toHaveClass(
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'focus:ring-offset-2'
    );
  });

  it('renders complex children correctly', () => {
    render(
      <Badge>
        <span>Icon</span>
        <span>Text</span>
      </Badge>
    );
    
    const badge = screen.getByText('Icon').parentElement;
    expect(badge).toContainHTML('<span>Icon</span><span>Text</span>');
  });

  it('works as status indicators', () => {
    render(<Badge variant="destructive" role="status" aria-live="polite">Error</Badge>);
    
    const badge = screen.getByRole('status');
    expect(badge).toHaveTextContent('Error');
    expect(badge).toHaveAttribute('aria-live', 'polite');
    expect(badge).toHaveClass('bg-destructive');
  });

  it('supports different content types', () => {
    const { rerender } = render(<Badge>Text Content</Badge>);
    expect(screen.getByText('Text Content')).toBeInTheDocument();

    rerender(<Badge>123</Badge>);
    expect(screen.getByText('123')).toBeInTheDocument();

    rerender(<Badge>🔥</Badge>);
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('maintains proper spacing and typography', () => {
    render(<Badge>Typography Test</Badge>);
    
    const badge = screen.getByText('Typography Test');
    expect(badge).toHaveClass('text-xs', 'font-semibold');
    expect(badge).toHaveClass('px-2.5', 'py-0.5'); // Proper padding
  });

  it('has consistent border styling', () => {
    render(<Badge>Border Test</Badge>);
    
    const badge = screen.getByText('Border Test');
    expect(badge).toHaveClass('border', 'rounded-full');
    expect(badge).toHaveClass('border-transparent'); // Default variant
  });

  it('supports keyboard accessibility', () => {
    const handleKeyDown = jest.fn();
    render(
      <Badge 
        tabIndex={0} 
        onKeyDown={handleKeyDown}
        role="button"
      >
        Keyboard Badge
      </Badge>
    );
    
    const badge = screen.getByRole('button');
    badge.focus();
    expect(document.activeElement).toBe(badge);
    
    // Simulate Enter key using fireEvent
    fireEvent.keyDown(badge, { key: 'Enter', code: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('works with conditional rendering', () => {
    const { rerender } = render(
      <div>
        {true && <Badge>Visible Badge</Badge>}
      </div>
    );
    expect(screen.getByText('Visible Badge')).toBeInTheDocument();

    rerender(
      <div>
        {false && <Badge>Hidden Badge</Badge>}
      </div>
    );
    expect(screen.queryByText('Hidden Badge')).not.toBeInTheDocument();
  });

  it('maintains transition classes for smooth interactions', () => {
    render(<Badge>Transition Badge</Badge>);
    
    const badge = screen.getByText('Transition Badge');
    expect(badge).toHaveClass('transition-colors');
  });

  it('combines variant and className correctly', () => {
    render(<Badge variant="outline" className="custom-outline">Custom Outline</Badge>);
    
    const badge = screen.getByText('Custom Outline');
    expect(badge).toHaveClass('text-foreground'); // outline variant
    expect(badge).toHaveClass('custom-outline'); // custom class
    expect(badge).toHaveClass('inline-flex', 'items-center'); // base classes
  });

  it('handles empty content gracefully', () => {
    render(<Badge data-testid="empty-badge"></Badge>);
    
    const badge = screen.getByTestId('empty-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('inline-flex', 'items-center');
  });

  it('supports ARIA attributes for accessibility', () => {
    render(
      <Badge
        aria-describedby="badge-description"
        aria-expanded={false}
        aria-selected={true}
      >
        ARIA Badge
      </Badge>
    );
    
    const badge = screen.getByText('ARIA Badge');
    expect(badge).toHaveAttribute('aria-describedby', 'badge-description');
    expect(badge).toHaveAttribute('aria-expanded', 'false');
    expect(badge).toHaveAttribute('aria-selected', 'true');
  });

  it('works in lists and collections', () => {
    render(
      <div>
        <Badge>Badge 1</Badge>
        <Badge>Badge 2</Badge>
        <Badge>Badge 3</Badge>
      </div>
    );
    
    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Badge 2')).toBeInTheDocument();
    expect(screen.getByText('Badge 3')).toBeInTheDocument();
  });
});

describe('badgeVariants', () => {
  it('generates correct class names for variants', () => {
    expect(badgeVariants({ variant: 'default' })).toContain('bg-primary');
    expect(badgeVariants({ variant: 'secondary' })).toContain('bg-secondary');
    expect(badgeVariants({ variant: 'destructive' })).toContain('bg-destructive');
    expect(badgeVariants({ variant: 'outline' })).toContain('text-foreground');
  });

  it('applies default variant when none specified', () => {
    const classes = badgeVariants();
    expect(classes).toContain('bg-primary'); // default variant
    expect(classes).toContain('inline-flex'); // base classes
  });

  it('combines custom className with variants', () => {
    const classes = badgeVariants({ 
      variant: 'secondary', 
      className: 'custom-badge-class' 
    });
    
    expect(classes).toContain('bg-secondary'); // secondary variant
    expect(classes).toContain('custom-badge-class'); // custom class
    expect(classes).toContain('inline-flex'); // base classes
  });

  it('includes all base classes consistently', () => {
    const classes = badgeVariants({ variant: 'outline' });
    
    expect(classes).toContain('inline-flex');
    expect(classes).toContain('items-center');
    expect(classes).toContain('rounded-full');
    expect(classes).toContain('border');
    expect(classes).toContain('px-2.5');
    expect(classes).toContain('py-0.5');
    expect(classes).toContain('text-xs');
    expect(classes).toContain('font-semibold');
    expect(classes).toContain('transition-colors');
  });
});