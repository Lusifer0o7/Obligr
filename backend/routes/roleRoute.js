const express = require("express");
const {
  createRole,
  deleteRole,
  getAllRoles,
} = require("../controllers/rolesController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.route("/roles/create").post(createRole);
router.route("/admin/create/roles").post(createRole).name = "Create Roles";
router.route("/admin/get/roles").get(getAllRoles).name = "Get All Roles";

module.exports = router;
