import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/index.js";
import dotenv from "dotenv";
import { getViewCount } from "../helpers/redis.js";
dotenv.config();

const {
  PAGE_DEFAULT,
  PAGE_LIMIT,
  POST_LIMIT_TRENDING,
  POST_LIMIT_BREAKING,
  COMMENT_LIMIT,
} = process.env;

// CREATE NEW POST
export const createPost = async (req, res, next) => {
  try {
    const { title, desc, author, categories } = req.body;

    if (!title || !desc)
      return res.status(400).json({ message: "Invalid content." });

    const imageUrl = await uploadToCloudinary(req.file);
    const newPost = await Post.create({
      title,
      desc,
      author,
      categories,
      image: imageUrl,
    });

    await newPost.save();

    await User.findById(author).then(async (user) => {
      user.posts.push(newPost);
      await user.save();
    });

    return res
      .status(200)
      .json({ message: "Created post successfully.", post: newPost });
  } catch (error) {
    return next(error);
  }
};

// GET ALLS POST
export const getAllPosts = async (req, res, next) => {
  try {
    const cat = req.query.cat || "All";
    const page = req.query.page || PAGE_DEFAULT;
    const postPerPage = PAGE_LIMIT;

    let posts = await Post.find()
      .populate("author", ["name"])
      .sort({ dateCreated: "desc" })
      .skip(page * postPerPage)
      .limit(postPerPage);

    if (cat !== "All") {
      posts = posts.filter((post) => post.categories == cat);
    }

    return res.status(200).json({
      message: "Get all posts successfully.",
      posts,
    });
  } catch (error) {
    return next(error);
  }
};

// GET POST TRENDING
export const getPostTrending = async (req, res, next) => {
  try {
    const postLimit = POST_LIMIT_TRENDING;

    const posts = await Post.find().limit(postLimit);

    return res.status(200).json({ message: "Get posts trending.", posts });
  } catch (error) {
    return next(error);
  }
};

// GET POST TRENDING
export const getPostBreaking = async (req, res, next) => {
  try {
    const postLimit = POST_LIMIT_BREAKING;

    const posts = await Post.find().limit(postLimit);

    return res.status(200).json({ message: "Get posts trending.", posts });
  } catch (error) {
    return next(error);
  }
};

// GET POSTS BY ID
export const getPostById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const viewCount = await getViewCount(postId);

    const postData = await Post.findById(postId)
      .populate("author", ["name"])
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: ["name", "avatar"],
        },
        options: {
          sort: { dateCreated: "desc" },
        },
      });

    const post = { ...postData?.toJSON(), views: viewCount };

    return res
      .status(200)
      .json({ message: "Get a post by id successfully.", post });
  } catch (error) {
    return next(error);
  }
};

// GET ALL POSTS BY USER ID
export const getPostsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ author: userId }).populate("author");

    return res
      .status(200)
      .json({ message: "Get posts by user id successfully.", posts });
  } catch (error) {
    return next(error);
  }
};

// UPDATE POST
export const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { title, desc, categories } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file);
    }

    const dataUpdated = { title, desc, categories, image: imageUrl };

    const postUpdated = await Post.findByIdAndUpdate(postId, dataUpdated, {
      new: true,
    });
    if (!postUpdated)
      return res.status(400).json({
        message: "Can not update this post. Please try again.",
      });

    return res
      .status(200)
      .json({ message: "Post has been updated.", postUpdated });
  } catch (error) {
    return next(error);
  }
};

// REMOVE POST
export const removePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const postRemoved = await Post.findByIdAndDelete(postId);
    if (!postRemoved)
      return res.status(400).json({ message: "Can not removed post" });
    return res
      .status(200)
      .json({ message: "Post has been removed!", postRemoved });
  } catch (error) {
    return next(error);
  }
};

// SAVED POST
export const bookmarkPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    await Post.findById(postId).then(async (post) => {
      // check if post is existing ?
      if (!post) return res.status(404).json({ message: "Post not found." });

      if (post.bookmarks?.includes(userId)) {
        post.bookmarks?.pull(userId);
      } else {
        post.bookmarks?.push(userId);
      }

      await post.save();
    });

    await User.findById(userId).then(async (user) => {
      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.bookmarks?.includes(postId)) {
        user.bookmarks?.pull(postId);
      } else {
        user.bookmarks?.push(postId);
      }

      await user.save();
    });

    return res.status(200).json({ message: "You have been saved this post." });
  } catch (error) {
    return next(error);
  }
};

// GET POST SEARCH
export const getPostSearch = async (req, res, next) => {
  try {
    const title = req.query.title;
    const query = { $regex: title, $options: "i" };

    const posts = await Post.find({ title: query })
      .populate("author", ["name"])
      .limit(PAGE_LIMIT);

    if (!posts)
      return res
        .status(404)
        .json({ message: "Not search results. Please try again." });

    return res
      .status(200)
      .json({ message: "Get posts search by title", posts });
  } catch (error) {
    return next(error);
  }
};
