import mime from "mime-types";
import { readFile } from "fs/promises";
import DefaultAvatar from "../model/DefaultAvatar.js";
import Question from "../model/Question.js";
import quizData from "./quizData.json" with { type: "json" };
export const seedDb = async () => {
  try {
    //seed default avatar
    const existingDefaultAvatar = await DefaultAvatar.countDocuments();
    console.log({ existingDefaultAvatar });
    if (existingDefaultAvatar === 0) {
      const defaultAvatarBinary = await readFile("./public/default-avatar.jpg");
      console.log(defaultAvatarBinary);
      const contentType = mime.lookup("default-avatar.jpg");
      console.log( contentType );
      const avatar = {
data: defaultAvatarBinary, contentType
      }
      await DefaultAvatar.create({avatar,age:90});
    }
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
