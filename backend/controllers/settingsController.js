const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { HomeMenu } = require("../models/settingsModel");

exports.createMenu = catchAsyncErrors(async (req, res, next) => {
  const { title, subtitles } = req.body;
  const menu = await HomeMenu.create({
    title,
    subtitles,
  });
  res.status(200).json({
    success: true,
    menu,
  });
});

exports.getAllMenus = catchAsyncErrors(async (req, res, next) => {
  const menus = await HomeMenu.find();

  res.status(200).json({
    success: true,
    menus,
  });
});

exports.updateMenu = catchAsyncErrors(async (req, res, next) => {
  const newMenuData = {
    title: req.body.title,
    subtitles: req.body.subtitles,
  };

  const menu = await HomeMenu.findByIdAndUpdate(req.body.menuId, newMenuData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    menu,
  });
});

exports.deleteMenu = catchAsyncErrors(async (req, res, next) => {
  const menu = await HomeMenu.findByIdAndDelete(req.params.id);

  if (!menu) {
    return next(
      new ErrorHander(`Menu does not exist with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    message: "Menu Deleted Successfully",
  });
});
