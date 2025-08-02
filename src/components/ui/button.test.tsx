import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, buttonVariants } from './button';

describe('Button', () => {
  it('renders with default variant and size', () => {
    render(<Button>Default Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Default Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary', 'text-primary-foreground', 'h-10', 'px-4', 'py-2');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="destructive">Destructive</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground');

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('border', 'border-input', 'bg-background');

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');

    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground');

    rerender(<Button variant="link">Link</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('text-primary', 'underline-offset-4', 'hover:underline');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('h-9', 'px-3');

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-11', 'px-8');

    rerender(<Button size="icon">Icon</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-10', 'w-10');
  });

  it('handles disabled state correctly', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents click when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current?.textContent).toBe('Ref Button');
  });

  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('supports all HTML button attributes', () => {
    render(
      <Button
        type="submit"
        form="test-form"
        name="submit-button"
        value="submit-value"
        aria-label="Submit form"
        data-testid="submit-btn"
      >
        Submit
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('form', 'test-form');
    expect(button).toHaveAttribute('name', 'submit-button');
    expect(button).toHaveAttribute('value', 'submit-value');
    expect(button).toHaveAttribute('aria-label', 'Submit form');
    expect(button).toHaveAttribute('data-testid', 'submit-btn');
  });

  it('has proper focus styles', () => {
    render(<Button>Focus Test</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2'
    );
  });

  it('combines variant and size correctly', () => {
    render(<Button variant="outline" size="lg">Large Outline</Button>);
    
    const button = screen.getByRole('button');
    // Should have both outline variant and lg size classes
    expect(button).toHaveClass('border', 'border-input', 'bg-background'); // outline variant
    expect(button).toHaveClass('h-11', 'px-8'); // lg size
  });

  it('handles complex children correctly', () => {
    render(
      <Button>
        <span>Icon</span>
        <span>Text</span>
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toContainHTML('<span>Icon</span><span>Text</span>');
  });

  it('maintains accessibility with custom props', () => {
    render(
      <Button
        aria-describedby="help-text"
        aria-expanded={false}
        role="button"
        tabIndex={0}
      >
        Accessible Button
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-describedby', 'help-text');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('tabIndex', '0');
  });
});

describe('buttonVariants', () => {
  it('generates correct class names for variants', () => {
    expect(buttonVariants({ variant: 'default' })).toContain('bg-primary');
    expect(buttonVariants({ variant: 'destructive' })).toContain('bg-destructive');
    expect(buttonVariants({ variant: 'outline' })).toContain('border');
    expect(buttonVariants({ variant: 'secondary' })).toContain('bg-secondary');
    expect(buttonVariants({ variant: 'ghost' })).toContain('hover:bg-accent');
    expect(buttonVariants({ variant: 'link' })).toContain('text-primary');
  });

  it('generates correct class names for sizes', () => {
    expect(buttonVariants({ size: 'default' })).toContain('h-10');
    expect(buttonVariants({ size: 'sm' })).toContain('h-9');
    expect(buttonVariants({ size: 'lg' })).toContain('h-11');
    expect(buttonVariants({ size: 'icon' })).toContain('w-10');
  });

  it('applies default variants when none specified', () => {
    const classes = buttonVariants();
    expect(classes).toContain('bg-primary'); // default variant
    expect(classes).toContain('h-10'); // default size
  });

  it('combines custom className with variants', () => {
    const classes = buttonVariants({ 
      variant: 'outline', 
      size: 'lg', 
      className: 'custom-class' 
    });
    
    expect(classes).toContain('border'); // outline variant
    expect(classes).toContain('h-11'); // lg size
    expect(classes).toContain('custom-class'); // custom class
  });
});