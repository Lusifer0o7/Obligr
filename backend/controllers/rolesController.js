const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { Role } = require("../models/roleModel");

exports.createRole = catchAsyncErrors(async (req, res, next) => {
  const { name, permissions } = req.body;
  const role = await Role.create({
    name,
    permissions,
  });
  res.status(200).json({
    success: true,
    role,
  });
});

exports.updateRole = catchAsyncErrors(async (req, res, next) => {
  const newRoleData = {
    name: req.body.name,
    permissions: req.body.permissions,
  };

  const role = await Role.findByIdAndUpdate(req.body.roleId, newRoleData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    role,
  });
});

exports.getAllRoles = catchAsyncErrors(async (req, res, next) => {
  const roles = await Role.find();

  res.status(200).json({
    success: true,
    roles,
  });
});

exports.deleteRole = catchAsyncErrors(async (req, res, next) => {
  const role = await Role.findByIdAndDelete(req.params.id);

  if (!role) {
    return next(
      new ErrorHander(`Role does not exist with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    message: "Role Deleted Successfully",
  });
});
