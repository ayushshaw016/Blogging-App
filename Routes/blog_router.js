const express = require("express");
const blogrouter = express.Router();
const multer = require("multer");
const path = require("path");
const { blogSchema } = require("../Models/BlogSchema");
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
blogrouter.post("/addblog", upload.single("coverimg"), async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  const result = await blogSchema.create({
    title: req.body.title,
    content: req.body.content,
    coverimg: `/Blogimg/${req.file.filename}`,
    createdby: req.user._id,
  });
  return res.redirect(`/blog/${result._id}`);
});
module.exports = { blogrouter };
