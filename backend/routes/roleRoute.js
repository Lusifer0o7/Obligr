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
router.route("/create/roles").post(createRole).name = "Create Roles";
router.route("/get/roles").get(getAllRoles).name = "Get All Roles";
router.route("/update/roles").put(updateRole).name = "Update Roles";
router.route("/role/:id").delete(deleteRole).name = "Delete Websites";

module.exports = router;
