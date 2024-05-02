const express = require("express");
const {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} = require("../controllers/rolesController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.route("/roles/create").post(createRole);
router.route("/admin/create/roles").post(createRole).name = "Create Roles";
router.route("/admin/get/roles").get(getAllRoles).name = "Get All Roles";
router.route("/admin/update/roles").put(updateRole).name = "Update Roles";
router.route("/admin/role/:id").delete(deleteRole).name = "Delete Websites";

module.exports = router;
