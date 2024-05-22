const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Website = require("../models/websiteModel");

exports.createWebsite = catchAsyncErrors(async (req, res, next) => {
  const { user, websiteName, hostName, websiteStatus, domainName } = req.body;
  const website = await Website.create({
    user,
    websiteName,
    hostName,
    websiteStatus,
    domainName,
  });
  res.status(200).json({
    success: true,
    website,
  });
});

exports.updateWebsite = catchAsyncErrors(async (req, res, next) => {
  const newWebsiteData = {
    user: req.body.userId,
    websiteName: req.body.websiteName,
    hostName: req.body.hostName,
    status: req.body.status,
    domainName: req.body.domainName,
  };

  const website = await Website.findByIdAndUpdate(
    req.body.websiteId,
    newWebsiteData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    website,
  });
});

exports.getAllWebsites = catchAsyncErrors(async (req, res, next) => {
  const websites = await Website.find().populate("user");

  res.status(200).json({
    success: true,
    websites,
  });
});

exports.deleteWebsite = catchAsyncErrors(async (req, res, next) => {
  const website = await Website.findByIdAndDelete(req.params.id);

  if (!website) {
    return next(
      new ErrorHander(`Website does not exist with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    message: "Website Deleted Successfully",
  });
});
