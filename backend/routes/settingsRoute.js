const express = require("express");
const {
  createMenu,
  deleteMenu,
  getAllMenus,
  updateMenu,
  createHomeSlider,
} = require("../controllers/settingsController");

const { isAuthenticatedUser, authorizeMenus } = require("../middleware/auth");

const router = express.Router();

// home menu routes
router.route("/create/home-menu").post(createMenu).name = "Create Home-Menus";
router.route("/get/home-menus").get(getAllMenus).name = "Get All Home-Menus";
router.route("/update/home-menus").put(updateMenu).name = "Update Home-Menus";
router.route("/home-menu/:id").delete(deleteMenu).name = "Delete Home-Menus";

//home slider routes
router.route("/create/home-slider").post(createHomeSlider).name =
  "Create Home-Slider";

module.exports = router;
