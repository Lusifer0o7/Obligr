const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  registerUserAdmin,
  impersonateUser,
  sendEmailOtp,
  verifyEmailOtp,
  sendMobileOtp,
  verifyMobileOtp,
  userCount,
  resendOtp,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  authorize,
  impersonateUserAuth,
} = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser).name = "Register User";

router
  .route("/registeruseradmin")
  .post(isAuthenticatedUser, authorize("Create User"), registerUserAdmin).name =
  "Create User";

router.route("/login").post(loginUser).name = "Login User";

router.route("/password/forgot").post(forgotPassword).name = "Forgot Password";

router.route("/send/emailotp").post(sendEmailOtp).name = "Send Email Otp";
router.route("/verify/emailotp").post(verifyEmailOtp).name = "Verify Email Otp";

router.route("/send/mobileotp").post(sendMobileOtp).name = "Send Mobile Otp";
router.route("/verify/mobileotp").post(verifyMobileOtp).name =
  "Verify Mobile Otp";

router.route("/resend/otp").post(resendOtp).name = "Resend Otp";

router.route("/user-count").get(userCount).name = "Get Users Count";

router.route("/password/reset/:token").put(resetPassword).name =
  "Reset Password";

router.route("/logout").get(logout).name = "Logout";

router.route("/me").get(isAuthenticatedUser, getUserDetails).name =
  "Show Profile";

router.route("/password/update").put(isAuthenticatedUser, updatePassword).name =
  "Update Password";

router.route("/me/update").put(isAuthenticatedUser, updateProfile).name =
  "Update Profile";

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorize("Get All Users"), getAllUser).name =
  "Get All Users";

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorize("Get Single User"), getSingleUser).name =
  "Get Single User";

router
  .route("/admin/user/:id")
  .put(
    isAuthenticatedUser,
    authorize("Update User Role"),
    updateUserRole
  ).name = "Update User Role";

router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorize("Delete User"), deleteUser).name =
  "Delete User";

router
  .route("/admin/impersonate/:id")
  .get(
    isAuthenticatedUser,
    authorize("Impersonate User"),
    impersonateUser
  ).name = "Impersonate User";

module.exports = router;
