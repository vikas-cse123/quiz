import { getQuizResultStats } from "../utils/getQuizResultStats.js";
import Question from "../model/Question.js";
import QuizAttempt from "../model/QuizAttempt.js";

const eachDiffcultyScore = {
  easy: 1,
  medium: 3,
  hard: 5,
};

const getQuizDiffcultyAndTypeStats = (quiz) => {
  let stats = {
    difficultyCount: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    questionTypeCount: {
      boolean: 0,
      multiple: 0,
    },
  };
  quiz.forEach(({ difficulty, type }) => {
    if (difficulty === "easy") {
      stats.difficultyCount["easy"] = stats.difficultyCount["easy"] + 1;
    } else if (difficulty === "medium") {
      stats.difficultyCount["medium"] = stats.difficultyCount["medium"] + 1;
    } else if (difficulty === "hard") {
      stats.difficultyCount["hard"] = stats.difficultyCount["hard"] + 1;
    }
    //for question type
    if (type === "multiple") {
      stats.questionTypeCount.multiple = stats.questionTypeCount.multiple + 1;
    } else if (type === "boolean") {
      stats.questionTypeCount.boolean = stats.questionTypeCount.boolean + 1;
    }
  });

  return stats;
};

const getOptions = (correctAnswer, incorrectAnswers) => {
  const allOptions = [correctAnswer, ...incorrectAnswers];
  const randomizedOptions = [];
  const usedIndexes = [];
  while (randomizedOptions.length !== allOptions.length) {
    const randomIndex = Math.floor(Math.random() * allOptions.length);
    if (!usedIndexes.includes(randomIndex)) {
      randomizedOptions.push(allOptions[randomIndex]);
      usedIndexes.push(randomIndex);
    }
  }

  return randomizedOptions;
};
export const createQuiz = async (req, res) => {
  const user = req.user;

  let { category, totalQuestions, difficulty, type, quizTimeInSeconds } =
    req.body;
  //vikas-gpt ask if it good way to lowercase or not
  difficulty = difficulty.toLowerCase();
  type = type.toLowerCase();
  let quiz = (
    await Question.aggregate([
      {
        $match: {
          category: {
            $in:
              category === "mix" ? ["General Knowledge", "Sports"] : [category],
          },
          difficulty: {
            $in:
              difficulty === "mix" ? ["easy", "medium", "hard"] : [difficulty],
          },
          type: { $in: type === "mix" ? ["multiple", "boolean"] : [type] },
        },
      },
      {
        $sample: { size: totalQuestions },
      },
    ])
  ).map(
    ({
      type,
      difficulty,
      category,
      question,
      correctAnswer,
      incorrectAnswers,
      _id,
    }) => {
      return {
        type,
        difficulty,
        category,
        question,
        options: getOptions(correctAnswer, incorrectAnswers),
        id: _id,
      };
    },
  );

  //vikas-gpt:is it good way to take value in variable likr this
  let totalScore;
  let difficultyStats;
  let questionTypeCount;

  if (difficulty === "mix") {
    const stats = getQuizDiffcultyAndTypeStats(quiz);
    difficultyStats = stats.difficultyCount;
    questionTypeCount = stats.questionTypeCount;
    totalScore =
      difficultyStats.easy * eachDiffcultyScore.easy +
      difficultyStats.medium * eachDiffcultyScore.medium +
      difficultyStats.hard * eachDiffcultyScore.hard;
  } else {
    totalScore = totalQuestions * eachDiffcultyScore[difficulty];
    // difficultyStats = { [difficulty]: totalQuestions };
    const stats = getQuizDiffcultyAndTypeStats(quiz);
    questionTypeCount = stats.questionTypeCount;
    difficultyStats = stats.difficultyCount;
  }

  const quizAttempt = await QuizAttempt.create({
    allQuestions: quiz.map(({ id }, i) => ({
      questionId: id,
      questionNumber: i + 1,
    })),
    totalQuestions,
    multipleQuestionCount: questionTypeCount.multiple,
    booleanQuestionCount: questionTypeCount.boolean,
    totalScore,
    easyQuestions: difficultyStats.easy,
    mediumQuestions: difficultyStats.medium,
    hardQuestions: difficultyStats.hard,
    userId: user.id,
    quizTimeInSecondsec,
  });

  // if (user.currentPlayingQuizId) {
  //   const quiz = await QuizAttempt.findById(user.currentPlayingQuizId);
  //   if (quiz) {
  //     user.quizHistory.push(user.currentPlayingQuizId);
  //   } else {
  //   }
  // }

  // user.currentPlayingQuizId = quizAttempt._id;

  await user.save();

  //vikas-change-the-reponse
  return res.status(200).json({
    success: true,
    message: "Quiz generated successfully.",
    data: quiz,
  });
};

