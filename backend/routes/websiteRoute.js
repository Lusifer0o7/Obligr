const express = require("express");
const {
  createWebsite,
  deleteWebsite,
  getAllWebsites,
  updateWebsite,
} = require("../controllers/websiteController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/create/website").post(createWebsite).name = "Create Websites";
router.route("/get/websites").get(getAllWebsites).name = "Get All Websites";
router.route("/update/websites").put(updateWebsite).name = "Update Websites";
router.route("/website/:id").delete(deleteWebsite).name = "Delete Websites";

module.exports = router;
