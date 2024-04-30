const express = require("express");
const { getAllPermissions } = require("../controllers/permissionController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/admin/get/permissions").get(getAllPermissions).name =
  "Get All Permissions";

module.exports = router;
