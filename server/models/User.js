import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  avatar: { type: String },
  bio: { type: String },
  location: { type: String },
  joinDate: { type: Date, default: Date.now() },
  posts: [{ type: Types.ObjectId, ref: "Post" }],
  following: [{ type: Types.ObjectId, ref: "User" }],
  followers: [{ type: Types.ObjectId, ref: "User" }],
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
  bookmarks: [{ type: Types.ObjectId, ref: "Post" }],
});

const User = model("User", userSchema);

export default User;
