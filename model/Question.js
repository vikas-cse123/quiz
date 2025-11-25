import { Schema, model } from "mongoose";
const questionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["multiple", "boolean"],
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    incorrectAnswers: {
      type: [String],
      // required: true,
    },
    options:{
      type:[String],
      required:true
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Question = model("Question", questionSchema);
export default Question;
