import express from "express";
import { checkAnswer, createQuiz } from "../controllers/quizController.js";
import { checkAuth } from "../middlewares/checkAuth.js";
const router = express.Router();

router.post("/create", checkAuth, createQuiz);
router.post("/check-ans", checkAuth, checkAnswer);
export default router;
