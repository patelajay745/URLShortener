const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      unique: true,
      required: true,
    },
    redirectURl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamp: true }
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
