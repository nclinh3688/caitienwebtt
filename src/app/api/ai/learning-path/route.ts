import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface UserPreferences {
  language: string;
  currentLevel: string;
  learningGoals: string[];
  weakAreas: string[];
  preferredDifficulty: string;
}

interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'practice' | 'test' | 'review';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  skillFocus: string[];
  aiRecommendation?: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { userId, preferences, currentProgress } = await request.json();

    if (!preferences) {
      return NextResponse.json({ error: 'Preferences are required' }, { status: 400 });
    }

    // Enhanced AI prompt for learning path generation
    const aiPrompt = `Bạn là AI Education Expert của PHÚC KHIÊM EDU - chuyên thiết kế lộ trình học ngoại ngữ cá nhân hóa.

🎯 NHIỆM VỤ: Tạo lộ trình học tập tối ưu cho học viên

📊 THÔNG TIN HỌC VIÊN:
- Ngôn ngữ: ${preferences.language}
- Trình độ hiện tại: ${preferences.currentLevel}
- Mục tiêu: ${preferences.goals.join(', ')}
- Thời gian/ngày: ${preferences.timeAvailable} phút
- Phong cách học: ${preferences.learningStyle}
- Tiến độ đã hoàn thành: ${currentProgress || 0} bước

🎓 YÊU CẦU THIẾT KẾ:
1. **Phù hợp trình độ**: Từ dễ đến khó, logic progression
2. **Thực tế thời gian**: Phù hợp với ${preferences.timeAvailable} phút/ngày  
3. **Đa dạng hoạt động**: Lesson, Practice, Test, Review
4. **Skills cân bằng**: Speaking, Listening, Reading, Writing
5. **Motivation**: Gamification, achievement tracking

💡 AI RECOMMENDATIONS: Đưa ra lời khuyên cụ thể cho từng bước

Hãy tạo lộ trình 8-12 bước với JSON format.`;

    // Generate AI learning path
    const learningPath = await generateAILearningPath(aiPrompt, preferences);

    // Enhanced with user analytics
    const enhancedPath = await enhancePathWithAnalytics(learningPath, userId);

    return NextResponse.json({
      learningPath: enhancedPath,
      generatedAt: new Date().toISOString(),
      aiModel: 'gemini-pro-education',
      personalizationScore: calculatePersonalizationScore(preferences)
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('AI Learning Path Error:', error);
    
    // Fallback to sophisticated mock path
    const { preferences: fallbackPreferences } = await request.json().catch(() => ({ preferences: null }));
    const fallbackPath = generateAdvancedMockPath(fallbackPreferences);
    
    return NextResponse.json({ 
      learningPath: fallbackPath,
      fallback: true,
      message: 'AI service unavailable, using optimized template'
    }, { status: 200 });
  }
}

async function generateAILearningPath(prompt: string, preferences: UserPreferences) {
  try {
    // Use Google Gemini for education-specific AI
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GOOGLE_AI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3, // Lower for more consistent educational content
          topK: 30,
          topP: 0.8,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (aiResponse) {
      // Parse AI response and create structured learning path
      return parseAIResponseToLearningPath(aiResponse, preferences);
    }
    
    throw new Error('No AI response received');

  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Gemini AI Error:', error);
    throw error;
  }
}

function parseAIResponseToLearningPath(aiResponse: string, preferences: UserPreferences) {
  // Intelligent parsing of AI response to create structured learning path
  // This would parse the AI-generated content and convert to our data structure
  
  // For now, return enhanced mock based on AI insights
  return generateAdvancedMockPath(preferences);
}

