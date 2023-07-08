import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/index.js";

export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId, "-password").populate({
      path: "posts",
    });

    return res.status(200).json({ message: "Get user profile.", user });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, email, bio, location } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file);
    }

    const dataUpdated = {
      name,
      email,
      bio,
      location,
      avatar: imageUrl,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, dataUpdated, {
      new: true,
    });

    if (!updatedUser)
      return res.status(400).json({ message: "Can not update user profile." });

    return res.status(200).json({
      message: "Updated user successfully.",
      user: {
        userId: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
        location: updatedUser.location,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const followUser = async (req, res, next) => {
  try {
    const { friendId } = req.body;
    const { userId } = req.params;

    // check friend is existing
    const friendUser = await User.findById(friendId);
    if (!friendUser)
      return res.status(404).json({ message: "This user not found." });

    if (userId.toString() === friendId.toString())
      return res.status(409).json({ message: "You can't follow yourself." });

    await User.findById(userId).then(async (user) => {
      if (user.following.includes(friendId)) {
        user.following.pull(friendId);
      } else {
        user.following.push(friendId);
      }

      await user.save();
    });
  } catch (error) {
    return next(error);
  }
};

export const getPostBookmarks = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const posts = await User.findById(userId)
      .populate({
        path: "bookmarks",
        populate: {
          path: "author",
          select: ["name", "avatar"],
        },
        select: ["title", "desc", "image", "dateCreated", "categories"],
      })
      .select(["_id"]);

    return res
      .status(200)
      .json({
        message: "Get posts bookmarks successfully",
        posts: posts.bookmarks,
      });
  } catch (error) {
    return next(error);
  }
};
