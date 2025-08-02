import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders basic textarea correctly', () => {
    render(<Textarea placeholder="Enter text" />);
    
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveClass(
      'flex',
      'min-h-[80px]',
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
    render(<Textarea className="custom-textarea" placeholder="Custom" />);
    
    const textarea = screen.getByPlaceholderText('Custom');
    expect(textarea).toHaveClass('custom-textarea');
    expect(textarea).toHaveClass('flex', 'min-h-[80px]'); // Still has default classes
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} placeholder="Ref textarea" />);
    
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current?.placeholder).toBe('Ref textarea');
  });

  it('handles value and onChange correctly', () => {
    const handleChange = jest.fn();
    render(<Textarea value="test value" onChange={handleChange} placeholder="Controlled" />);
    
    const textarea = screen.getByPlaceholderText('Controlled') as HTMLTextAreaElement;
    expect(textarea.value).toBe('test value');
    
    fireEvent.change(textarea, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state correctly', () => {
    render(<Textarea disabled placeholder="Disabled textarea" />);
    
    const textarea = screen.getByPlaceholderText('Disabled textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('supports all HTML textarea attributes', () => {
    render(
      <Textarea
        id="test-textarea"
        name="test-name"
        placeholder="Test placeholder"
        required
        minLength={10}
        maxLength={500}
        rows={5}
        cols={40}
        wrap="soft"
        autoComplete="off"
        autoFocus={true}
        readOnly
        data-testid="textarea-element"
        aria-label="Test textarea"
        aria-describedby="help-text"
      />
    );
    
    const textarea = screen.getByTestId('textarea-element');
    expect(textarea).toHaveAttribute('id', 'test-textarea');
    expect(textarea).toHaveAttribute('name', 'test-name');
    expect(textarea).toHaveAttribute('placeholder', 'Test placeholder');
    expect(textarea).toHaveAttribute('required');
    expect(textarea).toHaveAttribute('minlength', '10');
    expect(textarea).toHaveAttribute('maxlength', '500');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '40');
    expect(textarea).toHaveAttribute('wrap', 'soft');
    expect(textarea).toHaveAttribute('autocomplete', 'off');
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveAttribute('aria-label', 'Test textarea');
    expect(textarea).toHaveAttribute('aria-describedby', 'help-text');
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(
      <Textarea
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Focus test"
      />
    );
    
    const textarea = screen.getByPlaceholderText('Focus test');
    
    fireEvent.focus(textarea);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(textarea);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events', () => {
    const handleKeyDown = jest.fn();
    const handleKeyUp = jest.fn();
    render(
      <Textarea
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Keyboard test"
      />
    );
    
    const textarea = screen.getByPlaceholderText('Keyboard test');
    
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
    
    fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter' });
    expect(handleKeyUp).toHaveBeenCalledTimes(1);
  });

  it('has proper focus styles', () => {
    render(<Textarea placeholder="Focus styles" />);
    
    const textarea = screen.getByPlaceholderText('Focus styles');
    expect(textarea).toHaveClass(
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2'
    );
  });

  it('handles placeholder styling', () => {
    render(<Textarea placeholder="Placeholder text" />);
    
    const textarea = screen.getByPlaceholderText('Placeholder text');
    expect(textarea).toHaveClass('placeholder:text-muted-foreground');
  });

  it('works with form validation', () => {
    const handleSubmit = jest.fn(e => e.preventDefault());
    render(
      <form onSubmit={handleSubmit}>
        <Textarea
          required
          minLength={5}
          placeholder="Required textarea"
          data-testid="textarea-input"
        />
        <button type="submit">Submit</button>
      </form>
    );
    
    const textarea = screen.getByTestId('textarea-input');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    
    // Try to submit without value (should not call handleSubmit due to validation)
    fireEvent.click(submitButton);
    expect(handleSubmit).not.toHaveBeenCalled();
    
    // Add valid text and submit
    fireEvent.change(textarea, { target: { value: 'Valid long text' } });
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('maintains ring offset background styling', () => {
    render(<Textarea placeholder="Ring offset test" />);
    
    const textarea = screen.getByPlaceholderText('Ring offset test');
    expect(textarea).toHaveClass('ring-offset-background');
  });

  it('handles textarea with defaultValue', () => {
    render(<Textarea defaultValue="default text" placeholder="Default value test" />);
    
    const textarea = screen.getByDisplayValue('default text') as HTMLTextAreaElement;
    expect(textarea.value).toBe('default text');
  });

  it('handles textarea in controlled vs uncontrolled mode', () => {
    // Uncontrolled mode
    const { unmount } = render(<Textarea placeholder="Uncontrolled" />);
    let textarea = screen.getByPlaceholderText('Uncontrolled') as HTMLTextAreaElement;
    
    fireEvent.change(textarea, { target: { value: 'user typed text' } });
    expect(textarea.value).toBe('user typed text');
    
    // Clean up and render controlled mode separately
    unmount();
    
    // Controlled mode
    const handleChange = jest.fn();
    render(<Textarea value="controlled text" onChange={handleChange} placeholder="Controlled" />);
    textarea = screen.getByDisplayValue('controlled text') as HTMLTextAreaElement;
    
    expect(textarea.value).toBe('controlled text');
    fireEvent.change(textarea, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles multiline text correctly', () => {
    const multilineText = 'Line 1\nLine 2\nLine 3';
    render(<Textarea value={multilineText} onChange={() => {}} placeholder="Multiline" data-testid="multiline-textarea" />);
    
    const textarea = screen.getByTestId('multiline-textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe(multilineText);
    expect(textarea.value.split('\n')).toHaveLength(3);
  });

  it('respects resize behavior', () => {
    render(<Textarea style={{ resize: 'none' }} placeholder="No resize" />);
    
    const textarea = screen.getByPlaceholderText('No resize');
    expect(textarea).toHaveStyle('resize: none');
  });

  it('handles different size configurations', () => {
    const { rerender } = render(<Textarea rows={3} cols={20} placeholder="Small" />);
    let textarea = screen.getByPlaceholderText('Small');
    expect(textarea).toHaveAttribute('rows', '3');
    expect(textarea).toHaveAttribute('cols', '20');

    rerender(<Textarea rows={10} cols={80} placeholder="Large" />);
    textarea = screen.getByPlaceholderText('Large');
    expect(textarea).toHaveAttribute('rows', '10');
    expect(textarea).toHaveAttribute('cols', '80');
  });

  it('handles text selection events', () => {
    const handleSelect = jest.fn();
    render(<Textarea onSelect={handleSelect} placeholder="Selection test" />);
    
    const textarea = screen.getByPlaceholderText('Selection test');
    fireEvent.change(textarea, { target: { value: 'Some text to select' } });
    fireEvent.select(textarea);
    
    expect(handleSelect).toHaveBeenCalled();
  });

  it('maintains proper accessibility structure', () => {
    render(
      <Textarea
        aria-labelledby="textarea-label"
        aria-describedby="textarea-description"
        aria-required="true"
        placeholder="Accessible textarea"
      />
    );
    
    const textarea = screen.getByPlaceholderText('Accessible textarea');
    expect(textarea).toHaveAttribute('aria-labelledby', 'textarea-label');
    expect(textarea).toHaveAttribute('aria-describedby', 'textarea-description');
    expect(textarea).toHaveAttribute('aria-required', 'true');
  });
});