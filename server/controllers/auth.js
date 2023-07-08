import {
  comparePw,
  hashPw,
  registerValidator,
  uploadToCloudinary,
} from "../utils/index.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
import createError from "http-errors";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt.js";
import client from "../helpers/connectRedis.js";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/drkvr9wta/image/upload/v1647701003/undraw_profile_pic_ic5t_ncxyyo.png";

export const register = async (req, res, next) => {
  try {
    // check valid input ?
    const { errors } = await registerValidator.validateAsync(req.body);
    if (errors) throw createError.BadRequest(errors.details[0].message);

    const { name, email, password } = req.body;

    // check user is existing
    const existingUser = await User.findOne({ email });
    if (existingUser) throw createError.Conflict(`${email} already exists.`);

    // handle avatar user ?
    const imageUrl = await uploadToCloudinary(req.file);

    // hash password
    const pwHashed = await hashPw(password);

    // create new user
    const createdUser = await User.create({
      name,
      email,
      password: pwHashed,
      avatar: imageUrl,
    });

    const user = await createdUser.save(); // save user

    // generate access token
    const accessToken = await signAccessToken(createdUser._id);
    const refreshToken = await signRefreshToken(createdUser._id);

    return res.status(200).json({
      message: "User created successfully",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location,
        joinDate: user.joinDate,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // check user is existing ?
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw createError.NotFound("User does not exists.");

    // check password is valid ?
    const isMatch = await comparePw(req.body.password, user.password);
    if (!isMatch)
      throw createError.Unauthorized("Email or password is incorrect.");

    // generate access token
    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        location: user.location,
        joinDate: user.joinDate,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRefreshToken = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await client.get(userId, (err, result) => {
      if (err) {
        console.log(err.message);
        throw createError.InternalServerError();
      }
      return res.status(200).json({ refreshToken: result });
    });
  } catch (error) {
    next(error);
  }
};

export const generateNewToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.Unauthorized();

    const userId = await verifyRefreshToken(refreshToken);

    const newAccessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);

    res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const userId = await verifyRefreshToken(refreshToken);

    await client.del(userId, (err, val) => {
      if (err) {
        // console.log(err.message, "deleted");
        // throw createError.InternalServerError();
        return res.status(500).json({message: "loi logout", err})
      }
      // console.log(val);
      return res.status(200).json({ message: "You have been logged out", val });
    });
  } catch (error) {
    next(error);
  }
};
