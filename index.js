const express = require("express");
const connectDB = require("./connect");
const urlRoute = require("./routes/url");
const userRoute=require("./routes/user")
const staticRoute = require("./routes/staticRouter");
const handleUrlGet = require("./controllers/url");
const app = express();
const URL = require("./models/url");
const path = require("path");
const PORT = 8001;

connectDB("mongodb://localhost:27017/urlShortener")
  .then(() => {
    console.log("Db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.get("/url/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    { shortID },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURl);
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
