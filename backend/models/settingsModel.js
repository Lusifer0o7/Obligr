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
      filename: {
        type: String,
      },
      path: {
        type: String,
      },
      size: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

const HomeFooterSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
    },
    subheading: {
      type: String,
    },

    links: [
      {
        type: String,
      },
    ],

    icons: [
      {
        type: String,
      },
    ],

    contactInfo: {
      address: String,
      phone: [{ type: Number }],
      email: [{ type: String }],
    },

    copyrightInfo: {
      type: String,
    },
  },
  { timestamps: true }
);

// Define MongoDB models
const HomeMenu = mongoose.model("HomeMenu", HomeMenuSchema);
const HomeSlider = mongoose.model("HomeSlider", HomeSliderSchema);
const HomeFooter = mongoose.model("HomeFooter", HomeFooterSchema);

module.exports = { HomeMenu, HomeSlider, HomeFooter };
