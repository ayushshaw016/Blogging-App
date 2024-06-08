const express = require("express");
const path = require("path");
const app = express();

// SETTING THE VIEW ENGINE AS ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
const port = 8000;
app.listen(port, () => console.log("App is running on port", port));

app.get("/", (req, res) => {
  return res.render("home");
});
