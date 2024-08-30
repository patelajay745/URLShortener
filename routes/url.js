const express = require("express");
const router = express.Router();
const { handleUrlCreate, handleUrlAnalytics } = require("../controllers/url");

router.post("/", handleUrlCreate);
router.get("/", (req, res) => {
  res.redirect("/");
});
router.get("/analytics/:id", handleUrlAnalytics);

module.exports = router;
