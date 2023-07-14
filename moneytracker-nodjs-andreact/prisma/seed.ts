import { PrismaClient } from "@prisma/client";
import { getHash } from "../backend/utils";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "user1",
      password: getHash("pass1"),
      monthly_budget: 15000,
    },
  });

  await prisma.user.create({
    data: {
      username: "user2",
      password: getHash("pass2"),
      monthly_budget: 20000,
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 549,
      category: "Other",
      date: new Date(),
      name: "Sherlock book",
      userUsername: "user1",
    },
  });

  await prisma.transaction.create({
    data: {
      amount: 1829,
      category: "Food",
      date: new Date(),
      name: "New Year Dinner",
      userUsername: "user1",
    },
  });

  await prisma.owed.create({
    data: {
      amt: 583,
      byUsername: "user1",
      toUsername: "user2",
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
