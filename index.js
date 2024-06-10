const express = require("express");
const path = require("path");
const { userRouter } = require("./Routes/user_router");
const dbconnection = require("./DBconnection");
const app = express();
const cookieparser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./Middleware/Middleware_Auth");
const { blogrouter } = require("./Routes/blog_router");
// SETTING THE VIEW ENGINE AS ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(checkForAuthenticationCookie("token"));
const port = 8000;
app.listen(port, () => console.log("App is running on port", port));
dbconnection;
app.get("/", (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});
app.use("/blog", blogrouter);
app.use("/user", userRouter);
