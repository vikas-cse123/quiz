import { Schema, model } from "mongoose";
const defaultAvatarSchema = new Schema(
  {
    avatar: {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

const DefaultAvatar = model("DefaultAvatar", defaultAvatarSchema);
export default DefaultAvatar;
