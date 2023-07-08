import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User" },
  dateCreated: { type: Date, default: Date.now },
  parentId: { type: Types.ObjectId, ref: "Comment" },
  parentPost: { type: Types.ObjectId, required: true, ref: "Post" },
  likes: [{ type: Types.ObjectId, ref: "User" }],
});

const Comment = model("Comment", commentSchema);

export default Comment;
