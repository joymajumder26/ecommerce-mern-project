const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");
const { createJSONWebToken } = require("../helper/jsonWebToken");
const { jwtAccessKey } = require("../secret");

const handleLogin = async (req, res, next) => {
  try {
    //email,password req.body
    const { email, password } = req.body;
    //isExist
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(
        404,
        "User does not exist with this email. Please register first"
      );
    }

    //compare the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "Email/password did not match");
    }
    //isBanned

    if (user.isBanned) {
      throw createError(403, "You are Banned. Please contact authority");
    }


    //token, cookie
    //CREATE JWT
    const accessToken = createJSONWebToken( {user} , jwtAccessKey, "15m");
    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, //15 minutes
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    const userWithoutPassword = await User.findOne({ email }).select('-password');
    //success Response
    return successResponse(res, {
      statusCode: 200,
      message: "users Logged in Successfully",
      payload: {
        userWithoutPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};
const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    //success Response
    return successResponse(res, {
      statusCode: 200,
      message: "users Logged out Successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleLogin, handleLogout };
