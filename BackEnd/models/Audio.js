import mongoose from "mongoose";

const AudioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AudioModel = mongoose.model("Audio", AudioSchema);

export default AudioModel;