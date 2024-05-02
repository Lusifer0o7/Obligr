const mongoose = require("mongoose");

// Define MongoDB schemas
const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  { timestamps: true }
);

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  path: {
    type: String,
    required: true,
  },
});

// Define MongoDB models
const Role = mongoose.model("Role", RoleSchema);
const Permission = mongoose.model("Permission", PermissionSchema);

module.exports = { Role, Permission };
