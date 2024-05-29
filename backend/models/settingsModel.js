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

// const PermissionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   path: {
//     type: String,
//     required: true,
//   },
// });

// Define MongoDB models
const HomeMenu = mongoose.model("HomeMenu", HomeMenuSchema);
// const Permission = mongoose.model("Permission", PermissionSchema);

module.exports = { HomeMenu };
