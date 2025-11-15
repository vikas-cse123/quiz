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

const data =  [
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Which of the following is an existing family in &quot;The Sims&quot;?",
            "options": [
                "The Family",
                "The Goth Family",
                "The Simoleon Family",
                "The Proud Family"
            ],
            "id": "6918816e8846791828478587"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Which of these cities does NOT have a United States Minting location?",
            "options": [
                "West Point, NY",
                "Philidelphia, PA",
                "St. Louis, MO",
                "San Fransisco, CA"
            ],
            "id": "6918816e884679182847857e"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "What is the airspeed velocity of an unladen swallow?",
            "options": [
                "20 MPH",
                "200 MPH",
                "24 MPH",
                "15 MPH"
            ],
            "id": "6918816e8846791828478582"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Which of the following is not another name for the eggplant?",
            "options": [
                "Potimarron",
                "Brinjal",
                "Melongene",
                "Guinea Squash"
            ],
            "id": "6918816e8846791828478577"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Which of the following chemicals are found in eggplant seeds?",
            "options": [
                "Cyanide",
                "Mescaline",
                "Nicotine",
                "Psilocybin"
            ],
            "id": "6918816e8846791828478578"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Going by the International Code of Signals, which single flag is interpreted as &quot;I require assistance (not distress)&quot;?",
            "options": [
                "Victor",
                "Kilo",
                "Papa",
                "Delta"
            ],
            "id": "6918816e884679182847857c"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Which musician has collaborated with American producer Porter Robinson and released the 2016 song &quot;Shelter&quot;?",
            "options": [
                "deadmau5",
                "Zedd",
                "Mat Zo",
                "Madeon"
            ],
            "id": "6918816e8846791828478562"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "According to the 2014-2015 Australian Bureau of Statistics, what percentage of Australians were born overseas?",
            "options": [
                "13%",
                "7%",
                "28%",
                "20%"
            ],
            "id": "6918816e8846791828478586"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Sciophobia is the fear of what?",
            "options": [
                "Transportation",
                "Bright lights",
                "Eating",
                "Shadows"
            ],
            "id": "6918816e884679182847856c"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "What does the Latin phrase &quot;Veni, vidi, vici&quot; translate into English?",
            "options": [
                "Life, liberty, and happiness",
                "I came, I saw, I conquered",
                "Past, present, and future",
                "See no evil, hear no evil, speak no evil"
            ],
            "id": "6918816e8846791828478570"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "How many calories are in a 355 ml can of Pepsi Cola?",
            "options": [
                "150",
                "200",
                "100",
                "155"
            ],
            "id": "6918816e8846791828478557"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Which church&#039;s interior in Vatican City was designed in 1503 by renaissance architects including Bramante, Michelangelo and Bernini?",
            "options": [
                "St. Mark&rsquo;s Basilica",
                "The Duomo of Florence",
                "Catania Cathedral",
                "St. Peter&#039;s Basilica"
            ],
            "id": "6918816e8846791828478584"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "What year was Queen Elizabeth II born?",
            "options": [
                "1929",
                "1930",
                "1923",
                "1926"
            ],
            "id": "6918816e884679182847855e"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Located in Chile, El Teniente is the world&#039;s largest underground mine for what metal?",
            "options": [
                "Nickel",
                "Silver",
                "Iron",
                "Copper"
            ],
            "id": "6918816e8846791828478579"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Which product did Nokia, the telecommunications company, originally sell?",
            "options": [
                "Computers",
                "Processors",
                "Phones",
                "Paper"
            ],
            "id": "6918816e8846791828478569"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Named after the mallow flower, mauve is a shade of what?",
            "options": [
                "Pink",
                "Brown",
                "Purple",
                "Red"
            ],
            "id": "6918816e884679182847855d"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "What type of dog is &#039;Handsome Dan&#039;, the mascot of Yale University?",
            "options": [
                "Yorkshire Terrier",
                "Boxer",
                "Pug",
                "Bulldog"
            ],
            "id": "6918816e884679182847857a"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Nephelococcygia is the practice of doing what?",
            "options": [
                "Swimming in freezing water",
                "Finding shapes in clouds",
                "Sleeping with your eyes open",
                "Breaking glass with your voice"
            ],
            "id": "6918816e8846791828478564"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "If someone said &quot;you are olid&quot;, what would they mean?",
            "options": [
                "Your appearance is repulsive.",
                "You are incomprehensible/an idiot.",
                "You smell extremely unpleasant.",
                "You are out of shape/weak."
            ],
            "id": "6918816e884679182847857f"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "The Swedish word &quot;Grunka&quot; means what in English?",
            "options": [
                "People",
                "Place",
                "Pineapple",
                "Thing"
            ],
            "id": "6918816e8846791828478580"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "If you planted the seeds of Quercus robur, what would grow?",
            "options": [
                "Trees",
                "Vegetables",
                "Grains",
                "Flowers"
            ],
            "id": "6918816e8846791828478559"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "The word &quot;aprosexia&quot; means which of the following?",
            "options": [
                "The inability to make decisions",
                "A feverish desire to rip one&#039;s clothes off",
                "The inability to stand up",
                "The inability to concentrate on anything"
            ],
            "id": "6918816e8846791828478563"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Electronic music producer Kygo&#039;s popularity skyrocketed after a certain remix. Which song did he remix?",
            "options": [
                "Ed Sheeran - I See Fire",
                "Marvin Gaye - Sexual Healing",
                "Coldplay - Midnight",
                "a-ha - Take On Me"
            ],
            "id": "6918816e8846791828478585"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "How many notes are there on a standard grand piano?",
            "options": [
                "98",
                "108",
                "88",
                "78"
            ],
            "id": "6918816e8846791828478560"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "What is the most commonly used noun in the English language?",
            "options": [
                "Time",
                "Water",
                "Man",
                "Home"
            ],
            "id": "6918816e8846791828478572"
        }
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
