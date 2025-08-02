import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AICoachCard } from './AICoachCard';

// Mock fetch globally
global.fetch = jest.fn();

describe('AICoachCard', () => {
  const mockAiProgressAnalysis = {
    studySuggestions: ['Review N5 vocabulary', 'Practice listening daily'],
    overallAssessment: 'Good progress overall',
    strengths: ['Vocabulary', 'Reading comprehension'],
    weaknesses: ['Grammar', 'Kanji'],
    recommendations: ['Focus on grammar patterns', 'Use flashcards for kanji'],
    reviewReminders: ['Review lesson 10', 'Practice listening'],
    generalAdvice: 'Keep up the good work!',
    lessonRecommendations: [
      { title: 'Lesson 15: Grammar Basics', course: 'N5' },
      { title: 'Lesson 20: Kanji Practice', course: 'N5' }
    ]
  };

  beforeEach(() => {
    // Reset fetch mock before each test
    (fetch as jest.Mock).mockClear();
  });

  it('renders AI Coach card with study suggestions', () => {
    render(<AICoachCard aiProgressAnalysis={mockAiProgressAnalysis} />);
    
    // Check main title
    expect(screen.getByText('Coach AI cá nhân')).toBeInTheDocument();
    
    // Check study suggestions are displayed
    expect(screen.getByText('Review N5 vocabulary')).toBeInTheDocument();
    expect(screen.getByText('Practice listening daily')).toBeInTheDocument();
    
    // Check that both suggestions have the label (using getAllByText for multiple elements)
    const suggestionLabels = screen.getAllByText('Gợi ý học tập');
    expect(suggestionLabels).toHaveLength(2); // Two suggestions, each with this label
    
    // Check input and button
    expect(screen.getByPlaceholderText('Hỏi AI Coach của bạn...')).toBeInTheDocument();
    expect(screen.getByText('Hỏi AI Coach')).toBeInTheDocument();
  });

  it('renders fallback message when no study suggestions', () => {
    const noSuggestionsAnalysis = { ...mockAiProgressAnalysis, studySuggestions: [] };
    render(<AICoachCard aiProgressAnalysis={noSuggestionsAnalysis} />);
    
    expect(screen.getByText('Chưa có gợi ý từ AI Coach')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders analysis card when aiProgressAnalysis is provided', () => {
    render(<AICoachCard aiProgressAnalysis={mockAiProgressAnalysis} />);
    
    // Check analysis card title
    expect(screen.getByText('Phân tích tiến trình AI')).toBeInTheDocument();
    
    // Check overall assessment
    expect(screen.getByText('Đánh giá tổng quan:')).toBeInTheDocument();
    expect(screen.getByText('Good progress overall')).toBeInTheDocument();
    
    // Check strengths
    expect(screen.getByText('Điểm mạnh:')).toBeInTheDocument();
    expect(screen.getByText('Vocabulary')).toBeInTheDocument();
    expect(screen.getByText('Reading comprehension')).toBeInTheDocument();
    
    // Check weaknesses
    expect(screen.getByText('Điểm yếu:')).toBeInTheDocument();
    expect(screen.getByText('Grammar')).toBeInTheDocument();
    expect(screen.getByText('Kanji')).toBeInTheDocument();
    
    // Check recommendations
    expect(screen.getByText('Đề xuất cải thiện:')).toBeInTheDocument();
    expect(screen.getByText('Focus on grammar patterns')).toBeInTheDocument();
    
    // Check review reminders
    expect(screen.getByText('Nhắc nhở ôn tập:')).toBeInTheDocument();
    expect(screen.getByText('Review lesson 10')).toBeInTheDocument();
    
    // Check general advice
    expect(screen.getByText('Lời khuyên chung:')).toBeInTheDocument();
    expect(screen.getByText('Keep up the good work!')).toBeInTheDocument();
    
    // Check lesson recommendations
    expect(screen.getByText('Đề xuất bài học:')).toBeInTheDocument();
    expect(screen.getByText('Lesson 15: Grammar Basics (Khóa học: N5)')).toBeInTheDocument();
  });

  it('does not render analysis card when aiProgressAnalysis is null/undefined', () => {
    render(<AICoachCard aiProgressAnalysis={null} />);
    
    expect(screen.queryByText('Phân tích tiến trình AI')).not.toBeInTheDocument();
  });

  it('shows error when trying to ask AI with empty question', async () => {
    render(<AICoachCard aiProgressAnalysis={mockAiProgressAnalysis} />);
    
    const askButton = screen.getByText('Hỏi AI Coach');
    fireEvent.click(askButton);
    
    await waitFor(() => {
      expect(screen.getByText('Lỗi: Vui lòng nhập câu hỏi của bạn.')).toBeInTheDocument();
    });
  });

  it('handles successful AI response', async () => {
    const mockResponse = { response: 'This is AI response from the coach.' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<AICoachCard aiProgressAnalysis={mockAiProgressAnalysis} />);
    
    const input = screen.getByPlaceholderText('Hỏi AI Coach của bạn...');
    const askButton = screen.getByText('Hỏi AI Coach');
    
    // Type a question
    fireEvent.change(input, { target: { value: 'How can I improve my Japanese?' } });
    fireEvent.click(askButton);
    
    // Check loading state
    expect(screen.getByText('Đang hỏi...')).toBeInTheDocument();
    expect(askButton).toBeDisabled();
    
    // Wait for response
    await waitFor(() => {
      expect(screen.getByText('Phản hồi từ AI Coach:')).toBeInTheDocument();
      expect(screen.getByDisplayValue('This is AI response from the coach.')).toBeInTheDocument();
    });
    
    // Check that fetch was called correctly
    expect(fetch).toHaveBeenCalledWith('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: 'How can I improve my Japanese?' }),
    });
  });

  it('handles AI API error response', async () => {
    const mockErrorResponse = { error: 'AI service is temporarily unavailable' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    render(<AICoachCard aiProgressAnalysis={mockAiProgressAnalysis} />);
    
    const input = screen.getByPlaceholderText('Hỏi AI Coach của bạn...');
    const askButton = screen.getByText('Hỏi AI Coach');
    
    fireEvent.change(input, { target: { value: 'Test question' } });
    fireEvent.click(askButton);
    
    await waitFor(() => {
      expect(screen.getByText('Lỗi: AI service is temporarily unavailable')).toBeInTheDocument();
    });
  });

  it('handles network error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<AICoachCard aiProgressAnalysis={mockAiProgressAnalysis} />);
    
    const input = screen.getByPlaceholderText('Hỏi AI Coach của bạn...');
    const askButton = screen.getByText('Hỏi AI Coach');
    
    fireEvent.change(input, { target: { value: 'Test question' } });
    fireEvent.click(askButton);
    
    await waitFor(() => {
      expect(screen.getByText('Lỗi: Network error')).toBeInTheDocument();
    });
  });

  it('clears previous error when making new request', async () => {
    render(<AICoachCard aiProgressAnalysis={mockAiProgressAnalysis} />);
    
    const input = screen.getByPlaceholderText('Hỏi AI Coach của bạn...');
    const askButton = screen.getByText('Hỏi AI Coach');
    
    // First, trigger an error
    fireEvent.click(askButton);
    await waitFor(() => {
      expect(screen.getByText('Lỗi: Vui lòng nhập câu hỏi của bạn.')).toBeInTheDocument();
    });
    
    // Setup successful response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: 'Success response' }),
    });
    
    // Make valid request
    fireEvent.change(input, { target: { value: 'Valid question' } });
    fireEvent.click(askButton);
    
    // Error should be cleared
    await waitFor(() => {
      expect(screen.queryByText('Lỗi: Vui lòng nhập câu hỏi của bạn.')).not.toBeInTheDocument();
    });
  });

  it('handles partial aiProgressAnalysis data', () => {
    const partialAnalysis = {
      overallAssessment: 'Partial assessment',
      strengths: ['Only strength'],
      // Missing other fields
    };
    
    render(<AICoachCard aiProgressAnalysis={partialAnalysis} />);
    
    // Should show fallback for missing study suggestions
    expect(screen.getByText('Chưa có gợi ý từ AI Coach')).toBeInTheDocument();
    
    // Should show available data
    expect(screen.getByText('Partial assessment')).toBeInTheDocument();
    expect(screen.getByText('Only strength')).toBeInTheDocument();
    
    // Should not show sections for missing data
    expect(screen.queryByText('Điểm yếu:')).not.toBeInTheDocument();
    expect(screen.queryByText('Đề xuất cải thiện:')).not.toBeInTheDocument();
  });

  it('maintains input state during AI request', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ response: 'Delayed response' }),
      }), 100))
    );

    render(<AICoachCard aiProgressAnalysis={mockAiProgressAnalysis} />);
    
    const input = screen.getByPlaceholderText('Hỏi AI Coach của bạn...');
    const testQuestion = 'My test question';
    
    fireEvent.change(input, { target: { value: testQuestion } });
    fireEvent.click(screen.getByText('Hỏi AI Coach'));
    
    // Input should be disabled but maintain value
    expect(input).toBeDisabled();
    expect(input).toHaveValue(testQuestion);
    
    await waitFor(() => {
      expect(screen.getByText('Phản hồi từ AI Coach:')).toBeInTheDocument();
    });
    
    // After completion, input should be enabled again
    expect(input).not.toBeDisabled();
    expect(input).toHaveValue(testQuestion);
  });
});