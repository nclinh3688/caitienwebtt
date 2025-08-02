import React from 'react';
import { render, screen } from '@testing-library/react';
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from './card';

describe('Card', () => {
  it('renders basic card correctly', () => {
    render(<Card>Card content</Card>);
    
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm');
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Custom Card</Card>);
    
    const card = screen.getByText('Custom Card');
    expect(card).toHaveClass('custom-card');
    expect(card).toHaveClass('rounded-lg', 'border'); // Still has default classes
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Ref Card</Card>);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.textContent).toBe('Ref Card');
  });

  it('supports all HTML div attributes', () => {
    render(
      <Card
        data-testid="card-element"
        id="test-card"
        role="region"
        aria-label="Test card"
      >
        Attributed Card
      </Card>
    );
    
    const card = screen.getByTestId('card-element');
    expect(card).toHaveAttribute('id', 'test-card');
    expect(card).toHaveAttribute('role', 'region');
    expect(card).toHaveAttribute('aria-label', 'Test card');
  });
});

describe('CardHeader', () => {
  it('renders with correct styles', () => {
    render(<CardHeader>Header content</CardHeader>);
    
    const header = screen.getByText('Header content');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
  });

  it('applies custom className', () => {
    render(<CardHeader className="custom-header">Custom Header</CardHeader>);
    
    const header = screen.getByText('Custom Header');
    expect(header).toHaveClass('custom-header');
    expect(header).toHaveClass('flex', 'flex-col'); // Still has default classes
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardHeader ref={ref}>Header</CardHeader>);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardTitle', () => {
  it('renders as h3 with correct styles', () => {
    render(<CardTitle>Card Title</CardTitle>);
    
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveTextContent('Card Title');
    expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
  });

  it('applies custom className', () => {
    render(<CardTitle className="custom-title">Custom Title</CardTitle>);
    
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('custom-title');
    expect(title).toHaveClass('text-2xl', 'font-semibold');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<CardTitle ref={ref}>Title</CardTitle>);
    
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
    expect(ref.current?.tagName).toBe('H3');
  });

  it('supports heading attributes', () => {
    render(
      <CardTitle id="main-title" aria-level={3}>
        Attributed Title
      </CardTitle>
    );
    
    const title = screen.getByRole('heading');
    expect(title).toHaveAttribute('id', 'main-title');
    expect(title).toHaveAttribute('aria-level', '3');
  });
});

describe('CardDescription', () => {
  it('renders as paragraph with correct styles', () => {
    render(<CardDescription>Card description text</CardDescription>);
    
    const description = screen.getByText('Card description text');
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('text-sm', 'text-muted-foreground');
  });

  it('applies custom className', () => {
    render(<CardDescription className="custom-desc">Custom Description</CardDescription>);
    
    const description = screen.getByText('Custom Description');
    expect(description).toHaveClass('custom-desc');
    expect(description).toHaveClass('text-sm', 'text-muted-foreground');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<CardDescription ref={ref}>Description</CardDescription>);
    
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });
});

describe('CardContent', () => {
  it('renders with correct styles', () => {
    render(<CardContent>Content area</CardContent>);
    
    const content = screen.getByText('Content area');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('p-6', 'pt-0');
  });

  it('applies custom className', () => {
    render(<CardContent className="custom-content">Custom Content</CardContent>);
    
    const content = screen.getByText('Custom Content');
    expect(content).toHaveClass('custom-content');
    expect(content).toHaveClass('p-6', 'pt-0');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardContent ref={ref}>Content</CardContent>);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardFooter', () => {
  it('renders with correct styles', () => {
    render(<CardFooter>Footer content</CardFooter>);
    
    const footer = screen.getByText('Footer content');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
  });

  it('applies custom className', () => {
    render(<CardFooter className="custom-footer">Custom Footer</CardFooter>);
    
    const footer = screen.getByText('Custom Footer');
    expect(footer).toHaveClass('custom-footer');
    expect(footer).toHaveClass('flex', 'items-center');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<CardFooter ref={ref}>Footer</CardFooter>);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Card Integration', () => {
  it('renders complete card structure correctly', () => {
    render(
      <Card data-testid="test-card">
        <CardHeader>
          <CardTitle>Test Card Title</CardTitle>
          <CardDescription>This is a test card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content of the card.</p>
        </CardContent>
        <CardFooter>
          <button>Action Button</button>
        </CardFooter>
      </Card>
    );

    // Check all components are rendered
    expect(screen.getByRole('heading', { name: 'Test Card Title' })).toBeInTheDocument();
    expect(screen.getByText('This is a test card description')).toBeInTheDocument();
    expect(screen.getByText('This is the main content of the card.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();

    // Check structure - verify card has correct styling
    const card = screen.getByTestId('test-card');
    expect(card).toHaveClass('rounded-lg', 'border');
  });

  it('maintains proper semantic structure', () => {
    render(
      <Card role="article" aria-labelledby="card-title">
        <CardHeader>
          <CardTitle id="card-title">Semantic Card</CardTitle>
          <CardDescription>Accessible description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Accessible content</p>
        </CardContent>
      </Card>
    );

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-labelledby', 'card-title');
    
    const title = screen.getByRole('heading');
    expect(title).toHaveAttribute('id', 'card-title');
  });

  it('handles complex nested content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>
            <span>Complex</span> <em>Title</em>
          </CardTitle>
          <CardDescription>
            Description with <strong>emphasis</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <button>Cancel</button>
            <button>Confirm</button>
          </div>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('emphasis')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('works without optional components', () => {
    render(
      <Card>
        <CardContent>Just content, no header or footer</CardContent>
      </Card>
    );

    expect(screen.getByText('Just content, no header or footer')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});