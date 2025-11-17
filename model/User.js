import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long."],
      maxlength: [30, "Name cannot exceed 30 characters."],
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
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
    },
    currentPlayingQuizId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    quizHistory: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    avatar: {
      data: {
        type:Buffer,
        default:null
      },
      contentType: {
        type:String,
        default:null
      }
      
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: { type: Date },
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
