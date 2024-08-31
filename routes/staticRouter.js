const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("this is home page");
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;
