/*
  Warnings:

  - The primary key for the `Owed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fromUsername` on the `Owed` table. All the data in the column will be lost.
  - Added the required column `toUsername` to the `Owed` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Owed" (
    "amt" REAL NOT NULL,
    "toUsername" TEXT NOT NULL,
    "byUsername" TEXT NOT NULL,

    PRIMARY KEY ("toUsername", "byUsername"),
    CONSTRAINT "Owed_byUsername_fkey" FOREIGN KEY ("byUsername") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Owed_toUsername_fkey" FOREIGN KEY ("toUsername") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Owed" ("amt", "byUsername") SELECT "amt", "byUsername" FROM "Owed";
DROP TABLE "Owed";
ALTER TABLE "new_Owed" RENAME TO "Owed";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
