-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "phone" TEXT,
    "location" TEXT,
    "bio" TEXT,
    "emailNotificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "pushNotificationsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "publicProfileEnabled" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("bio", "email", "emailVerified", "id", "image", "location", "name", "password", "phone", "role") SELECT "bio", "email", "emailVerified", "id", "image", "location", "name", "password", "phone", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
