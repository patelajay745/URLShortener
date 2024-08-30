const URL = require("../models/url");
const shortid = require("shortid");

const handleUrlCreate = async (req, res) => {
  try {
    const redirectURl = req.body.redirectURl;
    const shortID = shortid();
    await URL.create({
      shortID: shortID,
      redirectURl: redirectURl,
      visitHistory: [],
    });
    return res.render("index", { id: shortID });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const handleUrlAnalytics = async (req, res) => {
  const id = req.params.id;
  const dbData = await URL.findOne({ shortID: id });
  return res.json({
    totalclicks: dbData.visitHistory.length,
    analytics: dbData.visitHistory,
  });
};

module.exports = { handleUrlCreate, handleUrlAnalytics };
