import { Router } from "express";
import { prisma } from "./db";
import { getHash } from "./utils";

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let hash = getHash(password);
  console.log({ username, password });
  let user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user || user.password != hash) {
    res.json({ err: true, data: "Invalid user / password" });
    return;
  }
  req.session["username"] = username;
  req.session.save();
  res.json({ err: false, data: "Successfully logged in" });
});

userRouter.post("/signup", async (req, res) => {
  let { username, password, budget } = req.body;
  try {
    await prisma.user.create({
      data: {
        monthly_budget: budget,
        password: getHash(password),
        username,
      },
    });
    res.send({ err: false, data: "Successfully registered" });
  } catch {
    res.send({ err: true, data: "Failed to create user" });
  }
});

userRouter.get("/logout", async (req, res) => {
  req.session["username"] = undefined;
  res.send("ok");
});

userRouter.get("/current", async (req, res) => {
  console.log("getting currently logged in user");
  let username = req.session["username"];

  if (!username) {
    return res.json({ logged_in: false, user: {} });
  }
  console.log({ username });
  let user = await prisma.user.findUnique({
    select: {
      monthly_budget: true,
      username: true,
    },
    where: {
      username,
    },
  });
  let total_monthly_spend = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userUsername: username,
    },
  });
  return res.json({
    logged_in: true,
    user,
    total_monthly_spend: total_monthly_spend._sum.amount,
  });
});

userRouter.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { budget } = req.body;
  let monthlyBudget = parseInt(budget?.toString() ?? "0");
  await prisma.user.update({
    data: {
      monthly_budget: monthlyBudget,
    },
    where: {
      username: id,
    },
  });
  res.send("ok");
});

userRouter.get("/names", async (req, res) => {
  let users = await prisma.user.findMany({
    select: {
      username: true,
    },
  });
  let usernames = users.map((user) => user.username);
  return res.json(usernames);
});

export default userRouter;
