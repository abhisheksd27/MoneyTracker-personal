/*
  Warnings:

  - You are about to drop the `Friend` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Friend";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Owed" (
    "amt" REAL NOT NULL,
    "fromUsername" TEXT NOT NULL,
    "byUsername" TEXT NOT NULL,

    PRIMARY KEY ("fromUsername", "byUsername"),
    CONSTRAINT "Owed_byUsername_fkey" FOREIGN KEY ("byUsername") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Owed_fromUsername_fkey" FOREIGN KEY ("fromUsername") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
