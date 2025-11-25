import quizData from "../data/quizData.json" with {type:"json"}
import {writeFile} from "fs/promises"
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
 const newQuizData = []
for(let i = 0;i<quizData.length;i++){
    console.log(quizData[0]);
    const {type,difficulty,category,question,correctAnswer,incorrectAnswers} = quizData[i]
    const options = getOptions(correctAnswer,incorrectAnswers)
   
    const quizObj = {
        type,
        difficulty,
        category,
        question,
        correctAnswer,
        options
  
    }
    console.log(quizObj);
    newQuizData.push(quizObj)
}
writeFile("./new.json",JSON.stringify(newQuizData))