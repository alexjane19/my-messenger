const router = require("express").Router();
const { User } = require("../../db/models");
const cookieObject = require("../../cookie");
const jwtToken = require("../../utils/jwtToken");

router.post("/register", async (req, res, next) => {
  try {
    // expects {username, email, password} in req.body
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Username, password, and email required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const user = await User.create(req.body);

    const token = jwtToken.getToken({ id: user.dataValues.id });
    res.cookie("jwtToken", token, cookieObject.option);
    res.json({
      ...user.dataValues,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(401).json({ error: "User already exists" });
    } else if (error.name === "SequelizeValidationError") {
      return res.status(401).json({ error: "Validation error" });
    } else next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // expects username and password in req.body
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Username and password required" });

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      console.log({ error: `No user found for email: ${email}` });
      res.status(401).json({ error: "Wrong email and/or password" });
    } else if (!user.correctPassword(password)) {
      console.log({ error: "Wrong email and/or password" });
      res.status(401).json({ error: "Wrong email and/or password" });
    } else {
      const token = jwtToken.getToken({ id: user.dataValues.id });
      res.cookie("jwtToken", token, cookieObject.option);
      res.json({
        ...user.dataValues,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", (req, res, next) => {
  res.clearCookie("jwtToken");
  res.sendStatus(204);
});

router.get("/user", (req, res, next) => {
  csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.json({});
  }
});

module.exports = router;
