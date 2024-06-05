const express = require("express");
const {
  createMenu,
  deleteMenu,
  getAllMenus,
  updateMenu,
  createHomeSlider,
  getAllHomeSliders,
  getHomeFooter,
  updateHomeFooter,
  updateHomeSlider,
  deleteHomeSlider,
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

router.route("/get/home-sliders").get(getAllHomeSliders).name =
  "Get All Home-Slider";

router.route("/update/home-sliders").put(updateHomeSlider).name =
  "Update Home-Slider";

router.route("/delete/home-slider").delete(deleteHomeSlider).name =
  "Delete Home-Slider";

//home footer routes
router.route("/get/home-footer").get(getHomeFooter).name = "Get Home-Footer";
router.route("/update/home-footer").get(updateHomeFooter).name =
  "Update Home-Footer";

module.exports = router;
