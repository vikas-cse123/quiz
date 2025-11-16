import quizData from "../data/quizData.json" with { type: "json" };
const metaData = {};
export const getQuizMetaData = (data) => {
  return data.map(
    ({ type, difficulty, category, question, correctAnswer }, i) => {
      if (type === "multiple") {
        metaData["multipleCount"] =
          metaData["multipleCount"] === undefined
            ? 1
            : metaData["multipleCount"] + 1;
      } else {
        metaData["booleanCount"] =
          metaData["booleanCount"] === undefined
            ? 1
            : metaData["booleanCount"] + 1;
      }

      if (difficulty === "easy") {
        metaData["easyCount"] =
          metaData["easyCount"] === undefined ? 1 : metaData["easyCount"] + 1;
      } else if (difficulty === "medium") {
        metaData["mediumCount"] =
          metaData["mediumCount"] === undefined
            ? 1
            : metaData["mediumCount"] + 1;
      } else if (difficulty === "hard") {
        metaData["hardCount"] =
          metaData["hardCount"] === undefined ? 1 : metaData["hardCount"] + 1;
      }

      //return
      if (i === data.length - 1) {
        return { type, difficulty, category, metaData };
      } else {
        return { type, difficulty, category };
      }
    },
  );
};

const data = [
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Fast food restaurant chains Carl&#039;s Jr. and Hardee&#039;s are owned by the same company.",
    options: ["True", "False"],
    id: "6915e7d4cfb258f4b2674202",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Only a small percentage of the world&#039;s population is lactose intolerant.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b2674215",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "The bikini is named after the &quot;Bikini Atoll&quot;, an island where the United States conducted tests on atomic bombs.",
    options: ["True", "False"],
    id: "6915e7d4cfb258f4b26741fd",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Sitting for more than three hours a day can cut two years off a person&#039;s life expectancy.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b2674209",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "The French word to travel is &quot;Travail&quot;",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b26741fa",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "The sum of all the numbers on a roulette wheel is 666.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b2674207",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "The scientific name for the Southern Lights is Aurora Australis?",
    options: ["True", "False"],
    id: "6915e7d4cfb258f4b2674208",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "Cucumbers are usually more than 90% water.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b2674217",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "&quot;Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo.&quot; is a grammatically correct sentence.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b267420d",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "Coca-Cola&#039;s original colour was green.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b2674201",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "&quot;Typewriter&quot; is the longest word that can be typed using only the first row on a QWERTY keyboard.",
    options: ["True", "False"],
    id: "6915e7d4cfb258f4b2674210",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "Kissing someone for one minute burns about 2 calories.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b2674200",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "Haggis is traditionally ate on Burns Night.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b2674206",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "Crystal Pepsi was first sold in US markets in 1993.",
    options: ["True", "False"],
    id: "6915e7d4cfb258f4b2674204",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "The French word for &quot;glass&quot; is &quot;glace&quot;.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b2674213",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "The vapor produced by e-cigarettes is actually water.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b26741fe",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Instant mashed potatoes were invented by Canadian Edward Asselbergs in 1962.",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b2674205",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "A pencil&#039;s lead is typically made from graphite, not lead",
    options: ["False", "True"],
    id: "6915e7d4cfb258f4b2674203",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Popcorn was invented in 1871 by Frederick W. Rueckheim in the USA where he sold the snack on the streets of Chicago.",
    options: ["True", "False"],
    id: "6915e7d4cfb258f4b267420a",
  },
  {
    type: "boolean",
    difficulty: "medium",
    category: "General Knowledge",
    question: "There are 86400 seconds in a day.",
    options: ["True", "False"],
    id: "6915e7d4cfb258f4b26741f8",
  },
];

// console.log(getQuizMetaData(quizData));
console.log(getQuizMetaData(data));

// import { connectDb } from "../config/db.js";
// import QuizAttempt from "../model/QuizAttempt.js";

// await connectDb();

// await QuizAttempt.create({
//   totalQuestions: 3,
//   currentScore: 0,
//   totalScore: 10,
//   userId: "455456789012345678901234",
//   timeForEachQuestionInSec: 40,
//   allQuestions: [
//     { questionId: "455456789012345678901234" },
//     { questionId: "455456789012345678901234" },
//     { questionId: "455456789012345678901234" },
//   ],
// });
