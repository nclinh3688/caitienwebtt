import { render, screen } from '@testing-library/react';
import { AchievementsCard } from './AchievementsCard';

describe('AchievementsCard', () => {
  const mockAchievements = [
    {
      id: '1',
      name: 'First Lesson',
      description: 'Completed your first lesson'
    },
    {
      id: '2',
      name: 'Week Streak',
      description: 'Studied for 7 days in a row'
    },
    {
      id: '3',
      name: 'Grammar Master',
      description: 'Mastered basic grammar patterns'
    }
  ];

  const mockCertificates = [
    {
      id: '1',
      name: 'N5 Completion Certificate',
      description: 'Successfully completed JLPT N5 course',
      issuedAt: '2024-01-15T00:00:00Z'
    },
    {
      id: '2',
      name: 'Listening Excellence',
      description: 'Achieved 90% accuracy in listening tests',
      issuedAt: '2024-02-20T00:00:00Z'
    }
  ];

  it('renders main title correctly', () => {
    render(<AchievementsCard achievements={[]} certificates={[]} />);
    
    expect(screen.getByText('Thành tích')).toBeInTheDocument();
  });

  it('renders certificates section with data', () => {
    render(<AchievementsCard achievements={[]} certificates={mockCertificates} />);
    
    // Check section title
    expect(screen.getByText('Chứng chỉ')).toBeInTheDocument();
    
    // Check first certificate
    expect(screen.getByText('N5 Completion Certificate')).toBeInTheDocument();
    expect(screen.getByText('Successfully completed JLPT N5 course')).toBeInTheDocument();
    
    // Check second certificate
    expect(screen.getByText('Listening Excellence')).toBeInTheDocument();
    expect(screen.getByText('Achieved 90% accuracy in listening tests')).toBeInTheDocument();
    
    // Check dates are formatted correctly (actual format depends on locale)
    expect(screen.getByText('2024/1/15')).toBeInTheDocument();
    expect(screen.getByText('2024/2/20')).toBeInTheDocument();
  });

  it('renders achievements section with data', () => {
    render(<AchievementsCard achievements={mockAchievements} certificates={[]} />);
    
    // Check section title
    expect(screen.getByText('Huy hiệu')).toBeInTheDocument();
    
    // Check achievements are displayed
    expect(screen.getByText('First Lesson')).toBeInTheDocument();
    expect(screen.getByText('Completed your first lesson')).toBeInTheDocument();
    
    expect(screen.getByText('Week Streak')).toBeInTheDocument();
    expect(screen.getByText('Studied for 7 days in a row')).toBeInTheDocument();
    
    expect(screen.getByText('Grammar Master')).toBeInTheDocument();
    expect(screen.getByText('Mastered basic grammar patterns')).toBeInTheDocument();
    
    // Check trophy icons are present (🏆 emoji)
    const trophyIcons = screen.getAllByText('🏆');
    expect(trophyIcons).toHaveLength(3);
  });

  it('shows fallback message when no certificates', () => {
    render(<AchievementsCard achievements={mockAchievements} certificates={[]} />);
    
    expect(screen.getByText('Chưa có chứng chỉ')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('shows fallback message when no achievements', () => {
    render(<AchievementsCard achievements={[]} certificates={mockCertificates} />);
    
    expect(screen.getByText('Chưa có huy hiệu nào.')).toBeInTheDocument();
  });

  it('shows both fallback messages when both arrays are empty', () => {
    render(<AchievementsCard achievements={[]} certificates={[]} />);
    
    expect(screen.getByText('Chưa có chứng chỉ')).toBeInTheDocument();
    expect(screen.getByText('Chưa có huy hiệu nào.')).toBeInTheDocument();
  });

  it('renders single certificate correctly', () => {
    const singleCertificate = [mockCertificates[0]];
    render(<AchievementsCard achievements={[]} certificates={singleCertificate} />);
    
    expect(screen.getByText('N5 Completion Certificate')).toBeInTheDocument();
    expect(screen.getByText('Successfully completed JLPT N5 course')).toBeInTheDocument();
    expect(screen.getByText('2024/1/15')).toBeInTheDocument();
    
    // Should not show fallback
    expect(screen.queryByText('Chưa có chứng chỉ')).not.toBeInTheDocument();
  });

  it('renders single achievement correctly', () => {
    const singleAchievement = [mockAchievements[0]];
    render(<AchievementsCard achievements={singleAchievement} certificates={[]} />);
    
    expect(screen.getByText('First Lesson')).toBeInTheDocument();
    expect(screen.getByText('Completed your first lesson')).toBeInTheDocument();
    expect(screen.getByText('🏆')).toBeInTheDocument();
    
    // Should not show fallback
    expect(screen.queryByText('Chưa có huy hiệu nào.')).not.toBeInTheDocument();
  });

  it('handles certificates without description', () => {
    const certificateWithoutDesc = [{
      id: '1',
      name: 'Basic Certificate',
      issuedAt: '2024-03-01T00:00:00Z'
    }];
    
    render(<AchievementsCard achievements={[]} certificates={certificateWithoutDesc} />);
    
    expect(screen.getByText('Basic Certificate')).toBeInTheDocument();
    expect(screen.getByText('2024/3/1')).toBeInTheDocument();
    // Description should be empty but element should still exist
    const descriptionElements = screen.getAllByText('');
    expect(descriptionElements.length).toBeGreaterThan(0);
  });

  it('formats different date formats correctly', () => {
    const differentDateFormats = [
      {
        id: '1',
        name: 'Certificate 1',
        description: 'Test description',
        issuedAt: '2024-12-25T23:59:59Z' // Christmas
      },
      {
        id: '2',
        name: 'Certificate 2',
        description: 'Test description',
        issuedAt: '2024-01-01T00:00:00Z' // New Year
      }
    ];
    
    render(<AchievementsCard achievements={[]} certificates={differentDateFormats} />);
    
    expect(screen.getByText('2024/12/26')).toBeInTheDocument(); // Note: timezone may affect date
    expect(screen.getByText('2024/1/1')).toBeInTheDocument();
  });

  it('renders both sections when both have data', () => {
    render(<AchievementsCard achievements={mockAchievements} certificates={mockCertificates} />);
    
    // Check both section titles are present
    expect(screen.getByText('Chứng chỉ')).toBeInTheDocument();
    expect(screen.getByText('Huy hiệu')).toBeInTheDocument();
    
    // Check some data from both sections
    expect(screen.getByText('N5 Completion Certificate')).toBeInTheDocument();
    expect(screen.getByText('First Lesson')).toBeInTheDocument();
    
    // Should not show any fallback messages
    expect(screen.queryByText('Chưa có chứng chỉ')).not.toBeInTheDocument();
    expect(screen.queryByText('Chưa có huy hiệu nào.')).not.toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<AchievementsCard achievements={mockAchievements} certificates={mockCertificates} />);
    
    // Check main heading
    expect(screen.getByText('Thành tích')).toBeInTheDocument();
    
    // Check section headings
    expect(screen.getByText('Chứng chỉ')).toBeInTheDocument();
    expect(screen.getByText('Huy hiệu')).toBeInTheDocument();
    
    // All achievement and certificate names should be accessible
    mockAchievements.forEach(achievement => {
      expect(screen.getByText(achievement.name)).toBeInTheDocument();
    });
    
    mockCertificates.forEach(certificate => {
      expect(screen.getByText(certificate.name)).toBeInTheDocument();
    });
  });
});