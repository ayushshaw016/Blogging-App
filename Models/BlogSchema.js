const mongoose = require("mongoose");
const blogschema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverimg: {
      type: String,
    },
    createby: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const blogSchema = mongoose.model("blogs", blogschema);
module.exports = {
  blogSchema,
};
