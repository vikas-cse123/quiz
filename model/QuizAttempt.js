import { Schema, model } from "mongoose";

const quizAttemptSchema = new Schema({
  allQuestions: {
    type: [
      {
        questionId: { type: Schema.Types.ObjectId, required: true },
        userChoosenOPtion: { type: String },
        isCorrect: { type: Boolean },
        isAttempt: { type: Boolean, required: true },
      },
    ],
    required: true,
    validate: {
      validator: function (value) {
        console.log(this, "ssssssssssssssssssssssssssssssssssssss");
        if (value.length === this.totalQuestions) {
          return true;
        } else {
          return false;
        }
      },
      message: `Total Questions and all Questions are different in length`,
    },
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  multipleQuestionCount: {
    type: Number,
    required: true,
  },
  booleanQuestionCount: {
    type: Number,
    required: true,
  },
  easyQuestions: {
    type: Number,
    required: true,
    // default:0,
    validate: {
      validator: function (value) {
        if (
          this.easyQuestions + this.mediumQuestions + this.hardQuestions ===
          this.totalQuestions
        ) {
          return true;
        } else {
          return false;
        }
      },
      message: `Sum of easy+medium+hard question is not equal to total questions`,
    },
  },
  mediumQuestions: {
    type: Number,
    required: true,
  },
  hardQuestions: {
    type: Number,
    required: true,
  },

  currentScore: {
    type: Number,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  timeForEachQuestionInSec: {
    type: Number,
    default: 0,
  },
});

const QuizAttempt = model("QuizAttempt", quizAttemptSchema);

export default QuizAttempt;

// const quiz = {
//   allQuestions: [
//     { questionId: 123, userChoosenOPtion: "virat", isCorrect: true },
//     { questionId: 128, userChoosenOPtion: "pop", isCorrect: false },
//     { questionId: 985, userChoosenOPtion: "" },
//   ],
//   totalQuestions: 10,
//   currentScore: 45,
//   totalScore: 10 * 50,
//   isQuizCompleted: false,
//   userId: 788,
//   timeForEachQuestion: 0,
// };

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function (value) {
//         return /^[a-zA-Z0-9_]+$/.test(value);   // only letters, numbers, underscores
//       },
//       message: "Username is invalid",
//     },
//   },
// });
