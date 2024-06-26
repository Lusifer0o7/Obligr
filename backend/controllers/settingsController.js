const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { HomeMenu, HomeSlider, HomeFooter } = require("../models/settingsModel");
const s3 = require("../config/aws-config");
const upload = require("../middleware/uploadFiles");
const fs = require("fs");

// Home Header/Menu

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
    id: req.body.menuId,
    subtitles: req.body.subtitle,
  };

  const menu = await HomeMenu.updateOne(req.body.menuId, newMenuData, {
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

//Home Slider

exports.createHomeSlider = [
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    const { title, description } = req.body;

    console.log("==>", req.file);
    // Upload image to S3
    const uploadParams = {
      Bucket: "thestoreline",
      Key: req.file.originalname,
      Body: fs.createReadStream(req.file.path),
    };

    s3.upload(uploadParams, async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to upload image to S3" });
      }

      const imageUrl = data.Location;

      const homeSlider = new HomeSlider({
        title,
        description,
        image: imageUrl,
      });

      await homeSlider.save();

      res.status(201).json({
        message: "Image uploaded and data saved successfully!",
        homeSlider,
      });
    });
  }),
];

exports.updateHomeSlider = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;
  var { filename, path, size } = req.file;
  path = path.replaceAll("\\", "/");

  const newHomeSliderData = {
    title,
    description,
    image: {
      filename,
      path,
      size,
    },
  };

  const homeSlider = await HomeSlider.findByIdAndUpdate(
    req.body.homeSliderId,
    newHomeSliderData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    homeSlider,
  });
});

exports.getAllHomeSliders = catchAsyncErrors(async (req, res, next) => {
  const homeSliders = await HomeSlider.find();

  res.status(200).json({
    success: true,
    homeSliders,
  });
});

exports.deleteHomeSlider = catchAsyncErrors(async (req, res, next) => {
  const homeSlider = await HomeSlider.findByIdAndDelete(req.params.id);

  if (!homeSlider) {
    return next(
      new ErrorHander(
        `HomeSlider does not exist with Id: ${req.params.id}`,
        400
      )
    );
  }

  res.status(200).json({
    success: true,
    message: "HomeSlider Deleted Successfully",
  });
});

//Home Footer

exports.getHomeFooter = catchAsyncErrors(async (req, res, next) => {
  const homeFooter = await HomeFooter.find();

  res.status(200).json({
    success: true,
    homeFooter,
  });
});

exports.updateHomeFooter = catchAsyncErrors(async (req, res, next) => {
  const newHomeFooterData = {
    heading: req.body.heading,
    subheading: req.body.subheading,
    links: req.body.links,
    icons: req.body.icons,
    contactInfo: req.body.contactInfo,
    copyrightInfo: req.body.copyrightInfo,
  };

  const footer = await HomeFooter.findByIdAndUpdate(
    req.body.footerId,
    newHomeFooterData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    footer,
  });
});
