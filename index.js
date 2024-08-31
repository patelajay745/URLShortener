const express = require("express");
const connectDB = require("./connect");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const handleUrlGet = require("./controllers/url");
const app = express();
const URL = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser");

const { restrictToLoggedInUserOnly } = require("./middlewares/auth");
const PORT = 8001;

//set ejs as engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//database connection
connectDB("mongodb://localhost:27017/urlShortener")
  .then(() => {
    console.log("Db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

//setting up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//All Routes
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", staticRoute);


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

//strating up application
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
