const express = require("express");
const path = require("path");
const { userRouter } = require("./Routes/user_router");
const dbconnection = require("./DBconnection");
const app = express();

// SETTING THE VIEW ENGINE AS ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

const port = 8000;
app.listen(port, () => console.log("App is running on port", port));
dbconnection;
app.get("/", (req, res) => {
  return res.render("home");
});
app.use("/user", userRouter);
