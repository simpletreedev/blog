import { Schema, model, Types } from "mongoose";

const notificationSchema = new Schema({
  sender: { type: Types.ObjectId, ref: "User" },
  receiver: { type: Types.ObjectId, ref: "User" },
  dateCreated: { type: Date, default: Date.now },
  post: { type: Types.ObjectId, ref: "Post" },
  comment: { type: Types.ObjectId, ref: "Comment" },
  notificationType: {
    type: String,
    enum: ["like", "comment", "follow"],
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = model("Notification", notificationSchema);

export default Notification;
