const express = require("express");
const { userSchema } = require("../Models/UserSchema");

const userRouter = express.Router();

userRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

userRouter.post("/signup", async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.render("signup");
  }
  const result = await userSchema.create({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
  });
  return res.render("home");
});

userRouter.get("/login", (req, res) => {
  return res.render("login");
});
userRouter.post("/login", async (req, res) => {
  const data = req.body;
  const user = await userSchema.matchpassword(data.email, data.password);
  // IF NOT USE AWAIT GET PROMISE AS PENDING
  // matchpassword is in userschema itself
  console.log("USER", user);
  return res.redirect("/");
});
module.exports = { userRouter };
