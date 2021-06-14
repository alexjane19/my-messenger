const cookieObject = {};
cookieObject.option = {
  secure: process.env.NODE_ENV !== "development",
  httpOnly: true,
  maxAge: 86400,
};
module.exports = cookieObject;
