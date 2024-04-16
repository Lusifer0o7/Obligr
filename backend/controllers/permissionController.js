const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { Permission } = require("../models/roleModel");

exports.getAllPermissions = catchAsyncErrors(async (req, res, next) => {
  const permissions = await Permission.find();

  res.status(200).json({
    success: true,
    permissions,
  });
});
