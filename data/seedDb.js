import mime from "mime-types";
import { readFile } from "fs/promises";
import DefaultAvatar from "../model/DefaultAvatar.js";
import Question from "../model/Question.js";
import quizData from "./quizData.json" with { type: "json" };
export const seedDb = async () => {
  try {
    //seed default avatar
    const existingDefaultAvatar = await DefaultAvatar.countDocuments();
    if (existingDefaultAvatar === 0) {
      const data = await readFile("./public/default-avatar.jpg");
      const contentType = mime.lookup("default-avatar.jpg");

      await DefaultAvatar.create({
        avatar: {
          data,
          contentType,
        },
      });
    }
    //seed questions
    const existingQuestionsCount = await Question.countDocuments();
    if (existingQuestionsCount === 0) {
      await Question.insertMany(quizData);
    }
  } catch (error) {
    console.log(error);
    console.log(`Error while seeding database`);
    process.exit(1);
  }
};
