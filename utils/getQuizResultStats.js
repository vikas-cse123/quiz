import { calculateGrade } from "./calculateGrade.js";

export const getQuizResultStats = (quiz) => {
  const {
    totalQuestions,
    correctAnswerCount,
    currentScore,
    totalScore,
    multipleQuestionCount,
    booleanQuestionCount,
    easyQuestions,
    mediumQuestions,
    hardQuestions,
    wrongAnswerCount,
    status,
  } = quiz;

  const skipQuestonCount =
    totalQuestions - correctAnswerCount - wrongAnswerCount;
  const attemptQuestionCount = totalQuestions - skipQuestonCount;
  const { remarks, grade } = calculateGrade(currentScore, totalScore);

  const stats = {
    totalQuestions,
    correctAnswerCount,
    wrongAnswerCount,
    skipQuestonCount,
    attemptQuestionCount,
    currentScore,
    totalScore,
    multipleQuestionCount,
    booleanQuestionCount,
    easyQuestions,
    mediumQuestions,
    hardQuestions,
    remarks,
    grade,
    status,
  };
  return stats;
};
