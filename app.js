import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import { seedDb } from "./data/seedDb.js";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import { checkAuth } from "./middlewares/checkAuth.js";

await connectDb();
await seedDb();

const app = express();
const PORT = process.env.PORT;

app.use(cors({origin:"http://192.168.1.17:5173",credentials:true}));
app.use(cookieParser());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/quiz", checkAuth, quizRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use((err, req, res, next) => {
  console.log("errrrrr", err);
  return res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message || "Internal Server error." });
});
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
