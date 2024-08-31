const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("index", { msg: "User created" });
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const isUserAvailable = await User.findOne({ email, password });

  if (!isUserAvailable) {
    return res.render("login", { error: "Invalid Username or Password" });
  }

  const sessionId = uuidv4();
  setUser(sessionId, isUserAvailable);
  res.cookie("uid", sessionId);

  return res.redirect("/url");
};

module.exports = { handleUserSignup, handleUserLogin };
