const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  console.log(req);

  // if user.role==admin && impersonateToken
  // {const decodedData = jwt.verify(impersonateToken, process.env.JWT_SECRET);
  // req.user = await User.findById(decodedData.id);}

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
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
  if (req.user.role !== "admin") {
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
  req.impersonateUser = await User.findById(impersonateUserId);

  next();
});
