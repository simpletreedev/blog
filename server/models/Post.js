import { Schema, model, Types } from "mongoose";

const postSchema = new Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String },
  views: { type: Number, default: 0 },
  author: { type: Types.ObjectId, ref: "User" },
  dateCreated: { type: Date, default: Date.now },
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
  bookmarks: [{ type: Types.ObjectId, ref: "User" }],
  categories: {
    type: String,
    enum: [
      "All",
      "Data Breaches",
      "Cyber Attacks",
      "Vulnerablilities",
      "Webinars",
    ],
  },
});

const Post = model("Post", postSchema);

export default Post;
