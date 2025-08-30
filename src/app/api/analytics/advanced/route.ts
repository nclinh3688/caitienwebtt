import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// Initialize clients only when needed
let prisma: PrismaClient | null = null;
let genAI: GoogleGenerativeAI | null = null;
let openai: OpenAI | null = null;

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = await request.json();

    // Initialize Prisma client
    if (!prisma) {
      prisma = new PrismaClient();
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        progress: {
          include: {
            lesson: true
          }
        },
        }
     });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate skill analysis based on user data
    const skillAnalysis = await calculateSkillAnalysis(user);
    
    // Calculate learning velocity
    const learningVelocity = await calculateLearningVelocity(user);
    
    // Generate AI-powered weak point analysis
    const weakPoints = await generateWeakPointAnalysis(user, skillAnalysis);

    return NextResponse.json({
      skillAnalysis,
      learningVelocity,
      weakPoints
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error generating advanced analytics:', error);
    return NextResponse.json({ 
      error: 'Failed to generate advanced analytics' 
    }, { status: 500 });
  }
}

async function calculateSkillAnalysis(user: any) {
  // Mock calculation based on user progress
  // In a real implementation, you'd analyze test results, lesson completion, etc.
  
  const totalLessons = user.progress.length;
  const completedLessons = user.progress.filter((p: any) => p.isCompleted).length;
  const baseScore = Math.round((completedLessons / Math.max(totalLessons, 1)) * 100);

  // Mock skill scores with some variation
  return {
    vocabulary: Math.min(100, baseScore + Math.floor(Math.random() * 20) - 10),
    grammar: Math.min(100, baseScore + Math.floor(Math.random() * 20) - 10),
    kanji: Math.min(100, Math.max(0, baseScore - 20 + Math.floor(Math.random() * 20))),
    listening: Math.min(100, baseScore + Math.floor(Math.random() * 15)),
    pronunciation: Math.min(100, baseScore + Math.floor(Math.random() * 15) - 5),
    reading: Math.min(100, baseScore + Math.floor(Math.random() * 20) - 15)
  };
}

async function calculateLearningVelocity(user: any) {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Recent completed lessons
  const recentLessons = user.progress.filter((p: any) => 
    p.completedAt && new Date(p.completedAt) >= sevenDaysAgo
  ).length;

  // Calculate words per day (estimate based on lessons)
  const wordsPerDay = Math.round((recentLessons * 15) / 7); // Assume 15 words per lesson

  // Lessons per week
  const lessonsPerWeek = recentLessons;

  // Practice time estimation (minutes per day)
  const practiceTime = Math.round(lessonsPerWeek * 20 / 7); // Assume 20 min per lesson

  // Consistency score (how regular is the learning)
  const studyDays = calculateStudyDays(user.progress, sevenDaysAgo);
  const consistencyScore = Math.round((studyDays / 7) * 100);

  return {
    wordsPerDay: Math.max(1, wordsPerDay),
    lessonsPerWeek: Math.max(0.5, lessonsPerWeek),
    practiceTime: Math.max(10, practiceTime),
    consistencyScore: Math.min(100, consistencyScore)
  };
}

function calculateStudyDays(progress: any[], since: Date) {
  const studyDates = new Set();
  
  progress.forEach(p => {
    if (p.completedAt && new Date(p.completedAt) >= since) {
      const dateStr = new Date(p.completedAt).toDateString();
      studyDates.add(dateStr);
    }
  });
  
  return studyDates.size;
}

async function generateWeakPointAnalysis(user: any, skillAnalysis: any) {
  try {
    // Find the weakest skills
    const skillEntries = Object.entries(skillAnalysis);
    const weakestSkills = skillEntries
      .sort(([,a], [,b]) => (a as number) - (b as number))
      .slice(0, 3);

    const weakPoints = await Promise.all(
      weakestSkills.map(async ([skill, score]) => {
        const severity = (score as number) < 50 ? 'high' : 
                        (score as number) < 70 ? 'medium' : 'low';
        
        // Generate AI recommendation
        const recommendation = await generateRecommendation(skill, score as number);
        
        return {
          category: getSkillDisplayName(skill),
          specific: getSpecificWeakness(skill),
          severity,
          improvement: Math.floor(Math.random() * 20) - 10, // Mock improvement
          recommendedAction: recommendation
        };
      })
    );

    return weakPoints;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error generating weak point analysis:', error);
    
    // Fallback to mock data
    return [
      {
        category: 'Kanji',
        specific: 'N5 Kanji Reading',
        severity: 'high' as const,
        improvement: -5,
        recommendedAction: 'Luyện tập đọc kanji 15 phút/ngày với flashcards'
      }
    ];
  }
}

async function generateRecommendation(skill: string, score: number): Promise<string> {
  try {
    const aiProvider = process.env.AI_PROVIDER || 'GEMINI';
    const prompt = `Tạo một lời khuyên học tập ngắn gọn (1 câu) cho kỹ năng ${skill} với điểm số ${score}/100 trong tiếng Nhật N5. Trả lời bằng tiếng Việt.`;

    let recommendation = '';

    if (aiProvider === 'OPENAI' && (process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY)) {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
      });
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 100
      });
      recommendation = completion.choices[0].message.content || '';
    } else if (process.env.GEMINI_API_KEY) {
      if (!genAI) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      }
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      recommendation = response.text();
    }

    return recommendation || getFallbackRecommendation(skill);
  } catch (error) {
    return getFallbackRecommendation(skill);
  }
}

function getSkillDisplayName(skill: string): string {
  const names: { [key: string]: string } = {
    vocabulary: 'Từ vựng',
    grammar: 'Ngữ pháp',
    kanji: 'Kanji',
    listening: 'Nghe',
    pronunciation: 'Phát âm',
    reading: 'Đọc'
  };
  return names[skill] || skill;
}

function getSpecificWeakness(skill: string): string {
  const weaknesses: { [key: string]: string } = {
    vocabulary: 'N5 Basic Vocabulary',
    grammar: 'Particle Usage',
    kanji: 'Kanji Recognition',
    listening: 'Natural Speed Listening',
    pronunciation: 'Pitch Accent',
    reading: 'Reading Comprehension'
  };
  return weaknesses[skill] || 'General';
}

function getFallbackRecommendation(skill: string): string {
  const recommendations: { [key: string]: string } = {
    vocabulary: 'Học 10-15 từ vựng mới mỗi ngày và ôn tập thường xuyên',
    grammar: 'Làm bài tập ngữ pháp N5 và đọc ví dụ trong ngữ cảnh',
    kanji: 'Luyện viết kanji theo thứ tự nét và học qua flashcards',
    listening: 'Nghe các bài hội thoại N5 và lặp lại nhiều lần',
    pronunciation: 'Luyện phát âm với bài tập shadowing 15 phút/ngày',
    reading: 'Đọc truyện ngắn N5 và tra từ mới để mở rộng vốn từ'
  };
  return recommendations[skill] || 'Luyện tập đều đặn và tập trung vào điểm yếu';
}