const jwt = require("jsonwebtoken");
const jwtToken = {};
jwtToken.getToken = function (data, expiresIn = 86400) {
  return jwt.sign(data, process.env.SESSION_SECRET, { expiresIn: expiresIn });
};
module.exports = jwtToken;
