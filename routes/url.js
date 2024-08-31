const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { handleUrlCreate, handleUrlAnalytics } = require("../controllers/url");

router.post("/", handleUrlCreate);
router.get("/", async (req, res) => {
  const urlForUser = await URL.find({ createdBy: req.user });
  res.render("url", { urls: urlForUser });
});
router.get("/analytics/:id", handleUrlAnalytics);

module.exports = router;
