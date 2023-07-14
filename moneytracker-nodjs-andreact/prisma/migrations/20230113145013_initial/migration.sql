-- CreateTable
CREATE TABLE "Transaction" (
    "category" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "name" TEXT NOT NULL,
    "userUsername" TEXT NOT NULL,
    CONSTRAINT "Transaction_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "monthly_budget" INTEGER NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Friend" (
    "fromUserUsername" TEXT NOT NULL,
    "toUserUsername" TEXT NOT NULL,

    PRIMARY KEY ("fromUserUsername", "toUserUsername"),
    CONSTRAINT "Friend_fromUserUsername_fkey" FOREIGN KEY ("fromUserUsername") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Friend_toUserUsername_fkey" FOREIGN KEY ("toUserUsername") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
