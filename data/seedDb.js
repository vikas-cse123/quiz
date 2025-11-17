import Question from "../model/Question.js";
import quizData from "./quizData.json" with { type: "json" };
export const seedDb = async () => {
  try {
    const existingQuestionsCount = await Question.countDocuments();
    if (existingQuestionsCount === 0) {
      await Question.insertMany(quizData);
      console.log("Database seeded");
    }
  } catch (error) {
    console.log(error);
    console.log(`Error while seeding database`);
    process.exit(1);
  }
};
