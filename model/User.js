import { Schema, model } from "mongoose";
import { mongoose } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters long."],
      maxlength: [30, "Full name cannot exceed 30 characters."],
    },

    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long."],
      maxlength: [30, "Username cannot exceed 30 characters."],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores.",
      ],
      unique: true, // handled at DB level — we’ll still check manually in backend
    },

    email: {
      type: String,
      required: [true, "Email address is required."],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address.",
      ],
      unique: true, // add this to prevent duplicates
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password must be at least 6 characters long."],
    },
    currentPlayingQuizId: {
      type: Schema.Types.Mixed,
      default: null,
      validate: {
        validator: function (value) {
          console.log(`${this.currentPlayingQuizId},"**************"`);
          if (
            typeof value === "null" ||
            value instanceof mongoose.Types.ObjectId
          ) {
            return true;
          } else {
            return false;
          }
        },
        message: "Current playing quiz can only be null or objectID",
      },
    },
    quizHistory: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const User = model("User", userSchema);
export default User;
