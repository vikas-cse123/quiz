import QuizAttempt from "../model/QuizAttempt.js";

export const checkQuizExist = async (req, res, next) => {
  const quizId = req.params.quizId || req.body.quizId;
  try {
    const quiz = await QuizAttempt.findOne({
      userId: req.user.id,
      _id: quizId,
    });
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    console.log(quiz.id);
    if (quiz.id.toString() !== req.user.currentPlayingQuizId.toString()) {
      return res.status(200).json({
        success: false,
        message: "current playing quiz id and given id are different",
      });
    }

    req.quiz = quiz;
    next();
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
