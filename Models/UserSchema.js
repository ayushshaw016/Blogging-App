const { createHmac, randomBytes } = require("node:crypto");
const mongoose = require("mongoose");

const User_Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "/public/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

// PRE SAVE
User_Schema.pre("save", function (next) {
  const user = this;
  if (!user.isModidifed("password")) return;
  const salt = randomBytes(16).toString();
  const hashedpassword = createHmac("sha26", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedpassword;
});

const userSchema = mongoose.model("users", User_Schema);

module.exports = { userSchema };
