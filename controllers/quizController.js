import { getQuizResultStats } from "../helpers/getQuizResultStats.js";
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
  //getOptions,getQuizDiffcultyAndTypeStats
  let { category, totalQuestions, difficulty, type, timeForEachQuestionInSec } =
    req.body;
  //vikas-gpt ask if it good way to lowercase or not
  difficulty = difficulty.toLowerCase();
  type = type.toLowerCase();
  let quiz = (
    await Question.aggregate([
      {
        $match: {
          category: {
            $in: category === "mix" ? ["General Knowledge"] : [category],
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
      isAttempt: false,
      questionNumber: i + 1,
    })),
    totalQuestions,
    multipleQuestionCount: questionTypeCount.multiple,
    booleanQuestionCount: questionTypeCount.boolean,
    currentScore: 0,
    totalScore,
    easyQuestions: difficultyStats.easy,
    mediumQuestions: difficultyStats.medium,
    hardQuestions: difficultyStats.hard,
    userId: req.user.id,
    timeForEachQuestionInSec,
    correctAnswerCount: 0,
    wrongAnswerCount: 0,
  });

  //save  quizAttempt  id in user data
  const user = req.user;
  if (user.currentPlayingQuizId) {
    const quiz = await QuizAttempt.findById(user.currentPlayingQuizId);
    if (!quiz) {
      // user.currentPlayingQuizId = quizAttempt._id;
    } else {
      user.quizHistory.push(user.currentPlayingQuizId);

      // user.currentPlayingQuizId = quizAttempt._id;
    }
  }
  // else {

  //   user.currentPlayingQuizId = quizAttempt._id;
  // }
  user.currentPlayingQuizId = quizAttempt._id;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Quiz generated successfully.",
    data: quiz,
  });
};

export const getQuestion = async (req, res) => {
  const questionNumber = Number(req.params.questionId);
  const { quizId } = req.body;
  const quiz = await QuizAttempt.findById(quizId);
  console.log(questionNumber);
  if (questionNumber - 1 >= quiz.totalQuestions) {
    return res
      .status(400)
      .json({ msg: `quiz has only ${quiz.totalQuestions} questions` });
  }

  const questionRecord = quiz.allQuestions[questionNumber - 1];
  if (questionRecord.isAttempt) {
    return res.status(400).json({ msg: "ye pehle hi atempt ho chuka hai" });
  }

  const question = await Question.findById(questionRecord.questionId);
  return res.status(200).json(question);
};

export const checkAnswer = async (req, res) => {
  const { questionId, userSelectedOption, quizId } = req.body;

  if (req.user.currentPlayingQuizId.toString() !== quizId) {
    return res.status(200).json({ m: "1111 :quiz id mismatched" });
  }

  const quiz = await QuizAttempt.findById(quizId);
  if (!quiz) {
    return res.status(500).json({ m: "22 : quiz not found " });
  }

  const question = await Question.findById(questionId);
  if (!question) {
    return res.status(404).json({ m: "question not found :333" });
  }
  console.log("quizzzz", quiz);

  quiz.status === "Quiz in progress";
  const questionRecord = quiz.allQuestions.find(
    (question) => question.questionId.toString() === questionId,
  );
  console.log("questionRecord", questionRecord);

  if (questionRecord.isAttempt) {
    return res
      .status(200)
      .json({ message: "ye question attempt ho chuka hai" });
  }

  if (userSelectedOption === question.correctAnswer) {
    questionRecord.isAttempt = true;
    questionRecord.userChosenOption = userSelectedOption;
    quiz.correctAnswerCount = quiz.correctAnswerCount + 1;
    quiz.currentScore =
      quiz.currentScore + eachDiffcultyScore[question.difficulty];

    await quiz.save();
    console.log("questionRecord", questionRecord);

    return res
      .status(200)
      .json({ success: true, correct: true, message: "Correct answer." });
  } else {
    questionRecord.isAttempt = true;
    questionRecord.userChosenOption = userSelectedOption;
    question.wrongAnswerCount = question.wrongAnswerCount + 1;

    await quiz.save();

    console.log("question------***", questionRecord);
    return res.status(200).json({
      success: false,
      correct: false,
      correctAnswer: question.correctAnswer,
      message: "Incorrect answer.",
    });
  }
};

export const quizResult = async (req, res) => {
  const { quizId } = req.body;
  if (req.user.currentPlayingQuizId.toString() !== quizId) {
    return res.status(200).json({ msg: "diff quiz" });
  }
  //vikas-left . i should also check that quiz must also have user id
  const quiz = await QuizAttempt.findById(quizId);

  const qna = [];
  for (let i = 0; i < quiz.allQuestions.length; i++) {
    const questionRecord = quiz.allQuestions[i];
    // console.log("questionRecord",questionRecord);
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
  const { quizId } = req.params;
  const quiz = await QuizAttempt.deleteOne({ _id: quizId });
  res.status(200).json({ m: "quiz deleteed" });
};
