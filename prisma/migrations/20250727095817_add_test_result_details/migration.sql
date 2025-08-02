/*
  Warnings:

  - Added the required column `userAnswers` to the `UserTestResult` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserTestResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "userAnswers" JSONB NOT NULL,
    "aiAnalysis" JSONB,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserTestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserTestResult_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserTestResult" ("completedAt", "id", "score", "testId", "userId") SELECT "completedAt", "id", "score", "testId", "userId" FROM "UserTestResult";
DROP TABLE "UserTestResult";
ALTER TABLE "new_UserTestResult" RENAME TO "UserTestResult";
CREATE UNIQUE INDEX "UserTestResult_userId_testId_key" ON "UserTestResult"("userId", "testId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
