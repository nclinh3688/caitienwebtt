import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './input';

describe('Input', () => {
  it('renders basic input correctly', () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(
      'flex',
      'h-10',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'px-3',
      'py-2',
      'text-sm'
    );
  });

  it('applies custom className', () => {
    render(<Input className="custom-input" placeholder="Custom" />);
    
    const input = screen.getByPlaceholderText('Custom');
    expect(input).toHaveClass('custom-input');
    expect(input).toHaveClass('flex', 'h-10'); // Still has default classes
  });

  it('handles different input types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />);
    let input = screen.getByPlaceholderText('Email');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<Input type="password" placeholder="Password" />);
    input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');

    rerender(<Input type="number" placeholder="Number" />);
    input = screen.getByPlaceholderText('Number');
    expect(input).toHaveAttribute('type', 'number');

    rerender(<Input type="tel" placeholder="Phone" />);
    input = screen.getByPlaceholderText('Phone');
    expect(input).toHaveAttribute('type', 'tel');

    rerender(<Input type="url" placeholder="Website" />);
    input = screen.getByPlaceholderText('Website');
    expect(input).toHaveAttribute('type', 'url');
  });

  it('defaults to text type when no type specified', () => {
    render(<Input placeholder="Default type" />);
    
    const input = screen.getByPlaceholderText('Default type') as HTMLInputElement;
    // Input type defaults to "text" but may not have explicit attribute
    expect(input.type).toBe('text');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref input" />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.placeholder).toBe('Ref input');
  });

  it('handles value and onChange correctly', () => {
    const handleChange = jest.fn();
    render(<Input value="test value" onChange={handleChange} placeholder="Controlled" />);
    
    const input = screen.getByPlaceholderText('Controlled') as HTMLInputElement;
    expect(input.value).toBe('test value');
    
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state correctly', () => {
    render(<Input disabled placeholder="Disabled input" />);
    
    const input = screen.getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('supports all HTML input attributes', () => {
    render(
      <Input
        id="test-input"
        name="test-name"
        placeholder="Test placeholder"
        required
        minLength={5}
        maxLength={20}
        pattern="[A-Za-z]+"
        autoComplete="off"
        autoFocus={true}
        readOnly
        data-testid="input-element"
        aria-label="Test input"
        aria-describedby="help-text"
      />
    );
    
    const input = screen.getByTestId('input-element');
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('name', 'test-name');
    expect(input).toHaveAttribute('placeholder', 'Test placeholder');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('minlength', '5');
    expect(input).toHaveAttribute('maxlength', '20');
    expect(input).toHaveAttribute('pattern', '[A-Za-z]+');
    expect(input).toHaveAttribute('autocomplete', 'off');
    // Note: autofocus behavior varies in test environments, so we skip testing it
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('aria-label', 'Test input');
    expect(input).toHaveAttribute('aria-describedby', 'help-text');
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Focus test"
      />
    );
    
    const input = screen.getByPlaceholderText('Focus test');
    
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events', () => {
    const handleKeyDown = jest.fn();
    const handleKeyUp = jest.fn();
    render(
      <Input
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Keyboard test"
      />
    );
    
    const input = screen.getByPlaceholderText('Keyboard test');
    
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
    expect(handleKeyUp).toHaveBeenCalledTimes(1);
  });

  it('has proper focus styles', () => {
    render(<Input placeholder="Focus styles" />);
    
    const input = screen.getByPlaceholderText('Focus styles');
    expect(input).toHaveClass(
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2'
    );
  });

  it('handles file input type with proper styling', () => {
    render(<Input type="file" data-testid="file-input" />);
    
    const input = screen.getByTestId('file-input');
    expect(input).toHaveClass(
      'file:border-0',
      'file:bg-transparent',
      'file:text-sm',
      'file:font-medium'
    );
  });

  it('handles placeholder styling', () => {
    render(<Input placeholder="Placeholder text" />);
    
    const input = screen.getByPlaceholderText('Placeholder text');
    expect(input).toHaveClass('placeholder:text-muted-foreground');
  });

  it('works with form validation', () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    render(
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          required
          placeholder="Required email"
          data-testid="email-input"
        />
        <button type="submit">Submit</button>
      </form>
    );
    
    const input = screen.getByTestId('email-input');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    // Try to submit without value (should not call handleSubmit due to validation)
    fireEvent.click(submitButton);
    expect(handleSubmit).not.toHaveBeenCalled();
    
    // Add valid email and submit
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('maintains ring offset background styling', () => {
    render(<Input placeholder="Ring offset test" />);
    
    const input = screen.getByPlaceholderText('Ring offset test');
    expect(input).toHaveClass('ring-offset-background');
  });

  it('handles input with defaultValue', () => {
    render(<Input defaultValue="default text" placeholder="Default value test" />);
    
    const input = screen.getByDisplayValue('default text') as HTMLInputElement;
    expect(input.value).toBe('default text');
  });

  it('handles input in controlled vs uncontrolled mode', () => {
    // Uncontrolled mode
    const { unmount } = render(<Input placeholder="Uncontrolled" />);
    let input = screen.getByPlaceholderText('Uncontrolled') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'user typed' } });
    expect(input.value).toBe('user typed');
    
    // Clean up and render controlled mode separately
    unmount();
    
    // Controlled mode
    const handleChange = jest.fn();
    render(<Input value="controlled" onChange={handleChange} placeholder="Controlled" />);
    input = screen.getByDisplayValue('controlled') as HTMLInputElement;
    
    expect(input.value).toBe('controlled');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });
});