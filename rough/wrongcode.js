const query = [
  {
    $match: {},
  },
  {
    $sample: {
      size: numberOfQuestion,
    },
  },
];
if (difficulty === "mix") {
  query[0]["$match"].difficulty = { $in: ["easy", "medium", "hard"] };
}
if (type === "mix") {
  query[0]["$match"].type = { $in: ["multiple", "boolean"] };
}
if (category === "mix") {
  query[0]["$match"].category = { $in: ["General Knowledge"] };
}

//   -------------------------------------------------------------------------------------
//vikas-gpt:ask chatgpt that quiz variable technique is correct or not and ask for better method
let quiz;
if (isMix) {
  quiz = await Question.aggregate([
    {
      $match: {
        category: {
          $in: category === "mix" ? ["General Knowledge"] : [category],
        },
        difficulty: {
          $in: difficulty === "mix" ? ["easy", "medium", "hard"] : [difficulty],
        },
        type: { $in: type === "mix" ? ["multiple", "boolean"] : [type] },
      },
    },
    {
      $sample: { size: totalQuestions },
    },
  ]);
} else {
  quiz = await Question.find({ category, difficulty, type }).limit(
    totalQuestions,
  );
}

////////////////////////////////////////////////////////////////////////////////////
// const quizAttempt = await QuizAttempt.updateOne(
//   {
//     _id: quizId,
//     "allQuestions.questionId": questionId,
//     "allQuestions.isAttempt": false,
//   },
//   {
//     $set: {
//       "allQuestions.$.isCorrect": true,
//       "allQuestions.$.isAttempt": true,
//     },
//     $inc: { currentScore: thisQuestionScore },
//   },
// );
//  const quizAttempt = await QuizAttempt.updateOne(
//   {
//     _id: quizId
//   },
//   {
//     $set: {
//       "allQuestions.$[r].isCorrect": true,
//       "allQuestions.$[r].isAttempt": true,
//     },
//     $inc: { currentScore: thisQuestionScore },
//   },{
//     arrayFilters:[
//       {
//         "r.questionId":new mongoose.Types.ObjectId(questionId),
//         "r.isAttempt":false
//       }
//     ]
//   }
// );

// await QuizAttempt.updateOne(
//   { _id: quizId },
//   {
//     $set: {
//       "allQuestions.$[r].isCorrect": true,
//       "allQuestions.$[r].isAttempt": true,
//     },
//     $inc: { currentScore: thisQuestionScore },
//   },
//   {
//     arrayFilters: [
//       {
//         "r.questionId": new mongoose.Types.ObjectId(questionId),
//         "r.isAttempt": false,
//       },
//     ],
//   },
// );
// const quizAttempt = await QuizAttempt.updateOne(
//   {
//     _id: quizId,
//     "allQuestions.questionId": questionId,
//     "allQuestions.isAttempt": false,
//   },
//   {
//     $set: {
//       "allQuestions.$.isCorrect": false,
//       "allQuestions.$.isAttempt": true,
//     },
//   },
// );


/////
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