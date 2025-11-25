import express from "express";
import {
  checkAnswer,
  createQuiz,
  deleteQuiz,
  endQuiz,
  getQuestion,
  getQuizHistory,
  quizResult,
  startQuiz,
} from "../controllers/quizController.js";
import { checkQuizExist } from "../utils/checkQuizExists.js";
const router = express.Router();

router.post("/create", createQuiz);
router.post("/start:quizId", checkQuizExist, startQuiz);
router.post("/end/:quizId", checkQuizExist, endQuiz);
router.post("/check-ans/:questionNumber", checkQuizExist, checkAnswer);
router.get("/result/:quizId", checkQuizExist, quizResult);
router.post("/question/:questionNumber", checkQuizExist, getQuestion);
router.get("/history", getQuizHistory);
router.delete("/:quizId", checkQuizExist, deleteQuiz);
export default router;
