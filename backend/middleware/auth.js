const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let { token } = req.cookies;
  if (req.headers.authorization) {
    token = req.headers.authorization.substring(
      7,
      req.headers.authorization.length
    );
  }

  if (!token || token == "null") {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(
    token,
    process.env.JWT_SECRET ?? "jwtsecretkey"
  );

  req.user = await User.findById(decodedData.id).populate({
    path: "role",
    populate: { path: "permissions", select: "name" },
  });

  next();
});

exports.authorize = (routeName) => {
  return (req, res, next) => {
    const permissions = req.user.role.permissions;

    // Check if any permission matches the given route name
    const permissionFound = permissions.some(
      (permission) => permission.name === routeName
    );

    if (!permissionFound) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role.name} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

// Middleware for impersonation
exports.impersonateUserAuth = catchAsyncErrors(async (req, res, next) => {
  const { impersonateToken } = req.cookies;
  // Check if the authenticated user has permission to impersonate
  if (req.user.role.name !== "admin") {
    return next(
      new ErrorHander(
        `Forbidden: Role: ${req.user.role} is not allowed to access this resouce`,
        403
      )
    );
  }

  // Logic to retrieve user to impersonate, typically from request parameters
  const impersonateUserId = req.params.id;

  // Fetch user information from the database based on impersonatedUserId
  req.impersonateUser = await User.findById(impersonateUserId).populate("role");

  next();
});
