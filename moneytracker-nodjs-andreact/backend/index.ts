import { PrismaClient } from "@prisma/client";
import express from "express";
import expressSession from "express-session";
import cors from "cors";
import txRouter from "./tx";
import userRouter from "./user";
import owedRouter from "./owed";

const app = express();
const prisma = new PrismaClient();
const SECRET_KEY =
  "146a3e70225c01862ffc9e70f1a3f35684cf83bbea98241ad8d65fa6caa45b11";

app.use(
  expressSession({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

declare module "express-session" {
  export interface SessionData {
    username: string;
  }
}
app.use(express.urlencoded({ extended: true }));

app.use("/tx", txRouter);
app.use("/user", userRouter);
app.use("/owed", owedRouter);

app.get("/dashboard", async (req, res) => {
  let { username } = req.session;
  if (!username) {
    return res.send("login_required");
  }
  let user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    return res.send("user_fail");
  }
  let total_monthly_spend = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      userUsername: username,
    },
  });
  return res.json({
    total_monthly_spend,
    username,
    budget: user.monthly_budget,
  });
});

app.listen(4000, () => console.log("Express server started"));
