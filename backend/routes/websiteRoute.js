const express = require("express");
const {
  createWebsite,
  deleteWebsite,
  getAllWebsites,
  updateWebsite,
} = require("../controllers/websiteController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/admin/create/website").post(createWebsite).name =
  "Create Websites";
router.route("/admin/get/websites").get(getAllWebsites).name =
  "Get All Websites";
router.route("/admin/update/websites").put(updateWebsite).name =
  "Update Websites";
router.route("/admin/website/:id").delete(deleteWebsite).name =
  "Delete Websites";

module.exports = router;
