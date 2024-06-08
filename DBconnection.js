const mongoose = require("mongoose");

const dbconnection = mongoose
  .connect("mongodb://127.0.0.1:27017/Bloggify")
  .then(() => {
    console.log("DataBase Connected Successfuly");
  });

module.exports = dbconnection;
