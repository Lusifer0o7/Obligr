const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const multer = require("multer");
const qs = require("qs");
const axios = require("axios");
const ApiFeatures = require("../utils/apifeatures");

const upload = multer({ dest: "uploads/" });

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;
  const { avatar } = req.file;

  const user = await User.create({
    avatar: avatar
      ? {
          data: avatar.buffer,
          contentType: avatar.mimetype,
        }
      : null,
    firstName,
    lastName,
    email,
    phone,
    password,
  });

  sendToken(user, 201, res);
});

//Admin -> Create User
exports.registerUserAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email })
    .select("+password")
    .populate({
      path: "role",
      populate: { path: "permissions" },
    });

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

exports.impersonateUser = catchAsyncErrors(async (req, res, next) => {
  const impersonateUserId = req.params.id;

  const impersonateUser = await User.findById(impersonateUserId).populate({
    path: "role",
    populate: { path: "permissions" },
  });

  if (!impersonateUser) {
    return next(new ErrorHander("User not found", 401));
  }

  sendToken(impersonateUser, 200, res, true);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  // res.cookie("token", null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true,
  //   sameSite: "None",
  //   secure,
  // });

  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.sendEmailOtp = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  let options = {
    email_id: email,
    type: "email",
    sender_id: "OBLIGR",
    message:
      "Dear . @$name .\n\nUse : ##OTP##\nUse it on your Signup Page\n\nValid : 1 Min\n\nWelcome Onboard\nTeam Obligr",
    dlt_template_id: "1207163870142839117",
    expire_time: "180",
    otp_length: "6",
    country_code: "IN",
  };

  const config = {
    data: options,
    headers: {
      Authorization:
        "Bearer pK8K0FHXDVCJSWmLCYQKMugITn3safPWzc9nsTwMa18vBbk5Q9C1SMKwyEV2qShZ",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    withCredentials: true,
  };

  const { data } = await axios.post(
    "https://obligr.io/api_v2/tfa/send",
    options,
    config
  );

  if (!data.success) {
    return next(new ErrorHander(`${data.error}`, 500));
  } else {
    res
      .status(200)
      .cookie("verify_key", data.data.verify_key, options)
      .json({ success: true, message: "OTP sent successfully", data });
  }
});

exports.verifyEmailOtp = catchAsyncErrors(async (req, res, next) => {
  const { verify_key } = req.cookies;
  const { emailOtp } = req.body;
  let options = {
    verify_key,
    otp: emailOtp,
  };

  const config = {
    data: options,
    headers: {
      Authorization:
        "Bearer pK8K0FHXDVCJSWmLCYQKMugITn3safPWzc9nsTwMa18vBbk5Q9C1SMKwyEV2qShZ",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    withCredentials: true,
  };

  const { data } = await axios.post(
    "https://obligr.io/api_v2/tfa/verify",
    options,
    config
  );

  if (!data.success) {
    return next(new ErrorHander(`${data.error}`, 500));
  } else {
    res
      .status(200)
      .json({ success: true, message: `${data.data.message}`, data });
  }
});

exports.sendMobileOtp = catchAsyncErrors(async (req, res, next) => {
  const { phone, country_code } = req.body;
  let options = {
    mobile_no: phone,
    type: "sms,whatsapp",
    caller_id: "8824401044",
    sender_id: "OBLIGR",
    message:
      "Dear . @$name .\n\nUse : ##OTP##\nUse it on your Signup Page\n\nValid : 1 Min\n\nWelcome Onboard\nTeam Obligr",
    dlt_template_id: "1207163870142839117",
    expire_time: "180",
    otp_length: "6",
    country_code: country_code,
  };

  const config = {
    data: options,
    headers: {
      Authorization:
        "Bearer pK8K0FHXDVCJSWmLCYQKMugITn3safPWzc9nsTwMa18vBbk5Q9C1SMKwyEV2qShZ",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    withCredentials: true,
  };

  const { data } = await axios.post(
    "https://obligr.io/api_v2/tfa/send",
    options,
    config
  );

  if (!data.success) {
    return next(new ErrorHander(`${data.error}`, 500));
  } else {
    res
      .status(200)
      .cookie("verify_key", data.data.verify_key, options)
      .json({ success: true, message: "OTP sent successfully", data });
  }
});

exports.verifyMobileOtp = catchAsyncErrors(async (req, res, next) => {
  const { verify_key } = req.cookies;
  const { mobileOtp } = req.body;
  let options = {
    verify_key,
    otp: mobileOtp,
  };

  const config = {
    data: options,
    headers: {
      Authorization:
        "Bearer pK8K0FHXDVCJSWmLCYQKMugITn3safPWzc9nsTwMa18vBbk5Q9C1SMKwyEV2qShZ",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    withCredentials: true,
  };

  const { data } = await axios.post(
    "https://obligr.io/api_v2/tfa/verify",
    options,
    config
  );

  if (!data.success) {
    return next(new ErrorHander(`${data.error}`, 500));
  } else {
    res
      .status(200)
      .json({ success: true, message: `${data.data.message}`, data });
  }
});

exports.resendOtp = catchAsyncErrors(async (req, res, next) => {
  const { verify_key } = req.cookies;
  const { email } = req.body;
  const { phone } = req.body;

  let options = {
    verify_key,
    email_id: email,
    mobile_no: phone,
  };

  const config = {
    data: options,
    headers: {
      Authorization:
        "Bearer pK8K0FHXDVCJSWmLCYQKMugITn3safPWzc9nsTwMa18vBbk5Q9C1SMKwyEV2qShZ",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    withCredentials: true,
  };

  const { data } = await axios.post(
    "https://obligr.io/api_v2/tfa/send?mobile",
    options,
    config
  );

  if (!data.success) {
    return next(new ErrorHander(`${data.error}`, 500));
  } else {
    res
      .status(200)
      .json({ success: true, message: `${data.data.message}`, data });
  }
});

exports.userCount = catchAsyncErrors(async (req, res, next) => {
  const userCount = await User.countDocuments();

  res.status(200).json({
    success: true,
    userCount,
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "role",
    populate: { path: "permissions" },
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8; // Number of users per page

  // Get total count of users
  const usersCount = await User.countDocuments();

  // Create an instance of ApiFeatures for User model
  const apiFeature = new ApiFeatures(User, req.query).search();

  // Apply pagination
  apiFeature.pagination(resultPerPage);

  // Execute the query with pagination
  const users = await apiFeature.query.populate({
    path: "role",
    select: "name",
  });

  // Send response
  res.status(200).json({
    success: true,
    users,
    usersCount,
    resultPerPage,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("role");

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
