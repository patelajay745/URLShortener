const User = require("../models/user");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("index", { msg: "User created" });
};

module.exports = handleUserSignup;
