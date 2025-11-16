import express from "express";
import {
  checkAnswer,
  createQuiz,
  deleteQuiz,
  getQuestion,
  getQuizHistory,
  quizResult,
} from "../controllers/quizController.js";
import { checkAuth } from "../middlewares/checkAuth.js";
const router = express.Router();

router.post("/create", checkAuth, createQuiz);
router.post("/check-ans", checkAuth, checkAnswer);
router.post("/result", checkAuth, quizResult);
router.post("/question/:questionId", checkAuth, getQuestion);
router.get("/history", checkAuth, getQuizHistory);
router.delete("/:quizId", deleteQuiz);
export default router;
