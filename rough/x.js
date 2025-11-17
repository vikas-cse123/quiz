import mongoose from "mongoose";

const defaultAvatarSchema = new mongoose.Schema({
  avatar: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const DefaultAvatar = mongoose.model("DefaultAvatar", defaultAvatarSchema);
