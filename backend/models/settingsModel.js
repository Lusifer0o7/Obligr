const mongoose = require("mongoose");

const HomeMenuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subtitles: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const HomeSliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },

    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

// Define MongoDB models
const HomeMenu = mongoose.model("HomeMenu", HomeMenuSchema);
const HomeSlider = mongoose.model("HomeSlider", HomeSliderSchema);

module.exports = { HomeMenu, HomeSlider };
