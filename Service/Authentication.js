const JWT = require("jsonwebtoken");

const secret = "$uperMan123";

// this function simply takes the user and creates the token
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    profile: user.profile,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

// VALIDATE THE TOKEN
function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
