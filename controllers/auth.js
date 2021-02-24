const asyncHandler = require("../middleware/asynHandler");
const User = require("../models/User");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email & password
  if (!email || !password) {
    // return next(new ErrorResponse(`Please provide an email and password`, 400));
    return res
      .status(401)
      .json({ success: false, error: "Please provide an email and password" });
  }
  //Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    // return next(new ErrorResponse(`Invalid credentials`, 401));
    return res
      .status(401)
      .json({ success: false, error: "Invalid credentials" });
  }
  //Check for password entered
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    // return next(new ErrorResponse(`Invalid credentials`, 401));
    return res
      .status(401)
      .json({ success: false, error: "Invalid credentials" });
  }

  sendTokenResponse(user, 200, res);

});
//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if(process.env.NODE_ENV === 'production') {
      options.secure = true
  }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
