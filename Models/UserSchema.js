const { createHmac, randomBytes } = require("node:crypto");
const mongoose = require("mongoose");
const { createTokenForUser } = require("../Service/Authentication.js");
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
  if (!user) return;
  const salt = randomBytes(16).toString();
  // const salt = "RandomSalt";
  const hashedpassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedpassword;
  next();
});

User_Schema.static("matchpassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    return false;
  }
  // console.log("From the matchpassword", user);
  const salt = user.salt;
  const hashedpass = user.password;

  const userProvidedhash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (hashedpass !== userProvidedhash) {
    throw new Error("Incorrect Password");
  }
  // return { ...user, password: undefined, salt: undefined };
  // return user;
  const token = createTokenForUser(user);
  return token;
});
const userSchema = mongoose.model("users", User_Schema);

module.exports = { userSchema };
