import { Router } from "express";
import { prisma } from "./db";

const owedRouter = Router();

owedRouter.get("/by/", async (req, res) => {
  let username = req.session["username"];
  if (!username) {
    return res.json({ err: true, data: [] });
  }
  let owed = await prisma.owed.findMany({
    where: {
      byUsername: username,
    },
  });
  return res.json({ err: false, data: owed });
});

owedRouter.get("/to/", async (req, res) => {
  let username = req.session["username"];
  if (!username) {
    return res.json({ err: true, data: [] });
  }

  let owed = await prisma.owed.findMany({
    where: {
      toUsername: username,
    },
  });
  return res.json({ err: false, data: owed });
});

owedRouter.get("/settle/", async (req, res) => {
  let { by, to } = req.query;
  console.log({ by, to });
  try {
    await prisma.owed.delete({
      where: {
        toUsername_byUsername: {
          toUsername: to?.toString() ?? "",
          byUsername: by?.toString() ?? "",
        },
      },
    });
    res.send("ok");
  } catch {
    res.send("fail");
  }
});

export default owedRouter;
