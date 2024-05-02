const mongoose = require("mongoose");

const WebsiteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    websiteName: {
      type: String,
      required: true,
    },
    hostName: {
      type: String,
    },
    websiteStatus: {
      type: String,
      //enum: ["ACTIVE", "DRAFT", "DISABLED"],
      required: true,
    },
    domainName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Website", WebsiteSchema);
