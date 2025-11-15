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
    type: "multiple",
    difficulty: "hard",
    category: "General Knowledge",
    question: "If you planted the seeds of Quercus robur, what would grow?",
    options: ["Vegetables", "Trees", "Grains", "Flowers"],
    id: "6915e7d4cfb258f4b267419e",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question: "Which of the following presidents is not on Mount Rushmore?",
    options: [
      "John F. Kennedy",
      "Theodore Roosevelt",
      "Thomas Jefferson",
      "Abraham Lincoln",
    ],
    id: "6915e7d4cfb258f4b2674162",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question: "What does a funambulist walk on?",
    options: ["Broken Glass", "Balls", "The Moon", "A Tight Rope"],
    id: "6915e7d4cfb258f4b2674153",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question: "Scotch whisky and Drambuie make up which cocktail?",
    options: ["Sex on the Beach", "Rusty Nail", "Screwdriver", "Manhattan"],
    id: "6915e7d4cfb258f4b267418f",
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "General Knowledge",
    question: "What is the romanized Chinese word for &quot;airplane&quot;?",
    options: ["Feiji", "Zongxian", "Qiche", "Huojian"],
    id: "6915e7d4cfb258f4b26741a4",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question: "What does the &quot;G&quot; mean in &quot;G-Man&quot;?",
    options: ["Government", "Geronimo", "Ghost", "Going"],
    id: "6915e7d4cfb258f4b2674171",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question: "Which of these colours is NOT featured in the logo for Google?",
    options: ["Pink", "Green", "Blue", "Yellow"],
    id: "6915e7d4cfb258f4b2674140",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question:
      "What was the name of the WWF professional wrestling tag team made up of the wrestlers Ax and Smash?",
    options: [
      "The Bushwhackers",
      "The Dream Team",
      "Demolition",
      "The British Bulldogs",
    ],
    id: "6915e7d4cfb258f4b2674142",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "What name represents the letter &quot;M&quot; in the NATO phonetic alphabet?",
    options: ["Max", "Matthew", "Mike", "Mark"],
    id: "6915e7d4cfb258f4b2674187",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question: "Where did the pineapple plant originate?",
    options: ["Hawaii", "South America", "Asia", "Europe"],
    id: "6915e7d4cfb258f4b267419a",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question: "What geometric shape is generally used for stop signs?",
    options: ["Octagon", "Circle", "Hexagon", "Triangle"],
    id: "6915e7d4cfb258f4b2674139",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question:
      "Terry Gilliam was an animator that worked with which British comedy group?",
    options: [
      "The Penny Dreadfuls",
      "The League of Gentlemen&lrm;",
      "Monty Python",
      "The Goodies&lrm;",
    ],
    id: "6915e7d4cfb258f4b2674156",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question: "What is the famous Papa John&#039;s last name?",
    options: ["Chowder", "ANDERSON", "Williams", "Schnatter"],
    id: "6915e7d4cfb258f4b267415a",
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "General Knowledge",
    question:
      "According to the 2014-2015 Australian Bureau of Statistics, what percentage of Australians were born overseas?",
    options: ["20%", "28%", "7%", "13%"],
    id: "6915e7d4cfb258f4b26741cb",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question:
      "Which iconic Disneyland attraction was closed in 2017 to be remodeled as a &quot;Guardians of the Galaxy&quot; themed ride?",
    options: [
      "Peter Pan&#039;s Flight",
      "Pirates of the Caribbean",
      "Twilight Zone Tower of Terror",
      "The Haunted Mansion",
    ],
    id: "6915e7d4cfb258f4b267416c",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question:
      "Which of the three astronauts of the Apollo 11 spaceflight did NOT walk on the moon?",
    options: [
      "Buzz Aldrin",
      "Michael Collins",
      "None of them",
      "Neil Armstrong",
    ],
    id: "6915e7d4cfb258f4b2674160",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question: "When was Nintendo founded?",
    options: [
      "December 27th, 1894",
      "September 23rd, 1889",
      "March 4th, 1887",
      "October 19th, 1891",
    ],
    id: "6915e7d4cfb258f4b2674189",
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "General Knowledge",
    question:
      "Which musician has collaborated with American producer Porter Robinson and released the 2016 song &quot;Shelter&quot;?",
    options: ["deadmau5", "Mat Zo", "Madeon", "Zedd"],
    id: "6915e7d4cfb258f4b26741a7",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question: "What is the name of the Jewish New Year?",
    options: ["New Year", "Elul", "Succoss", "Rosh Hashanah"],
    id: "6915e7d4cfb258f4b2674143",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question: "How many letters are in the English alphabet?",
    options: ["30", "26", "5", "17"],
    id: "6915e7d4cfb258f4b267415f",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question: "What is Tasmania?",
    options: [
      "An Australian State",
      "A flavor of Ben and Jerry&#039;s ice-cream",
      "The Name of a Warner Brothers Cartoon Character",
      "A Psychological Disorder",
    ],
    id: "6915e7d4cfb258f4b2674152",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question:
      "What type of animal was Harambe, who was shot after a child fell into it&#039;s enclosure at the Cincinnati Zoo?",
    options: ["Tiger", "Crocodile", "Gorilla", "Panda"],
    id: "6915e7d4cfb258f4b2674169",
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "General Knowledge",
    question: "What year was the first Apple iPod introduced?",
    options: ["1999", "2000", "1998", "2001"],
    id: "6915e7d4cfb258f4b2674173",
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "General Knowledge",
    question:
      "What country has had prime ministers named Eden, Major, Peel, Law, Brown and Heath?",
    options: ["Australia", "Canada", "United Kingdom", "New Zealand"],
    id: "6915e7d4cfb258f4b2674144",
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "General Knowledge",
    question: "The word &quot;astasia&quot; means which of the following?",
    options: [
      "The inability to stand up",
      "The inability to make decisions",
      "A feverish desire to rip one&#039;s clothes off",
      "The inability to concentrate on anything",
    ],
    id: "6915e7d4cfb258f4b26741b8",
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

await Model.updateOne(
  { _id: id }, // only match by _id here
  {
    $set: {
      "roles.$[r].status": "active",
    },
    $inc: {
      "roles.$[r].level": 10,
      age: 25,
    },
  },
  {
    arrayFilters: [
      { "r.type": "admin", "r.level": 1 }, // match the correct object in roles[]
    ],
  },
);
