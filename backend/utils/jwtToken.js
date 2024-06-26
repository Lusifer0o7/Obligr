// Create Token and saving in cookie

const sendToken = (user, statusCode, res, isImpersonate = false) => {
  const token = user.getJWTToken();

  // options for cookie
  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  //   sameSite: "None",
  //   secure: true,
  // };

  const cookieName = `token`;
  const responseData = { success: true, user, token };

  res.status(statusCode).cookie(cookieName, token).json(responseData);
};

module.exports = sendToken;
