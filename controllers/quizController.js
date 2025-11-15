import mongoose from "mongoose";
import Question from "../model/Question.js";
import QuizAttempt from "../model/QuizAttempt.js";

//vikas-change:put this fn into helper folder
// const transformValueInLowerCaseInObj = (inp, ...notTransform) => {
//   const obj = {};
//   for (const key in inp) {
//     if (notTransform.includes(key)) {
//       obj[key] = inp[key];
//     } else if (typeof inp[key] === "string") {
//       obj[key] = inp[key].toLowerCase();
//     } else {
//       obj[key] = inp[key];
//     }
//   }
//   console.log(obj);
//   console.log(inp);
//   return obj;
// };

const eachDiffcultyScore = {
  easy: 1,
  medium: 3,
  hard: 5,
};

const getQuizDiffcultyAndTypeStats = (quiz) => {
  // let stats = { easy: 0, medium: 0, hard: 0 };
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
    ////////for question type
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
  let { category, totalQuestions, difficulty, type, timeForEachQuestionInSec } =
    req.body;
  //vikas-gpt ask if it good way to lowercase or not
  difficulty = difficulty.toLowerCase();
  type = type.toLowerCase();
  console.log("111111", {
    category,
    totalQuestions,
    difficulty,
    type,
    timeForEachQuestionInSec,
  });
  console.log("22222", [category, difficulty, type]);

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

  console.log("444444", quiz.length);

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
    difficultyStats = { [difficulty]: totalQuestions };
    questionTypeCount = getQuizDiffcultyAndTypeStats(quiz).questionTypeCount;
  }

  console.log("difficultyStats", difficultyStats);
  console.log("totalScore", totalScore);
  console.log("totalQuestions", totalQuestions);
  console.log("questionTypeCount", questionTypeCount);

  const attemptQuiz = await QuizAttempt.create({
    allQuestions: quiz.map(({ id }) => ({ questionId: id, isAttempt: false })),
    totalQuestions,
    multipleQuestionCount: questionTypeCount.multiple,
    booleanQuestionCount: questionTypeCount.boolean,
    currentScore: 0,
    totalScore,
    easyQuestions: difficultyStats.easy || 0,
    mediumQuestions: difficultyStats.medium || 0,
    hardQuestions: difficultyStats.hard || 0,
    userId: req.user.id,
    timeForEachQuestionInSec,
  });

  //save attempt quiz id in user data
  req.user.currentPlayingQuiz = attemptQuiz._id;
  await req.user.save();

  return res.status(200).json({
    success: true,
    message: "Quiz generated successfully.",
    data: quiz,
  });
};

export const checkAnswer = async (req, res) => {
  const { questionId, userSelectedOption, quizId } = req.body;
  console.log("questionId", questionId);
  console.log("quizId", quizId);
  console.log(
    "req.user.currentPlayingQuiz",
    req.user.currentPlayingQuiz.toString(),
  );
  console.log(
    "req.user.currentPlayingQuiz === quizId",
    req.user.currentPlayingQuiz.toString() !== quizId,
  );
  if (req.user.currentPlayingQuiz.toString() !== quizId) {
    return res.status(500).json({ m: "1111 :" });
  }
  const quiz = await QuizAttempt.findById(quizId);
  console.log("quiz", quiz);
  if (!quiz) {
    return res.status(500).json({ m: "333 : quiz not found " });
  }

  const question = await Question.findById(questionId);
  console.log({ question });
  if (!question) {
    return res.status(404).json({ m: "Ssdss:2222" });
  }

  if (userSelectedOption === question.correctAnswer) {
    const thisQuestionScore = eachDiffcultyScore[question.difficulty];
    console.log("thisQuestionScore", thisQuestionScore);

      const questionRecord = quiz.allQuestions.find((el) => {

      if (el.questionId.toString() === questionId) {
        return true;
      }
    });
    // if(questionRecord.isAttempt){
    //   return res.status(200).json({message:"ye question attempt ho chuka hai"})
    // }
    questionRecord.isAttempt = true
    quiz.currentScore = quiz.currentScore+thisQuestionScore
    await quiz.save()

    console.log("question------", questionRecord);
    return res
      .status(200)
      .json({ success: true, correct: true, message: "Correct answer." });
  } else {
    const questionRecord = quiz.allQuestions.find((el) => {
      // console.log("el.questionId",el.questionId);
      // console.log("questionId",questionId);
      // console.log("el.questionId === questionId",el.questionId === questionId);
      if (el.questionId.toString() === questionId) {
        return true;
      }
    });
        if(questionRecord.isAttempt){
      return res.status(200).json({message:"ye question attempt ho chuka hai....."})
    }
    questionRecord.isAttempt = true
    await quiz.save()

    console.log("question------***", questionRecord);
    return res.status(200).json({
      success: false,
      correct: false,
      correctAnswer: question.correctAnswer,
      message: "Incorrect answer.",
    });
  }
};
