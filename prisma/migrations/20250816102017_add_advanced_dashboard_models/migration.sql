-- CreateTable
CREATE TABLE "AIInsight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "confidence" REAL NOT NULL,
    "impact" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "actionRequired" BOOLEAN NOT NULL DEFAULT false,
    "estimatedTime" INTEGER,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isActioned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    CONSTRAINT "AIInsight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LearningPattern" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "strength" REAL NOT NULL,
    "weakness" REAL NOT NULL,
    "recommendation" TEXT NOT NULL,
    "estimatedImprovement" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LearningPattern_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AIPrediction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "currentValue" REAL NOT NULL,
    "predictedValue" REAL NOT NULL,
    "timeframe" TEXT NOT NULL,
    "confidence" REAL NOT NULL,
    "factors" TEXT NOT NULL,
    "isAchieved" BOOLEAN NOT NULL DEFAULT false,
    "achievedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AIPrediction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudySession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "aiRecommendation" TEXT,
    "scheduledDate" DATETIME NOT NULL,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeeklyGoal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "target" REAL NOT NULL,
    "current" REAL NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "progress" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WeeklyGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "unlocked" BOOLEAN NOT NULL DEFAULT false,
    "progress" REAL NOT NULL DEFAULT 0,
    "maxProgress" REAL NOT NULL DEFAULT 1,
    "rewardType" TEXT NOT NULL,
    "rewardValue" TEXT NOT NULL,
    "unlockedAt" DATETIME,
    "requirements" TEXT NOT NULL,
    "bonusDescription" TEXT,
    "bonusValue" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Achievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "currentLevel" INTEGER NOT NULL DEFAULT 1,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "totalCoins" INTEGER NOT NULL DEFAULT 0,
    "rank" TEXT NOT NULL DEFAULT 'Bronze',
    "nextLevelXP" INTEGER NOT NULL DEFAULT 100,
    "totalStudyTime" INTEGER NOT NULL DEFAULT 0,
    "totalLessonsCompleted" INTEGER NOT NULL DEFAULT 0,
    "totalAchievements" INTEGER NOT NULL DEFAULT 0,
    "unlockedAchievements" INTEGER NOT NULL DEFAULT 0,
    "lastStudyDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "xp" INTEGER NOT NULL,
    "achievements" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "streak" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LeaderboardEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "AIInsight_userId_type_idx" ON "AIInsight"("userId", "type");

-- CreateIndex
CREATE INDEX "AIInsight_userId_createdAt_idx" ON "AIInsight"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "LearningPattern_userId_isActive_idx" ON "LearningPattern"("userId", "isActive");

-- CreateIndex
CREATE INDEX "AIPrediction_userId_metric_idx" ON "AIPrediction"("userId", "metric");

-- CreateIndex
CREATE INDEX "AIPrediction_userId_isAchieved_idx" ON "AIPrediction"("userId", "isAchieved");

-- CreateIndex
CREATE INDEX "StudySession_userId_scheduledDate_idx" ON "StudySession"("userId", "scheduledDate");

-- CreateIndex
CREATE INDEX "StudySession_userId_status_idx" ON "StudySession"("userId", "status");

-- CreateIndex
CREATE INDEX "WeeklyGoal_userId_status_idx" ON "WeeklyGoal"("userId", "status");

-- CreateIndex
CREATE INDEX "WeeklyGoal_userId_deadline_idx" ON "WeeklyGoal"("userId", "deadline");

-- CreateIndex
CREATE INDEX "Achievement_userId_category_idx" ON "Achievement"("userId", "category");

-- CreateIndex
CREATE INDEX "Achievement_userId_unlocked_idx" ON "Achievement"("userId", "unlocked");

-- CreateIndex
CREATE INDEX "Achievement_userId_rarity_idx" ON "Achievement"("userId", "rarity");

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_key" ON "UserStats"("userId");

-- CreateIndex
CREATE INDEX "UserStats_userId_currentLevel_idx" ON "UserStats"("userId", "currentLevel");

-- CreateIndex
CREATE INDEX "UserStats_userId_totalXP_idx" ON "UserStats"("userId", "totalXP");

-- CreateIndex
CREATE INDEX "LeaderboardEntry_week_year_rank_idx" ON "LeaderboardEntry"("week", "year", "rank");

-- CreateIndex
CREATE INDEX "LeaderboardEntry_userId_week_year_idx" ON "LeaderboardEntry"("userId", "week", "year");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_userId_week_year_key" ON "LeaderboardEntry"("userId", "week", "year");
