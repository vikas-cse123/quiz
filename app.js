import express from "express";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import cookieParser from "cookie-parser";
import { seedDb } from "./data/seedDb.js";

await connectDb();

await seedDb();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
