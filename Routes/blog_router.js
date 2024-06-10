const express = require("express");
const blogrouter = express.Router();
const multer = require("multer");
const path = require("path");
blogrouter.get("/addblog", (req, res) => {
  res.render("addblogs", {
    user: req.user,
  });
});

const diskstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./Public/Blogimg/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: diskstorage });
blogrouter.post("/addblog", upload.single("coverimg"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});
module.exports = { blogrouter };
