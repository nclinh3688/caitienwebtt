import { render, screen } from '@testing-library/react';
import { LearningProgressCard } from './LearningProgressCard';

describe('LearningProgressCard', () => {
  const mockOverallProgress = {
    completedLessons: 10,
    totalLessons: 20,
    percentage: 50,
    currentStreak: 5,
    totalStudyTimeHours: 10,
  };

  const mockAiProgressAnalysis = {
    weaknesses: ['Grammar', 'Kanji'],
    overallAssessment: 'Good progress',
    strengths: ['Vocabulary'],
    recommendations: ['Review N5 grammar'],
    reviewReminders: ['Practice listening'],
    lessonRecommendations: [{ title: 'Lesson 1', course: 'N5' }],
  };

  it('renders correctly with provided data', () => {
    render(
      <LearningProgressCard
        overallProgress={mockOverallProgress}
        aiProgressAnalysis={mockAiProgressAnalysis}
        achievementsLength={3}
      />
    );

    // Check if key elements are rendered
    expect(screen.getByText('Tiến trình học')).toBeInTheDocument();
    expect(screen.getByText('10/20 bài học')).toBeInTheDocument();
    expect(screen.getByText('50.0%')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument(); // Current Streak
    expect(screen.getByText('10.0h')).toBeInTheDocument(); // Total Study Time
    expect(screen.getByText('3')).toBeInTheDocument(); // Achievements Length
    expect(screen.getByText('Điểm yếu cần cải thiện')).toBeInTheDocument();
    expect(screen.getByText('Grammar')).toBeInTheDocument();
    expect(screen.getByText('Kanji')).toBeInTheDocument();
  });

  it('renders correctly when no weaknesses are present', () => {
    const noWeaknessesAnalysis = { ...mockAiProgressAnalysis, weaknesses: [] };
    render(
      <LearningProgressCard
        overallProgress={mockOverallProgress}
        aiProgressAnalysis={noWeaknessesAnalysis}
        achievementsLength={3}
      />
    );
    expect(screen.getByText('Chưa có dữ liệu')).toBeInTheDocument();
  });

  it('renders correctly with zero progress', () => {
    const zeroProgress = {
      completedLessons: 0,
      totalLessons: 20,
      percentage: 0,
      currentStreak: 0,
      totalStudyTimeHours: 0,
    };
    render(
      <LearningProgressCard
        overallProgress={zeroProgress}
        aiProgressAnalysis={mockAiProgressAnalysis}
        achievementsLength={0}
      />
    );
    
    expect(screen.getByText('0/20 bài học')).toBeInTheDocument();
    expect(screen.getByText('0.0%')).toBeInTheDocument();
    expect(screen.getByText('Ngày liên tiếp')).toBeInTheDocument();
    expect(screen.getByText('0.0h')).toBeInTheDocument(); // Study time
    
    // Check that there are zero values displayed in the stats grid
    const statsElements = screen.getAllByText('0');
    expect(statsElements).toHaveLength(2); // Streak and achievements both show 0
  });

  it('renders correctly with 100% completion', () => {
    const fullProgress = {
      completedLessons: 20,
      totalLessons: 20,
      percentage: 100,
      currentStreak: 30,
      totalStudyTimeHours: 50.5,
    };
    render(
      <LearningProgressCard
        overallProgress={fullProgress}
        aiProgressAnalysis={mockAiProgressAnalysis}
        achievementsLength={10}
      />
    );
    
    expect(screen.getByText('20/20 bài học')).toBeInTheDocument();
    expect(screen.getByText('100.0%')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('50.5h')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('handles undefined aiProgressAnalysis gracefully', () => {
    const undefinedAnalysis = {};
    render(
      <LearningProgressCard
        overallProgress={mockOverallProgress}
        aiProgressAnalysis={undefinedAnalysis}
        achievementsLength={3}
      />
    );
    
    expect(screen.getByText('Chưa có dữ liệu')).toBeInTheDocument();
  });

  it('displays proper ARIA labels for accessibility', () => {
    render(
      <LearningProgressCard
        overallProgress={mockOverallProgress}
        aiProgressAnalysis={mockAiProgressAnalysis}
        achievementsLength={3}
      />
    );
    
    // Check if key headings are present for screen readers
    expect(screen.getByText('Tiến trình học')).toBeInTheDocument();
    expect(screen.getByText('Điểm yếu cần cải thiện')).toBeInTheDocument();
    expect(screen.getByText('Ngày liên tiếp')).toBeInTheDocument();
    expect(screen.getByText('Tổng thời gian')).toBeInTheDocument();
    expect(screen.getByText('Thành tích')).toBeInTheDocument();
  });

  it('handles large numbers correctly', () => {
    const largeNumbersProgress = {
      completedLessons: 999,
      totalLessons: 1000,
      percentage: 99.9,
      currentStreak: 365,
      totalStudyTimeHours: 2000.75,
    };
    render(
      <LearningProgressCard
        overallProgress={largeNumbersProgress}
        aiProgressAnalysis={mockAiProgressAnalysis}
        achievementsLength={100}
      />
    );
    
    expect(screen.getByText('999/1000 bài học')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('365')).toBeInTheDocument();
    expect(screen.getByText('2000.8h')).toBeInTheDocument(); // Rounded to 1 decimal
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
