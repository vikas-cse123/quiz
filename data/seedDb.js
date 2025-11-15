import Question from "../model/Question.js";
import quizData from "./quizData.json" with { type: "json" };
export const seedDb = async () => {
  const existingQuizes = await Question.find();
  if (existingQuizes.length === 0) {
    await Question.insertMany(quizData);
    console.log("Database seeded");
  }
};
