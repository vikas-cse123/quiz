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
            "type": "boolean",
            "difficulty": "medium",
            "category": "General Knowledge",
            "question": "The scientific name for the Southern Lights is Aurora Australis?",
            "options": [
                "False",
                "True"
            ],
            "id": "691d411d3c86b80c844e73cf"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Which product did Nokia, the telecommunications company, originally sell?",
            "options": [
                "Phones",
                "Paper",
                "Processors",
                "Computers"
            ],
            "id": "691d411d3c86b80c844e7375"
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "General Knowledge",
            "question": "What is the Zodiac symbol for Gemini?",
            "options": [
                "Fish",
                "Twins",
                "Maiden",
                "Scales"
            ],
            "id": "691d411d3c86b80c844e7312"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Which of the following is an existing family in &quot;The Sims&quot;?",
            "options": [
                "The Family",
                "The Simoleon Family",
                "The Goth Family",
                "The Proud Family"
            ],
            "id": "691d411d3c86b80c844e7393"
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "General Knowledge",
            "question": "Vietnam&#039;s national flag is a red star in front of a yellow background.",
            "options": [
                "False",
                "True"
            ],
            "id": "691d411d3c86b80c844e739e"
        },
        {
            "type": "boolean",
            "difficulty": "medium",
            "category": "General Knowledge",
            "question": "The US emergency hotline is 911 because of the September 11th terrorist attacks.",
            "options": [
                "True",
                "False"
            ],
            "id": "691d411d3c86b80c844e73d5"
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "General Knowledge",
            "question": "In DC comics where does the Green Arrow (Oliver Queen) live?",
            "options": [
                "Gotham City",
                "Metropolis",
                "Star City",
                "Central City"
            ],
            "id": "691d411d3c86b80c844e7310"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Before the 19th Century, the &quot;Living Room&quot; was originally called the...",
            "options": [
                "Open Room",
                "Loft",
                "Parlor",
                "Sitting Room"
            ],
            "id": "691d411d3c86b80c844e7373"
        },
        {
            "type": "boolean",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "In Scandinavian languages, the letter &Aring; means river.",
            "options": [
                "True",
                "False"
            ],
            "id": "691d411d3c86b80c844e73e2"
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Sports",
            "question": "What was the year of estabilishment of the Bari Italian Football Club?",
            "options": [
                "1945",
                "2014",
                "1908",
                "1895"
            ],
            "id": "691d411d3c86b80c844e7412"
        },
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "General Knowledge",
            "question": "The phrase &quot;accident waiting to happen&quot; is an example of what type of figure of speech?",
            "options": [
                "Simile",
                "Idiom",
                "Metaphor",
                "Analogy"
            ],
            "id": "691d411d3c86b80c844e7358"
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Sports",
            "question": "The Rio 2016 Summer Olympics held it&#039;s closing ceremony on what date?",
            "options": [
                "August 17",
                "August 21",
                "August 23",
                "August 19"
            ],
            "id": "691d411d3c86b80c844e7411"
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "General Knowledge",
            "question": "On average, at least 1 person is killed by a drunk driver in the United States every hour.",
            "options": [
                "False",
                "True"
            ],
            "id": "691d411d3c86b80c844e73aa"
        },
        {
            "type": "boolean",
            "difficulty": "medium",
            "category": "General Knowledge",
            "question": "&quot;Typewriter&quot; is the longest word that can be typed using only the first row on a QWERTY keyboard.",
            "options": [
                "False",
                "True"
            ],
            "id": "691d411d3c86b80c844e73d7"
        },
        {
            "type": "boolean",
            "difficulty": "easy",
            "category": "General Knowledge",
            "question": "Romanian belongs to the Romance language family, shared with French, Spanish, Portuguese and Italian.",
            "options": [
                "False",
                "True"
            ],
            "id": "691d411d3c86b80c844e73ab"
        },
        {
            "type": "boolean",
            "difficulty": "medium",
            "category": "General Knowledge",
            "question": "The vapor produced by e-cigarettes is actually water.",
            "options": [
                "True",
                "False"
            ],
            "id": "691d411d3c86b80c844e73c5"
        },
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "General Knowledge",
            "question": "Who is a co-founder of music streaming service Spotify?",
            "options": [
                "Sean Parker",
                "Felix Miller",
                "Michael Breidenbruecker",
                "Daniel Ek"
            ],
            "id": "691d411d3c86b80c844e734a"
        },
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "General Knowledge",
            "question": "Directly between the Washington Monument and the Reflecting Pool is a memorial to which war?",
            "options": [
                "World War II",
                "Vietnam War",
                "American Revolutionary War",
                "American Civil War"
            ],
            "id": "691d411d3c86b80c844e735d"
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Sports",
            "question": "Which country hosted the 2020 Summer Olympics?",
            "options": [
                "Australia",
                "Japan",
                "Germany",
                "China"
            ],
            "id": "691d411d3c86b80c844e740a"
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "General Knowledge",
            "question": "What is the currency of India and Pakistan as well as a few other Asian countries?",
            "options": [
                "Rupee",
                "Riyal",
                "Peso",
                "Dinar"
            ],
            "id": "691d411d3c86b80c844e7325"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "How many calories are in a 355 ml can of Pepsi Cola?",
            "options": [
                "155",
                "150",
                "100",
                "200"
            ],
            "id": "691d411d3c86b80c844e7363"
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "General Knowledge",
            "question": "What is Tasmania?",
            "options": [
                "An Australian State",
                "A flavor of Ben and Jerry&#039;s ice-cream",
                "The Name of a Warner Brothers Cartoon Character",
                "A Psychological Disorder"
            ],
            "id": "691d411d3c86b80c844e7319"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "What is the airspeed velocity of an unladen swallow?",
            "options": [
                "20 MPH",
                "24 MPH",
                "15 MPH",
                "200 MPH"
            ],
            "id": "691d411d3c86b80c844e738e"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "Which of the following languages does NOT use gender as a part of its grammar?",
            "options": [
                "Danish",
                "German",
                "Turkish",
                "Polish"
            ],
            "id": "691d411d3c86b80c844e7379"
        },
        {
            "type": "multiple",
            "difficulty": "hard",
            "category": "General Knowledge",
            "question": "When was &quot;YouTube&quot; founded?",
            "options": [
                "May 22, 2004",
                "September 12, 2005",
                "July 19, 2009",
                "February 14, 2005"
            ],
            "id": "691d411d3c86b80c844e737d"
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "General Knowledge",
            "question": "Who played General Aladeen in The Dictator?",
            "options": [
                "Johnny Depp",
                "Sacha Baron Cohen",
                "James Franco",
                "Leonardo Dicaprio"
            ],
            "id": "691d411d3c86b80c844e731c"
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Sports",
            "question": "Which team has won the most Stanley Cups in the NHL?",
            "options": [
                "Chicago Blackhawks",
                "Detroit Red Wings",
                "Montreal Canadians",
                "Toronto Maple Leafs"
            ],
            "id": "691d411d3c86b80c844e73f7"
        },
        {
            "type": "boolean",
            "difficulty": "medium",
            "category": "General Knowledge",
            "question": "Haggis is traditionally ate on Burns Night.",
            "options": [
                "False",
                "True"
            ],
            "id": "691d411d3c86b80c844e73cd"
        },
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "General Knowledge",
            "question": "In the Morse code, which letter is indicated by 3 dots?",
            "options": [
                "C",
                "O",
                "A",
                "S"
            ],
            "id": "691d411d3c86b80c844e7331"
        },
        {
            "type": "boolean",
            "difficulty": "medium",
            "category": "General Knowledge",
            "question": "Kissing someone for one minute burns about 2 calories.",
            "options": [
                "False",
                "True"
            ],
            "id": "691d411d3c86b80c844e73c7"
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