function generateAdvancedMockPath(preferences: UserPreferences | null) {
  // Add null check
  if (!preferences || !preferences.language || !preferences.currentLevel) {
    preferences = {
      language: 'japanese',
      currentLevel: 'beginner',
      learningGoals: ['conversation'],
      weakAreas: ['pronunciation'],
      preferredDifficulty: 'beginner'
    };
  }
  // Ensure preferences is not null and has required properties
  const safePreferences = preferences || {
    language: 'japanese',
    currentLevel: 'beginner',
    learningGoals: ['conversation'],
    weakAreas: ['pronunciation'],
    preferredDifficulty: 'beginner'
  };

  const pathTemplates = {
    japanese: {
      beginner: {
        name: 'Tiếng Nhật N5 - Foundation',
        description: 'Lộ trình cá nhân hóa từ zero đến N5 với AI coaching',
        steps: [
          {
            id: 'jp-001',
            title: 'Hiragana & Katakana Mastery',
            description: 'Thuộc lòng 2 bảng chữ cái cơ bản với memory techniques',
            type: 'lesson' as const,
            difficulty: 'beginner' as const,
            estimatedTime: 45,
            skillFocus: ['reading', 'writing'],
            aiRecommendation: 'Sử dụng flashcard và viết tay để ghi nhớ tốt hơn'
          },
          {
            id: 'jp-002',
            title: 'Greetings & Self Introduction',
            description: 'Chào hỏi và giới thiệu bản thân trong các tình huống',
            type: 'practice' as const,
            difficulty: 'beginner' as const,
            estimatedTime: 30,
            skillFocus: ['speaking', 'listening'],
            aiRecommendation: 'Luyện tập trước gương và record voice để check phát âm'
          },
          {
            id: 'jp-003',
            title: 'Numbers & Time',
            description: 'Đếm số và biểu đạt thời gian một cách chính xác',
            type: 'lesson' as const,
            difficulty: 'beginner' as const,
            estimatedTime: 40,
            skillFocus: ['vocabulary', 'practical'],
            aiRecommendation: 'Practice với đồng hồ và calendar hàng ngày'
          },
          {
            id: 'jp-004',
            title: 'Essential Particles は・が・を',
            description: 'Master 3 particles quan trọng nhất trong tiếng Nhật',
                      type: 'lesson' as const,
          difficulty: 'intermediate' as const,
            estimatedTime: 50,
            skillFocus: ['grammar', 'sentence-structure'],
            aiRecommendation: 'Đây là foundation! Học theo pattern và ví dụ cụ thể'
          }
        ]
      }
    },
    chinese: {
      beginner: {
        name: 'Tiếng Trung HSK1 - Basics',
        description: 'Lộ trình HSK1 với focus on practical communication',
        steps: [
          {
            id: 'cn-001',
            title: 'Pinyin & Tones Foundation',
            description: 'Master 4 thanh điệu và hệ thống phiên âm Pinyin',
            type: 'lesson' as const,
            difficulty: 'beginner' as const,
            estimatedTime: 60,
            skillFocus: ['pronunciation', 'listening'],
            aiRecommendation: 'Thanh điệu là nền tảng! Luyện 10 phút mỗi ngày'
          }
        ]
      }
    }
  };

  const template = pathTemplates[safePreferences.language as keyof typeof pathTemplates]?.[safePreferences.currentLevel as keyof (typeof pathTemplates)[keyof typeof pathTemplates]];
  
  if (!template) {
    return generateGenericPath(safePreferences);
  }

  // Create dynamic learning path based on preferences
  const steps: LearningStep[] = template.steps.map((step, index) => ({
    ...step,
    isCompleted: index < 2, // First 2 steps completed for demo
    isUnlocked: index < 3,  // First 3 steps unlocked
    estimatedTime: step.estimatedTime // Use original time estimate
  }));

  return {
    id: `path-${safePreferences.language}-${Date.now()}`,
    name: template.name,
    description: template.description,
    language: safePreferences.language,
    level: safePreferences.currentLevel,
    totalSteps: steps.length,
    completedSteps: steps.filter(s => s.isCompleted).length,
    estimatedDuration: Math.round(steps.reduce((acc: number, s) => acc + s.estimatedTime, 0) / 60),
    personalizedFor: safePreferences.learningGoals,
    steps
  };
}

function generateGenericPath(preferences: UserPreferences | null) {
  const safePreferences = preferences || {
    language: 'japanese',
    currentLevel: 'beginner',
    learningGoals: ['conversation'],
    weakAreas: ['pronunciation'],
    preferredDifficulty: 'beginner'
  };
  return {
    id: `path-generic-${Date.now()}`,
    name: `${safePreferences.language.toUpperCase()} Learning Path`,
    description: 'Personalized learning journey created by AI',
    language: safePreferences.language,
    level: safePreferences.currentLevel,
    totalSteps: 8,
    completedSteps: 1,
    estimatedDuration: 20,
    personalizedFor: safePreferences.learningGoals,
    steps: [
      {
        id: 'generic-001',
        title: 'Foundation Building',
        description: 'Establish strong fundamentals in your target language',
        type: 'lesson' as const,
        difficulty: 'beginner' as const,
        estimatedTime: 30, // Default 30 minutes
        isCompleted: true,
        isUnlocked: true,
        skillFocus: ['foundation'],
        aiRecommendation: 'Great start! Building strong foundations is key to success.'
      }
    ]
  };
}

async function enhancePathWithAnalytics(learningPath: any, userId?: string) {
  // Add user-specific analytics and insights
  if (userId) {
    try {
      // Fetch user's learning history and progress
      // This would normally query the database for user analytics
      
      // For now, add mock enhancements
      learningPath.aiInsights = {
        strengths: ['Quick vocabulary absorption', 'Good consistency'],
        weaknesses: ['Grammar application', 'Speaking confidence'],
        recommendations: ['Increase speaking practice', 'Focus on practical examples'],
        predictedCompletion: '3-4 months based on current pace'
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.error('Error enhancing path with analytics:', error);
    }
  }
  
  return learningPath;
}

function calculatePersonalizationScore(preferences: UserPreferences): number {
  // Calculate how personalized this path is based on preferences
  let score = 50; // Base score
  
  if (preferences.learningGoals && preferences.learningGoals.length > 1) score += 20;
  if (preferences.weakAreas && preferences.weakAreas.length > 0) score += 15;
  
  return Math.min(score, 100);
}