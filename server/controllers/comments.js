import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// CREATE NEW COMMENT
export const createComment = async (req, res, next) => {
  try {
    const { content, author, parentPost, parentId } = req.body;

    const commnet = await Comment.create({
      content,
      author,
      parentPost,
      parentId,
    });

    await commnet.save();

    await Post.findById(parentPost).then(async(post) => {
      post.comments?.push(commnet);
      await post.save();
    });

    return res
      .status(200)
      .json({ message: "Create comment successfully", commnet });
  } catch (error) {
    return next(error);
  }
};

// GET COMMENTS BY POST ID
export const getCommentsByPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findById(postId).populate("author", [
      "name",
      "avatar",
    ]);

    return res
      .status(200)
      .json({ message: "Get all comments of post.", comments });
  } catch (error) {
    return next(error);
  }
};
