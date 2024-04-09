// Create Token and saving in cookie

const sendToken = (user, statusCode, res, isImpersonate = false) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  if (isImpersonate == false) {
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } else {
    res.status(statusCode).cookie("impersonateToken", token, options).json({
      success: true,
      impUser: user,
      token,
    });
  }
};

module.exports = sendToken;