export const startQuiz = async (req, res) => {
  try {
    const user = req.user;
    const quiz = req.quiz;
    if (quiz.isEnd) {
      return res
        .status(200)
        .json({ success: false, message: "Quiz already completed" });
    }
    if (user.currentPlayingQuizId) {
      const currentPlayingQuiz = await QuizAttempt.findById(
        user.currentPlayingQuizId,
      );
      if (currentPlayingQuiz) {
        user.quizHistory.push(user.currentPlayingQuizId);
      }
    }

    user.currentPlayingQuizId = quiz.id;

    if (quiz.status === "Not Started") {
      quiz.status = "Quiz in progress";
    } else if (quiz.status === "Completed") {
      return res
        .status(200)
        .json({ success: false, message: "Quiz already Completed" });
    }
    await quiz.save();
    await user.save();
  } catch (error) {
    console.log(error);
  }
};

export const endQuiz = async (req, res) => {
  try {
    const quiz = req.quiz;
    const user = req.user;

    if (quiz.status === "Quiz in progress") {
      quiz.status = "Completed";
    } else if (quiz.status === "Not Started") {
      return res
        .status(200)
        .json({ success: false, message: "Quiz not started" });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Quiz already Completed" });
    }
    quiz.isEnd = true;
    user.currentPlayingQuizId = null;
    await user.save();
    await quiz.save();
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

export const getQuestion = async (req, res) => {
  const questionNumber = Number(req.params.questionNumber);
  // const { quizId } = req.body;
  // const quiz = await QuizAttempt.findOne({ userId: req.user.id, _id: quizId });
  // if (!quiz) {
  //   return res.status(404).json({ success: false, message: "Quiz not found" });
  // }
  const quiz = req.quiz;
  if (quiz.isEnd) {
    return res
      .status(200)
      .json({ success: false, message: "Quiz already completed" });
  }

  if (questionNumber > quiz.totalQuestions) {
    return res.status(400).json({
      success: false,
      message: `Question number exceeds total questions`,
    });
  }

  const questionRecord = quiz.allQuestions[questionNumber - 1];
  // if (questionRecord.isAttempt) {
  //   return res.status(400).json({ msg: "ye pehle hi atempt ho chuka hai" });
  // }

  const question = await Question.findById(questionRecord.questionId);
  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }
  return res.status(200).json({ success: true, data: question });
};

export const checkAnswer = async (req, res) => {
  const quiz = req.quiz;
  const questionNumber = Number(req.params.questionNumber);
  const { userSelectedOption } = req.body;
  // const quiz = await QuizAttempt.findOne({ userId: req.user.id, _id: quizId });
  // if (!quiz) {
  //   return res.status(404).json({ success: false, message: "Quiz not found" });
  // }

  if (quiz.isEnd) {
    return res
      .status(200)
      .json({ success: false, message: "Quiz already completed" });
  }

  if (questionNumber > quiz.totalQuestions) {
    return res.status(400).json({
      success: false,
      message: `Question number exceeds total questions`,
    });
  }
  const questionRecord = quiz.allQuestions[questionNumber - 1];
  const question = await Question.findById(questionRecord.questionId);
  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }

  if (questionRecord.isAttempt) {
    return res.status(409).json({
      success: false,
      message: "This question has already been attempted.",
    });
  }
  questionRecord.isAttempt = true;
  questionRecord.userChosenOption = userSelectedOption;
  if (userSelectedOption === question.correctAnswer) {
    quiz.correctAnswerCount = quiz.correctAnswerCount + 1;
    quiz.currentScore =
      quiz.currentScore + eachDiffcultyScore[question.difficulty];
    await quiz.save();

    return res.status(200).json({
      success: true,
      message: "Correct answer.",
    });
  } else {
    quiz.wrongAnswerCount = quiz.wrongAnswerCount + 1;
    await quiz.save();

    return res.status(200).json({
      success: true,
      message: "Incorrect answer.",
    });
  }
};

export const quizResult = async (req, res) => {
  // const { quizId } = req.params;
  const quiz = req.quiz;
  if (!quiz.isEnd) {
    return res
      .status(200)
      .json({ success: false, message: "quiz not completed" });
  }

  // const quiz = await QuizAttempt.findOne({ userId: req.user.id, _id: quizId });
  // if (!quiz) {
  //   return res.status(404).json({ success: false, message: "Quiz not found" });
  // }
  const qna = [];
  for (let i = 0; i < quiz.totalQuestions; i++) {
    const questionRecord = quiz.allQuestions[i];
    const question = await Question.findById(questionRecord.questionId);

    qna.push({
      question: question.question,
      userChosenOption: questionRecord.userChosenOption || null,
      correctAnswer: question.correctAnswer,
      questionNumber: questionRecord.questionNumber,
      points:
        question.correctAnswer === questionRecord.userChosenOption
          ? eachDiffcultyScore[question.difficulty]
          : 0,
    });
  }

  const result = {
    stats: getQuizResultStats(quiz),
    qna,
  };
  return res.status(200).json(result);
};

export const getQuizHistory = async (req, res) => {
  const user = req.user;
  const quizIds = user.quizHistory;
  const data = [];
  for (const quizId of quizIds) {
    const quiz = await QuizAttempt.findById(quizId);
    const quizStats = getQuizResultStats(quiz);
    data.push(quizStats);
  }

  res.status(200).json({ data });
};

export const deleteQuiz = async (req, res) => {
  // const { quizId } = req.params;
  const quiz = req.quiz;

  const quiz1 = await QuizAttempt.deleteOne({ _id: quiz.id });
  res.status(200).json({ m: "quiz deleteed" });
};
