import { Transaction } from "@prisma/client";
import { Router } from "express";
import { prisma } from "./db";

const router = Router();

router.post("/create", async (req, res) => {
  let { category, amount, name, splitUsers } = req.body;
  console.log(req.body);
  let splitArr: string[] = splitUsers
    .split(",")
    .filter((d: string) => d.trim() != "");
  let username = req.session["username"];
  if (!username) {
    res.send("login_required");
    return;
  }

  let users = await prisma.user.findMany({
    select: {
      username: true,
    },
  });
  let usernames = users.map((user) => user.username);

  let splitCount = splitArr.length + 1;
  let eachAmt = parseInt(amount) / splitCount;
  splitArr = splitArr.filter((username) => usernames.includes(username));
  splitArr.map(async (user) => {
    try {
      await prisma.owed.upsert({
        create: {
          toUsername: username ?? "",
          byUsername: user,
          amt: eachAmt,
        },
        update: {
          amt: {
            increment: eachAmt,
          },
        },
        where: {
          toUsername_byUsername: {
            toUsername: username ?? "",
            byUsername: user,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  });
  splitArr.push(username);

  let transactions = await Promise.all(
    splitArr.map(async (user) => {
      try {
        return await prisma.transaction.create({
          data: {
            userUsername: user,
            amount: eachAmt,
            category,
            name,
            date: new Date(),
          },
        });
      } catch (err) {
        console.log(err);
      }
    })
  );
  console.log(transactions);

  console.log("created");
  return res.json(transactions);
});

router.get("/filter", async (req, res) => {
  let { start_date, end_date, category } = req.query;
  let username = req.session["username"];
  if (!username) {
    return res.json([]);
  }
  console.log(start_date, end_date, category);
  let result: Transaction[];
  result = await prisma.transaction.findMany({
    where: {
      date: {
        gte: new Date(start_date?.toString() ?? ""),
        lte: new Date(end_date?.toString() ?? ""),
      },
      category: category?.toString(),
      userUsername: username,
    },
    orderBy: {
      date: "desc"
    }
  });
  return res.json(result);
});

router.put("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let tx = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });
  if (!tx) {
    return res.send("no_tx");
  }
  if (tx.userUsername != req.session["username"]) {
    return res.send("forbidden");
  }
  let { category, amount, name } = req.body;
  await prisma.transaction.update({
    data: {
      category,
      amount,
      name,
    },
    where: {
      id,
    },
  });
  return res.send("updated");
});

router.get("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  console.log("tx id:" + id);
  let tx = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });
  console.log(tx);
  res.json(tx);
});

router.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  await prisma.transaction.delete({
    where: {
      id,
    },
  });
  res.send("ok");
});
export default router;
