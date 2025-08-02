-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "duration" INTEGER NOT NULL DEFAULT 10,
    "vocabularyGrammar" JSONB,
    "kanji" JSONB,
    "listening" JSONB,
    "supplementaryMaterials" JSONB,
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lesson" ("content", "courseId", "description", "id", "kanji", "listening", "order", "supplementaryMaterials", "title", "vocabularyGrammar") SELECT "content", "courseId", "description", "id", "kanji", "listening", "order", "supplementaryMaterials", "title", "vocabularyGrammar" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
CREATE UNIQUE INDEX "Lesson_courseId_id_key" ON "Lesson"("courseId", "id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
