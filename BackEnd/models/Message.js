import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    audio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Audio",
      required: true,
    },
    sender: {
      type: String,
      enum: ["bot", "user"],
      required: true,
      default: "user",
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
);

const Message = mongoose.model("Message", MessageSchema);

export default Message;